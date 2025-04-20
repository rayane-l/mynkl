import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Collection } from "../../entities"
import { usePutStatusCollectionMutation } from "../../app/collections-api"
import { useParams } from "react-router"
import { RouterParams } from "../../App"
import ToastError from "../Feedbacks/ToastError"
import { PencilIcon } from "@heroicons/react/24/outline"
import ToastSuccess from "../Feedbacks/ToastSuccess"


interface Props {
  collection: Collection
}

export default function ModalStatus({ collection }: Props) {
  //gestion Feedback
  const [succes, setSucces] = useState(false)
  const [notSucces, setNotSucces] = useState(false)

  const { id, id2 } = useParams<RouterParams>();
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  const [putStatus, postQuery] = usePutStatusCollectionMutation();

  const changeStatus = async (param: string) => {
    try {
      if (param) {
        await putStatus({ id: String(id) + "/" + id2, body: param }).unwrap()
        setSucces(true)
      }
    } catch (error: any) {
      console.log(error.data.payload);
      setNotSucces(true)
    }
  }

  return (
    <>

      <button onClick={() => setOpen(true)}
        className=" z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full 
        active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
        type="button"
      >
        <PencilIcon className="h-4 w-4" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl
                 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-6 pt-8 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-base leading-6 font-light text-gray-900 tracking-wider">
                          Changer la Collection de status en  {collection.status === "private" ? <strong
                            className="bg-green-100 text-green-700 px-4 py-2 rounded text-xs font-medium"
                          > Public</strong> : <strong
                            className="bg-red-100 text-red-700 px-4 py-2 rounded text-xs font-medium"
                          >Private</strong>}
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <div className="bg-greyNakala/10 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    {collection.status === "private" ? (<button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-100 text-base
                       font-medium text-green-700 hover:bg-green-700 hover:text-white hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => changeStatus("public")}
                    >
                      Valider
                    </button>) : (<button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-100 text-base 
                      font-medium text-green-700 hover:bg-green-700 hover:text-white hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                       focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => changeStatus("private")}
                    >
                      Valider
                    </button>)}
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base
                       font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:mt-0 sm:ml-3 
                       sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Fermer
                    </button>
                  </div>
                  {/**gestion Feedback */}
                  <ToastError closeModalError={() => setNotSucces(false)} showModalError={notSucces} queryMessage={postQuery} positionE={true} />
                  <ToastSuccess closeModal={() => setSucces(false)} message="Status modifié" position={true} showModal={succes} />
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}