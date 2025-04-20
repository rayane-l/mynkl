

export interface User {

    username?: string,
    givenname?: string,
    surname?: string,
    mail?: string,
    photo?: string,
    firstLogin?: Date,
    lastLogin?: Date,
    roles?: string,
    apiKey?: string,
    fullname?: string,
    userGroupId?: number
    collections?: Collection[]
    id: string,

}


export interface Collection {

    status?: string,
    websiteEnabled?: boolean,
    websitePublished?: boolean,
    websitePrefix?: string,
    haveData?: boolean,
    haveAccessibleData?: boolean,
    uri?: string,
    identifier?: string,
    metas?: Metas[],
    creDate?: Date,
    depositor?: User,
    owner?: User,
    isDepositor?: boolean,
    isOwner?: boolean,
    isAdmin?: boolean,
    isEditor?: boolean,
    modDate?: Date,
    donnees?: Donnees[] | null

}

export interface Metas {

    value?: MetasAuthor | null,
    lang?: string|null,
    typeUri?: string | null
    propertyUri?: string
    collections: Collection[]
}

export interface MetasAuthor {
    replace(arg0: RegExp, arg1: string): unknown
    authorId?: string,
    fullName?: string,
    givenname?: string,
    orcid?: string | null,
    surname?: string
}


export interface Donnees {

    version?: string | null,
    collectionsIds?: string[],
    files?: Files[] | null,
    relations?: Relation[] | null,
    status?: string,
    fileEmbargoed?: boolean | null,
    citation?: string | null,
    uri?: string | null,
    identifier?: string | null,
    metas?: Metas[],
    creDate?: Date,
    depositor?: User | null,
    owner?: User | null,
    isDepositor?: boolean | null,
    isOwner?: boolean | null,
    isAdmin?: boolean | null,
    isEditor?: boolean | null,
    modDate?: Date | null,
    rights?: Right[]
    

}

export interface Right {
    id?: string,
    role?: string,
    name?: string,
    username?: string
}

export interface Relation {
    type?: string,
    repository?: string,
    target?: string,
    comment?: string,
}

export interface CollectionID {
    collectionIDS?: string
}
export interface License {
    code?: string,
    name?: string,
    url?: string
}


export interface Files {

    name?: string,
    extension?: string,
    size?: number,
    sha1?: string,
    embargoed?: Date,
    description?: string | null,
    humanReadableEmbargoedDelay?: User[],
    mime_type?: string
}


export interface UploadFiles {
    name?: string,
    sha1?: string,
    description?: string | null


}


export interface CSVHeader {

    ["Linked in collection"]?: string,
    ["Status collection"]?: string,
    ["CollectionsIDS"]?: string,
    ["Linked in item"]?: string,
    ["Title nkl:title"]?: string,
    ["Creator nkl:creator"]: string,
    ["Created nkl:created"]?: string,
    ["Type nkl:type"]?: string,
    ["License nkl:license"]?: string,
    ["Created Interval dc-rdf:created"]?: string,
    ["Creator dc-rdf:creator"]: string,
    ["Contributor dc-rdf:contributor"]?: string,
    ["Description dc-rdf:description"]?: string,
    ["Language dc-rdf:lang"]?: string,
    ["Relation dc-rdf:relation"]?: string,


    ["Ayants droit dc-rdf:rightsHolder"]?: string,
    ["Couverture spatiale dc-rdf:spatial"]?: string,
    ["Date de disponibilité dc-rdf:available"]?: string,
    ["Date de modification dc-rdf:modified"]?: string,
    ["Droits dc-rdf:rights"]?: string,
    ["Est une version de dc-rdf:isVersionOf"]?: string,
    ["Format dc-rdf:format"]?: string,

    ["Référence bibliographique dc-rdf:bibliographicCitation"]?: string,
    ["Résumé dc-rdf:abstract"]?: string,
    ["Source dc-rdf:source"]?: string,
    ["Sujet dc-rdf:subject"]?: string,
    ["Support dc-rdf:medium"]?: string,
    ["Éditeur dc-rdf:publisher"]?: string
    ["Embargoed"]?: Date
    ["Status donnee"]?: string


}


export interface DOI {

    dois?: string
}


export interface DonneeUpdated {
    collectionsIds?: string[];
    files?: UploadFiles[];
    relations?: Relation[];
    status?: string;
    metas?: Metas[];
    rights?: Right[];
    doi?: string
    version?: string

}


export interface ThesoConcept {
    conceptId: string,
    arkId: string,
    handleId: string,
    notation: string,
    traduction: Traduction[]
}

export interface Concepts {
    handle: string,
    label: string | string[]
}


export interface Traduction {
    lang: string,
    value: string,
}