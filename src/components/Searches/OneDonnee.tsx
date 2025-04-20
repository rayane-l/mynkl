import React from "react";
import Moment from "react-moment";
import { Donnees, Metas } from "../../entities";
interface Props {
  donnee?: Donnees
}


export default function OneDonnee({ donnee }: Props) {

  let allTitles: any[] = []
  let allDescriptions: any[] = []
  let allSubjects: any[] = []

  const fetchFirstMeta = (donnee: Donnees, arr: any[], meta: string) => {
    donnee?.metas?.map((item: Metas) => (
      (item.propertyUri === meta &&
        arr.push(item.value))
    ))
  }

  fetchFirstMeta(donnee!, allTitles, "http://nakala.fr/terms#title")
  fetchFirstMeta(donnee!, allDescriptions, "http://purl.org/dc/terms/description")
  fetchFirstMeta(donnee!, allSubjects, "http://purl.org/dc/terms/subject")



  return (
    <>
      <div data-mdb-ripple="true" data-mdb-ripple-color="primary"
        className="cursor-pointer max-w-2xl border border-white/40 px-8 py-4 bg-white/50 rounded-md shadow-md ">
        {/* <span className="text-blue-500 uppercase">category</span> */}
        <div className="flex flex-wrap lg:w-full space-x-1  ">
          {allSubjects.map((item: string) =>
            <p className="shadow-sm px-2 py-1 mt-1 text-xs text-left text-blue-800  bg-blue-200 rounded-md dark:bg-blue-300 dark:text-blue-900"
            > {item}</p>
          )}
        </div>

        <h1 className="mt-4  p-1 font-fontSpec text-large font-semibold text-gray-600 dark:text-white">
          {allTitles[0]}
        </h1>

        {/* <p className="mt-2 truncate text-gray-500 dark:text-gray-400">
          {allDescriptions[0]}
        </p> */}

        <div className="flex items-end justify-between mt-4">
          <div>
            <p
              className="text-base font-fontSpec font-light text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500">
              {donnee?.rights?.map((item) => <p>{item.role === "ROLE_DEPOSITOR" && <span>{item.name}</span>}</p>)}
            </p>

            <p className="text-sm text-gray-400 dark:text-gray-400">
              <Moment format="MMM Do YY">
                {donnee!.creDate}
              </Moment></p>
          </div>

          <a href={`/donnees/${donnee!.identifier}`} rel="noreferrer" target="_blank" className="inline-block text-blue-500  hover:text-blue-400 hover:underline">Consulter</a>
        </div>
      </div>
    </>
  )
}