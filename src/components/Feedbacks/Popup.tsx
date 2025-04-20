import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useAppSelector } from "../../app/hooks";


interface Props {
  showPopup: boolean
  closePopup: () => void
}


export default function Popup({ showPopup, closePopup }: Props) {
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  return (
    showPopup ?
      <aside
        style={{
          filter: `url(${urlColor})`
        }}
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-sm bg-gray-600/70 shadow-md px-5 py-3 text-white"
      >
        <p
          className="text-sm font-light text-white hover:opacity-75"
        >
          Besoin d'aide ? 👋 Rdv en fin bas de page
        </p>
        <button onClick={() => closePopup()} className="ml-3 rounded  p-1 hover:bg-white/10 hover:rounded-full ">
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-5 w-4 text-white tracking-wider	" />
        </button>
      </aside> : null
  )
}