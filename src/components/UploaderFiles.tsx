import React from "react";

import CountUp from "react-countup";
import { Files } from "../entities";

interface Props {
  handle: (e: React.ChangeEvent<HTMLInputElement>) => void
  filesArray: Files[] | File[],
  csvArray?: [],
  isCsvArray: boolean
}


export default function UploaderFiles({ handle, filesArray, csvArray, isCsvArray }: Props) {
  return (
    <>
      <div className="flex text-sm text-gray-600 text-center">
        <label
          htmlFor="file"
          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 
          p-1 hover:text-indigo-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-indigo-500"
        >
          <div className="p-3">
            <CountUp className="text-green-500 font-light text-base" end={Number(filesArray.length)} />
            <span className="text-base font-light text-green-500"> fichier.s téléchargé.s</span>
            {isCsvArray && <p className="font-light">{csvArray!.length} ligne.s de CSV lue.s </p>}
            <br />
            <br />
            <span className=" bg-indigo-500/10 p-3 rounded-sm">Sélectionnez vos fichiers</span>
            <input onChange={handle} id="file" name="file" type="file" className="sr-only" multiple />
          </div>
        </label>
      </div>
    </>
  )
}