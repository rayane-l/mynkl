import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { Donnees, Concepts, DonneeUpdated, Metas, MetasAuthor } from "../entities";
import { AppDispatch, RootState } from "./store";


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const fetchDonneFromDOI = (csvData: any[], setState: any, fetch: (arg: string) => any) => {
  const allDOI: string[] = [];
  const verifHeader = csvData[0];

  if (verifHeader.hasOwnProperty("DOI") === false) {
    alert("Votre CSV est incorrecte, votre en-tête doit être DOI")
  } else {
    for (let index = 0; index < csvData.length; index++) {
      const oneDoi = csvData[index]["DOI"];
      allDOI.push(oneDoi)
    }
  }

  const fetchAllDatas = async () => {
    const datas: Donnees[] = []
    try {
      for (const data of allDOI) {
        const result = await fetch(data).unwrap()
        if (result) {
          datas.push(result)
        }
      }
      setState(datas)
    } catch (error: any) {
      alert("Donnée introuvable, vérifiez vos DOI")
    }
  }

  fetchAllDatas()
}

export const deleteItemsOfList = (identifiers: string | Concepts, arrayOfItems: any[], setState: (value: any[]) => void) => {
  const result = arrayOfItems.filter(identifier => identifier !== identifiers);
  setState(result)
}


/**
   * 
   * @param csvArray csv actuel uplodé
   * @param donneeObject donnee
   * @param index ligne actuelle du csv
   */
export const fetchDCtermsMetas = (csvArray: any[], donneeObject: DonneeUpdated | Donnees, index: number) => {
  try {
    /**
          * * const headersDCterms =  Object.fromEntries(filtered), permet de créer un objet avec clé et valeur
          * on trie toutes les en-tetes du CSV, on garde celle qui contiennent les dc terms et on construit une meta dcterms pour chaque valeur
          */
    const allHeaders = csvArray[index]
    const tab = Object.entries(allHeaders)
    const filtered = tab.filter(([key]) => key.startsWith("http://purl"))
    for (const datas of filtered) {
      if (datas[1] !== "") {
        const valueMulti = ((datas[1]) as unknown as string).split("|")
        for (const item of valueMulti) {
          const metaDCterms = ({ "typeUri": null, "propertyUri": datas[0], "value": item } as unknown as Metas)
          donneeObject.metas!.push(metaDCterms)
        }
      }
    }
  } catch (error) {
    console.log(error);
    alert("Attention, les metas DCTERMS sont mal renseignées")
  }
}

/**
     * Permet de récupérer les métadonnées obligatoires from Nakala
     * @param csvArray csv actuel uplodé
     * @param donneeObject object final de données 
     * @param index  ligne actuelle
     */
export const fetchNklMetas = (csvArray: any[], donneeObject: DonneeUpdated | Donnees, index: number, csvToUpdate: boolean, completeDonnee?: any[]) => {
  try {
    /**
       * TODO: à voir si il faut pas trimer les collections, car bcp d'espaces
       */
    const collectionsIds = csvArray[index]["collectionsIds"]?.split("|")

    for (const collection of collectionsIds) {
      if (collection) {
        donneeObject.collectionsIds?.push(collection.trim())
      }
    }
    const created = csvArray[index]["http://nakala.fr/terms#created"]
    const creator = csvArray[index]["http://nakala.fr/terms#creator"].split("|")
    const license = csvArray[index]["http://nakala.fr/terms#license"]
    const type = csvArray[index]["http://nakala.fr/terms#type"]
    const title = csvArray[index]["http://nakala.fr/terms#title"]


    const typeMeta = ({ "typeUri": "http://www.w3.org/2001/XMLSchema#anyURI", "propertyUri": "http://nakala.fr/terms#type", "value": type ? type : null } as unknown as Metas)
    const licenseMeta = ({ "typeUri": "http://www.w3.org/2001/XMLSchema#string", "propertyUri": "http://nakala.fr/terms#license", "value": license ? license : null } as Metas)
    const titleMeta = ({ "typeUri": "http://www.w3.org/2001/XMLSchema#string", "propertyUri": "http://nakala.fr/terms#title", "value": title ? title : null } as Metas)
    const createdMeta = ({ "typeUri": null, "propertyUri": "http://nakala.fr/terms#created", "value": created === "inconnue" ? null : created } as unknown as Metas)


    if (createdMeta.value !== null) {
      createdMeta.typeUri = "http://www.w3.org/2001/XMLSchema#string"
    }

    for (const item of creator) {
      const creatorMeta = ({ "typeUri": null, "propertyUri": "http://nakala.fr/terms#creator", } as unknown as Metas)
      if (item === "anonyme") {
        creatorMeta.typeUri = "http://www.w3.org/2001/XMLSchema#string"
        donneeObject.metas?.push(creatorMeta)
      } else {
        let newItem = item.split(",")
        console.log(newItem)
        const authorMeta = ({ "authorId": "", "orcid": null, "fullname": "", "givenname": newItem[0] , "surname": newItem[1] } as unknown as MetasAuthor)
        creatorMeta.value = authorMeta
        console.log(authorMeta)
        donneeObject.metas?.push(creatorMeta)
      }
    }

    donneeObject.metas!.push(typeMeta, titleMeta, licenseMeta, createdMeta)
    csvToUpdate && completeDonnee!.push([donneeObject, csvArray[index]["DOI"]])
  } catch (error) {
    console.log(error);
    alert("Attention, les metas NAKALA sont mal renseignées")
  }
}

