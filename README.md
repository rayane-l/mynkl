# Projet Mynkl

Mynkl est une interface en ligne facilitant les dépôts par lots dans Nakala. Nakala est un entrepôt de données de recherche pour les Sciences Humaines et Sociales, maintenu par l'Infrastructure de Recherche Huma-Num. L'utilisation de Nakala permet de s'inscrire dans une démarche FAIR (publier des données faciles à trouver, accessibles, interopérables et réutilisables.)

Avec Mynkl, il est possible d'importer en quelques clics les données à publier et leurs métadonnées obligatoires, stockées dans un simple fichier CSV. Mynkl propose également un environnement de gestion des données. On peut ainsi modifier facilement leur statut (public/privé), l'association à des collections ou encore ajouter/supprimer des métadonnées non obligatoires.

# Erreurs à controler

=> ";" qui sont présents dans les cellules (ils sont uniquement utilisés comme séparateurs de cellules)
=> les retours à la ligne présents dans les cellules (ils faussent la séparation entre colonnes et injectent les mauvaises données dans les colonnes qui suivent)
=> les formats de Date sont uniques ==> YYYY-DD-MM

## Champs vides et formatage des cellules du csv

=> Dans le CSV, les champs jusqu'a "Embargoed" doivent être obligatoireement laissés dans le CSV (pas forcément remplis)
=> Si vous souhaitez uniquement lier une donnée (via la colonne CollectionsIDS) sans créer une Collection, vous pouvez laisser le champs vide des Linked in Collection.
=> Tous les champs peuvent demeurer vides à l'exception des colonnes comportant "nkl", ils doivent être remplis, mention spéciale pour les "Nkl creator" et "Nkl created".
=> Injecter "anonyme" pour les nkl-Creator qui sont non renseignés
=> Injecter "inconnue" pour les nkl-Created qui sont non renseignés

### Installation du projet en local

- Installer python 3
- Créer un environnement (pour contenir l'app python)
- Réaliser l'installation de REACT via ==> "npm install"
- Installer Typescript en global 
  

ATTENTION ==> À METTRE DANS .htaccess (pour une refresh sans souci avec React), à insérer dans le build

Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
