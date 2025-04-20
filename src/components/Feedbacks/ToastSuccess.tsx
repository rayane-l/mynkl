import React from "react";


// position ==> indique si le toast est en modal ou non, afin de changer son positionnement


interface Iprops {
  showModal: boolean;
  closeModal: () => void
  message: string;
  position: boolean;


}


export default function ToastSuccess({ showModal, closeModal, message, position }: Iprops) {
  return (
    showModal ?
      <div
        className={position ? "flex items-center justify-between gap-4 p-4 text-green-700 border rounded border-green-900/10 bg-green-50" :
          "sticky w-1/4  bottom-4 left-3/4 flex items-center justify-between gap-4 p-4 text-green-700 border rounded border-green-900/10 bg-green-50"}
        role="alert"

      >
        <div className="flex items-center gap-4">
          <span className="p-2 text-white bg-green-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <p>
            <strong className="text-sm font-medium">{message}</strong>
          </p>
        </div>
        <button onClick={() => closeModal()} className="opacity-90" type="button" data-dismiss-target="#alert-additional-content-1">
          <span className="sr-only"> Close </span>
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div> : null
  )
}