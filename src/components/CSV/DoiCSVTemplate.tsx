import React from "react";
import { CSVLink } from "react-csv";


export default function DoiCSVTemplate() {
  /**
   * permet de récupérer les DOI après un dépot (identifiants des données)
   */
  const headers = [
    { label: "DOI", key: "DOI" },

  ];

  const data: any = []
  return (
    <>
      <CSVLink className="mt-6 inline-flex items-center font-light p-3 rounded-md border border-blue-700 shadow-sm
        bg-blue-100 text-base font-light text-blue-700 hover:bg-blue-700/20  hover:duration-700 focus:outline-none focus:ring-2
         focus:ring-offset-2 focus:ring-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
      data={data} headers={headers} separator={";"} filename={"DOITemplate"}>
        DOI Template<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </CSVLink>
    </>
  )
}