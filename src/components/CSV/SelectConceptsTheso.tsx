import React from "react";
import { deleteItemsOfList } from "../../app/hooks";
import { Concepts } from "../../entities";
import conceptsJson from "../json/concepts.json"


interface Traduction {
  lang?: string,
  value: string
}


interface Props {
  concept: any;
  setConcept: (e: any) => void

}

export default function SelectConceptsTheso({ concept, setConcept }: Props) {
  const allConcepts: Concepts[] = [];

  for (const concepts of conceptsJson) {
    const oneConcept = { "handle": concepts.handleId, "label": concepts.traduction.map((item: Traduction) => item.value) }
    allConcepts.push(oneConcept)
  }
  const ConceptsChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value
    const change = [...concept, value]
    setConcept(change)
  }
  

  return (
    <>
      <div>
        <select className="mt-2 rounded-md border w-2/3 border-brownNakala/10 text-gray-600 font-light" onChange={(e) => ConceptsChange(e)} >
          <option >Ajoutez un concept</option>
          {allConcepts.map((item: Concepts) => <option className="text-gray-500" value={item.handle + " " +  item.label}>{item.label} </option>)}
        </select>
        <div className="grid grid-cols-2 gap-2 mt-2 mb-4">
          {concept.length ? concept.map((item: string) =>
            <strong
              onClick={() => deleteItemsOfList(item, concept, setConcept)}
              className="hover:cursor-pointer border border-orange-700/30 p-2  bg-orange-50 text-[10px] uppercase
                     text-orange-700/80"
            >
              <p>{item.substring(26)} </p>
            </strong>) : <span></span>}
        </div>
      </div>
    </>
  )
}