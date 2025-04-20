import { Fragment } from "react"
import { Menu, Popover, Transition } from "@headlessui/react"
import {
  Bars3Icon,
  ClipboardDocumentCheckIcon,
  DocumentChartBarIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import React from "react"
import ModalLogin from "./Modals/ModalLogin"
import { useNavigate } from "react-router"
import { useAppSelector } from "../app/hooks"
import { useDispatch } from "react-redux"
import { useGetLoginUserQuery } from "../app/user-api"
import { logout } from "../app/auth-slice"


const deposer = [
  {
    name: "Dépôts avec CSV",
    description: "Déposer vos données en lot via un csv",
    path: "/csv",
    icon: ClipboardDocumentCheckIcon,

  },
  {
    name: "Dépots des TEI",
    description: "Déposer en lôt vos TEI, l'application se charge de remplir vos métadonnées via les TEI Header",
    path: "/tei",
    icon: DocumentChartBarIcon,
  },
  { name: "Modification avec CSV", description: "Modifier vos données en lôt via un csv", path: "/updatecsv", icon: ArrowPathIcon },

]

const exploration = [
  {
    name: "Recommandations",
    description: "Une sélection unique, destinée à vous suprendre.",
    path: "/empty",
    icon: MagnifyingGlassIcon,
  }

]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlColor = useAppSelector(state => state.colorS.filter_url)
  const apikey = useAppSelector(state => state.auth.api_key)
  const { data } = useGetLoginUserQuery()

  const mafia = () => {
    dispatch(logout())
    navigate("/")
    window.location.reload()
  }
  return (
    <>
      <svg height="0">
        <filter id="protanopiaColourMatrix">
          <feColorMatrix
            type="matrix"
            values=".56667 .43333 0      0 0
						.55833 .44167 0      0 0
						0      .24167 .75833 0 0
						0      0      0      1 0" />
        </filter>

        <filter id="protanomalyColourMatrix">
          <feColorMatrix
            type="matrix"
            values=".81667 .18333 0    0 0
						.33333 .66667 0    0 0
						0      .125   .875 0 0
						0      0      0    1 0" />
        </filter>

        <filter id="deuteranopiaColourMatrix">
          <feColorMatrix
            type="matrix"
            values=".625 .375 0  0 0
						.7   .3   0  0 0
						0    .3   .7 0 0
						0    0    0  1 0" />
        </filter>

        <filter id="deutranomalyColourMatrix">
          <feColorMatrix
            type="matrix"
            values=".8     .2     0      0 0
						.25833 .74167 0      0 0
						0      .14167 .85833 0 0
						0      0      0      1 0" />
        </filter>

        <filter id="tritanopiaColourMatrix">
          <feColorMatrix
            type="matrix"
            values=".95 .5     0      0 0
						0   .43333 .56667 0 0
						0   .475   .525   0 0
						0   0      0      1 0" />
        </filter>

        <filter id="tritanomalyColourMatrix">
          <feColorMatrix
            type="matrix"
            values=".96667 .3333  0      0 0
						0      .73333 .26667 0 0
						0      .18333 .81667 0 0
						0      0      0      1 0" />
        </filter>

        <filter id="achromatopsiaColourMatrix">
          <feColorMatrix
            type="matrix"
            values=".299 .587 .114 0 0
						.299 .587 .114 0 0
						.299 .587 .114 0 0
						0    0    0    1 0" />
        </filter>

        <filter id="achromatomalyColourMatrix">
          <feColorMatrix
            type="matrix"
            values=".618 .32  .62  0 0
						.163 .775 .62  0 0
						.163 .320 .516 0 0
						0    0    0    1 0" />
        </filter>
      </svg>
      <Popover
        className="relative bg-gradient-to-r from-greyNakala/40  to-greyNakala/10 shadow-md"

      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 "

        >
          <div className="flex items-center justify-between py-2 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <div>
                <span className="sr-only">Mynkl</span>
                <img
                  style={{
                    filter: `url(${urlColor})`
                  }}
                  className="h-8 w-auto lg:h-14 lg:block hover:cursor-pointer"
                  src={process.env.PUBLIC_URL + "/Logos/v3_1.svg"}
                  alt="logo Mynkl"
                  onClick={() => navigate("/")}
                />
              </div>
            </div>

            <div className="-my-2 -mr-2 md:hidden">
              {data && (apikey !== null) ?
                <Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-400
                 hover:bg-gray-100 hover:text-gray-500 focus:outline-none ">
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button> :
                <ModalLogin />
              }
            </div>
            {data && (apikey !== null) && <>
              <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group inline-flex items-center rounded-md  text-base font-light tracking-widest hover:text-gray-900 focus:outline-none "
                        )}
                      >
                        <span>Déposer</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div
                              style={{
                                filter: `url(${urlColor})`,
                              }} className="relative grid gap-6 bg-white/80 px-5 py-6 sm:gap-8 sm:p-8">
                              {deposer.map((item) => (
                                <button
                                  key={item.name}
                                  onClick={() => navigate(item.path)}
                                  className="-m-3 text-start flex items-start rounded-lg p-3 hover:bg-gray-50"
                                >
                                  <item.icon className="h-6 w-6 flex-shrink-0 text-redCahier" aria-hidden="true" />
                                  <div className="ml-4">
                                    <p className="text-base font-light text-gray-900">{item.name}</p>
                                    <p className="mt-1 text-sm font-light text-gray-500">{item.description}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                <p onClick={() => navigate("/donnees")} className="text-base  cursor-pointer font-light tracking-widest text-gray-500 hover:text-gray-900">
                  Données
                </p>
                <p onClick={() => navigate("/collections")} className="text-base  cursor-pointer font-light tracking-widest text-gray-500 hover:text-gray-900">
                  Collections
                </p>

                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group inline-flex items-center rounded-md  text-base font-light tracking-widest hover:text-gray-900 focus:outline-none"
                        )}
                      >
                        <span>Exploration</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div style={{
                              filter: `url(${urlColor})`
                            }}
                            className="relative grid gap-6 bg-white/80 px-5 py-6 sm:gap-8 sm:p-8">
                              {exploration.map((item) => (
                                <button
                                  key={item.name}
                                  onClick={() => navigate(item.path)}
                                  className="-m-3 text-start flex items-start rounded-lg p-3 hover:bg-gray-50"
                                >
                                  <item.icon className="h-6 w-6 flex-shrink-0 text-redCahier" aria-hidden="true" />
                                  <div className="ml-4">
                                    <p className="text-base font-light text-gray-900">{item.name}</p>
                                    <p className="mt-1 text-sm font-light text-gray-500">{item.description}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group> </>}

            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              {data && (apikey !== null) ? <Menu as="div" className="relative ml-3">
                <div style={{
                  filter: `url(${urlColor})`
                }}>
                  <Menu.Button className="flex text-sm">
                    <span className="sr-only">Open user menu</span>
                    <div className="relative inline-block ">
                      <p className='bg-redCahier/10 inline-block mt-2 rounded-md font-light  p-3 hover:bg-redCahier/30 hover:duration-700'>{data!.givenname}</p>
                      <span className=" absolute -bottom-1 -right-1 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full"></span>
                    </div>

                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white/80
                   py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <button onClick={() => navigate("/account")}

                        className='block px-2 py-2 text-sm text-gray-700 text-left hover:bg-gray-100 w-full'
                      >
                        Compte
                      </button>

                    </Menu.Item>
                    <Menu.Item>
                      <button onClick={() => { mafia() }}

                        className='block px-2 py-2 text-sm text-gray-700 text-left hover:bg-gray-100 w-full'
                      >
                        Déconnexion
                      </button>

                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu> : <>
                <ModalLogin /></>}
            </div>
          </div>
        </div>

        {/**version dropdown responsive only if connected */}
        {data && (apikey !== null) && <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="absolute z-40 inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
            <div
              style={{
                filter: `url(${urlColor})`
              }} className="divide-y-2 divide-gray-50 rounded-lg bg-white/90  shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src={process.env.PUBLIC_URL + "/Logos/v3_1.svg"}
                      alt="logo Mynkl"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2
                     text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-300">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6"> <nav className="grid gap-y-8">
                  {deposer.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <item.icon className="h-6 w-6 flex-shrink-0 text-redCahier" aria-hidden="true" />
                      <span className="ml-3 text-base font-light text-gray-900">{item.name}</span>
                    </button>
                  ))}
                </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 bg-gray-400/10 p-3 rounded-md">
                  <p onClick={() => navigate("/donnees")} className="text-base font-light text-gray-900 hover:text-gray-700">
                    Données
                  </p>

                  <p onClick={() => navigate("/collections")} className="text-base font-light text-gray-900 hover:text-gray-700">
                    Collections
                  </p>
                  {exploration.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className="text-base font-light text-gray-900 hover:text-gray-700"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <button onClick={() => dispatch(logout())} className="w-full p-1  text-base border border-gray-400/60 rounded 
                text-redCahier hover:bg-gray-300 hover:duration-700">Déconnexion</button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>}
      </Popover>
    </>
  )
}


