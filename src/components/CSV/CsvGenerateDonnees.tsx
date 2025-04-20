import React from "react";
import { CSVLink } from "react-csv";
import { useGetLoginUserQuery } from "../../app/user-api";
import { Donnees, DonneeUpdated } from "../../entities";


interface Iprops {
  collectionName?: any;
  allDatas: Donnees[];
  allTitlesCollections?: any[]
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function CsvGenerateDonnees({ collectionName, allDatas, allTitlesCollections }: Iprops) {
  const { currentData } = useGetLoginUserQuery();


  /**
     * valeurs des colonnes
     */
  const datasForCSV: DonneeUpdated[] = []

  /**
     * en-tetes des colonnes
     */
  const headers = [
    { label: "Status donnee", key: "status" },
    { label: "DOI", key: "identifiant" },
    { label: "version", key: "version" },
    { label: "Linked in item", key: "linkedinitem" },
    { label: "Titres collections", key: "titresCollections" }

  ];

  for (const data of allDatas) {
    const datasMetas: any = {};
    /**
         * on crée un dictionnaire, la clé est la propertyUri(qui correspond à un identifant de metadonnée
         *  via nakala) et la value est la valeur de la métadonnée en cours
         */
    for (const item of data!.metas!) {
      let value;

      if (item.propertyUri === "http://nakala.fr/terms#created") {
        value = item.value || "inconnue";
      } else if (item.propertyUri === "http://nakala.fr/terms#creator") {
        if (item.value && item.value.givenname && item.value.surname) {
          value = `${item.value.givenname}, ${item.value.surname}`;
        } else {
          value = "anonyme";
        }
      } else {
        value = item.value || "anonyme";
      }

      if (datasMetas[item.propertyUri!]) {
        datasMetas[item.propertyUri!] = `${datasMetas[item.propertyUri!]} | ${value}`;
      } else {
        datasMetas[item.propertyUri!] = value;
      }

      /**
             * on récupère la propertyUri de la métadonnée qu'on affecte aux en-tetes du CSV, le label devient directement la propertyUri
             */
      const header = { label: item.propertyUri!, key: item.propertyUri! }
      const exist = headers.find((head) => head.key === item.propertyUri)
      if (!exist) {
        headers.push(header)
      }
    }

    const datasCollections: any = {}
    /**
         * creation du dictionnaire pour toutes les collections affiliées aux données
         */

    if (data.collectionsIds !== undefined) {
      for (const collections of data.collectionsIds!) {
        if (datasCollections["collectionsIds"]) {
          datasCollections["collectionsIds"] = ` ${datasCollections["collectionsIds"]} | ${collections}`
        } else {
          datasCollections["collectionsIds"] = collections
        }
      }
    }

    /**
           * on push les label concernant les collectionsI
           */
    const collectionsHeaders = { label: "collectionsIds", key: "collectionsIds" }

    const exist = headers.find((item) => item.key === collectionsHeaders.key)
    if (!exist) {
      headers.push(collectionsHeaders)
    }


    const dataFiles: any = {}
    if (data.files !== undefined) {
      for (const file of data.files!) {
        if (dataFiles["sha1"]) {
          dataFiles["sha1"] = `${dataFiles["sha1"]} | ${file.sha1}`
        } else {
          dataFiles["sha1"] = file.sha1
        }
      }

      for (const file of data.files!) {
        if (dataFiles["name"]) {
          dataFiles["name"] = `${dataFiles["name"]} | ${file.name}`
        } else {
          dataFiles["name"] = file.name
        }
      }
      for (const file of data.files!) {
        if (dataFiles["embargoed"]) {
          dataFiles["embargoed"] = `${dataFiles["embargoed"]} | ${file.embargoed}`
        } else {
          dataFiles["embargoed"] = file.embargoed
        }
      }

      for (const file of data.files!) {
        if (dataFiles["description"]) {
          dataFiles["description"] = `${dataFiles["description"]} | ${file.description}`
        } else {
          dataFiles["description"] = file.description
        }
      }
      const filesEmbarg = { label: "embargoed", key: "embargoed" }
      const filesDescription = { label: "description", key: "description" }
      const fileName = { label: "name", key: "name" }
      const filesHeaders = { label: "sha1", key: "sha1" }
      const exist = headers.find((item) => item.key === fileName.key ||
        item.key === filesHeaders.key || item.key === filesDescription.key || item.key === filesEmbarg.key)
      if (!exist) {
        headers.push(fileName, filesHeaders, filesDescription, filesEmbarg)
      }
    }


    const relationsDatas: any = {};
    if (data.relations !== undefined) {
      for (const relation of data.relations!) {
        if (relationsDatas["type"]) {
          relationsDatas["type"] = `${relationsDatas["type"]} | ${relation.type}`
        } else {
          relationsDatas["type"] = relation.type
        }
      }

      for (const relation of data.relations!) {
        if (relationsDatas["repository"]) {
          relationsDatas["repository"] = `${relationsDatas["repository"]} | ${relation.repository}`
        } else {
          relationsDatas["repository"] = relation.repository
        }
      }

      for (const relation of data.relations!) {
        if (relationsDatas["target"]) {
          relationsDatas["target"] = `${relationsDatas["target"]} | ${relation.target}`
        } else {
          relationsDatas["target"] = relation.target
        }
      }

      for (const relation of data.relations!) {
        if (relationsDatas["comment"]) {
          relationsDatas["comment"] = `${relationsDatas["comment"]} | ${relation.comment}`
        } else {
          relationsDatas["comment"] = relation.comment
        }
      }
      const relationsType = { label: "type", key: "type" }
      const relationsRepository = { label: "repository", key: "repository" }
      const relationsTarget = { label: "target", key: "target" }
      const relationsComment = { label: "comment", key: "comment" }
      const exist = headers.find((item) => item.key === relationsType.key ||
        item.key === relationsRepository.key || item.key === relationsTarget.key || item.key === relationsComment.key)
      if (!exist) {
        headers.push(relationsTarget, relationsType, relationsRepository, relationsComment)
      }
    }


    const rightsData: any = {}
    if (data.owner !== undefined) {
      rightsData["id"] = `${currentData?.userGroupId} | ${data!.depositor!.id!}`

      if (data.isAdmin) {
        rightsData["role"] = `${"ROLE_ADMIN"} | ${"ROLE_DEPOSITOR"}`
      } else if (data.isDepositor) {
        rightsData["role"] = `${"ROLE_DEPOSITOR"} | ${"ROLE_DEPOSITOR"}`
      } else if (data.isEditor) {
        rightsData["role"] = `${"ROLE_EDITOR"} | ${"ROLE_DEPOSITOR"}`
      } else if (data.isOwner) {
        rightsData["role"] = `${"ROLE_OWNER"} | ${"ROLE_DEPOSITOR"}`
      } else if (!data.isAdmin && !data.isDepositor && !data.isEditor && !data.isOwner) {
        rightsData["role"] = `${"ROLE_READER"}`
      }


      const rightsId = { label: "id", key: "id" }
      const rightsRole = { label: "role", key: "role" }
      const exist = headers.find((item) => item.key === rightsId.key || item.key === rightsRole.key)
      if (!exist) {
        headers.push(rightsId, rightsRole)
      }
    }

    const otherDatas = { "status": data.status, "identifiant": data.identifier, "version": data.version }
    const concatDatas = { ...datasMetas, ...otherDatas, ...dataFiles, relationsDatas, ...rightsData, ...datasCollections }
    datasForCSV.push(concatDatas)
  }
  /**
   * permet d'assigner les titres des collections aux ids
   */
  if (allTitlesCollections) {
    for (let index = 0; index < datasForCSV.length; index++) {
      Object.assign(datasForCSV[index], allTitlesCollections![index])
    }
  }

  return (
    <>
      <CSVLink className="inline-flex mt-2 font-light text-orange-700 bg-orange-100 border border-orange-500 p-3
        hover:bg-orange-700/20 hover:duration-700 rounded-md"
        data={datasForCSV}
        headers={headers}
        separator={";"}
        filename={collectionName}>
        Génerer les données en CSV <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 animate-bounce"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </CSVLink>
    </>
  )
}