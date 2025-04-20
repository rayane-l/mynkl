import React from "react";




export default function Skeletons() {


  let fumisterie = ["1", "2", "3", "4", "5", "6"]


  return (
    <>
      <section className="grid grid-cols-3 gap-4">
        {fumisterie.map(() =>
          <div className=" bg-transparent border border-brownNakala/10  shadow-md rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gradient-to-r from-brownNakala/20 to-redCahier/20 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gradient-to-r from-brownNakala/20 to-redCahier/20 rounded"></div>
                <div className="h-2 bg-gradient-to-r from-brownNakala/20 to-redCahier/20 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gradient-to-r from-brownNakala/20 to-redCahier/20 rounded col-span-2"></div>
                    <div className="h-2 bg-gradient-to-r from-brownNakala/20 to-redCahier/20 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}