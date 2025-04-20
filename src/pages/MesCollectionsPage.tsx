import { useState } from "react";
import { useGetAllCollectionsQuery } from "../app/user-api"
import { Collection, Metas } from "../entities"
import Moment from "react-moment";
import { Link } from "react-router-dom";
import ModalAddCollection from "../components/Modals/ModalAddCollection";
import { useDeleteCollectionMutation } from "../app/collections-api";
import Loader from "../components/Loaders/Loader"
import ToastSuccess from "../components/Feedbacks/ToastSuccess";
import ToastError from "../components/Feedbacks/ToastError";
import { ArrowLongRightIcon, ChevronDownIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";
import { useAppSelector } from "../app/hooks";
import Pagination from "../components/Pagination";


export default function MesCollectionsPage() {
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  /**
     * gestion feedback
     */
  const [succes, setSucces] = useState(false)
  const [page, setPage] = useState(1);
  const [notSucces, setNotSucces] = useState(false)
  /**
     * api
     */
  const { data } = useGetAllCollectionsQuery({ page: page })
  const [deleteCollection, postQueryDelete] = useDeleteCollectionMutation();

  const collectionsData: Collection[] | undefined = data?.data

  const deleteAcollection = async (param: string) => {
    if (param) {
      if (window.confirm("Etes vous sure de vouloir supprimer cette collection ?")) {
        try {
          await deleteCollection(param).unwrap()
          setSucces(true)
        } catch (error) {
          setNotSucces(true)
          console.log(error);
        }
      }
    }
  }


  return (
    <div
      style={{
        filter: `url(${urlColor})`
      }}
      className="h-full">
      {collectionsData === undefined ? <Loader />
        : <div>
          <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm mb-10 ">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between content-center ">
              <div className="mt-8 font-fontSpec">
                <h1 className="text-2xl inline-flex items-center font-medium text-gray-800 sm:text-3xl">
                  Vos Collections
                </h1>
              </div>
              <button className="p-3 place-self-end text-sm  text-center
            bg-redCahier/80 shadow-md rounded text-white  hover:bg-redCahier/90 
            hover:duration-700 inline-flex items-center">
                <PlusCircleIcon className="h-6 w-6 mr-2 stroke-2" />
                <ModalAddCollection />  </button>
            </div>
          </header>

          <div className="overflow-x-auto mx-8">
            <table className="min-w-full text-sm divide-y divide-gray-200 ">
              <thead className="bg-greyNakala/30 border-l-2 border-redCahier">
                <tr>
                  <th className="p-4 font-light text-left text-gray-900 whitespace-nowrap">
                    <div className="flex items-center ">
                      Titre
                      <ChevronDownIcon className="h-4 w-4 ml-2" />
                    </div>
                  </th>
                  <th className="p-4 font-light text-left text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      Rôle
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
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {collectionsData?.map((item: Collection, index) =>
                  <tr key={index}>
                    {/** create a ahref only for title's metas*/}
                    <td className="p-3 font-light text-base text-gray-900  ">
                      {item.metas!.map((meta: Metas) => {
                        return meta.propertyUri === "http://nakala.fr/terms#title" &&
                          <Tooltip
                            content="Voir sur Nakala"
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}>
                            <a className="inline-flex items-center hover:underline text-sm " href={item.uri} target="_blank" rel="noreferrer">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-5 mr-3 fill-redCahier " viewBox="0 0 20 20" >
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 
                                0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                              </svg> {meta.value}
                            </a>
                          </Tooltip>
                      })}
                    </td>
                    <td className="p-4 text-center text-gray-400 font-light border-b border-greyNakala/30">
                      {item.isDepositor ?
                        <p className="rounded bg-blue-100 px-1 mr-1 py-1.5 text-xs font-medium text-blue-700">depositor</p> :
                        item.isAdmin ? <p className="rounded bg-gray-100 px-1 mr-1 py-1.5 text-xs font-medium text-gray-700">admin</p> :
                          item.isEditor ? <p className="rounded bg-amber-100 px-1 mr-1 py-1.5 text-xs font-medium text-amber-700">editor</p> :
                            item.isOwner ? <p className="rounded bg-pink-100 px-1 mr-1 py-1.5 text-xs font-medium text-pink-700">owner</p> :
                              <p className="rounded bg-violet-100 px-1 py-1.5 text-xs font-medium text-violet-700">reader</p>}
                    </td>
                    <td className="p-4 text-gray-500 font-light ">
                      <Moment format="DD-MM-YYYY">
                        {item.creDate}
                      </Moment> </td>
                    <td className="p-4 text-gray-700 whitespace-nowrap ">
                      {item.status === "public" ? <strong
                        className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium"
                      >
                        {item.status}
                      </strong> : <strong
                        className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium"
                      >
                        {item.status}
                      </strong>}
                    </td>
                    <td className=" w-56 flex justify-center items-center my-2">
                      <Link to={`/collections/${item.identifier}`}>
                        <span className="relative inline-flex items-center cursor-pointer px-6 py-1.5  overflow-hidden hover:bg-orange-600/20 
                         text-orange-600 border border-current rounded-md group active:text-orange-500 focus:outline-none focus:ring" >
                          <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                            <ArrowLongRightIcon className="h-5 w-5" />
                          </span>
                          <span className="text-sm font-medium transition-all group-hover:mr-4">
                            Voir
                          </span>
                        </span>
                      </Link>
                      <button onClick={() => deleteAcollection(item.identifier!)}
                        className=" ml-6  block p-4 text-red-700 transition-all bg-red-100 border-2 border-white
                         rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                        type="button"
                      >
                        <TrashIcon className="h-4 w-4 stroke-1" />
                      </button>
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
        </div>}

      {<ToastSuccess showModal={succes} closeModal={() => setSucces(false)} message="Collection supprimée" position={false} />}
      {<ToastError showModalError={notSucces} closeModalError={() => setNotSucces(false)} queryMessage={postQueryDelete} positionE={false} />}

    </div>
  )
}