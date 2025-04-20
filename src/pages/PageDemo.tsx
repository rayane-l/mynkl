import Model from "../components/CSV/Model";
import ExempleModel from "../components/CSV/ExempleModel";


export default function PageDemo() {
  const popup = "_blank','toolbar=0, location=0, directories=0, status=0, scrollbars=0, resizable=0, copyhistory=0, menuBar=0, width='500px', height='500px'";

  const openImg = (source: any) => {
    window.open(source, popup)
  }

  const auth = [
    { img: "csv177.png", title: "Je récupère ma clé d'Authentification Nakala : ", list: ["Au préalable, vous devez vous créer un compte Nakala via HUMA-NUM"] },
    { img: "csv18.png", title: "Je me connecte à Mynkl", list: ["Entrez votre clé valable pour accéder à l'application et à vos données"] },
    { img: "csv199.png", title: "Votre espace Compte : ", list: ["Après la connexion réussie, il suffit de cliquer sur l'avatar en haut à droite de l'écran, vous pouvez soit accéder à votre page 'Compte' ou vous déconnecter", "Votre page personnelle comporte toutes les informations personnelles liées à votre compte."] },
  ]


  const data = [
    { img: "csv1.png", title: "Téléchargement", text: "Cliquez sur le bouton 'CSV Template' sur votre gauche : ", list: ["Vérifiez les séparateurs et autres paramètres"] },
    { img: "csv2.png", title: "Enregistrement", text: "Après téléchargement et remplissage de votre CSV, selectionnez 'Enregistrer sous' puis la fenêtre suivante s'affichera : ", list: ["Définir le nom du fichier en haut à gauche", "Selectionnez, en bas à droite, 'Editer les paramètres du filtre'", "Choisir 'Texte CSV(.csv) en bas à droite", "Enregistrer"] },
    { img: "csv3.png", title: "Format Fichier", text: "Format Text CSV ", list: ["Selectionnez 'Utiliser le format Texte CSV'"] },
    { img: "csv4.png", title: "Final", text: "Pour terminer : ", list: ["Vérifiez les 'Options de Champ' comme présentés sur l'image",] }
  ]

  const format = [
    { img: "csv15.png", title: "Colonnes obligatoires", text: " Les 7 colonnes présentées ci-dessus doivent impérativement être présentes lors du dépôt, cinq d'entre elles correspondent aux métadonnées obligatoires attendues par Nakala (doivent être remplies) : ", list: ["Linked In Item => permet de lier des fichiers à vos données. Rappel, toute donnée doit avoir au moins un fichier lié. Si une donnée n'a pas au moins un fichier lié, le dépôt par lot échouera. Pour associer un ou plusieurs fichier à une donnée (exemple : toutes les pages d'un même livre, ou tous les enregistrements d'un même entretien, ou toutes les photos d'un même objet, etc.),renseigner dans 'Linked In Item' un préfixe (exemple : CL-AA3-01-C0)uploader les fichiers correctement nommés en fonction de ce préfixe : pour être liés à une donnée, leur nom doit impérativement commencer par la valeur renseignée dans la colonne 'Linked In Item', par exemple CL-AA3-01-C0_001.jpg, CL-AA3-01-C0_002.pdf, .... CL-AA3-01-C0_118.xml ", "Title => c'est le nom de votre donnée", "Creator => 'prénom, nom' virgule OBLIGATOIRE ou 'anonyme' (le nom du créateur de la donnée n'est pas celui de la personne qui réalise le dépôt, cette information peut être fournie dans le champ 'Contributor'", "Created => YYYY-MM-DD ou YYYY-MM ou YYYY ou 'inconnue'", "Type => choisissez une option dans la liste des types de données présentées dans la documentation de NakalaDoc à ce lien : [https://api.nakala.fr /vocabularies/datatypes] ", "License => choisissez une option (URL) dans la liste des types de données présentées dans la documentation de NakalaDoc à ce lien : [https://documentation .huma-num.fr/nakala/]"] },
    { img: "csv16.png", title: "Colonne Linked in Collection : ", text: "Cette colonne vous permet de créer ces collections, la création ne se fait qu'une fois durant le dépôt, en revanche si vous voulez la relier à d'autres Données, il suffit de dupliquer son nom dans cette même colonne (comme présenté dans l'image) :  ", list: ["Choisissez un nom pour votre collection 'Œuvres de Gustave FL' ou 'Projet ANR XXXXX' ou 'Manuscrits de prison' ou 'Fouilles été 2022'..", " Vous pouvez associer vos données à plusieurs collections, pour cela, saisissez les différents noms et utilisez le séparateur vertical '|'", "Dans l'exemple ci dessus, une 'Collection conforme' ne sera créée qu'une seule fois, vu qu'elle a été réécrite en seconde ligne, elle sera affiliée à la deuxième donnée également. NB => inutile de répéter son statut dans 'Statut Collection'"] },
    { img: "csv22.png", title: "Colonne collectionsIds", text: "Cette colonne vous permet de lier  votre donnée à une collection déjà existante : ", list: ["Si la collection existe déjà ou si vous souhaitez enrichir une collection créée par quelqu'un d'autre, recopiez correctement l'identifiant de la collection souhaitée dans cette colonne. Vous pouvez déposer vos données dans plusieurs collections déjà créées, pour cela, saisissez les différents identifiants et utilisez le séparateur vertical '|'"] },
    { img: "csv88.png", title: "Statut", text: "'Status Collection' ne doit être renseigné que si vous souhaitez créer une nouvelle collection. Dans votre environnement mynkl, le statut des collections et des Données, est privé par défault. Vous pouvez modifier en masse le statut des données en mode 'public' directement depuis l'application : ", list: ["Si vous saisissez 'private', la collection ne sera pas visible.", "Si vous saisissez 'public',  la collection sera visible.", "Si vous saisissez 'public' et plusieurs noms de collections, toutes les collections seront publiques et visibles"] },
    { img: "csv20.png", title: "Colonnes optionnelles", text: "Hormis les 7 colonnes sitées dans l'étape 1, vous pouvez ajouter autant de métadonnées 'dc/terms' que vous souhaitez en ajoutant le préfixe suivant: 'http://purl.org/dc/terms/' + le nom de la métadonnée.Les champs peuvent être multiples, il suffit d'ajouter le séparateur '|'", list: ["Exemples : pour la colonne 'http://purl.org/dc/terms/contributor' : LECHIM, Michel | Auteur de la photo : NAEJ, Jean ...pour la colonne 'http://purl.org/dc/terms/type' : https://hdl.handle.net/+ la réference à votre thesaurus (si vous pouvez utiliser un vocabulaire contrôlé et que votre thésaurus propose des identifiants, vous pouvez saisir les URL dans ce champ)"] },
  ]

  const donnees = [
    { img: "csv99.png", title: "Pour publier en masse vos données", text: "Plusieurs options sont possibles pour publier vos données, et notamment celle de publier en une fois toutes les données. Pour cela, il vous suffit de cliquer sur le carré en haut à droite 'Publier les données'. Toutes vos données seront alors publiques: ", list: ["Sélectionnez le carré en haut à droite, puis 'Publier les données'"] },
    { img: "csv100.png", title: "Pour publier certaines données 'privées'", text: "Sélectionnez les données que vous souhaitez passer en mode 'public' en cliquant à droite sur statut de la/les donnée/s, puis sur 'Publier les données'", list: ["Sélectionnez le carré à droite du statut de la/les donnée/s, puis 'Publier les données'"] },
    { img: "csv14.png", title: "Pour publier certaines données 'privées' via les collections affiliées", text: "Cette option vous permet de publier toutes les données appartenant à une collection précise : ", list: ["Pour cela, cliquer sur 'Mes collections', puis sur 'Voir' la collection, puis sur 'Données associées' et enfin, selectionnez 'Publier toutes les données'  "] },
    { img: "csv11.png", title: "Pour relier une collection à une donnée ou bien supprimer une liaison ", list: ["Pour associer une collection et une donnée, allez 'Mes données', puis sélectionner la donnée en question, cliquez sur le bouton '+' et entrer l'identifiant de la collection (NB : tous les identifiants des données et des collections se trouvent en haut de chaque page, il vous suffit de cliquer et de recopier)", "Pour supprimer une liaison entre une collection et une donnée sans impacter l'existence de votre collection (pour retire une donnée d'une collection), il suffit de cliquer sur la petite 'poubelle' à droite du nom de la donnée"] },
    { img: "csv122.png", title: "Pour ajouter ou supprimer une métadonnée 'DCterms' à une donnée  ", list: ["Pour ajouter une métadonnée, cliquez sur le '+' en bas de la liste", "Pour supprimer une métadonnée, cliquez sur le bouton 'poubelle'"] },
    { img: "csv133.png", title: "Pour ajouter un media à une donnée ou supprimer un media d'une donnée ", list: ["Pour ajouter un média à votre donnée, rendez vous dans l'onglet 'media' de votre donnée, cliquez sur le bouton '+'", "Pour supprimer un média, cliquez sur le bouton 'poubelle'"] },
  ]


  return (
    <>
      <div className="h-full">
        <section className="mt-16">
          <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
              <div className="flex items-center px-6 bg-gray-100 rounded shadow-md h-full relative ">
                <div className="mx-auto  text-center lg:text-left font-fontMont ">
                  <div
                    className=" absolute -top-10 inline-block px-6 py-3 mt-6 text-sm text-white bg-black rounded"
                  >
                    Étape 1
                  </div>
                  <h2 className="text-2xl font-bold  ">
                    Authentifiez-vous
                  </h2>

                  <p className="mt-4  text-base font-light text-gray-700 max-w-[45ch]">
                    Pour utiliser Mynkl, vous devez d'abord créer votre compte sur Nakala et récupérer votre
                    clé d'API. Ensuite, vous pourrez vous connecter à Nakala à travers l'application Mynkl. <br />
                    <br />
                    ATTENTION : Mynkl ne stocke pas vos identifiants ni vos mots de passe,
                    l'application vous connecte à Nakala via l'API proposée par ce service d'Huma-Num. ...
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12 shadow-md p-3 rounded-md">
                {auth.map((item: any, index) => <article
                  className="block font-fontMont"
                >
                  <div className="mt-2">

                    <div className="first-letter:text-blue-700 first-letter:underline underline-offset-2 decoration-blue-700 font-bold my-4" >
                      {index + 1 + " " + item.title}
                    </div>

                    <p className="my-3 text-base text-gray-700">
                      {item.text}
                    </p>

                    <div key={index} className="aspect-w-1 aspect-h-1 relative my-6 ">
                      <img
                        loading="lazy"
                        alt="screenshot"
                        className=" object-cover rounded-md"
                        src={process.env.PUBLIC_URL + `/imagesTutos/${item.img}`}
                      />
                      <p onClick={() => openImg(process.env.PUBLIC_URL + `/imagesTutos/${item.img}`)} className="text-white absolute w-full
                       h-full top-0 p-16 opacity-100 bg-blue-700/40 cursor-pointer rounded-md text-sm font-bold border border-blue-900 ">
                        Cliquer pour Zoomer </p>
                    </div>
                    <ul className="list-none space-y-2">
                      {item.list && item.list.map((lis: any) => <li className="text-blue-700 font-light bg-gray-200 rounded-md p-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg> {lis}</li>)}
                    </ul>
                  </div>
                </article>)}
              </div>
            </div>
          </div>
        </section>
        <br />
        <section>
          <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
              <div className="flex items-center px-6 bg-gray-100 rounded shadow-md h-2/3 relative">
                <div className="mx-auto  text-center lg:text-left font-fontMont ">
                  <div
                    className="-top-10 absolute inline-block px-6 py-3 mt-6 text-sm text-white bg-black rounded"
                  >
                    Étape 2
                  </div>
                  <h2 className="text-2xl font-bold  ">
                    Créez votre CSV
                  </h2>
                  <p className="mt-4  text-base font-light text-gray-700 max-w-[45ch]">
                    Pour déposez les données (images, textes, sons, etc.) et leurs métadonnées décrites dans un tableur,
                    utilisez le modèle CSV suivant. <br /><br /> Vous pourrez ensuite déposer vos fichiers images, sons, audios,
                    txt, etc. en une fois, et toutes leurs métadonnées.<br /><br />
                    Téléchargez d'abord le modèle CSV ci-dessous et enregistrez-le correctement. Les deux dernières étapes seront à réitérer
                    obligatoirement pour toutes modifications de votre CSV, il suffira,
                    <span className="underline decoration-4 decoration-blue-700">
                      "d'enregistrer sous" </span>puis de répéter <span className="underline decoration-4 decoration-blue-700">les actions 2 et 3</span>.
                  </p>
                  <div className="mt-12 text-sm ">
                    <Model />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12 shadow-md p-3 rounded-md">
                {data.map((item: any, index) => <article
                  className="block font-fontMont"
                >
                  <div className="mt-2">
                    <div className="first-letter:text-blue-700 first-letter:underline underline-offset-2 decoration-blue-700 font-bold my-4" >
                      {index + 1 + " " + item.title}
                    </div>
                    <p className="my-3 text-base text-gray-700">
                      {item.text}
                    </p>
                    <div key={index} className="aspect-w-1 aspect-h-1 relative my-6 ">
                      <img
                        loading="lazy"
                        alt="screenshot"
                        className=" object-cover rounded-md"
                        src={process.env.PUBLIC_URL + `/imagesTutos/${item.img}`}
                      />
                      <p onClick={() => openImg(process.env.PUBLIC_URL + `/imagesTutos/${item.img}`)}
                        className="text-white absolute w-full h-full top-0 p-16 opacity-100 bg-blue-700/40 cursor-pointer 
                        rounded-md text-sm font-bold border border-blue-900 ">Cliquer pour Zoomer </p>
                    </div>
                    <ul className="list-none space-y-2">

                      {item.list && item.list.map((lis: any) => <li
                        className="text-blue-700 font-light bg-gray-200 rounded-md p-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg> {lis}</li>)}
                    </ul>
                  </div>
                </article>)}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
              <div className="flex items-center px-6 bg-gray-100 rounded shadow-md h-1/4 relative ">
                <div className="mx-auto text-center lg:text-left font-fontMont">
                  <div
                    className="-top-10 absolute inline-block px-6 py-3 mt-6 text-sm text-white bg-black rounded"
                  >
                    Étape 3
                  </div>
                  <h2 className="text-2xl font-bold  ">
                    Saisissez (ou copiez-collez) vos données au format adapté
                  </h2>

                  <p className="mt-4  text-base font-light text-gray-700 max-w-[45ch]">
                    Lors de la confection de votre CSV, certaines règles de nommages sont à respecter afin que vos données soient transmises
                    le plus proprement et correctement possible.
                    <br /><br />
                    Un exemple de dépôt vous est transmis ci dessus, en incluant plusieurs scenari.
                  </p>
                  <br></br>
                  <strong className="text-redCahier text-sm">Les " " ne sont pas conseillés, ils peuvent décaler vos données, préferez les ' '</strong>
                  <div className="mt-12 text-sm ">
                    <ExempleModel />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12 shadow-md p-3 rounded-md">
                {format.map((item: any, index) => <article

                  className="block font-fontMont"
                >
                  <div className="mt-2">

                    <div className="first-letter:text-blue-700 first-letter:underline underline-offset-2 decoration-blue-700 font-bold my-4" >
                      {index + 1 + " " + item.title}
                    </div>

                    <p className="my-3 text-base text-gray-700">
                      {item.text}
                    </p>

                    <div key={index} className="aspect-w-1 aspect-h-1 relative my-6 ">
                      <img
                        loading="lazy"
                        alt="screenshot"
                        className=" object-cover rounded-md"
                        src={process.env.PUBLIC_URL + `/imagesTutos/${item.img}`}
                      />
                      <p onClick={() => openImg(process.env.PUBLIC_URL + `/imagesTutos/${item.img}`)}
                        className="text-white absolute w-full h-full top-0 p-16 opacity-100 bg-blue-700/40 cursor-pointer rounded-md 
                      text-sm font-bold border border-blue-900 ">Cliquer pour Zoomer </p>
                    </div>
                    <ul className="list-none space-y-2">
                      {item.list && item.list.map((lis: any) => <li className="text-blue-700 font-light bg-gray-200 rounded-md p-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg> {lis}</li>)}
                    </ul>
                  </div>
                </article>)}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
              <div className="flex items-center px-6 bg-gray-100 rounded shadow-md h-2/3 relative">
                <div className="mx-auto  text-center lg:text-left font-fontMont ">
                  <div

                    className="-top-10 absolute inline-block px-6 py-3 mt-6 text-sm text-white bg-black rounded"
                  >
                    Étape 4
                  </div>
                  <h2 className="text-2xl font-bold  ">
                    Gérez vos Données
                  </h2>
                  <p className="mt-4  text-base font-light text-gray-700 max-w-[45ch]">
                    Mynkl vous propose un environnement de gestion pour vos données. Comme dans Nakala, vous pouvez retrouver la liste de vos données,
                    celles qui les ont été déposées dans l'entrepôt Nakala à partir de l'onglet "Mes Données". <br /> <br /> Nakala vous permet de déposer des
                    données et de les garder sous le statut "privé" durant quelques mois, le temps de finaliser vos travaux. Attention, le nombre de données
                    "privées" est limité car Nakala vise la diffusion des données.
                    Mynkl vous offre la possibilité de modifier en masse, ou à l'unité, ou via les collections, le statut de vos données.
                    <br /><br />
                    En cliquant sur le bouton "Voir", le détail de la donnée séléctionnée apparaît : son statut (public "published" ou privé "pending")
                    les datas associées lors du dépôt, et les métadonnées. Les métadonnées principales (les 5 métadonnées obligatoires par Nakala) ne seront
                    pas supprimables. En revanche, il est vous est possible, d'ajouter et de supprimer des métadonnées secondaires (DCterms),
                    d'ajouter et de supprimer des médias via l'application. La gestion des collections est également possible grâce à Mynkl
                    <br /><br />
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12 shadow-md p-3 rounded-md">
                {donnees.map((item: any, index) => <article
                  className="block font-fontMont"
                >
                  <div className="mt-2">

                    <div className="first-letter:text-blue-700 first-letter:underline underline-offset-2 decoration-blue-700 font-bold my-4" >
                      {index + 1 + " " + item.title}
                    </div>

                    <p className="my-3 text-base text-gray-700">
                      {item.text}
                    </p>

                    <div key={index} className="aspect-w-1 aspect-h-1 relative my-6 mb-10 ">
                      <img
                        loading="lazy"
                        alt="screenshot"
                        className=" object-cover rounded-md"
                        src={process.env.PUBLIC_URL + `/imagesTutos/${item.img}`}
                      />
                      <p onClick={() => openImg(process.env.PUBLIC_URL + `/imagesTutos/${item.img}`)}
                        className="text-white absolute w-full h-full top-0 p-16 opacity-100 bg-blue-700/40 cursor-pointer rounded-md 
                       text-sm font-bold border border-blue-900 ">Cliquer pour Zoomer </p>
                    </div>
                    <ul className="list-none space-y-2">
                      {item.list && item.list.map((lis: any) => <li className="text-blue-700 font-light bg-gray-200 rounded-md p-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg> {lis}</li>)}
                    </ul>
                  </div>
                </article>)}
              </div>
            </div>
          </div>
        </section>
      </div >
    </>
  )
}
