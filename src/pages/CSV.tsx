
import React, { useState } from "react";
import { Collection, Donnees, Files, Metas } from "../entities";
import { useLazyGetDonneesDetailQuery, usePostDonneeMutation, usePostMediaUploadMutation } from "../app/donnees-api";
import { usePostCollectionMutation } from "../app/collections-api";
import DoiCSV from "../components/CSV/DoiCSV"
import Loader from "../components/Loaders/Loader"
import UploaderCSV from "../components/UploaderCSV";
import CsvGenerateDonnees from "../components/CSV/CsvGenerateDonnees";
import UploaderFiles from "../components/UploaderFiles";
import { fetchDCtermsMetas, fetchDonneFromDOI, fetchNklMetas, useAppSelector } from "../app/hooks";
import Model from "../components/CSV/Model";
import { BookOpenIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ArrowUpOnSquareStackIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SelectConceptsTheso from "../components/CSV/SelectConceptsTheso";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";


export default function CSV() {
  const [alertCSV, setAlertCSV] = useState(false)
  /**
   * csv input
   */
  const [parsedCsvData, setParsedCsvData] = useState([] as unknown as any);
  /**
* fetch all files from uploader
*/
  const [files, setFiles] = React.useState<Files[]>([]);
  const nameCsv = new Date().toISOString().split("T");
  /**
   * array of all donnee builded
   */
  const finalArray: Donnees[] = []
  /**
   * array of all collections created
   */
  const finalColle: any = []
  const [feedback] = useState<any>([]);
  // gestion feedback données
  const [feed, setFeed] = useState<any>([])
  //gestion loader
  const [load, setLoading] = useState(false);

  const [concepts, setConcepts] = useState<Metas[]>([])

  // gestion doi 
  const [doi, setDoi] = useState<any>([]);

  const [createdDatas, setCreatedDatas] = useState([] as unknown as Donnees[])
  const [index] = useState<any>([])

  const navigate = useNavigate()
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  /**
   * api
   */
  const [postMediaUpload] = usePostMediaUploadMutation();
  const [postCollection] = usePostCollectionMutation();
  const [postDonnee] = usePostDonneeMutation();
  const [fetch] = useLazyGetDonneesDetailQuery();

  /**
   * fetch files from input
   * @param event files
   */
  const handleChange = (event: React.ChangeEvent<EventTarget>) => {
    const file = (event.target as HTMLInputElement).files;
    const arrayFile: File[] = []
    for (const data of file!) {
      arrayFile.push(data)
    }
    setFiles(arrayFile)
  }


  /**
   * 
   * @param collections collections to create
   * @param currentData array of collections'id for a one donnee
   */
  const getCollection = async (collections: any, currentData: any) => {
    const feedBackCollec: string[] = [];

    for (const collection of collections) {
      // check if collection exist (by title/value)
      const exist = finalColle.find((item: Collection) => item.metas![0].value === collection.metas![0].value)

      // if collection not exist, create collection and push id in array 
      if (exist === undefined) {
        try {
          const data: any = await postCollection(collection).unwrap()
          currentData!.collectionsIds?.push(data.payload.id)
          feedBackCollec.push(data.payload.id)// push l'identifiant pour le compte rendu (feedback)

          collection.identifier = data.payload.id // push l'identifiant de la collection dans le tableau à comparer
          finalColle.push(collection)
        } catch (errors: any) {
          console.log(errors)
          feedback.push(errors.data.message)
        }
      } else {
        currentData!.collectionsIds!.push(exist.identifier)
      }
    }
    // gestion DOI
    if (feedBackCollec.length > 0) {
      for (const id of feedBackCollec) {
        feedback.push(id)
      }
    }
  }

  const injectConceptInAllDonnees = (concepts: any[], donneeObject: Donnees) => {
    const allMetas = []
    for (const concept of concepts) {
      const subjectMeta = ({
        "typeUri": null,
        "propertyUri": "http://purl.org/dc/terms/subject", "value": concept.substring(26).trim()
      } as Metas);

      const handleID = concept.substring(0, 26)
      const typeMeta = ({
        "typeUri": "http://www.w3.org/2001/XMLSchema#anyURI", "propertyUri": "http://purl.org/dc/terms/type",
        "value": `https://hdl.handle.net/${handleID}`
      } as unknown as Metas)

      allMetas.push(subjectMeta, typeMeta)
    }
    donneeObject.metas! = allMetas
  }


  const massFunction = async () => {
    try {
      for (let index = 0; index < parsedCsvData.length; index++) {
        const linkedItem = parsedCsvData[index]["Linked in item"]
        const enmbargoed = parsedCsvData[index]["Embargoed"]
        const statusDonnee = parsedCsvData[index]["Status donnee"]
        const linkedInCollection = parsedCsvData[index]["Linked in collection"]?.split("|")
        const status = parsedCsvData[index]["Status collection"]

        /**
                        * model form donnee
                        */
        const formMeta = ({
          "version": linkedItem, "metas": [], "files": [],
          "collectionsIds": [], "modDate": enmbargoed, "status": statusDonnee
        } as unknown as Donnees)

        injectConceptInAllDonnees(concepts, formMeta)
        fetchNklMetas(parsedCsvData, formMeta, index, false)
        fetchDCtermsMetas(parsedCsvData, formMeta, index)
        finalArray.push(formMeta)

        /**
                 * put datas good format as collection, if no collections, push only collectionIDS
                 */
        const selectColl: Collection[] = []
        for (const datas of linkedInCollection!) {
          if (datas) {
            const data = datas.trim()
            const formCollec = ({
              "metas": [{
                "typeUri": "http://www.w3.org/2001/XMLSchema#string",
                "propertyUri": "http://nakala.fr/terms#title", "value": data
              }], "status": status
            } as unknown as Collection)
            selectColl.push(formCollec)
          }
        }
        await getCollection(selectColl, formMeta)
      }
    } catch (error) {
      console.log(error);
      setAlertCSV(true)
    }
  }

  /**
     * for each donnee, put good files into metas.files
     * @param allDonnee 
     * @param allFiles 
     */
  const affectFilesToDonnee = (allDonnee: Donnees[], allFiles: any[]) => {
    try {
      for (let index = 0; index < allFiles.length; index++) {
        const fileName = allFiles[index].name;
        const fileObj = allFiles[index]
        for (let index = 0; index < allDonnee.length; index++) {
          const versionNumber = allDonnee[index].version;
          const arrayDonneeFile = allDonnee[index].files
          if (fileName?.startsWith(versionNumber!)) {
            arrayDonneeFile?.push(fileObj)
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  const submitDonnee = async () => {
    /**
         * ! le code continu en cas d'erreur
         */
    if (files.length < parsedCsvData.length) {
      alert("Attention, il semble ne pas avoir assez de fichiers par rapport au nombre de données")
    }
    setLoading(true)
    const newTab = []
    const doiTab = []

    await massFunction()

    affectFilesToDonnee(finalArray, files)

    for (const datas of finalArray) {
      try {
        const fileDatas = datas.files
        const fileFormdata: Files[] = []

        /**
                 * each file of Files transformed with a name and a SHA1
                 */
        for (const data of fileDatas!) {
          const formdata: FormData = new FormData()
          formdata.append("file", data && data as Blob)
          const result = await postMediaUpload(formdata).unwrap()
          fileFormdata.push(result)
        }
        const embargFiles: Files[] = []
        for (const file of fileFormdata) {
          const embrg = datas!.modDate!
          if (datas.modDate) {
            embargFiles.push({ "embargoed": embrg, "name": file.name, "sha1": file.sha1 })
          } else {
            embargFiles.push(file)
          }
        }

        datas.files = embargFiles
        datas.version = null
        const finalPost: any = await postDonnee(datas).unwrap()
        newTab.push(finalPost.payload.id)
        index.push("un tour")
      } catch (error: any) {
        index.push("un tour")
        console.log(error);
        const errorValidations = []
        if (error.data.payload && error.data.payload.validationErrors !== undefined) {
          const errorPayload = error.data.payload.validationErrors
          for (const erro of errorPayload) {
            errorValidations.push(erro)
          }
        }
        newTab.push(error.data.message.concat(errorValidations))
      }
    }
    setLoading(false)
    setFeed(newTab)

    // gestion CSV doi rendus
    const filter = newTab.filter((result: string) => result.startsWith("10"))
    for (const identifier of filter) {
      const data = { "DOI": identifier }
      doiTab.push(data)
    }
    setDoi(doiTab)
  }

  return (
    <div
      style={{
        filter: `url(${urlColor})`
      }}
      className="h-full " >
      <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm mb-3 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between content-center ">
          <div className="mt-8 font-fontSpec">
            <h1 className="text-2xl  font-medium text-gray-800 sm:text-3xl">
              Dépôt de données par lots
            </h1>
            <p className="mt-1.5 text-sm  text-gray-600">
              Déposez vos données par lots, en liant vos fichiers, consultez la page Démo pour réaliser un dépôt sans complication  🚀
            </p>
          </div>
          <button onClick={() => navigate("/demo")} className="p-3 place-self-center text-sm  text-center
            bg-redCahier/80 shadow-md rounded text-white  hover:bg-redCahier/90 
            hover:duration-700 inline-flex items-center"> Voir la démo<BookOpenIcon className="h-4 w-4 ml-2" /></button>
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
                <ul className="list-decimal list-inside mt-4 mb-3 max-w-[45ch] text-sm text-gray-500 font-light">
                  <li className="p-1">Remplissez le template ci dessous, les en-têtes doivent etre inchangées</li>
                  <li className="p-1">Déposez votre csv (prenez le temps de lire la démo en page d'accueil, afin de respecter les normes Nakala).</li>
                  <li className="p-1">Déposez vos fichiers.</li>
                  <li className="p-1">Vous pouvez ajouter un/des concepts textuels(option).</li>
                </ul>
                <Model />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-2 lg:py-12">
              <article className="block rounded-md  shadow-sm p-2 border border-brownNakala/10">
                <h2 className=" text-gray-600 p-3 bg-brownNakala/10 font-light rounded-md"><strong>2.</strong> Déposez votre csv</h2>
                <div className="flex justify-center">
                  <UploaderCSV text="Importer le csv" csvPost={true} classStyle={true} currentState={setParsedCsvData} />
                </div>
              </article>

              <article className="block rounded-md  shadow-sm p-2 border border-brownNakala/10">
                <h2 className=" text-gray-600 p-3 bg-brownNakala/10 font-light rounded-md"><strong>3.</strong>Déposez vos fichiers</h2>
                <PhotoIcon className="mx-auto mt-2 h-10 w-10 text-gray-400 " />
                <div className="flex justify-center">
                  <UploaderFiles handle={handleChange} filesArray={files} isCsvArray={true} csvArray={parsedCsvData} />
                </div>
              </article>
              <article className="block rounded-md  shadow-sm p-2 border border-brownNakala/10">
                <h2 className=" text-gray-600 p-3 bg-brownNakala/10 font-light rounded-md inline-flex"><strong>4.</strong>Vous pouvez ajouter un concept
                  <StarIcon className="h-5 w-5 fill-yellow-300 text-yellow-300 ml-3" /></h2>
                <SelectConceptsTheso concept={concepts} setConcept={setConcepts} />
                <a href="https://opentheso.huma-num.fr/opentheso/?idt=43"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-indigo-600 text-sm font-light hover:underline underline-offset-4">
                  Voir le thésaurus <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-2" />
                </a>
                <button className="ml-4 inline-flex items-center
                 text-orange-700 text-sm font-light hover:underline underline-offset-4"
                  onClick={() => navigate("/thesaurus")}>Voir le réferentiel <InformationCircleIcon className="h-5 w-5 ml-2" /></button>
              </article>
            </div>

          </div>
          <div className="mt-2  flex justify-end">
            <button className="flex rounded-br-lg  shadow-sm px-4 py-3 bg-green-100 text-base font-light text-green-700
                            hover:bg-green-700/20 hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto
                            sm:text-sm" onClick={submitDonnee} >Envoyer les données</button>
          </div>
        </div>
      </section>
      {/**Gestion feedback */}
      <section>
        <div className="flex mx-4">
          <table className="w-1/2 text-sm divide-y divide-gray-200 mb-2 ml-2">
            <thead>
              <tr className="bg-greyNakala/30 ">
                <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Lignes du CSV</th>
                <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Feedback Données</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feed && feed.map((item: string, index: number) => <tr>
                <td className="px-4 py-2 font-light text-gray-900 whitespace-nowrap"> {index + 2} </td>
                {item.startsWith("10") ?
                  <td className=" inline-flex items-center w-full  p-2 bg-green-100 border-l border-green-700
                 font-light text-gray-900 whitespace-nowrap"> {`La donnée ${item} est créee`}
                    <CheckCircleIcon className="h-6 w-6 text-green-700 ml-2 stroke-1" />
                  </td> :
                  <td className="whitespace-pre-wrap inline-flex items-center w-full p-2 border-l border-red-500 bg-red-200 font-light text-gray-900 
                  whitespace-nowrap"> {item} <ExclamationTriangleIcon className="h-6 w-6 ml-2 text-red-500" />
                  </td>}
              </tr>)}
            </tbody>
          </table>

          <table className="w-1/2 text-sm divide-y divide-gray-200 mb-2 ml-2">
            <thead>
              <tr className="bg-greyNakala/30 ">
                <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Feedback Collection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feedback && feedback.map((item: string, index: number) => <tr key={index}>
                {item.startsWith("10") ? <td className="inline-flex items-center w-full  p-2 bg-green-100 border-l border-green-700 font-light text-gray-900 
                whitespace-nowrap"> {`La collection ${item} est créee`}
                  <CheckCircleIcon className="h-6 w-6 text-green-700 ml-2 stroke-1" />
                </td> :
                  <td className="inline-flex items-center w-full p-2 border-l border-red-500 bg-red-200 font-light text-gray-900 whitespace-nowrap"> {item}
                    <ExclamationTriangleIcon className="h-6 w-6 ml-2 text-red-500" />
                  </td>}
              </tr>)}
            </tbody>
          </table>
        </div>
        <CircularProgressbar className="h-12 w-12" value={index.length} maxValue={parsedCsvData.length} />

        <div className="my-3 w-full text-center flex items-center justify-evenly">
          {load && <> <Loader />
            <p className=" font-light -translate-y-8">
              Le traitement peut prendre quelques minutes</p> </>}
          {doi.length > 0 &&
            <>
              <DoiCSV doiTab={doi} />
              <button className="inline-flex bg-blue-100 rounded-br-lg p-3 mt-2 text-blue-700   font-light  hover:bg-blue-700/20 hover:duration-700"
                onClick={() => fetchDonneFromDOI(doi, setCreatedDatas, fetch)}>
                <ArrowUpOnSquareStackIcon className="h-6 w-6 mr-2 stroke-1" />
                Télécharger les données
              </button>
              {createdDatas.length === doi.length && <CsvGenerateDonnees allDatas={createdDatas} collectionName={`Dépôt du ${nameCsv[0]}`} />}
            </>}
        </div>

        {alertCSV &&
          <div
            className="fixed top-1/4 right-2 w-1/4 p-5 border rounded text-sky-700 bg-sky-100 border-sky-900/10"
            role="alert"
          >
            <button onClick={() => setAlertCSV(false)}
              className="opacity-90 m-2 absolute top-0 right-0" type="button" data-dismiss-target="#alert-additional-content-1">
              <span className="sr-only"> Close </span>
              <XMarkIcon className="h-4 w-4" />
            </button>
            <strong className="text-sm font-medium inline-flex items-center ">
              Le Format du CSV semble incorrect
              <ExclamationTriangleIcon className="h-5 w-5 ml-2 text-sky-700" />
            </strong>
            <ul className="mt-1 ml-2 text-xs list-disc list-inside">
              <li>Procédez à un enregistrement selon les règles du format CSV (voir démo)</li>
              <br />
              <li>Vérifiez l'intitulé de vos en-têtes si vous n'avez pas téléchargé le template proposé</li>
              <br />
              <li>Toutes les colonnes doivent êtres présentes dans votre CSV, mêmes inutilisées</li>
              <br />
              <li>Vérifiez que vos colonnes obligatoires soient remplies</li>
            </ul>
          </div>
        }
      </section>
    </div >
  );
}


