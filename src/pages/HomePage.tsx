import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router";
import { ServerUrl } from "../app/server";
import { useAppSelector } from "../app/hooks";


export default function HomePage() {
  const navigate = useNavigate();
  ServerUrl()
  const urlColor = useAppSelector(state => state.colorS.filter_url)

  // iv id="home"
  //       className="isolate bg-gradient-to-r from-redCahier/10 to-brownNakala/5  "
  //       style={{
  //         filter: `url(${urlColor})`,
  //       }}
  //     >
  //       <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
  //         <svg className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
  //           <defs>
  //             <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
  //               <stop stop-color="#C41627/60"></stop>
  //               <stop offset="1" stop-color="#A6A2A4"></stop>
  //             </linearGradient>
  //           </defs>
  //         </svg>
  //       </div>

  //https://dev.to/eitanwaxman/magnifying-glass-for-text-and-more-5a57
  return (
    <>
      <div id="home"
        className="bg-gradient-to-r from-greyNakala/40 to-redCahier/70"
        style={{
          filter: `url(${urlColor})`,
        }}
      >
        <header className="lg:p-40 p-10 mx-2 ">
          <article className="lg:flex lg:items-center lg:mt-4 md:flex md:items-center md:mt-4 ">
            <section className="lg:mr-4 lg:h-48 lg:w-48 lg:p-4 md:h-40 md:w-48  h-32 w-32 translate-y-12  rounded-full shadow-md  bg-redCahier/20
             hover:-translate-y-12 hover:duration-700  ">
              <div className="basis-1/4 flex lg:h-36 lg:w-36 h-28 w-28 lg:items-center  mt-2 items-center md:items-end ">
                <div className="flex items-center ">
                  <img
                    className=" w-36 cursor-pointer  m-1  "
                    src={process.env.PUBLIC_URL + "/Logos/v3_1.svg"}
                    alt="logoMyNkl"
                  />
                </div>
              </div>
            </section>
            <section className="lg:w-1/2 w-full mt-10 ">
              <h1 id="titre" className="text-xl font-light tracking-wider text-gray-900 p-4 font-fontAr max-w-[45ch] ">
                vous permet d’organiser le dépôt en lot de vos données sur l’outil Nakala de l’infrastucture Huma-Num !</h1>
            </section>
          </article>
          <div className="shadow-md -z-40   rounded-full absolute  lg:w-96 lg:h-96 lg:left-40 lg:top-24 lg:-translate-x-2 md:h-60
           md:w-60 md:top-20 md:left-12 top-20 left-10 h-48 w-48 bg-orange-500/30 "></div>


          <article className="mt-10 grid justify-items-center lg:justify-items-end lg:w-4/5 md:justify-items-end">
            <button
              onClick={() => navigate("/demo")}
              className="lg:w-96 relative inline-block group focus:outline-none focus:ring focus:ring-yellow-400"
            >
              <span
                className="font-fontAr relative z-10 block px-10 py-2 text-lg font-medium text-white transition border border-redCahier/30 bg-redCahier/40
                 rounded group-hover:scale-105"
              >
                Je découvre la démo
              </span>
              <span
                className="absolute inset-0 transition scale-105 rounded bg-redCahier/30  -rotate-3 group-hover:rotate-0"
              ></span>
            </button>
          </article>
        </header>
        <div className="flex flex-wrap  justify-evenly bg-transparent py-8 mx-2  ">
          <article
            className="mb-3 bg-white/20 h-60 w-96 relative block p-8 overflow-hidden  rounded-lg shadow-lg hover:shadow-redCahier/30 "
          >
            <span
              className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-greyNakala via-pinkNakala/70 to-redCahier"
            ></span>

            <div className="justify-between sm:flex">
              <div className="flex-shrink-0 ml-3 sm:block">
                <img src={process.env.PUBLIC_URL + "/Logos/nakala.svg"} className=" h-12 w-40" alt="logoNakala" />
              </div>
            </div>

            <div className="mt-4 sm:pr-8">
              <p className="lg:text-md text-sm font-light text-gray-500 font-fontAr">
                Nakala est un service d’Huma-Num permettant à des chercheurs, enseignants-chercheurs et équipes de recherche de partager,
                publier et valoriser tous types de données numériques documentées.
              </p>
            </div>

            <a href="https://documentation.huma-num.fr/nakala/" target="_blank" rel="noreferrer"
              className=" absolute right-2 bottom-3 inline-block p-3 text-redCahier border border-redCahier/40 rounded-full
             hover:text-white hover:bg-redCahier/20 hover:duration-700 active:bg-indigo-500 focus:outline-none focus:ring " >
              <ArrowRightIcon className="h-5 w-5 text-redCahier" />
            </a>
          </article>

          <article
            className="mb-3 bg-white/30 h-60 w-96 relative block p-8 overflow-hidden  rounded-lg shadow-lg hover:shadow-redCahier/30"

          >
            <span
              className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-greyNakala via-orange-500/70 to-redCahier"
            ></span>

            <div className="justify-between sm:flex ">
              <div className="flex-shrink-0  p-2 ml-3 sm:block">
                <img src={process.env.PUBLIC_URL + "/Logos/huma.svg"} className="h-12 w-68" alt="logoHumaNum" />
              </div>
            </div>
            <div className="mt-4 sm:pr-8">
              <p className="lg:text-md text-sm font-fontAr font-light text-gray-500">
                Huma-Num est une infrastructure de recherche dédiée aux lettres, sciences humaines et sociales et aux humanités numériques.
              </p>
            </div>

            <a href="https://www.huma-num.fr/" target="_blank" rel="noreferrer"
              className=" absolute right-2 bottom-3 inline-block p-3 text-redCahier border border-redCahier/40
            rounded-full hover:text-white hover:bg-redCahier/20 hover:duration-700 active:bg-indigo-500 focus:outline-none focus:ring " >
              <ArrowRightIcon className="h-5 w-5 text-redCahier" />
            </a>
          </article>

          <article
            className="mb-3 bg-white/40 h-60 w-96 bg-greyNakala/20 relative block p-8 overflow-hidden rounded-lg shadow-lg hover:shadow-redCahier/50"

          >
            <span
              className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-greyNakala  to-redCahier "
            ></span>

            <div className="justify-between sm:flex">
              <div className="flex-shrink-0 ml-3 sm:block">
                <img src={process.env.PUBLIC_URL + "/Logos/consor.svg"} className="h-12 w-52" alt="logoCahierConsortium" />
              </div>
            </div>
            <div className="mt-4 sm:pr-8">
              <p className="lg:text-md text-sm font-fontAr font-light text-gray-500">
                Cahier est un consortium interdisciplinaire de projets numériques de l'infrastruture Huma-Num. Né en 2011,
                il a pour but la diffusion numérique d'une ou plusieurs œuvres et/ou de ses sources.
              </p>
            </div>

            <a href="https://cahier.hypotheses.org/le-consortium" target="_blank" rel="noreferrer"
              className=" absolute right-2 bottom-3 inline-block p-3 text-redCahier border border-redCahier/40 rounded-full
              hover:text-white hover:bg-redCahier/20 hover:duration-700 active:bg-indigo-500 focus:outline-none focus:ring " >
              <ArrowRightIcon className="h-5 w-5 text-redCahier" />
            </a>
          </article>

          <article
            className="mb-3 bg-white/40 h-60 w-96 bg-greyNakala/20 relative block p-8 overflow-hidden rounded-lg shadow-lg hover:shadow-redCahier/50"

          >
            <span
              className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-brownNakala  to-redCahier "
            ></span>

            <div className="justify-between sm:flex">
              <div className="flex-shrink-0 ml-3 sm:block">
                <img src={process.env.PUBLIC_URL + "/Logos/ariane.png"} className="h-12 w-30" alt="logoArianeConsortium" />
              </div>
            </div>
            <div className="mt-4 sm:pr-8">
              <p className="lg:text-md text-sm font-fontAr font-light text-gray-500">
                Le Consortium-HN ARIANE (Analyses, Recherches, Intelligence Artificielle et Nouvelles Editions numériques)
                a été labellisé par Huma-Num le 18/01/2023 pour une période de 4 ans.
                ARIANE réunit des spécialistes du texte (littéraires, linguistes, historiens…)
                et de l'informatique.
              </p>
            </div>

            <a href="https://www.crihn.org/nouvelles/2023/01/31/labellisation-du-consortium-ariane/" target="_blank" rel="noreferrer"
              className=" absolute right-2 bottom-3 inline-block p-3 text-redCahier border border-redCahier/40 rounded-full
              hover:text-white hover:bg-redCahier/20 hover:duration-700 active:bg-indigo-500 focus:outline-none focus:ring " >
              <ArrowRightIcon className="h-5 w-5 text-redCahier" />
            </a>
          </article>
        </div>
      </div>
    </>
  )
}