import React from "react";
import conceptsJson from  "../json/concepts.json"
import { ThesoConcept } from "../../entities"
import CopyMailTo from "../LibCopyMailto";


export default function ThesaurusReferentiel() {
  const allConcepts: ThesoConcept[] = conceptsJson

  return (
    <>
      <div className="overflow-x-auto  flex justify-center">
        <table className="text-sm  w-full">
          <thead className="bg-gray-100">
            <tr>
              <th
                className=" px-4 py-2 text-left font-medium text-gray-900"
              >
                Label
              </th>
              <th
                className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
              >
                HandleID
              </th>
            </tr>
          </thead>

          <tbody >
            {allConcepts.map((item) =>
              <tr>
                <td className="shadow-sm  whitespace-nowrap px-4 py-2  text-gray-900">
                  {item.traduction.map((label) => <li className="list-none font-light p-1">{label.value}({label.lang}) </li>)}
                </td>
                <td className="shadow-sm whitespace-nowrap px-4 py-2 font-light text-indigo-600 ">
                  <CopyMailTo copiedTooltip="Identifiant copié !"
                    defaultTooltip="Copier l'identifiant"
                    email={`https://hdl.handle.net/${item.handleId}`}
                    theme="dark" />
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>

    </>
  )
}