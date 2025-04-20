import React, { useState } from "react";
import { useDeleteDonneesMediaMutation, useLazyGetDonneesDetailQuery, usePostMediaUploadMutation, useUpdateDonneeMutation } from "../app/donnees-api";
import { Donnees, DonneeUpdated, Files } from "../entities";
import CsvGenerateDonnees from "../components/CSV/CsvGenerateDonnees";
import UploaderCSV from "../components/UploaderCSV";
import { fetchDCtermsMetas, fetchDonneFromDOI, fetchNklMetas, useAppDispatch, useAppSelector } from "../app/hooks";
import { userAPI } from "../app/user-api";
import Loader from "../components/Loaders/Loader";
import UploaderFiles from "../components/UploaderFiles";
import DoiCSVTemplate from "../components/CSV/DoiCSVTemplate";
import { ArrowUpOnSquareStackIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";


export default function UpdateCSVPage() {
  const dispatch = useAppDispatch()
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  /**
   * state du csv de doi
   */
  const [parsedCsvData, setParsedCsvData] = useState([] as unknown as any);

  /**
     * state csv des données à modifier
     */
  const [csvUpdated, setCsvUpdated] = useState([] as unknown as any);
  console.log(csvUpdated);
  
  const [feedBack, setFeedback] = useState<any[]>([])
  const [deleteFiles, setDeleteFiles] = useState("")
  /**
     * contient les données récupérés via les doi
     */
  const [allDatas, setAllDatas] = useState([] as unknown as Donnees[])
  /**
 * fetch all files from uploader
 */
  const [files, setFiles] = React.useState<Files[]>([]);
  const datasForUpdated: any[] = []
  const [loading, setLoading] = useState(false)

  /**
   * API
   */
  const [deleteMedia] = useDeleteDonneesMediaMutation();
  const [fetch] = useLazyGetDonneesDetailQuery();
  const [update, postQuery] = useUpdateDonneeMutation()
  const [postMediaUpload] = usePostMediaUploadMutation();


  /**
   * 
   * @param event files
   */
  const handleChange = (event: React.FormEvent<EventTarget>) => {
    const file = (event.target as HTMLInputElement).files;
    const arrayFile: File[] = []
    for (const data of file!) {
      arrayFile.push(data)
    }
    setFiles(arrayFile)
  }


  /**
    * for each donnee, put good files into metas.files
    * @param allDonnee 
    * @param allFiles 
    */
  const affectFilesToDonnee = (csvArray: DonneeUpdated, allFiles: any[]) => {
    try {
      /**
             * compare versionName and fileName and if match, put file in arrayDonneeFile
             */
      for (let index = 0; index < allFiles.length; index++) {
        const fileName = allFiles[index].name;
        const fileObj = allFiles[index]
        const version = csvArray.version;
        const arrayDonneeFiles = csvArray.files

        if (fileName?.startsWith(version!)) {
          arrayDonneeFiles?.push(fileObj)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 
   * @param csvArray files's array from each donnee
   */
  const deleteAllFilesCurrentCSV = async (csvArray: any[]) => {
    for (let index = 0; index < csvArray.length; index++) {
      const donneeDOI = csvArray[index]["DOI"]
      const sha1Array = csvArray[index]["sha1"]?.split("|")
      const firstId = donneeDOI.substring(0, 8)
      const secondId = donneeDOI.substring(9, 21)
      for (const sha1 of sha1Array) {
        try {
          await deleteMedia({ id: firstId + "/" + secondId, body: sha1!.trim() }).unwrap()
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  /**
     * permet de récupérer les fichiers actuels d'une donnée, afin des les ajouter s'il y a de nouveaux files ajoutés par le user
     * @param csvArray tableau du csv uploadé
     * @param donneeUpdatedObject objet final qui va etre updaté (avec les metas, files, collectionIds, etc..)
     * @param index ligne actuelle du csv
     * ! modification des embargoed afin que tous les files soient au même embargo...
     */
  const fetchCurrentFiles = (csvArray: any[], donneeUpdatedObject: Donnees, index: number) => {
    try {
      const description = csvArray[index]["description"]?.split("|")
      const sha1 = csvArray[index]["sha1"]?.split("|")
      const fileName = csvArray[index]["name"]?.split("|")
      const fileEmbargoed = csvArray[index]["embargoed"]
      for (const sha of sha1) {
        const shaObject: any = {}
        shaObject["sha1"] = sha
        shaObject["name"] = fileName.shift()
        shaObject["description"] = description.shift()
        shaObject["embargoed"] = fileEmbargoed
        donneeUpdatedObject.files!.push(shaObject)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const fetchRights = (donneeUpdateObject: DonneeUpdated, index: number) => {
  //   const role = csvUpdated[index]["role"].split("|")
  //   const userId = csvUpdated[index]["id"].split("|")
  //   for (const id of userId) {
  //     const rightObject: any = {}
  //     rightObject["id"] = id.trim()
  //     rightObject["role"] = role.shift().trim()
  //     donneeUpdateObject.rights!.push(rightObject)
  //   }
  // }

  /**
     * permet de construire l'objet de datas à modifier, pour chaque ligne du CSV donné
     */
  const buildDatasObject = () => {
    for (let index = 0; index < csvUpdated.length; index++) {
      const status = csvUpdated[index]["Status donnee"];
      const version = csvUpdated[index]["version"];
      const linkedItem = csvUpdated[index]["Linked in item"];
      const modelUpdateData = ({ "status": status, "version": linkedItem, "metas": [], "relation": [], "rights": [], "files": [] } as unknown as DonneeUpdated)
      // fetchRights(modelUpdateData, index)
      fetchNklMetas(csvUpdated, modelUpdateData, index, true, datasForUpdated)
      fetchDCtermsMetas(csvUpdated, modelUpdateData, index)
      fetchCurrentFiles(csvUpdated, modelUpdateData, index)
      if (linkedItem !== "") {
        affectFilesToDonnee(modelUpdateData, files)
      }
      modelUpdateData.version = version
    }
  }

  /**
     * construit l'object de donnée à updater
     * fetch tous les files non uploadés et les upload
     * concat les anciens files et les nouveaux 
     * utilise l'api pour modifier ligne par ligne les données
     */
  const updateDonnee = async () => {
    setLoading(true)
    buildDatasObject()
    const tabFeedback = []


    for (const datas of datasForUpdated) {
      try {
        const filesData: any = []
        const currentFilesOfData: any = []
        if (datas[0].files) {
          for (const files of datas[0].files) {
            const checkIfTypeofFile = files.hasOwnProperty("description")
            /**
             * 
                         * on upload uniquement les nouveaux files afin de récupérer leur sha1
                         */
            if (checkIfTypeofFile === false) {
              const formdata: FormData = new FormData()
              formdata.append("file", files && files as Blob)
              const result = await postMediaUpload(formdata).unwrap()
              filesData.push(result)
            } else {
              currentFilesOfData.push(files)
            }
          }
          datas[0].files = filesData.concat(currentFilesOfData)
        }
        await update({ id: datas[1], body: datas[0] }).unwrap()
        postQuery.status === "uninitialized" && tabFeedback.push("Ligne modifiée")
      } catch (error: any) {
        console.log(error);
        const errorValidations = []
        if (error.data.payload && error.data.payload.validationErrors !== undefined) {
          const errorPayload = error.data.payload.validationErrors
          for (const erro of errorPayload) {
            errorValidations.push(erro)
          }
        }
        tabFeedback.push(error.data.message.concat(errorValidations))
      }
    }
    deleteFiles === "DELETE" && deleteAllFilesCurrentCSV(csvUpdated)
    setFeedback(tabFeedback)
    setLoading(false)
    dispatch(userAPI.util.invalidateTags(["OneUser"]))
  }

  return (
    <div
      style={{
        filter: `url(${urlColor})`
      }}
      className="h-full">
      <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mt-8 font-fontSpec">
            <h1 className="text-2xl  font-medium text-gray-800 sm:text-3xl">
              Modification des données par lôts
            </h1>
            <p className="mt-1.5 text-sm   text-gray-600">
              Modifiez vos données par collections ou bien séléctionnez celles que vous souhaitez 🚀
            </p>
          </div>
        </div>
      </header>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch"
          >
            <div className="flex items-center rounded bg-brownNakala/5 p-8 shadow-md ">
              <div className="mx-auto text-center lg:text-left">
                <h2 className="text-2xl font-light ">Étapes</h2>
                <span className="bg-gradient-to-r from-redCahier/50  to-redCahier/30 rounded lg:h-1 lg:w-10 lg:block mt-1"></span>
                <ul className="list-decimal list-inside mt-4 max-w-[45ch] text-sm text-gray-500 font-light">
                  <li className="p-1">Remplissez le template ci dessous avec les DOI de votre choix.</li>
                  <li className="p-1">Téléchargez vos données.</li>
                  <li className="p-1">Générez le csv et modifiez le.</li>
                  <li className="p-1">Déposez votre csv modifié, vous pouvez y lier de nouveaux fichiers.</li>
                </ul>
                <p className=" py-2 text-sm text-gray-400 italic font-light">Les étapes 1,2,3 sont facultatives si vous avez, au préalable,
                  généré un csv à modifier via une collection</p>
                <DoiCSVTemplate />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12">
              <article className="block col-span-3 shadow-sm font-light rounded-md p-2 border border-brownNakala/10">
                <h2 className="text-gray-600 p-3 bg-brownNakala/10 rounded-md mb-5 ">
                  <strong>2/3.</strong> Déposez votre csv contenant les doi
                  puis téléchargez les données (facultatif)</h2>
                <div className="flex justify-evenly">
                  <UploaderCSV text="Importer les DOI"
                    csvPost={false} classStyle={true}
                    currentState={setParsedCsvData} />
                  <div className="space-y-4 mt-8">
                    <div >
                      <button
                        className="inline-flex bg-blue-100 p-2 mt-2 text-blue-700 rounded-br-lg  font-light  hover:bg-blue-700/20 hover:duration-700"
                        onClick={() => fetchDonneFromDOI(parsedCsvData, setAllDatas, fetch)}>
                        Télécharger les données  <ArrowUpOnSquareStackIcon className="h-6 w-6 mr-2 stroke-1" />
                      </button>
                    </div>
                    <div>{allDatas.length >= 1 && <CsvGenerateDonnees allDatas={allDatas} collectionName={"UpdatedCSV"} />}</div>
                  </div>
                </div>
              </article>
              <article className="block block rounded-md col-span-1   shadow-sm p-2 font-light border border-brownNakala/10">
                <h2 className="text-gray-600 p-3 bg-brownNakala/10 rounded-md mb-5 ">
                  <strong>4.</strong> Déposez votre csv modifié
                </h2>
                <UploaderCSV csvPost={false} text="Importez CSV" classStyle={false} currentState={setCsvUpdated} />
              </article>

              {/**Permet de definir s'il faut ou non supprimer les anciens fichiers du csv + uploader */}
              <article className="block  col-span-2 p-2 rounded-md block rounded-md  shadow-sm p-2 font-light border border-brownNakala/10">
                <h2 className="text-gray-600 p-3 bg-brownNakala/10 rounded-md mb-5 ">Déposez vos fichiers</h2>
                <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 shadow-sm p-2 rounded-md">
                  <li>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="study_type"
                        className="h-6 w-6 border-gray-200 text-blue-300"
                        onClick={() => setDeleteFiles("DELETE")}
                      />

                      <span className="text-sm font-light text-gray-500">
                        Remplacer les fichiers
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="study_type"
                        className="h-6 w-6 border-gray-200 text-blue-300"
                        onClick={() => setDeleteFiles("ADD")}
                      />
                      <span className="text-sm font-light text-gray-500">
                        Ajouter les fichiers
                      </span>
                    </label>
                  </li>
                </ul>
                <div className="mt-5 flex justify-center">
                  <UploaderFiles filesArray={files} handle={handleChange} isCsvArray={true} csvArray={csvUpdated} />
                </div>
              </article>
            </div>
          </div>
          {loading && <Loader />}
          <div className="mt-2  flex justify-end">
            <button className="flex rounded-br-lg  shadow-sm px-4 py-3 bg-green-100 text-base font-light text-green-700
                            hover:bg-green-700/20 hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto
                            sm:text-sm" onClick={() => updateDonnee()} >Envoyer les modifications</button>
          </div>
        </div>
      </section>
      <table className="w-1/2 text-sm divide-y divide-gray-200 mb-2 ml-2">
        <thead>
          <tr className="bg-greyNakala/30 ">
            <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Lignes du CSV</th>
            <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Feedback Données</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {feedBack && feedBack.map((item: string, index: number) => <tr>
            <td className="px-4 py-2 font-light text-gray-900 whitespace-nowrap"> {index + 2} </td>
            {item.startsWith("Ligne modifiée") ?
              <td className=" inline-flex items-center w-full  p-2 bg-green-100 border-l border-green-700 font-light text-gray-900 whitespace-nowrap">
                {item}<CheckCircleIcon className="h-6 w-6 text-green-700 ml-2 stroke-1" />
              </td> :
              <td className="whitespace-pre-wrap inline-flex items-center w-full p-2 border-l border-red-500 bg-red-200 font-light text-gray-900 whitespace-nowrap">
                {item}<ExclamationTriangleIcon className="h-6 w-6 ml-2 text-red-500" />
              </td>}
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}