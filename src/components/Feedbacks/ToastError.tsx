import React from "react";

interface Iprops {
  showModalError: boolean;
  closeModalError: () => void;
  queryMessage: any;
  positionE: boolean;

}


export default function ToastError({ showModalError, closeModalError, queryMessage, positionE }: Iprops) {
  return (
    showModalError ?
      <div
        className={positionE ? "flex items-center justify-between gap-4 p-4 text-red-700 border rounded border-red-900/10 bg-red-50" :
          "sticky w-1/4  bottom-4 left-3/4 flex items-center justify-between gap-4 p-4 text-red-700 border rounded border-red-900/10 bg-red-50"}
        role="alert"
      >
        <div className="flex items-center gap-4 ">
          <span className="p-2 text-white bg-red-600 rounded-full">
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
                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
              />
            </svg>
          </span>
          <p>
            <strong className="text-sm font-medium"> Erreur </strong>
            <span className="block text-xs opacity-90">
              {queryMessage.isError && (queryMessage.error as any).data.message}
            </span>
            {queryMessage.isError && queryMessage.error.data.payload && queryMessage.error.data.payload.validationErrors ?
              <span className="block text-xs opacity-90">{queryMessage.error.data.payload.validationErrors[0]} </span> : null}
          </p>
        </div>
        <button onClick={() => closeModalError()} className="opacity-90" type="button" data-dismiss-target="#alert-additional-content-1">
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