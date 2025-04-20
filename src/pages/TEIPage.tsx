import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useAppSelector } from "../app/hooks";
import TEI from "../components/TEI";


export default function TEAIPage() {
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  return (
    <>
      <div
        style={{
          filter: `url(${urlColor})`
        }}
        className="h-full">
        <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm  ">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between content-center ">
            <div className="mt-8 font-fontSpec">
              <h1 className="text-2xl  font-medium text-gray-800 sm:text-3xl">
                Dépôt de TEI par lôts
              </h1>
              <p className="mt-1.5 text-sm  text-gray-600">
                Déposez vos tei par lots, choisissez à quelles collections vos données seront affiliées et les status de vos données  🚀
              </p>
            </div>
          </div>
        </header>
        <div className="bg-gradient-to-r from-indigo-500/90 to-redCahier/90 text-center px-4 py-3 text-white">
          <p className="items-center inline-flex  text-sm font-medium">
            <ShieldExclamationIcon className="h-8 w-8 mr-2" />
            Cette fonctionnalité rencontre des erreurs si votre TEI n'est pas construit selon les normes de Cahier
            <span className="underline ml-2">vérifiez votre fichier avant le dépôt</span>
          </p>
        </div>
        <TEI />
      </div>
    </>
  )
}