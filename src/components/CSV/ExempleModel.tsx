

import { CSVLink } from "react-csv";


export default function ExempleModel() {
  const headers = [
    { label: "Linked in collection", key: "LinkedInCollection" },
    { label: "Status collection", key: "StatusCollection" },
    { label: "collectionsIds", key: "CollectionsIDS" },
    { label: "Linked in item", key: "LinkedInItem" },
    { label: "Status donnee", key: "StatusDonne" },
    { label: "http://nakala.fr/terms#title", key: "Title" },
    { label: "http://nakala.fr/terms#creator", key: "Creator" },
    { label: "http://nakala.fr/terms#created", key: "Created" },
    { label: "http://nakala.fr/terms#type", key: "Type" },
    { label: "http://nakala.fr/terms#license", key: "License" },
    { label: "Embargoed", key: "Embargoed" },

    { label: "http://purl.org/dc/terms/created", key: "CreatedInterval" },
    { label: "http://purl.org/dc/terms/creator", key: "CreatorDC" },
    { label: "http://purl.org/dc/terms/contributor", key: "Contributor" },
    { label: "http://purl.org/dc/terms/description", key: "Description" },
    { label: "http://purl.org/dc/terms/language", key: "Language" },
    { label: "http://purl.org/dc/terms/relation", key: "Relation" },
    { label: "http://purl.org/dc/terms/rightsHolder", key: "AyantsDroit" },
    { label: "http://purl.org/dc/terms/spatial", key: "CouvertureSpatiale" },
    { label: "http://purl.org/dc/terms/available", key: "DateDeDisponibilité" },
    { label: "http://purl.org/dc/terms/modified", key: "DateDeModification" },
    { label: "http://purl.org/dc/terms/rights", key: "Droits" },
    { label: "http://purl.org/dc/terms/isVersionOf", key: "EstUneVersion" },
    { label: "http://purl.org/dc/terms/format", key: "Format" },
    { label: "http://purl.org/dc/terms/bibliographicCitation", key: "RéférenceBibliographique" },
    { label: "http://purl.org/dc/terms/abstract", key: "Résumé" },
    { label: "http://purl.org/dc/terms/source", key: "Source" },
    { label: "http://purl.org/dc/terms/subject", key: "Sujet" },
    { label: "http://purl.org/dc/terms/medium", key: "Support" },
    { label: "http://purl.org/dc/terms/publisher", key: "Éditeur" },


  ];

  const data: any = [
    {
      LinkedInCollection: "Une collection conforme ",
      StatusCollection: "public", CollectionsIDS: "", LinkedInItem: "AK-AC-01", StatusDonne: "published",
      Title: "Un exemple de donnée", Creator: "Lélia, Alcaraz", Created: "2000-12-03",
      Type: "http://purl.org/coar/resource_type/c_0040",
      License: "CC-BY-NC-ND-4.0", CreatedInterval: "2003/2006", CreatorDC: "Lélia", Contributor: "Jean le Vaillant",
      Description: "Un bien belle description",
      Language: "fr", AyantsDroit: "Jêrôme", CouvertureSpatiale: "Couverture spatiale",
      Relation: "https://static.wamiz.com/images/upload/15876197_1368431473208290_144086124032163840_n(1).jpg",
      DateDeDisponibilité: "le 4 Mars 1991", DateDeModification: "le 14 Juin 2022", Droits: "Internationaux",
      EstUneVersion: "version4", Format: "JPEG", RéférenceBibliographique: "L'homme de Bois", Résumé: "un bien joli résumé",
      Source: "Lien vers une source", Sujet: "Donnée correcte", Support: "un support", Éditeur: "Moi", Embargoed: ""
    },

    {
      LinkedInCollection: "Une collection conforme | Une deuxième collection conforme",
      StatusCollection: "public", CollectionsIDS: "10.34847/nkl.ae1329qn | 10.34847/nkl.8cecz9yw", LinkedInItem: "AK-AC-02",
      StatusDonne: "published", Title: "Une donnée multiple", Creator: "anonyme", Created: "inconnue", Type: "http://purl.org/coar/resource_type/c_0040",
      License: "CC-BY-NC-ND-4.0", CreatedInterval: "2003/2006 | 2006/2008", CreatorDC: "Un createur libre | Jean De La Fontaine",
      Contributor: "Yvonne Irch | Bloch Jean", Description: "Un bien belle description | Encore une description",
      Language: "it",
      AyantsDroit: "Jêrôme | Louise", CouvertureSpatiale: "Couverture spatiale | une dexuième couverture",
      Relation: "https://static.wamiz.com/images/upload/15876197_1368431473208290_144086124032163840_n(1).jpg | https://static.wamiz.com/images/upload/15876197_1368431473208290_144086124032163840_n(1).jpg",
      DateDeDisponibilité: "le 4 Mars 1991 | 03/04/1991", DateDeModification: "le 04/05/22 | Le  4 juin 2020",
      Droits: "Internationaux | mondiaux", EstUneVersion: "version 3 | version 4", Format: "JPEG",
      RéférenceBibliographique: "L'homme de Bois | Le petit Bonhomme", Résumé: "un bien joli résumé | un deuxièmre résumé",
      Source: "Lien vers une source | deuxième source", Sujet: "Donnée correcte | donnée conforme",
      Support: "un support | papier", Éditeur: "Moi | Catherine Terte", Embargoed: ""
    },

    {
      LinkedInCollection: "", StatusCollection: "", CollectionsIDS: "", LinkedInItem: "AK-AC-03", StatusDonne: "pending",
      Title: "Un exemple de donnée sans collection avec uniquement les colonnes obligatoires", Creator: "Aristide, Alcaraz",
      Created: "inconnue", Type: "http://purl.org/coar/resource_type/c_0040", License: "CC-BY-NC-ND-4.0", CreatedInterval: "", CreatorDC: "",
      Contributor: "", Description: "", Language: "", AyantsDroit: "", CouvertureSpatiale: "", Relation: "", DateDeDisponibilité: "",
      DateDeModification: "", Droits: "", EstUneVersion: "", Format: "", RéférenceBibliographique: "", Résumé: "", Source: "", Sujet: "",
      Support: "", Éditeur: "", Embargoed: ""
    },
    {
      LinkedInCollection: "", StatusCollection: "", CollectionsIDS: "10.34847/nkl.ae1329qn", LinkedInItem: "AK-AC-03",
      StatusDonne: "pending", Title: "Un exemple de donnée sous embargo", Creator: "Jean, Alma", Created: "2001",
      Type: "http://purl.org/coar/resource_type/c_0040", License: "CC-BY-NC-ND-4.0", CreatedInterval: "2003/2006",
      CreatorDC: "Alma | Jean", Contributor: "Jean le Vaillant", Description: "Un bien belle description",
      Language: "fr", AyantsDroit: "Jêrôme | Louise", CouvertureSpatiale: "Couverture spatiale",
      Relation: "https://static.wamiz.com/images/upload/15876197_1368431473208290_144086124032163840_n(1).jpg",
      DateDeDisponibilité: "le 4 Mars 1991 | 03/04/1991", DateDeModification: "jamais modifié", Droits: "Internationaux",
      EstUneVersion: "Lien vers l'autre version", Format: "JPEG", RéférenceBibliographique: "L'homme de Bois", Résumé: "un bien joli résumé",
      Source: "Lien vers une source", Sujet: "Donnée correcte", Support: "un support", Éditeur: "Moi", Embargoed: "2038-08-05T00:00:00+02:00"
    },

  ];


  return (
    <>
      <CSVLink className=" inline-flex font-light p-5 rounded-md border border-blue-700 shadow-sm  bg-blue-100 text-base font-light
       text-blue-700 hover:bg-blue-700/20  hover:duration-700 focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
        data={data} headers={headers} separator={";"} filename={"correctCSV"}>
        ExempleCSV<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </CSVLink>
    </>
  )
}