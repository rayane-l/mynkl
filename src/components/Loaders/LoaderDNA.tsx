import React from "react";
import { Dna } from "react-loader-spinner"


export default function LoaderDNA() {
  return (
    <header className="flex justify-center">
      <Dna
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
      />
      {/* <PropagateLoader color="#f4845f" /> */}
    </header>
  )
}