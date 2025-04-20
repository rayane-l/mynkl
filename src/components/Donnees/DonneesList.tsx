
import { useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router";
import { RouterParams } from "../../App";
import { useDeleteDonneeFromCollectionMutation, useDeleteMetadataDonneesMutation, useGetCollectionsFromDonneeQuery, useGetDonneesDetailQuery } from "../../app/donnees-api";
import { Collection, Files, Metas } from "../../entities";
import DonneesMedias from "./DonneesMedias";
import ModalAddMetaDonnee from "../Modals/ModalAddMetaDonnees";
import ModalAddCollectionFromDonnees from "../Modals/ModalAddCollectionFromDonnees";
import ModalAddMedia from "../Modals/ModalAddMedia";
import ModalStatusDonnee from "../Modals/ModalStatusDonnees";
import CopyMailTo from "../LibCopyMailto";
import Loader from "../Loaders/Loader"
import ToastSuccess from "../Feedbacks/ToastSuccess";
import ToastError from "../Feedbacks/ToastError";
import { AdjustmentsVerticalIcon, ArrowTopRightOnSquareIcon, FingerPrintIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import SearchBar from "../Searches/SearchBar";


export default function DonneesList() {
  /**
    * gestion feedback
    */
  const [error, setError] = useState(false)
  const [succes, setSucess] = useState(false)

  const [show, setSHow] = useState(true);
  const [media, setMedia] = useState(false)
  const collectionsArray: Collection[] = [];
  /**
    * permet de récupérer l'id de la donnée sélectionnée
    */
  const { id, id2 } = useParams<RouterParams>();
  const { data } = useGetDonneesDetailQuery(String(id) + "/" + id2);

  /**
     * fetch les collections associées à la donnée présente
     */
  const { currentData } = useGetCollectionsFromDonneeQuery(String(id) + "/" + id2)

  /**
     * delete meta from donnees
     */
  const [deleteCollection, postQuery] = useDeleteDonneeFromCollectionMutation();
  const [deleteMeta] = useDeleteMetadataDonneesMutation();


  /**
     * delete a relation between collections and donnees
     * 
     * @param param id of collection
     */
  const deleteACollection = async (param: any) => {
    if (window.confirm("Etes vous sure de supprimer cette relation ?")) {
      if (param) {
        const stupid = []
        stupid.push(param)
        try {
          await deleteCollection({ id: String(id) + "/" + id2, body: stupid }).unwrap()
          setSucess(true)
        } catch (error) {
          setError(true)
          console.log(error);
        }
      }
    }
  }


  const deleteAmeta = async (param: Metas) => {
    if (window.confirm("Etes vous sure de supprimer cette métadonnée ?")) {
      try {
        if (param) {
          await deleteMeta({ id: String(id) + "/" + id2, body: param }).unwrap();
          setSucess(true)
        }
      } catch (error) {
        setError(true)
        console.log(error);
      }
    }
  }


  /**
    * loading
    */
  if (!data) {
    return <Loader />
  }

  const metaTitle = data!.metas![0]
  const metasAuth = data!.metas!.filter((item) => {
    return item.propertyUri === "http://nakala.fr/terms#creator"
  })

 

  if (currentData !== undefined) {
    for (const datas of currentData) {
      collectionsArray.push(datas)
    }
  }

  return (
    <div className="h-full ">
      <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm mb-3 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between content-center ">
          <div className="mt-8 font-fontSpec">
            <h1 className="text-2xl  font-medium text-gray-800 sm:text-3xl">
              {metaTitle.value}
            </h1>
            <p className="mt-1.5 text-sm  text-gray-600">
              Vous pouvez visualiser le détail de votre donnée 🚀
            </p>
          </div>
          <button className="p-3 place-self-center text-sm  text-center
            bg-redCahier/70 shadow-md rounded text-white  hover:bg-redCahier/90 
            hover:duration-700 inline-flex items-center">
            <FingerPrintIcon className="h-6 w-6 mr-2" />
            <CopyMailTo copiedTooltip="Identifiant copié !" defaultTooltip="Copier l'identifiant" email={data.identifier!} theme="dark" /></button>
        </div>
      </header>
      <SearchBar donnee={data} />

      <nav className="m-12">
        <ul className="flex border-b border-gray-100">
          <li className="flex-1">
            <article className="relative block p-4 cursor-pointer border-b hover:border-redCahier" onClick={() => { setSHow(true); setMedia(false); }}>
              <div className="flex items-center justify-center">
                <AdjustmentsVerticalIcon className="flex-shrink-0 w-5 h-5 text-gray-500" />
                <span className="ml-3 text-sm font-medium text-gray-900"> Informations principales</span>
              </div>
            </article>
          </li>
          <li className="flex-1">
            <article className="relative block p-4 cursor-pointer border-b hover:border-redCahier" onClick={() => { setSHow(false); setMedia(true); }}>
              <div className="flex items-center justify-center">
                <PhotoIcon className="flex-shrink-0 w-5 h-5 text-gray-500" />
                <span className="ml-3 text-sm font-medium text-gray-900"> Medias </span>
              </div>
            </article>
          </li>
        </ul>
      </nav>
      <div className="my-12 mx-24 bg-white border-y border-greyNakala overflow-hidden sm:rounded-sm">
        <dl>
          <div className="bg-greyNakala/10 px-4 py-5 shadow-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Création de la donnée</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-light">  <Moment format="YYYY/MM/DD">
              {data!.creDate}
            </Moment> </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Auteur du dépôt de la donnée</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-light"> {data!.depositor!.username}  </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 inline-flex items-center "> {data!.status === "published" ? (<strong
              className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium"
            >
              {data!.status}
            </strong>) : (<strong
              className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium"
            >
              {data!.status}
            </strong>)} {data.status === "pending" && <ModalStatusDonnee />}   </dd>
          </div>
        </dl>
        <dl>
          <div className="bg-greyNakala/10 px-4 py-5 shadow-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Les Collections associées</dt>
            <dd className="mt-1  text-sm text-gray-900 sm:mt-0 sm:col-span-2">{collectionsArray.length > 0 &&
              collectionsArray.map((item) => <div className="flex">
                <a rel="noreferrer" className="hover:bg-greyNakala/20  font-light inline-flex items-center" href={"/collections/" + item.identifier}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-redCahier" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg> {item.metas![0].value}  </a>
                <button onClick={() => deleteACollection(item.identifier)}
                  className=" block m-4 p-3 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                  type="button"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round"
                      strokeLinejoin="round" strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <br />
              </div>)}
            </dd>
          </div>
        </dl>
        <div className="flex justify-center m-3">
          <ModalAddCollectionFromDonnees />
        </div>
      </div>
      {show &&
        <article className="m-16">
          <h3 className="inline-flex items-center text-brownNakala mb-8"> Les Métadonnées principales</h3>
          <section className="  flex justify-center ">
            <table className=" w-2/3 text-sm divide-y divide-gray-200 m-6">
              <thead className="shadow-sm">
                <tr className="bg-greyNakala/20 border-l-2 border-redCahier">
                  <th className="px-4 py-2 font-medium text-center text-gray-900 ">Propriétés</th>
                  <th className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap">Valeurs</th>
                  <th className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap flex justify-center">
                    <button
                      className=" invisible z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50 
                    hover:scale-110 focus:outline-none focus:ring"
                      type="button"
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.metas!.map((item: Metas, index) =>
                  <tr key={index} className="shadow-sm">{item.propertyUri!.includes("#") && item.propertyUri !== "http://nakala.fr/terms#creator" ? <>
                    <td className="px-4 py-2 tracking-widest text-center text-gray-900 whitespace-nowrap"> {item.propertyUri?.substring(23).toUpperCase()} </td>
                    {item.propertyUri === "http://purl.org/dc/terms/relation" ?
                      <a href={String(item.value)} className="px-4 py-2  text-center text-brownNakala/80  font-light text-base  whitespace-nowrap"> Suivre le lien</a> : null}
                    <td className="px-4 py-4  text-center text-brownNakala/80  font-light text-base "> {item.value === null ? "non renseigné" : item.value} </td>
                  </> : null}
                  </tr>
                )}
                {metasAuth.map((item, index) => <tr key={index} className="shadow-sm">
                  <td className="px-4 py-2 tracking-widest text-center text-gray-900 whitespace-nowrap"> {item.propertyUri?.substring(23).toUpperCase()} </td>
                  <td className="px-4 py-4  text-center text-brownNakala/80  font-light text-base  whitespace-nowrap">
                    {item.value === null || item.value!.fullName! === "" ? "non renseigné" : item.value!.fullName!}
                  </td>
                </tr>)}
              </tbody>
            </table>
          </section>
          <h3 className="inline-flex items-center text-brownNakala mb-8">Les Métadonnées secondaires</h3>
          <section className="  flex justify-center ">
            <table className=" w-2/3 text-sm divide-y divide-gray-200 m-6">
              <thead className="shadow-sm">
                <tr className="bg-greyNakala/20 border-l-2 border-redCahier">
                  <th className="px-4 py-2 font-medium text-center text-gray-900 ">Propriétés</th>
                  <th className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap"> Valeurs</th>
                  <th className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap flex justify-center"><button
                    className=" invisible z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50
                     hover:scale-110 focus:outline-none focus:ring"
                    type="button"
                  >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.metas!.map((item: Metas, index) => <tr className="shadow-sm" key={index}> {item.propertyUri!.includes("purl") &&
                  <><td className="px-4 py-2 tracking-widest text-center text-gray-900 whitespace-nowrap"> {item.propertyUri?.substring(25).toUpperCase()} </td>
                    <td className="px-4 py-2 text-center text-brownNakala/80  font-light text-base">{item.value == null ? "non renseigné" : item.propertyUri?.includes("relation") ?
                      <a className="inline-flex" rel="noreferrer" target="_blank" href={String(item.value)}>{item.value}
                        <ArrowTopRightOnSquareIcon className="w-6 h-6" />
                      </a> : item.value}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap flex justify-center">
                      <div className="flex items-center -space-x-4 hover:space-x-1">
                        <button onClick={() => deleteAmeta(item)}
                          className="z-30 block p-4 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                          type="button"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>}
                </tr>
                )}
              </tbody>
            </table>
          </section>
          <div className="flex  grid justify-items-center my-6 ">
            <ModalAddMetaDonnee />
          </div>

        </article>}

      {media &&
        <div className="h-full m-8">
          <h3 className="inline-flex items-center text-brownNakala mb-8"> Les fichiers de la donnée</h3>
          <section className="flex justify-center">
            <table className="w-full text-sm m-6">
              <thead>
                <tr className="bg-greyNakala/30 border-l border-redCahier shadow-md  ">
                  <th className="px-4 py-2 font-light text-center text-gray-900 ">Nom du fichier</th>
                  <th className="px-4 py-2 font-light text-center text-gray-900 whitespace-nowrap"> Type</th>
                  <th className="px-4 py-2 font-light text-center text-gray-900 whitespace-nowrap"> SHA/ID</th>
                  <th className="px-4 py-2 font-light text-center text-gray-900 whitespace-nowrap"> Embargoed</th>
                  <th className="px-4 py-2 font-light text-center text-gray-900 whitespace-nowrap flex justify-center">
                    <button
                      className=" invisible z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white 
                      rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
                      type="button"
                    >
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Fetch files from donnees*/}
                {data.files?.map((item: Files) => <DonneesMedias file={item} />)}
              </tbody>
            </table>
          </section>
          <div className="flex  grid justify-items-center my-6 ">
            <ModalAddMedia donnee={data} />
          </div>
        </div>}
      {<ToastSuccess showModal={succes} closeModal={() => setSucess(false)} message="Élément supprimé" position={false} />}
      {<ToastError showModalError={error} closeModalError={() => setError(false)} queryMessage={postQuery} positionE={false} />}
    </div>
  )
}