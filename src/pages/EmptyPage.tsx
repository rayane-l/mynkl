import React from "react";
import { useAppSelector } from "../app/hooks";
import { useGetLoginUserQuery } from "../app/user-api";



export default function EmptyPage() {

  const urlColor = useAppSelector(state => state.colorS.filter_url);
  const { currentData } = useGetLoginUserQuery()
  return (
    <>
      <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm mb-3 ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between content-center ">
          <div className="mt-8 font-fontSpec">
            <h1 className="text-2xl  font-medium text-gray-800 sm:text-3xl">
              Recommandations pour {currentData?.givenname}
            </h1>
          </div>
          <img
            className=" w-40 cursor-pointer  m-1  "
            src={process.env.PUBLIC_URL + "/Logos/undraw.svg"}
            alt="logoMyNkl"
          />
        </div>
      </header>
      <div style={{
        filter: `url(${urlColor})`
      }}
        className="h-full mx-20 my-5 p-5 bg-gradient-to-r from-brownNakala/5 to-redCahier/5 px-3 rounded-md shadow-md grid ">
        <article className="group place-self-center">
          <img
            className=" w-48  m-1  "
            src={process.env.PUBLIC_URL + "/Logos/undraw_empty.svg"}
            alt="logo-empty-datas"
          />
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              Mais vous pouvez lancer une recommandation par données, directement sur la page de votre donnée en question.
            </h3>
          </div>
        </article>
      </div>
    </>
  )
}