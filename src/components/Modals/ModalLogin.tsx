import React, { useState } from "react";
import { setApiKey } from "../../app/auth-slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLazyGetLoginUserQuery } from "../../app/user-api";
import ToastSuccess from "../Feedbacks/ToastSuccess";
import { Input } from "@material-tailwind/react";
import { KeyIcon, PowerIcon } from "@heroicons/react/24/outline";
import { Radio } from "@material-tailwind/react";
import { setBase } from "../../app/base-url-slice";


export default function ModalLogin() {
  const [showModal, setShowModal] = React.useState(false);
  /**
    * gestion feedback
    */
  const [succes, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  const [APIKEY, setAPIKEY] = useState("");
  const [login, { isError }] = useLazyGetLoginUserQuery(); // permet de choisir le déclenchement du get (lazy)
  const HandleSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    try {
      await dispatch(setApiKey(APIKEY.trim()))
      login().unwrap()
      // déclenche la requête pour envoyer la clé d'API
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value
    setAPIKEY(value)
  }

  return (
    <>
      <div style={{
        filter: `url(${urlColor})`,
      }}
      className="relative inline-block grid justify-items-end cursor-pointer " onClick={() => setShowModal(true)}>
        <button className="p-2  text-base inline-flex items-center border border-redCahier rounded 
        text-redCahier hover:bg-gray-300 hover:duration-700">Se connecter <PowerIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
      {showModal &&
        <div
          id="authentication-modal" aria-hidden="true" className="justify-center items-center flex overflow-x-hidden overflow-y-auto
         fixed inset-0 z-50 outline-none focus:outline-none">
          <div
            style={{
              filter: `url(${urlColor})`
            }} className="relative w-full max-w-md px-4 h-full md:h-auto drop-shadow-lg">
            <div className="bg-white/90 rounded-lg shadow relative dark:bg-gray-700">
              <div className="flex justify-end p-2">
                <button onClick={() => setShowModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200
                 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800
                  dark:hover:text-white" data-modal-toggle="authentication-modal">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd">
                    </path>
                  </svg>
                </button>
              </div>
              <form action="#" onSubmit={HandleSubmit} className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"  >
                <h3 className="text-xl font-light text-gray-900 dark:text-white inline-flex items-center">
                  <KeyIcon className="h-6 w-6 text-redCahier mr-2 stroke-1" />
                  AUTHENTIFICATION
                </h3> <br />
                <div className="flex rounded-sm justify-start bg-greyNakala/20 p-2">
                  <Radio onClick={() => dispatch(setBase("https://apitest.nakala.fr"))} id="test" label="Nakala TEST" name="color" color="red" ripple={true} />
                  <Radio onClick={() => dispatch(setBase("https://api.nakala.fr"))} id="nakala" label="Nakala" name="color" color="red" ripple={true} />
                </div>
                <div>
                  {APIKEY.length === 36 ? <Input spellCheck="false" required onChange={handleChange} variant="standard" label="Entrez votre clé API_KEY" success maxLength={36} /> :
                    APIKEY.length === 0 ? <Input spellCheck="false" required onChange={handleChange} variant="standard" label="Entrez votre clé API_KEY" /> :
                      <Input spellCheck="false" required onChange={handleChange} variant="standard" label="Entrez votre clé API_KEY" error />}
                </div>
                <button type="submit"
                  className="w-full text-brownNakala text-md  font-sm  bg-redCahier/20  hover:duration-500  
                 rounded-sm hover:bg-redCahier/30  px-5 py-2 text-center ">Se connecter</button>

                {isError && <div
                  className="flex items-center justify-between gap-4 p-4 text-red-700 border rounded border-red-900/10 bg-red-50"
                  role="alert"
                >
                  <div className="flex items-center gap-4 ">
                    <span className="p-2 text-white bg-red-600 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                        />
                      </svg>
                    </span>
                    <p>
                      <strong className="text-sm font-medium">Mince !</strong>
                      <span className="block text-xs opacity-90">
                        Une erreur est survenue lors de votre connexion
                      </span>
                      <span className="block text-xs opacity-90">
                        Votre clé semble incorrecte
                      </span>
                    </p>
                  </div>
                </div>}
              </form>
            </div>
            <ToastSuccess showModal={succes} closeModal={() => setSuccess(false)} message="Connexion réussie" position={true} />
          </div>
        </div>}
    </>
  )
}