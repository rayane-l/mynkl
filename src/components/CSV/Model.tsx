import { CSVLink } from "react-csv";


export default function Model() {
  const headers = [
    { label: "Linked in collection", key: "LinkedInCollection" },
    { label: "Status collection", key: "StatusCollection" },
    { label: "collectionsIds", key: "CollectionsIDS" },
    { label: "Linked in item", key: "LinkedInItem" },
    { label: "Status donnee", key: "StatusDonnee" },

    { label: "http://nakala.fr/terms#title", key: "Title"},
    { label: "LangTitle", key: "LangTitle" },
    { label: "http://nakala.fr/terms#creator", key: "Creator" },
    { label: "http://nakala.fr/terms#created", key: "Created" },
    { label: "http://nakala.fr/terms#type", key: "Type" },
    { label: "http://nakala.fr/terms#license", key: "License" },
    { label: "Embargoed", key: "Embargoed" },

    { label: "http://purl.org/dc/terms/created", key: "CreatedInterval" },
    { label: "http://purl.org/dc/terms/creator", key: "CreatorDC" },
    { label: "http://purl.org/dc/terms/contributor", key: "Contributor" },
    { label: "http://purl.org/dc/terms/description", key: "Description" },
    { label: "LangDescription", key: "LangDescription" },
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
    { label: "LangSubject", key: "LangSubject" },
    { label: "http://purl.org/dc/terms/medium", key: "Support" },
    { label: "http://purl.org/dc/terms/publisher", key: "Éditeur" },
    ///that new
    
    


  ];

  const data: any = [];

  return (
    <>

      <CSVLink className=" inline-flex font-light p-4 rounded-md border border-blue-700 shadow-sm  bg-blue-100 text-base font-light
       text-blue-700 hover:bg-blue-700/20 
       hover:duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
      data={data} headers={headers} separator={";"} filename={"ModelCSV"}>
        CSV Template <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </CSVLink>
    </>
  )
}