import React, { useState } from "react";
import { Donnees } from "../../entities";
import OneDonnee from "./OneDonnee"
import { useDatasFromUserMutation } from "../../app/suggestions-api";
import { useAppSelector } from "../../app/hooks";
import Skeletons from "../Loaders/Skeletons"
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

interface Iprops {
  donnee: Donnees
}


export default function SearchBar({ donnee }: Iprops) {
  const api_key = useAppSelector(state => state.auth.api_key)
  const choice_base = useAppSelector(state => state.base.server_url)

  const [sendDatas, postQuery] = useDatasFromUserMutation()
  const [recommanded, setRecommanded] = useState<Donnees[]>([])
  const [load, setLoad] = useState(false)


  const postDatas = async () => {
    setLoad(true)
    try {

      let result = await sendDatas({ baseurl: choice_base!, api_key: api_key!, donnee: donnee }).unwrap()
      let filtered = []
      for (const results of result) {
        !results.message && filtered.push(results)
      }
      console.log(result)
      setRecommanded(filtered)
      setLoad(false)

    } catch (error) {
      console.log(error);
      setLoad(false)
    }

  }

  return (
    <>
      <div className="h-full">
        <article className="flex justify-center">
          <button
            className="inline-flex items-center font-light font-fontSpec mb-2 border p-3 rounded-md shadow-sm hover:shadow-none hover:bg-gray-50/70"
            onClick={postDatas}>Lancer la recommandation
            <ClipboardDocumentCheckIcon className="h-5 w-6 ml-2 text-redCahier" />
          </button>
        </article>
        {load && <Skeletons />}
        {postQuery.isError &&
          <article className="flex  justify-center ">
            <img
              className=" w-48  m-1  "
              src={process.env.PUBLIC_URL + "/Logos/undraw_empty.svg"}
              alt="logo-empty-datas"
            />
            <h3 className="self-center font-light tracking-widest text-gray-500 ">{(postQuery.error as any).data.error}</h3>
          </article>}
      </div>
      <div className="grid grid-cols-3 gap-3 mx-5">
        {recommanded.length > 0 && recommanded.map((donnee: Donnees, index: number) =>
          <OneDonnee key={index} donnee={donnee} />
        )}
      </div>
    </>
  )
}