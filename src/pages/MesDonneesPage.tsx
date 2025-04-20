import { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useDeleteDonneMutation, usePutDonneeStatusMutation } from "../app/donnees-api";
import { useGetAllDonneesQuery } from "../app/user-api";
import ModalAddDonnee from "../components/Modals/ModalAddDonnee";
import { Donnees, Metas } from "../entities";
import Loader from "../components/Loaders/Loader"
import ToastSuccess from "../components/Feedbacks/ToastSuccess";
import ToastError from "../components/Feedbacks/ToastError";
import Pagination from "../components/Pagination";
import { ArrowLongRightIcon, ChevronDownIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";
import { useAppSelector } from "../app/hooks";


export default function MesDonneesPage() {
  const [page, setPage] = useState(1);
  const [checkedInput, setChecked] = useState<any>([])
  const base = useAppSelector(state => state.base.server_url)
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  const [show, setShow] = useState(false)
  /**
     * api
     */
  const [deleteDonnee, postQueryDelete] = useDeleteDonneMutation();
  /**
     * fetch all donnees
     */
  const { data } = useGetAllDonneesQuery({ page: page });

  /**
    * request for put status donnee
    */
  const [putStatusDonnee] = usePutDonneeStatusMutation()
  const donneesData: Donnees[] | undefined = data?.data// cible uniquement l'objet data

  /**
     * gestion feedback
     */
  const [succes, setSucces] = useState(false)
  const [notSucces, setNotSucces] = useState(false)


  const deleteADonnee = async (param: string) => {
    if (param) {
      if (window.confirm("Etes vous sure de vouloir supprimer cette donnée ?")) {
        try {
          await deleteDonnee(param).unwrap()
          setSucces(true)
        } catch (error) {
          setNotSucces(true)
          console.log(error);
        }
      }
    }
  }


  /**
     * add/remove checked array
     * @param event donnee
     */
  const handleCheck = (event: { target: { checked: any; value: any; }; }) => {
    let updatedList = [...checkedInput];
    if (event.target.checked) {
      updatedList = [...checkedInput, event.target.value];
    } else {
      updatedList.splice(checkedInput.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };


  /**
     * checked all donnees
     * @param event all donnees
     */
  const handleCheckAll = (event: { target: { checked: any; value: any; }; }) => {
    let updatedList = [...checkedInput];
    if (event.target.checked) {
      for (const datas of donneesData!) {
        if (datas.status === "pending") {
          updatedList.push(datas.identifier)
        }
      }
    } else {
      updatedList = [];
    }
    setChecked(updatedList);
  };

  /**
   * published one or all donnees
   */
  const changeStatusDonnee = async () => {
    if (window.confirm("Etes vous sure de vouloir publier la/les donné/es ?")) {
      try {
        if (checkedInput.length > 0) {
          for (const donnee of checkedInput!) {
            const firstId = donnee.substring(0, 8)
            const secondId = donnee.substring(9, 21)
            await putStatusDonnee(String(firstId) + "/" + secondId).unwrap()
          }

          alert("Les données sont publiées")
          window.location.reload()
        }
      } catch (error) {
        console.log(error);
        setNotSucces(true)
      }
    }
  }

  return (
    <>

      <div
        style={{
          filter: `url(${urlColor})`
        }}
        className="h-full">
        {donneesData === undefined ? <Loader /> :
          <>
            <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm mb-10 ">
              <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between content-center ">
                <div className="mt-8 font-fontSpec">
                  <h1 className="text-2xl inline-flex items-center font-medium text-gray-800 sm:text-3xl">
                    Vos Données
                  </h1>
                </div>
                <button onClick={() => setShow(true)} className="p-3 place-self-end text-sm  text-center
            bg-redCahier/80 shadow-md rounded text-white  hover:bg-redCahier/90 
            hover:duration-700 inline-flex items-center">
                  <PlusCircleIcon className="h-6 w-6 mr-2 stroke-2" />
                  créer une donnée
                </button>
              </div>
              {show && <ModalAddDonnee setShowModal={() => setShow(false)} />}
            </header>
            <div className="overflow-x-auto mx-8">
              <table className="min-w-full text-sm divide-y divide-gray-200  ">
                <thead className="bg-greyNakala/30 border-l-2 border-redCahier">
                  <tr>
                    <th className="p-4 font-light text-left text-gray-900 whitespace-nowrap">
                      <div className="flex items-center">
                        Titre
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      </div>
                    </th>
                    <th className="p-4 font-light text-left text-gray-900 whitespace-nowrap text-center">
                      <div className="flex items-center text-center">
                        Rôle
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      </div>
                    </th>

                    <th className="p-4 font-light text-left text-gray-900 whitespace-nowrap">
                      <div className="flex items-center">
                        Modification
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      </div>
                    </th>
                    <th className="p-4 font-light text-left text-gray-900 whitespace-nowrap">
                      <div className="flex items-center">
                        Dâte de Dépôt
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      </div>
                    </th>
                    <th className="p-4 font-light text-left text-gray-900 whitespace-nowrap">
                      <div className="flex items-center">
                        Statut
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      </div>
                    </th>
                    <th>
                      <button className="mr-6  font-light p-2 rounded-sm border border-green-500 shadow-sm  bg-green-100
                       text-base font-light text-green-700 hover:bg-green-700/20  hover:duration-700 focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={changeStatusDonnee}>Publier les données</button>
                      <input id='radioCreator' onChange={handleCheckAll} type="checkbox" className=' disabled:opacity-75' />
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {donneesData?.map((item: Donnees, index) =>
                    <tr key={index} className="border-b border-greyNakala/30">
                      {/** create a ahref only for title's metas*/}
                      <td className=" p-3 font-light text-base text-gray-900  max-w-24 border-b border-greyNakala/30">
                        {item.metas!.map((meta: Metas) => {
                          return meta.propertyUri === "http://nakala.fr/terms#title" &&
                            <Tooltip
                              content="Voir sur Nakala"
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}>
                              <a className="inline-flex items-center hover:underline text-sm "
                                href={base?.includes("test") ? `https://test.nakala.fr/u/datas/${item.identifier}`
                                  : `https://nakala.fr/u/datas/${item.identifier}`}
                                target="_blank" rel="noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-5 mr-3 fill-redCahier " viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 
                                  1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                </svg>
                                {meta.value}
                              </a>
                            </Tooltip>
                        })}
                      </td>
                      <td className="p-4 text-center text-gray-400 font-light border-b border-greyNakala/30">
                        {item.isDepositor ?
                          <p className="rounded bg-blue-100 px-1 mr-1 py-1.5 text-xs font-medium text-blue-700">depositor</p> :
                          item.isAdmin ? <p className="rounded bg-gray-100 px-1 mr-1 py-1.5 text-xs font-medium text-gray-700">admin</p> :
                            item.isEditor ? <p className="rounded bg-amber-100 px-1 mr-1 py-1.5 text-xs font-medium text-orange-700">editor</p> :
                              item.isOwner ? <p className="rounded bg-pink-100 px-1 mr-1 py-1.5 text-xs font-medium text-pink-700">owner</p> :
                                <p className="rounded bg-violet-100 px-1 py-1.5 text-xs font-medium text-violet-700">reader</p>}
                      </td>
                      {item.modDate !== null ?
                        <td className="p-4 text-gray-400 font-light border-b border-greyNakala/30 ">
                          <Moment className="mr-5 text-sm " format="DD-MM-YYYY">
                            {item.modDate!}
                          </Moment>
                        </td> :
                        <td className="p-4 text-gray-400 font-light border-b border-greyNakala/30 ">Not modified</td>}
                      <td className="p-4 text-gray-700 font-light border-b border-greyNakala/30 ">
                        <Moment format="DD-MM-YYYY">
                          {item.creDate}
                        </Moment>
                      </td>
                      <td className="p-4 text-gray-700 border-b border-greyNakala/30  ">
                        {item.status === "published" ?
                          <strong
                            className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium"
                          >
                            {item.status}
                          </strong> : <strong
                            className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium"
                          >
                            {item.status}
                          </strong>}
                      </td>

                      <td className=" w-56 flex justify-center items-center my-2 ">
                        <Link to={`/donnees/${item.identifier}`}>
                          <span className="relative inline-flex items-center cursor-pointer px-6 py-1.5 overflow-hidden hover:bg-orange-600/20  text-orange-600 border border-current rounded-md group active:text-orange-500 focus:outline-none focus:ring" >
                            <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                              <ArrowLongRightIcon className="h-5 w-5" />
                            </span>
                            <span className="text-sm font-medium transition-all group-hover:mr-4">
                              Voir
                            </span>
                          </span>
                        </Link>
                        <button onClick={() => deleteADonnee(item.identifier!)}
                          className=" ml-6  block p-4 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full
                           hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                          type="button"
                        >
                          <TrashIcon className="h-4 w-4 stroke-1" />
                        </button>
                        {/** checkox only if pending's donnee */}
                        {checkedInput.indexOf(item.identifier) !== -1 && item.status === "pending" ?
                          <input id='radioCreator' checked
                            value={item.identifier!} type="checkbox"
                            onChange={handleCheck} className='ml-1 disabled:opacity-75' /> :
                          item.status === "pending" && checkedInput.indexOf(item.identifier) === -1 ?
                            <input id='radioCreator' value={item.identifier!}
                              type="checkbox"
                              onChange={handleCheck}
                              className='ml-1 disabled:opacity-75' /> :
                            <input id='radioCreator' type="checkbox" className='invisible' />}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="text-center p-4">
                <Pagination onlyForCollections={false}
                  data={data}
                  setPage={() => setPage(page - 1)} addPage={() => setPage(page + 1)} />
              </div>
            </div>
          </>}
        {<ToastSuccess showModal={succes} closeModal={() => setSucces(false)} message="Donnée supprimée" position={false} />}
        {<ToastError showModalError={notSucces} closeModalError={() => setNotSucces(false)} queryMessage={postQueryDelete} positionE={false} />}
      </div>
    </>
  )
}