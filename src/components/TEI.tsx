import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { usePostCollectionMutation } from "../app/collections-api";
import { usePostDonneeMutation, usePostMediaUploadMutation } from "../app/donnees-api";
import { deleteItemsOfList } from "../app/hooks";
import { useGetAllCollectionsQuery } from "../app/user-api";
import { Collection, Donnees, Files, Metas, MetasAuthor } from "../entities";
import Loader from "./Loaders/Loader";
import UploaderFiles from "./UploaderFiles";


export default function TEI() {
  const xpath = require("xpath")
    
  /**
    * api
    */
  const { data } = useGetAllCollectionsQuery({page :1})
  const [postDonnee] = usePostDonneeMutation()
  const [postMediaUpload] = usePostMediaUploadMutation();
  const [postCollection] = usePostCollectionMutation();

  const [file, setFile] = React.useState<any[]>([]);
  const [status, setStatus] = useState("pending");
  const [statusCollection, setStatusCollection] = useState("private")
  const [collection, setCollection] = useState<any[]>([])
  const [newCollection, setNewCollection] = useState<string>("")
  const [arr, setArr] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<any>([]);


  /**
   * 
   * @param event collection to create
   */
  const newcollectionChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value
    setNewCollection(value)
  }

  const addCollection = () => {
    setArr([...arr, newCollection])
  }
  console.log(statusCollection)

  /**
   * 
   * @param arrayCollections array of collections to ready to create
   */
  const createCollections = async (arrayCollections: any[], collectionsIDSarray: string[]) => {
    if (arrayCollections) {
      for (const collections of arrayCollections) {
        try {
          const buildCollectionObject = {
            "status": "private", "metas": [{
              "propertyUri": "http://nakala.fr/terms#title",
              "typeUri": "http://www.w3.org/2001/XMLSchema#string", "value": collections
            }]
          } as Collection
          const result: any = await postCollection(buildCollectionObject).unwrap()
          collectionsIDSarray.push(result.payload.id)
        } catch (error) {
          console.log(error);
        }
      }
    }
  }


  /**
   * 
   * @param event fetch all collections of user
   */
  const collectionChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value
    const change = [...collection, value]
    setCollection(change)
  }


  const fileChange = (event: React.FormEvent<EventTarget>) => {
    const file = (event.target as HTMLInputElement).files;
    const arrayFile: any[] = []
    for (const data of file!) {
      arrayFile.push(data)
    }
    setFile(arrayFile)
  }

  /**
   * build correct object of metadata
   * @param keyword for correct propertyUri
   * @param value from xml
   * @param array array of all builded donnees
   */
  const buildMetas = (keyword: string, value: string | MetasAuthor, array: any[]) => {
    const metadata = ({ "typeUri": "http://www.w3.org/2001/XMLSchema#string", "propertyUri": `http://nakala.fr/terms#${keyword}`, "value": value }) as unknown as Metas
    switch (keyword) {
    case "creator":
      const creatorMeta: MetasAuthor = ({ "authorId": "", "orcid": null, "fullname": "", "givenname": value, "surname": "" } as unknown as MetasAuthor)
        metadata.value! = creatorMeta;
      if (value === "anonyme" || value === "Anonyme") {
        metadata.value = null
        metadata.typeUri = null
      }
      if (value === null) {
        metadata.typeUri = null
      }
      break;
    case "type":
      metadata.typeUri = "http://www.w3.org/2001/XMLSchema#anyURI"
      break;
    case "created":
      if (value === null) {
        metadata.typeUri = null
      }
    }
    array.push(metadata)
  }


  const arrayDonnee: Donnees[] = []

  const readXML = () => {
    for (const xml of file) {
      const allMetas: Metas[] = []
      const objDonne: Donnees = { "metas": allMetas, "files": [], "collectionsIds": [] }
      objDonne.files!.push(xml)
      let readXML;
      const reader = new FileReader()
      reader.onload = function (e: any) {
        readXML = e.target.result;
        const parser = new DOMParser();
        const doc = parser.parseFromString(readXML, "application/xml");
        const titleWithMain = xpath.select("string(//node()[local-name()='titleStmt']/node()[local-name()='title'][@type='main'])", doc).trim();
        const titleWithoutMain = xpath.select("string(//node()[local-name()='titleStmt']/node()[local-name()='title'][1])", doc).trim();
        const createdProfile = xpath.select("string(//node()[local-name()='profileDesc']/node()[local-name()='creation'])", doc)
        const createdSource = xpath.select("string(//node()[local-name()='sourceDesc']//node()[local-name()='date'][1])", doc)
        const type = "http://purl.org/coar/resource_type/c_18cf"
        const creator = xpath.select("string(//node()[local-name()='titleStmt']//node()[local-name()='author'][1])", doc)
        console.log(creator)
        // const licence = xpath.select("string(//node()[local-name()='publicationStmt']//node()[local-name()='licence']/@target)", doc) //TODO: trouver une maniere de recuprer le bon format de license
        buildMetas("title", titleWithoutMain ? titleWithoutMain : titleWithMain ? titleWithMain : null, allMetas)
        buildMetas("creator", creator ? creator : null, allMetas) //TODO: attention si renseigné "anonyme"
        buildMetas("license", "CC-BY-NC-ND-4.0", allMetas)
        buildMetas("type", type, allMetas)
        buildMetas("created", createdProfile ? createdProfile : createdSource ? createdSource : null, allMetas)
      }
      reader.readAsText(xml)
      arrayDonnee.push(objDonne)
    }
  }


  const handleSubmit = async () => {
    const tabFeedback = []
    const idCollection: string[] = []
    setLoading(true)
    readXML()
    await createCollections(arr, idCollection)
    for (const data of arrayDonnee) {
      status === "published" ? data.status = "published" : data.status = "pending"
      if (collection) {
        for (const collections of collection) {
          data.collectionsIds!.push(collections)
        }
      }
      if (arr) {
        for (const collection of idCollection) {
          data.collectionsIds!.push(collection)
        }
      }
      /**
       * partie upload
       */
      const dataFiles = data.files
      const filesUploaded: Files[] = []
      for (const file of dataFiles!) {
        const formdata: FormData = new FormData()
        formdata.append("file", file && file as Blob)
        const result = await postMediaUpload(formdata).unwrap()
        filesUploaded.push(result)
      }
      data.files = filesUploaded

      try {
        const result: any = await postDonnee(data).unwrap()
        tabFeedback.push(result.payload.id)
      } catch (error: any) {
        const errorValidations = []
        if (error.data.payload && error.data.payload.validationErrors !== undefined) {
          const errorPayload = error.data.payload.validationErrors
          for (const erro of errorPayload) {
            errorValidations.push(erro)
          }
        }
        tabFeedback.push(error.data.message.concat(errorValidations))
      }
    }
    setLoading(false)
    setFeedback(tabFeedback)
  }


  return (<>

    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch"
        >
          <div className="flex items-center rounded bg-brownNakala/5 p-8 shadow-sm border border-redCahier/10 ">
            <div className="mx-auto text-center lg:text-left">
              <h2 className="text-2xl font-light ">Étapes</h2>
              <span className="bg-gradient-to-r from-redCahier/50  to-redCahier/30 rounded lg:h-1 lg:w-10 lg:block mt-1"></span>
              <ul className="list-decimal list-inside mt-4 max-w-[45ch] text-sm text-gray-500 font-light">
                <li className="p-1">Sélectionnez une/des collections.s existante.s ou alors créez en une/plusieurs.</li>
                <li className="p-1">Choisissez le statut de vos données, il sera appliquer à tout le lôt.</li>
                <li className="p-1">Déposez vos Tei.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-2 lg:py-12">
            {/**1.a */}
            <article className="block rounded-md lg:col-span-2 shadow-sm p-2 border border-brownNakala/10">
              <h2 className=" text-gray-600 p-3 bg-brownNakala/10 font-light rounded-md"><strong>1.a</strong> Affiliez des collections</h2>
              <select className="mt-2 rounded-md border w-2/3 border-brownNakala/10 text-gray-600 font-light" onChange={(e) => collectionChange(e)} >
                <option >Sélectionnez vos collections</option>
                {data?.data.map((item: Collection) => <option className="text-gray-500" value={item.identifier}> {item.metas![0].value}  </option>)}
              </select>
              <div className="grid grid-cols-4 gap-2 mt-2 mb-4">
                {collection.length ? collection.map((item: string) =>
                  <strong
                    onClick={() => deleteItemsOfList(item, collection, setCollection)}
                    className="inline-flex hover:cursor-pointer border border-orange-700/30 p-2 bg-orange-50 text-[10px] uppercase
                     text-orange-700/80"
                  >
                    <p> {item}</p>
                  </strong>) : <span></span>}
              </div>
            </article>
            {/**1.b */}
            <article className="rounded-md  shadow-sm p-2 font-light border border-brownNakala/10">
              <h2 className=" text-gray-600 p-3 bg-brownNakala/10 font-light rounded-md"><strong>1.b</strong> Créer une collection</h2>
              <input onChange={newcollectionChange} type="text" className="rounded-md m-3 border-brownNakala/20" />
              <button className="text-sm  rounded-sm shadow-sm px-3 py-2 bg-orange-100
             text-base font-light text-orange-700 hover:bg-orange-700/20
              hover:duration-700" onClick={() => addCollection()} >ajouter</button>
              <div className="grid grid-cols-4 gap-2 mt-2 ml-3 mb-4">
                {arr.length ? arr.map((item: string) =>
                  <strong
                    onClick={() => deleteItemsOfList(item, arr, setArr)}
                    className="inline-flex hover:cursor-pointer border border-orange-700/30 p-2 bg-orange-50 text-[10px] uppercase
                     text-orange-700/80"
                  >
                    <p> {item}</p>
                  </strong>) : <span></span>}
              </div>
            </article>
            <article className="block rounded-md  shadow-sm p-2 font-light border border-brownNakala/10 ">
              <h2 className="text-gray-600 font-light p-3 bg-brownNakala/10 rounded-md mb-5 "><strong>1.c</strong> Choisissez le status de vos collections</h2>
              <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <li>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="study_type"
                      className="h-6 w-6 border-gray-300 shadow-md text-blue-300"
                      onClick={() => setStatusCollection("private")}
                    />
                    <span className="text-sm font-light text-gray-500">
                      privées
                    </span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="study_type"
                      className="h-6 w-6 border-gray-300 shadow-md text-blue-300"
                      onClick={() => setStatusCollection("public")}
                    />
                    <span className="text-sm font-light text-gray-500">
                      publiques
                    </span>
                  </label>
                </li>
              </ul>
            </article>
            {/** 2 */}
            <article className="block rounded-md  shadow-sm p-2 font-light border border-brownNakala/10">
              <h2 className="text-gray-600 p-3 bg-brownNakala/10 rounded-md mb-5 "><strong>2.</strong> Choisissez le status de vos données</h2>
              <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <li>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="bebou_type"
                      className="h-6 w-6 border-gray-300 shadow-md text-blue-300"
                      onClick={() => setStatus("pending")}
                    />
                    <span className="text-sm font-light text-gray-500">
                      privées
                    </span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="bebou_type"
                      className="h-6 w-6 border-gray-300 shadow-md text-blue-300"
                      onClick={() => setStatus("published")}
                    />
                    <span className="text-sm font-light text-gray-500">
                      publiques
                    </span>
                  </label>
                </li>
              </ul>
            </article>
            {/**3 */}
            <article className="block rounded-md  shadow-sm font-light p-2 border border-brownNakala/10">
              <h2 className="text-gray-600 p-3 bg-brownNakala/10 rounded-md mb-5 "><strong>3.</strong> Déposez vos Tei</h2>
              <UploaderFiles filesArray={file} handle={fileChange} isCsvArray={false} csvArray={undefined} />
            </article>
          </div>
        </div>
        <div className="mt-2  flex justify-end">
          <button type="button" className="flex rounded-br-lg  shadow-sm px-4 py-3 bg-green-100
             text-base font-light text-green-700 hover:bg-green-700/20
              hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
               sm:ml-3 sm:w-auto sm:text-sm" onClick={() => handleSubmit()} >Envoyer</button>
        </div>
      </div>
      {/**feedback */}
      {loading && <Loader />}
      <table className="w-1/2 text-sm divide-y divide-gray-200 mb-2 ml-2">
        <thead>
          <tr className="bg-greyNakala/30 ">
            <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Lignes du CSV</th>
            <th className="px-4 py-2 font-light text-left text-gray-900 whitespace-nowrap">Feedback Données</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {feedback && feedback.map((item: string, index: number) => <tr>
            <td className="px-4 py-2 font-light text-gray-900 whitespace-nowrap"> {index + 2} </td>
            {item.startsWith("10") ? <td className=" inline-flex items-center w-full  p-2 bg-green-100 border-l border-green-700 font-light
             text-gray-900 whitespace-nowrap"> {`La donnée ${item} est créee`} <CheckCircleIcon className="h-6 w-6 text-green-700 ml-2 stroke-1" /></td> :
              <td className="whitespace-pre-wrap inline-flex  items-center w-full p-2 border-l border-red-500 bg-red-200 font-light
             text-gray-900 whitespace-nowrap"> <ExclamationTriangleIcon className="h-6 w-6 ml-2 text-red-500" /> {item} </td>}
          </tr>)}
        </tbody>
      </table>
    </section>
  </>)
}