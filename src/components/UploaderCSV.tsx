import React, { useCallback } from "react";
import Papa from "papaparse"
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";


interface Iprops {
  currentState: (item: any) => void
  classStyle: boolean
  text: string
  csvPost: boolean
}

/**
 * permet de lire tous types de CSV et d'envoyer les données directement dans le state voulu
 * @param param0 
 * @returns 
 */
export default function UploaderCSV({ currentState, classStyle, text, csvPost }: Iprops) {
  const verifColumnHeader = (arrayHeader: string[]) => {
    const correctHeaders = ["Linked in collection", "Status collection", "Status donnee",
      "collectionsIds", "Linked in item", "http://nakala.fr/terms#title", "http://nakala.fr/terms#creator", "http://nakala.fr/terms#created",
      "http://nakala.fr/terms#type",
      "http://nakala.fr/terms#license", "Embargoed"]

    const removedElements = []
    for (const header of correctHeaders) {
      if (!arrayHeader.includes(header)) {
        removedElements.push(header)
      }
    }
    removedElements.length >= 1 && alert(`Les colonnes suivantes sont manquantes ou incorrectes ${removedElements}`)
  }
  const parseFile = function (file: any) {
    Papa.parse(file, {
      header: true,
      delimiter: "",
      transformHeader: (h) => {
        return h.replace(/"/g, ""); // ! the global flag (g) to replace all occurrences of the "
      },
      skipEmptyLines: true,
      complete: results => {
        csvPost === true && verifColumnHeader(results.meta.fields!)
        currentState(results.data)
      }
    });
  };
  /* eslint-disable */
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
      alert("CSV importé")
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop,

  });

  return (
    <>
      <form className="rounded-md p-4 flex justify-start mb-2">
        <div
          {...getRootProps({
            className: `dropzone 
                        ${isDragAccept && "dropzoneAccept"} 
                        ${isDragReject && "dropzoneReject"}`,
          })}
        >
          <input  {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className={classStyle ?
              "cursor-pointer p-8 border-2 border-dashed border-orange-200 rounded-lg" :
              "cursor-pointer p-8 border-2 border-dashed border-green-100 rounded-lg"}>
              <p className={classStyle ?
                "m-2 border border-orange-500 justify-center rounded-md  shadow-md px-4 py-2 bg-orange-100 text-base font-light text-orange-700 hover:bg-orange-700/20  hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                :
                "m-2 border border-green-500 justify-center rounded-md  shadow-md px-4 py-2 bg-green-100 text-base font-light text-green-700 hover:bg-green-700/20  hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"}> {text} </p>
              {acceptedFiles && acceptedFiles.map((item) => <p className="font-light inline-flex items-center mr-3">
                <ArrowUpTrayIcon className="h-6 w-6 mr-2 text-blue-600 stroke-1" /> {item.name} </p>)}
            </div>
          )}
        </div>
      </form>
    </>
  )
}