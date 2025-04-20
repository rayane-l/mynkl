import { KeyIcon } from "@heroicons/react/24/outline";
import { useState } from "react"
import { useGetLoginUserQuery } from "../app/user-api"
import Loader from "../components/Loaders/Loader"
import ToastSuccess from "../components/Feedbacks/ToastSuccess";


export default function DashboardPage() {
  const { data, isLoading } = useGetLoginUserQuery()


  /**
  * gestion feedback
  */
  const [succes, setSuccess] = useState(false);

  return (
    <>
      {isLoading && <Loader />}
      <div className="h-screen">
        <header className="bg-gradient-to-r from-brownNakala/5 to-redCahier/5 shadow-sm mb-3 ">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between content-center ">
            <div className="mt-8 font-fontSpec">
              <h1 className="text-2xl  font-medium text-gray-800 sm:text-3xl">
                Bonjour {data?.givenname}
              </h1>
            </div>
          </div>
        </header>
        <div className="overflow-hidden overflow-x-auto border-l border-redCahier mx-2 p-4">
          <table className="min-w-full text-sm divide-y divide-gray-200 ">
            <thead>
              <tr className="bg-greyNakala/20">
                <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Identifiant</th>
                <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Prénom</th>
                <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Nom</th>
                <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Adresse Mail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap">{data?.surname}</td>
                <td className="px-4 py-2 font-light text-gray-700 whitespace-nowrap">{data?.givenname}</td>
                <td className="px-4 py-2 font-light text-gray-700 whitespace-nowrap">{data?.fullname}</td>
                <td className="px-4 py-2 font-light text-gray-700 whitespace-nowrap">{data?.mail}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex  grid justify-items-center my-6 ">
          <button className="p-4 w-1/4  text-sm font-light  inline-flex items-center text-center border border-redCahier
           bg-redCahier/10 rounded text-redCahier hover:bg-redCahier/30  hover:duration-700">
            <KeyIcon className="h-8 w-8 mr-3 font-light" /> {data?.apiKey}</button>
          {<ToastSuccess showModal={succes} closeModal={() => setSuccess(false)} message="Clé réinitialisée" position={false} />}
        </div>
      </div>
    </>
  )
}