import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import { usePostMediaMutation, usePostMediaUploadMutation } from "../../app/donnees-api";
import { Donnees, Files } from "../../entities";
import ToastError from "../Feedbacks/ToastError";
import ToastSuccess from "../Feedbacks/ToastSuccess";
import UploaderFiles from "../UploaderFiles";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";
import LoaderDNA from "../Loaders/LoaderDNA";


interface Props {
  donnee: Donnees
}


export default function ModalAddMedia({ donnee }: Props) {
  /**
   * gestion feedback
   */
  const [succes, setSuccess] = useState(false);
  const [error, setError] = useState(false)
  const [load, setLoad] = useState(false)

  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  /**
    * fetch files on click
    */
  const [files, setFiles] = React.useState<Files[]>([]);
  /**
     * upload and post the file
     */
  const [postMediaUpload] = usePostMediaUploadMutation();
  const [postMedia, postQuery] = usePostMediaMutation();


  const fileChange = (event: React.FormEvent<EventTarget>) => {
    const file = (event.target as HTMLInputElement).files;
    const arrayFile: File[] = []
    for (const data of file!) {
      arrayFile.push(data)
    }
    setFiles(arrayFile)
  }

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    setLoad(true)
    try {
      for (const file of files) {
        const formdata: FormData = new FormData()
        formdata.append("file", file! && file! as Blob)
        const result = await postMediaUpload(formdata).unwrap()
        await postMedia({ id: donnee.identifier!, body: result })
      }
      setSuccess(true)
    } catch (error) {
      console.log(error);
      setError(true)
    } finally {
      setLoad(false)
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className=" z-10 block p-4 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full
         active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
        type="button"
      >
        <PlusIcon className="h-4 w-4" />
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
                <div className=" w-full relative inline-block align-bottom bg-white rounded-lg text-left 
                overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-6 pt-8 pb-4 sm:p-6 sm:pb-4 shadow-md rounded-lg">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-base leading-6 font-light text-gray-900 tracking-wider">
                          Ajouter un fichier
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <div>
                    <form action="#" method="POST" onSubmit={handleSubmit} className="p-6 mt-4  rounded-lg shadow-md">
                      <div>
                        <div className=" mt-1 flex justify-center  px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <UploaderFiles isCsvArray={false} csvArray={undefined} handle={fileChange} filesArray={files} />
                          </div>
                        </div>
                      </div>
                      {load && <LoaderDNA />}
                      <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse shadow-md rounded-lg ">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4
                           py-2 bg-green-100 text-base font-medium text-green-700 hover:bg-green-700 hover:text-white hover:duration-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Valider
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white
                           text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300
                            sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Fermer
                        </button>
                      </div>
                    </form>
                  </div>
                  {<ToastSuccess showModal={succes} closeModal={() => setSuccess(false)} message="Fichier.s ajouté.s" position={true} />}
                  {<ToastError showModalError={error} closeModalError={() => setError(false)} queryMessage={postQuery} positionE={true} />}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog >
      </Transition.Root >
    </>
  )
}