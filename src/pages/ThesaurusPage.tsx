import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router";
import ThesaurusReferentiel from "../components/Donnees/ThesaurusReferentiel"

export default function ThesaurusPage() {
  const navigate = useNavigate()
  return (
    <div className="h-full ">
      <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm mb-3 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between content-center ">
          <div className="mt-8 font-fontSpec">
            <h1 className="text-2xl  font-medium text-gray-800 sm:text-3xl">
              Vos principaux mots-clés
            </h1>
            <p className="mt-1.5 text-sm  text-gray-600">
              Visualisez vos mots-clés et l'identifiant "handleID" associé 🚀
            </p>
          </div>
          <button onClick={() => navigate("https://opentheso.huma-num.fr/opentheso/?idt=43")}
            className="p-3 place-self-center text-sm  text-center
            bg-redCahier/70 shadow-md rounded text-white  hover:bg-redCahier/90 
            hover:duration-700 inline-flex items-center">
            <ArrowTopRightOnSquareIcon className="h-6 w-6 mr-2" />
            Voir le thésaurus</button>
        </div>
      </header>
      <article className="mx-10">
        <ThesaurusReferentiel />
      </article>
    </div>
  )
}