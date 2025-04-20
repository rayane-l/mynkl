import { useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router";
import { RouterParams } from "../../App";
import {
  collectionsAPI, useDeleteMetasCollectionDetailMutation, useGetCollectionsDetailQuery, useGetDatasFromCollectionsQuery,
  useLazyGetCollectionsDetailQuery,
  useLazyGetDatasFromCollectionsQuery
} from "../../app/collections-api";
import { Donnees, Files, Metas } from "../../entities";
import ModalStatus from "../Modals/ModalStatus";
import ModalAddTitle from "../Modals/ModalAddTitle";
import ModalAddAllMeta from "../Modals/ModalAddAllMeta";
import { useLazyGetDonneesDetailQuery, usePutDonneeStatusMutation } from "../../app/donnees-api";
import { useAppDispatch } from "../../app/hooks";
import CopyMailTo from "../LibCopyMailto"
import Loader from "../Loaders/Loader"
import LoaderDNA from "../Loaders/LoaderDNA"
import ToastSuccess from "../Feedbacks/ToastSuccess";
import ToastError from "../Feedbacks/ToastError";
import CsvGenerateDonnees from "../CSV/CsvGenerateDonnees";
import Pagination from "../Pagination"
import { ArrowUpOnSquareStackIcon, FingerPrintIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import { useLazyDownloadFilesQuery } from "../../app/medias-api";


interface FilesId {
  dataID: string,
  filesID: Files[]
}

export default function CollectionsList() {
  /**
   * gestion feedback
   */
  const [succes, setSucess] = useState(false);
  const [notSucces, setNotSucces] = useState(false)
  const [succesFetch, setSucessFetch] = useState(false);
  const [notSuccesFetch, setNotSuccesFetch] = useState(false)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const datArray: Donnees[] = []
  const [receipt] = useState<Donnees[]>([])
  const [receiptTilesCollections] = useState<any[]>([])
  const [ready, setReady] = useState(false)
  /**
     * permet de récupérer l'id de la collection sélectionnée
     */
  const { id, id2 } = useParams<RouterParams>();
  const { data } = useGetCollectionsDetailQuery(String(id) + "/" + id2);

  /**
     * fetch les données associées à une collection
     */
  const { currentData } = useGetDatasFromCollectionsQuery({ id: String(id) + "/" + id2, limit: 25, page })

  const [lazy, postQueryFetch] = useLazyGetDatasFromCollectionsQuery();
  const [lazyDownload] = useLazyDownloadFilesQuery()
  /**
     * récupère les datas complètes
     */
  const [fetch] = useLazyGetDonneesDetailQuery();
  const [getLazyCollections] = useLazyGetCollectionsDetailQuery();

  /**
   * permet de supprimer une métadonnée de la collection sélectionnée
   */
  const [deleteMeta, postQuery] = useDeleteMetasCollectionDetailMutation();

  /**
    * request for put status donnee
    */
  const [putStatusDonnee] = usePutDonneeStatusMutation()


  /**
   * fetch datas per page, get ids of all datas and fetch data's details
   */
  const fetchAllDatasFromCollection = async () => {
    setLoading(true)
    let dataFetched: Donnees[] = []
    const dataIDS: string[] = []
    if (currentData.lastPage > 1) {
      for (let index = 0; index < currentData.lastPage; index++) {
        try {
          const result = await lazy({ id: String(id) + "/" + id2, limit: 25, page: index + 1 })
          for (const donnee of result.data.data) {
            dataIDS.push(donnee.identifier)
          }
        } catch (error) {
          console.log(error);
          setNotSuccesFetch(true)
          setLoading(false)
        }
      }
    } else {
      dataFetched = currentData.data
      for (const donnee of dataFetched) {
        dataIDS.push(donnee.identifier!)
      }
    }
    fetchAllDatasDetails(dataIDS)
  }


  const fetchAllDatasDetails = async (donneesIDS: string[]) => {
    try {
      for (const donnees of donneesIDS) {
        const results = await fetch(donnees).unwrap()
        receipt.push(results)
        await fetchTitleCollection(results)
      }

      setSucessFetch(true)
      setReady(true)
    } catch (error) {
      console.log(error);
      setNotSucces(true)
    } finally {
      setLoading(false)
    }
  }

  /**
   * permet de récupérer tous les titres des collections par données et de créer un dictionnaire
   * @param results les collections trouvées selon les collectionsIds de chaque données
   */
  const fetchTitleCollection = async (results: Donnees) => {
    const titlesCollectionsObject: any = {}
    for (const collections of results.collectionsIds!) {
      const fetchCollections = await getLazyCollections(collections).unwrap()
      const collectionsTitles = fetchCollections.metas![0].value
      if (titlesCollectionsObject["titresCollections"]) {
        titlesCollectionsObject["titresCollections"] = `${titlesCollectionsObject["titresCollections"]} | ${collectionsTitles}`
      } else {
        titlesCollectionsObject["titresCollections"] = collectionsTitles
      }
    }
    receiptTilesCollections.push(titlesCollectionsObject)
  }

  /**
     * récupère les données (sous forme d'objet) associées à la collection présente et les classe dans un tableau
     */
  if (currentData !== undefined) {
    for (const data of currentData.data) {
      datArray.push(data)
    }
  }

  /**
     * permet de publier toutes les données d'une collection
     */
  const putStatusAllDonnee = async () => {
    if (window.confirm("Etes vous sure de publier toutes les donnée de la collection ?")) {
      for (const datas of datArray) {
        try {
          if (datas.status === "pending") {
            const firstId = datas!.identifier!.substring(0, 8)
            const secondId = datas!.identifier!.substring(9, 21)
            await putStatusDonnee(String(firstId) + "/" + secondId).unwrap()
            dispatch(collectionsAPI.util.invalidateTags(["collectionsList"])) //permet de rafraichir
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  if (!data) {
    return <Loader />
  }
  /**
     * permet de supprimer les métadonnées
     * 
     * @param param 
     */
  const deleteAmeta = async (param: Metas) => {
    if (window.confirm("Etes vous sure de supprimer cette métadonnée ?")) {
      try {
        if (param) {
          await deleteMeta({ id: String(id) + "/" + id2, body: param }).unwrap()
          setSucess(true)
        }
      } catch (e) {
        setNotSucces(true)
        console.log(e);
      }
    }
  }

  // récupère la première méta oligatoire, le 1er titre
  const allTitleMetas = data!.metas // récupère toutes les métas

  const onlyTitleMeta = allTitleMetas!.filter(function (item) {
    return item.propertyUri === "http://nakala.fr/terms#title"
  })
  const metasAuth = data!.metas!.filter((item) => {
    return item.propertyUri === "http://nakala.fr/terms#creator"
  })


  const dataFilesArray: FilesId[] = []

  if (currentData !== undefined) {
    for (const datas of datArray) {
      const getFilesIds: FilesId = { "dataID": "", "filesID": [] }
      for (const file of datas!.files!) {
        getFilesIds.filesID.push({ "sha1": file.sha1, "name": file.name })
      }
      getFilesIds.dataID = datas.identifier!
      dataFilesArray.push(getFilesIds)
    }
  }

  const downloadFilesFromCollections = async () => {
    setLoading(true)
    for (const data of dataFilesArray) {
      for (const file of data.filesID) {
        const result: any = await lazyDownload({ dataId: data.dataID, filesId: file.sha1! })
        const url = window.URL.createObjectURL(result.data);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = file.name!;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    }
    setLoading(false)
  }


  return (
    <div className="h-full ">
      <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm mb-3 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between content-center ">
          <div className="mt-8 font-fontSpec">
            <h1 className="text-2xl  font-medium text-gray-800 sm:text-3xl">
              {data.metas![0].propertyUri === "http://nakala.fr/terms#title" && data.metas![0].value}
            </h1>
            <p className="mt-1.5 text-sm  text-gray-600">
              Vous pouvez visualiser le détail de votre collection 🚀
            </p>
          </div>
          <button className="p-3 place-self-center text-sm  text-center
            bg-redCahier/70 shadow-md rounded text-white  hover:bg-redCahier/90 
            hover:duration-700 inline-flex items-center">
            <FingerPrintIcon className="h-6 w-6 mr-2" />
            <CopyMailTo copiedTooltip="Identifiant copié !" defaultTooltip="Copier l'identifiant" email={data.identifier!} theme="dark" /></button>
        </div>
      </header>

      <div className=" my-12 mx-24 bg-white overflow-hidden sm:rounded-lg">
        <dl className="drop-shadow-sm">
          <div className="bg-greyNakala/10 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
            <dt className="text-sm font-medium text-gray-500">Création de la Collection</dt>
            <dd className="mt-1 text-sm font-light text-gray-900 sm:mt-0 sm:col-span-2">
              <Moment format="YYYY/MM/DD">
                {data!.creDate}
              </Moment>
            </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Créateur de la collection</dt>
            <dd className="mt-1 text-sm font-light text-gray-900 sm:mt-0 sm:col-span-2"> {data.depositor!.username} </dd>
          </div>
        </dl>
        <dl className="drop-shadow-sm">
          <div className="bg-greyNakala/10 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 overflow-hidden  ">
            <dt className="text-sm font-medium text-gray-500">Données associées dans la collection</dt>
            <button className="shadow-md font-light absolute top-0 -right-1  border-l  border-green-700 px-3 py-2 bg-green-100 text-sm  text-green-700 
            hover:bg-green-700/20 hover:top-0  hover:duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-blue-300 sm:ml-3 sm:w-auto sm:text-sm" onClick={putStatusAllDonnee}>Publier toutes les données
            </button>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {datArray !== undefined ? datArray.map((donnee: Donnees, index) => <div key={index} className="flex">
                <a rel="noreferrer" className="hover:bg-greyNakala/20 font-light inline-flex items-center" href={`/donnees/${donnee.identifier}`}>
                  <ChartBarIcon className="h-5 w-5 mr-2 text-redCahier" />
                  {donnee.metas![0].value}  </a>
                <span className="ml-3 my-3"> {donnee.status === "published" ? (<strong
                  className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium"
                >
                  {donnee!.status}
                </strong>) : (<strong
                  className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium"
                >
                  {donnee!.status}
                </strong>)}
                </span> <br /></div>) : null}
            </dd>
            <Pagination
              onlyForCollections={true}
              data={currentData}
              setPage={() => setPage(page - 1)} addPage={() => setPage(page + 1)} />
            {loading && <LoaderDNA />}
          </div>
          <div className="flex justify-end">
            <button className="inline-flex bg-blue-100 p-2 mt-2 mr-3 text-blue-700 
             border-l font-light border-blue-500 hover:bg-blue-300 hover:duration-700"
            onClick={downloadFilesFromCollections}> Télécharger les fichiers des données<ArrowUpOnSquareStackIcon className="h-6 w-6 ml-2 stroke-1" />
            </button>
            {receipt.length < 1 && <button className="inline-flex bg-blue-100 p-2 mt-2 text-blue-700 
             border-l font-light border-blue-500 hover:bg-blue-300 hover:duration-700"
            onClick={() => fetchAllDatasFromCollection()}> Télécharger les données <ArrowUpOnSquareStackIcon className="h-6 w-6 ml-2 stroke-1" />
            </button>}
            {ready
              && <CsvGenerateDonnees allTitlesCollections={receiptTilesCollections} allDatas={receipt} collectionName={data.metas![0].propertyUri === "http://nakala.fr/terms#title" && data.metas![0].value} />}
          </div>
        </dl>
      </div>
      <article className="m-16">
        <h3 className="inline-flex items-center text-brownNakala mb-8">Les Métadonnées principales</h3>
        <section className=" flex justify-center ">
          <table className=" w-3/4 text-sm divide-y divide-gray-200 m-6">
            <thead className="shadow-sm">
              <tr className="bg-greyNakala/20 border-l-2 border-redCahier">
                <th className="px-4 py-2 font-light text-center text-gray-900 ">Propriétés</th>
                <th className="px-4 py-2 font-light text-center text-gray-900 whitespace-nowrap">Valeurs </th>
                <th className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap flex justify-center">
                  <button
                    className=" invisible z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50
                     hover:scale-110 focus:outline-none focus:ring"
                    type="button"
                  >
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="shadow-sm">
                <td className="px-4 py-2 tracking-widest  text-center text-gray-900 whitespace-nowrap">STATUS</td>
                <td className="px-4 py-2 font-medium text-center text-brownNakala/80  font-medium text-base  whitespace-nowrap"> {data!.status === "public" ? (
                  <strong
                    className="bg-green-100 text-green-700 px-4 py-2 rounded text-xs font-medium"
                  >
                    {data!.status}
                  </strong>) : (<strong
                  className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium"
                >
                  {data!.status}
                </strong>)}
                </td>
                <td className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap flex justify-center">
                  <div className="flex items-center -space-x-4 hover:space-x-1">
                    <ModalStatus collection={data!} />
                  </div>
                </td>
              </tr>
              {onlyTitleMeta!.length > 0 && onlyTitleMeta?.map((item: Metas, index) =>
                <tr className="shadow-sm" key={index}>
                  <td className="px-4 py-2  tracking-widest text-center text-gray-900 whitespace-nowrap">TITRE</td>
                  <td className="px-4 py-2  text-center text-brownNakala/80  font-light text-base  ">
                    <span>{item.propertyUri === "http://nakala.fr/terms#title" && item.value}</span></td>
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap flex justify-center">
                    <div className="flex items-center -space-x-4 hover:space-x-1">
                      <button onClick={() => deleteAmeta(item)}
                        className="z-30 block p-4 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110
                         focus:outline-none focus:ring active:bg-red-50"
                        type="button"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {metasAuth.map((item, index) => <tr key={index} className="shadow-sm">
                <td className="px-4 py-2 tracking-widest text-center text-gray-900 whitespace-nowrap"> {item.propertyUri?.substring(23).toUpperCase()} </td>
                <td className="px-4 py-4  text-center text-brownNakala/80  font-light text-base  whitespace-nowrap">
                  {item.value === null || item.value!.fullName! === "" ? "non renseigné" : item.value!.fullName!}
                </td>
              </tr>)}
              <tr className="shadow-sm">
                <td className="px-4 py-2  tracking-widest text-center text-gray-900 whitespace-nowrap"></td>
                <td className="px-4 py-2 font-light text-gray-900 whitespace-nowrap flex justify-center">
                  <div className="flex items-center -space-x-4 hover:space-x-1">
                    <ModalAddTitle />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </article>

      <article className="mx-16">
        <h3 className="inline-flex items-center text-brownNakala mb-8 ">Les Métadonnées secondaires</h3>
        <section className="flex justify-center ">
          <table className="w-3/4 text-sm divide-y divide-gray-200 m-6">
            <thead className="shadow-sm">
              <tr className="bg-greyNakala/20 border-l-2 border-redCahier">
                <th className="px-4 py-2 font-light text-center text-gray-900 ">Propriétés</th>
                <th className="px-4 py-2 font-light text-center text-gray-900 ">Valeurs</th>
                <th className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap flex justify-center">
                  <button
                    className=" invisible z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full 
                    active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
                    type="button"
                  >
                  </button>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.metas ? data.metas!.map((item: Metas, index) =>
                <tr className="shadow-sm" key={index}> {item.propertyUri !== "http://nakala.fr/terms#title" && item.propertyUri !== "http://nakala.fr/terms#creator" ?
                  <>
                    <td className="px-4 py-2 tracking-widest text-center text-gray-900 whitespace-nowrap"> {item.propertyUri?.substring(25).toUpperCase()} </td>
                    <td className="px-4 py-2 text-center font-light text-base text-gray-700 ">{item.value}</td>
                    <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap flex justify-center">
                      <button onClick={() => deleteAmeta(item)}
                        className="z-30 block p-4 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none 
                        focus:ring active:bg-red-50"
                        type="button"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </> : null}
                </tr>) : null}

            </tbody>
          </table>
        </section>
        <div className="flex grid justify-items-center my-6 ">
          <ModalAddAllMeta />
        </div>
      </article>
      {<ToastSuccess showModal={succes} closeModal={() => setSucess(false)} message="Métadonnée supprimée" position={false} />}
      {<ToastError showModalError={notSucces} closeModalError={() => setNotSucces(false)} queryMessage={postQuery} positionE={false} />}
      {<ToastError showModalError={notSuccesFetch} closeModalError={() => setNotSuccesFetch(false)} queryMessage={postQueryFetch} positionE={false} />}
      {<ToastSuccess showModal={succesFetch} closeModal={() => setSucessFetch(false)} message="Données téléchargées" position={false} />}
    </div >
  )
}