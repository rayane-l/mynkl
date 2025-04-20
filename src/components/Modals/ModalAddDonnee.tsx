
import React, { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Donnees, Files, License, Metas, MetasAuthor } from "../../entities";
import { usePostDonneeMutation, usePostMediaUploadMutation } from "../../app/donnees-api";
import { useGetVocabLicensesQuery, useGetVocabTypeQuery } from "../../app/vocabularies-api";
import ToastSuccess from "../Feedbacks/ToastSuccess";
import ToastError from "../Feedbacks/ToastError";
import UploaderFiles from "../UploaderFiles";
import Loader from "../Loaders/Loader";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";

interface Props {

  setShowModal: () => void
}
export default function ModalAddDonnee({ setShowModal }: Props) {
  /**
   * gestion feedback
   */
  const [succes, setSuccess] = useState(false);
  const [error, setError] = useState(false)
  const cancelButtonRef = useRef(null)
  /**
     * fetch files on click
     */
  const [filou, setFilou] = React.useState<Files[]>([]);
  /**
  * create relations between donnee and collection
  */
  const [collectionIDS, setCollectionIDS] = useState<string[]>([])
  const [newCollect, setNewCollect] = useState([0])


  /**
     * anonyme button
     */
  const [checked, setChecked] = useState(false)
  const handleClick = () => setChecked(!checked)


  /**
     * fetch all licenses and types
     */
  const { data } = useGetVocabLicensesQuery();
  const { currentData } = useGetVocabTypeQuery()
  const [postDonnee, postQuery] = usePostDonneeMutation();

  /**
     * upload files
     */
  const [postMediaUpload, postQueryUpload] = usePostMediaUploadMutation();

  /**
     * TODO: refactoriser avec une boucle l'attribution des metas pour l'ajout de donnée
     */
  const [title, setTitle] = useState<Metas>({ "typeUri": "http://www.w3.org/2001/XMLSchema#string", "propertyUri": "http://nakala.fr/terms#title" } as Metas)
  const [creator, setCreator] = useState<Metas>({ "typeUri": null, "propertyUri": "http://nakala.fr/terms#creator", } as unknown as Metas)
  const [created, setCreated] = useState<Metas>({ "typeUri": null, "propertyUri": "http://nakala.fr/terms#created" } as unknown as Metas)
  const [type, setType] = useState<Metas>({ "typeUri": "http://www.w3.org/2001/XMLSchema#anyURI", "propertyUri": "http://nakala.fr/terms#type" } as Metas)
  const [license, setLicense] = useState<Metas>({ "typeUri": "http://www.w3.org/2001/XMLSchema#string", "propertyUri": "http://nakala.fr/terms#license" } as Metas)
  const [creatorValue, setCreatorValue] = useState<MetasAuthor>({ "authorId": "", "orcid": null, "fullname": "", "surname": "" } as unknown as MetasAuthor)
  const [form, setForm] = useState<Donnees>({ "metas": [], "files": [], "collectionsIds": [] } as unknown as Donnees)


  /**
     * refresh form 
     */
  const reInitialize = () => {
    setForm({ "metas": [], "files": [], "collectionsIds": [] })
    setNewCollect([0])
  }

  /**
     * fetch metas on click
     * @param event meta
     * @param param metaState
     * @param setParam metaSetState
     */
  const metasHandleChange = (event: React.FormEvent<EventTarget>, param: any, setParam: any) => {
    const target = event.target as HTMLInputElement;
    const name = target.name
    const value = target.value
    const change = { ...param, [name]: value }

    setParam(change)
  }

  /**
     * fetch metasAuthor's value and push in creator metas
     * @param event value metasAUthor
     */
  const creatorHandleChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const name = target.name
    const value = target.value
    const change = { ...creatorValue, [name]: value }
    setCreatorValue(change)
    creator!.value = creatorValue
  }

  const fileChange = (event: React.FormEvent<EventTarget>) => {
    const file = (event.target as HTMLInputElement).files;
    const arrayFile: File[] = []
    for (const data of file!) {
      arrayFile.push(data)
    }
    setFilou(arrayFile)
  }


  const collectionIdsChange = (event: React.FormEvent<EventTarget>) => {
    const target = (event.target as HTMLInputElement)
    const value = target.value

    if (value.length === 21) {
      setCollectionIDS([...collectionIDS, value])
    }
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
    if (created.value) {
      created.typeUri = "http://www.w3.org/2001/XMLSchema#string"
    }
    if (creator.value) {
      creator.typeUri = "http://www.w3.org/2001/XMLSchema#string"
      creator!.value = creatorValue
    }

    try {
      //ajout des metas au form
      form.metas?.push(title, created, creator, type, license)
      /**
             * transform file into Formdata and post upload each file
             */
      for (const datas of filou!) {
        const formdata: FormData = new FormData()
        formdata.append("file", datas && datas as Blob)
        const result = await postMediaUpload(formdata).unwrap()
        form.files!.push(result)
      }
      //ajout des collections au form
      form.collectionsIds = collectionIDS
      await postDonnee(form).unwrap()
      setSuccess(true)
    } catch (error) {
      event.preventDefault()
      setError(true)
      console.log(error);
    }
  }

  return (
    <>
      {/* <button onClick={() => setOpen(true)}
      >
        Créer une donnée
      </button> */}showModal
      <Transition.Root show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowModal}>
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

          <div className="fixed z-10 inset-0 overflow-y-auto ">
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
                <div className=" w-full relative inline-block align-bottom w-68 bg-white
                 rounded-lg text-left overflow-hidden shadow-xl transform transition-all
                  sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                  <div className="bg-white px-6 pt-8 pb-4 sm:p-6 sm:pb-4 shadow-md rounded-lg">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-base leading-6 font-light text-gray-900 tracking-wider">
                          Ajouter une donnée
                        </Dialog.Title>
                      </div>
                    </div>
                  </div>
                  <div>
                    <form action="#" method="POST" onSubmit={handleSubmit} className="p-8 mt-3  rounded-lg shadow-md">
                      <h2 >Les métadonnées obligatoires</h2> <br />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/*META STATUS*/}
                        <div>
                          <label className="sr-only" htmlFor="select">Status</label>
                          <select id='select' name="status" onChange={handleChange}
                            className='w-full bg-greyNakala/20 p-3 text-sm border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-1 "'>
                            <option value=""> Status </option>
                            <option className='bg-green-100' value="published">Public</option>
                            <option className='bg-red-100' value="pending">Privé</option>
                          </select>
                        </div>

                        {/*META TYPE*/}
                        <div>
                          <label className="sr-only" htmlFor="select">Status</label>
                          <select id='select' name="value" onChange={(e) => metasHandleChange(e, type, setType)}
                            className='w-full bg-greyNakala/20 p-3 text-sm border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-1 "'>
                            <option value=""> Type </option>
                            {currentData?.map((item: string, index) => <option key={index} value={item}> {item} </option>)}
                          </select>
                        </div>

                        {/*META LICENSE*/}
                        <div>
                          <label className="sr-only" htmlFor="select">Status</label>
                          <select id='select' name="value" onChange={(e) => metasHandleChange(e, license, setLicense)}
                            className='w-full bg-greyNakala/20 p-3 text-sm border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-1 "'>
                            <option value=""> License </option>
                            {data?.map((item: License, index) => <option key={index} value={item.code}> {item.name} </option>)}
                          </select>
                        </div> <br />


                        {/*META TITLE*/}
                        <div>
                          <label className="sr-only" htmlFor="title">Titre</label>
                          <input
                            className=" w-full p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1 "
                            placeholder="Titre"
                            type="text"
                            id="title"
                            onChange={(e) => metasHandleChange(e, title, setTitle)}
                            name="value"
                          />
                        </div>
                        <div>
                          <label className="sr-only" htmlFor="lang">Lang</label>
                          <input
                            className="p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1"
                            placeholder="lang (optionnel)"
                            type="text"
                            id="lang"
                            onChange={(e) => metasHandleChange(e, title, setTitle)}
                            name="lang"
                            maxLength={2}
                          />
                        </div>


                        {/*META CREATED*/}
                        <div className='flex items-center'>
                          <label className="sr-only" htmlFor="created">Created</label>
                          <input
                            className=" w-full p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1"
                            placeholder="Created YYYY-MM-DD (optionnel)"
                            type="text"
                            id="created"
                            name="value"
                            onChange={(e) => metasHandleChange(e, created, setCreated)}
                          />

                        </div>


                        {/*META CREATOR*/}
                        <div className='flex items-center'>
                          <label className="sr-only" htmlFor="creator">Creator</label>
                          <input disabled
                            className="  p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1"
                            placeholder="Createur de la donnée"
                            type="text"
                            id="creator"
                            name="value"
                            onChange={(e) => metasHandleChange(e, creator, setCreator)}

                          />
                          <input id='radioCreator' onChange={handleClick} checked={checked} type="checkbox" className='mx-4 disabled:opacity-75 ' />
                          <label className='font-light text-greyNakala' htmlFor='radioCreator'>Anonyme</label>
                        </div>

                        {!checked && <div className='flex items-center justify-center p-2 py-3 rounded-md border-dashed border-2 border-orange-300 w-full bg-greyNakala/20 col-span-2'>
                          <label className="sr-only" htmlFor="givenname">Creator</label>
                          <input
                            className=" mr-3  p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1"
                            placeholder="Nom,prénom du créateur"
                            type="text"
                            id="givenname"
                            name="givenname"
                            onChange={(e) => creatorHandleChange(e)}

                          />
                        </div>}
                      </div>
                      <h2 className='mt-3'>Les fichiers liés</h2> <br />
                      <div className=" mt-1 flex justify-center  px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 stroke-1" />
                          <UploaderFiles handle={fileChange} isCsvArray={false} csvArray={undefined} filesArray={filou} />
                        </div>
                      </div>
                      {postQueryUpload.isLoading && <Loader />}
                      <h2 className='mt-3'>Les collections liées</h2> <br />
                      <div className='flex justify-center'>
                        <label className="sr-only" htmlFor="collection">lang</label>
                        <input
                          className=" mr-2 p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1"
                          placeholder="10.34847/nkl.1bcdof1e (option)"
                          type="text"
                          id="collection"
                          name='value'
                          maxLength={21}
                          minLength={21}
                          onChange={collectionIdsChange}
                        />
                        <button onClick={() => setNewCollect([...newCollect, 1])}
                          className=" block p-4 text-orange-700 transition-all bg-orange-100 border-2
                           border-white rounded-full active:bg-orange-50 hover:scale-110 focus:outline-none focus:ring"
                          type="button"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      {newCollect.length > 0 && newCollect.map(() => <div className='flex justify-center'>
                        <label className="sr-only" htmlFor="collection">lang</label>
                        <input
                          className=" mt-2 mr-2 p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1"
                          placeholder="10.34847/nkl.1bcdof1e (option)"
                          type="text"
                          id="collection"
                          name='value'
                          maxLength={21}
                          minLength={21}
                          onChange={collectionIdsChange}
                        />

                        <button
                          className="invisible block p-4 text-orange-700 transition-all bg-orange-100 border-2 border-white rounded-full
                           active:bg-orange-50 hover:scale-110 focus:outline-none focus:ring"
                          type="button"
                        >
                        </button>
                      </div>)}

                      <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse shadow-md rounded-lg ">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border 
                          border-transparent shadow-sm px-4 py-2 bg-green-100 text-base font-medium text-green-700
                           hover:bg-green-700 hover:text-white hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Valider
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => { reInitialize(); setShowModal(); }}
                          ref={cancelButtonRef}
                        >
                          Fermer
                        </button>
                      </div>
                    </form>
                  </div>
                  {<ToastSuccess showModal={succes} closeModal={() => setSuccess(false)} message="Donnée ajoutée" position={true} />}
                  {<ToastError showModalError={error} closeModalError={() => setError(false)} queryMessage={postQuery} positionE={true} />}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root> </>
  )
}


