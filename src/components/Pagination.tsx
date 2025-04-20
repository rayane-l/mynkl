import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import Loader from "./Loaders/Loader"

interface Props {
  addPage: () => void
  setPage: () => void
  data: any
  onlyForCollections: boolean
}


export default function Pagination({ addPage, data, setPage, onlyForCollections }: Props) {
  return (
    <div className="inline-flex items-center justify-center gap-3">
      {onlyForCollections ? (data && (data.currentPage > 1 && <button
        onClick={() => setPage()}
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-redCahier/30 hover:bg-greyNakala/10"
      >
        <ArrowSmallLeftIcon className="h-4 w-4" />
      </button>)) : <button
        onClick={() => setPage()}
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-redCahier/30 hover:bg-greyNakala/10"
      >
        <ArrowSmallLeftIcon className="h-4 w-4" />
      </button>}
      {data ? (<p className="text-xs">
        {data.currentPage}
        <span className="mx-0.25">/</span>
        {data.lastPage}
      </p>) : (<Loader />)}
      {onlyForCollections ? (data && (data.currentPage !== data.lastPage  && data.lastPage !== 0 &&  <button
        onClick={() => addPage()}
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-redCahier/30 hover:bg-greyNakala/10"
      >
        <ArrowSmallRightIcon className="h-4 w-4" />
      </button>)) : <button
        onClick={() => addPage()}
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-redCahier/30 hover:bg-greyNakala/10"
      >
        <ArrowSmallRightIcon className="h-4 w-4" />
      </button>}
    </div>
  )
}