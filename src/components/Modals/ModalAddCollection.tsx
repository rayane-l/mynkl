
import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Collection, Metas } from "../../entities";
import { usePostCollectionMutation } from "../../app/collections-api";
import ToastSuccess from "../Feedbacks/ToastSuccess";
import ToastError from "../Feedbacks/ToastError";


export default function ModalAddCollection() {
  /**
     * gestion feedback
     */
  const [succes, setSuccess] = useState(false);
  const [error, setError] = useState(false)

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  /**
     * cosntruction du model des métadonnées
     */
  const [metas, setMetas] = useState<Metas>({ "propertyUri": "http://nakala.fr/terms#title", "typeUri": "http://www.w3.org/2001/XMLSchema#string" } as Metas)
  const [form, setForm] = useState<Collection>({ "metas": [] } as unknown as Collection)
  /**
     * api post new collection
     */
  const [postCollection, postQuery] = usePostCollectionMutation();

  const metasHandleChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const name = target.name
    const value = target.value
    const change = { ...metas, [name]: value }
    setMetas(change)
  }

  const handleChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const name = target.name
    const value = target.value
    const change = { ...form, [name]: value }
    setForm(change)
  }

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    try {
      form.metas?.push(metas)
      await postCollection(form).unwrap();
      setSuccess(true)
    } catch (error) {
      setError(true)
      console.log(error);
    }
  }

  const mafia = () => {
    window.location.reload()
  }

  return (
    <>

      <button onClick={() => setOpen(true)}
      >
        Créer une Collection
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
                          Ajouter une collection
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <div>
                    <form action="#" method="POST" onSubmit={handleSubmit} className="p-6 mt-4  rounded-lg shadow-md">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="sr-only" htmlFor="select">Status</label>
                          <select id='select' name="status" onChange={handleChange} required
                            className='w-full p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1 "'>
                            <option value=""> Status </option>
                            <option value="public">Public</option>
                            <option value="private">Privé</option>
                          </select>
                        </div>
                        <div>
                          <label className="sr-only" htmlFor="title">Titre</label>
                          <input
                            className=" w-full p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1"
                            placeholder="Titre"
                            type="text"
                            id="title"
                            onChange={metasHandleChange}
                            name="value"
                            required

                          />
                        </div>
                        <div>
                          <label className="sr-only" htmlFor="lang">Lang</label>
                          <input
                            className=" w-full p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1"
                            placeholder="lang (optionnel)"
                            type="text"
                            id="lang"
                            onChange={metasHandleChange}
                            name="lang"
                            maxLength={2}

                          />
                        </div>
                      </div>
                      <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse shadow-md rounded-lg ">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-100 text-base font-medium text-green-700 hover:bg-green-700 hover:text-white hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Valider
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4
                           py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-blue-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => { setOpen(false); mafia(); }}
                          ref={cancelButtonRef}
                        >
                          Fermer
                        </button>
                      </div>
                    </form>
                  </div>
                  {<ToastSuccess showModal={succes} closeModal={() => setSuccess(false)} message="Collection ajoutée" position={true} />}
                  {<ToastError showModalError={error} closeModalError={() => setError(false)} queryMessage={postQuery} positionE={true} />}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root> </>
  )
}


