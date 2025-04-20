import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { RouterParams } from "../../App";
import { useDeleteDonneesMediaMutation } from "../../app/donnees-api";
import { useAppSelector } from "../../app/hooks";
import { Files } from "../../entities"
import ToastError from "../Feedbacks/ToastError";
import ToastSuccess from "../Feedbacks/ToastSuccess";


interface Props {
  file: Files
}


export default function DonneesMedias({ file }: Props) {
  /**
    * gestion feedback
    */
  const [error, setError] = useState(false)
  const [succes, setSucess] = useState(false)
  const { id, id2 } = useParams<RouterParams>();
  const base = useAppSelector(state => state.base.server_url)
  const identifiant = String(id) + "/" + id2 + "/" + file.sha1!;
  /**
     * delete one file
     */
  const [deleteMedia, postQuery] = useDeleteDonneesMediaMutation();

  const deleteAmedia = async () => {
    try {
      await deleteMedia({ id: String(id) + "/" + id2, body: file.sha1! }).unwrap()
      setSucess(true)
    } catch (error) {
      setError(true)
      console.log(error);
    }
  }

  return (
    <>
      <tr className="shadow-sm">
        <td className="px-4 py-2 font-light text-base text-gray-900 text-center">{file.name}</td>
        <td className="px-4 py-2 font-light text-brownNakala/70 text-center   text-base  whitespace-nowrap">{file.mime_type}</td>
        <td className="px-4 py-2 font-light text-brownNakala/70 text-center   text-base  whitespace-nowrap">{file.sha1}</td>
        <td className="px-4 py-2 font-light text-brownNakala/70 text-center   text-base  whitespace-nowrap">{file.embargoed}</td>
        <td className="px-4 py-2 font-light text-gray-900 whitespace-nowrap flex justify-center">
          <div className="flex items-center -space-x-4 hover:space-x-1">
            <a href={base?.includes("test") ? `https://apitest.nakala.fr/embed/${identifiant}` :
              `https://api.nakala.fr/embed/${identifiant}`} rel="noreferrer"
            className=" z-10 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-green-50 
            hover:scale-110 focus:outline-none focus:ring"
            type="button"
            >
              <EyeIcon className="h-5 w-5" />
            </a>
            <button onClick={() => deleteAmedia()}
              className="z-30 block p-4 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
              type="button"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
      {<ToastError showModalError={error} closeModalError={() => setError(false)} queryMessage={postQuery} positionE={false} />}
      {<ToastSuccess showModal={succes} closeModal={() => setSucess(false)} message="Fichier supprimé" position={false} />}
    </>
  )
}