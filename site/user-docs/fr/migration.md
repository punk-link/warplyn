---
description: "Passez de Skladno à Warplyn avec une sauvegarde, tout en conservant l’installation d’origine et vos textes pour pouvoir les récupérer."
---

# Passer de Skladno à Warplyn

Warplyn est une application distincte. Gardez Skladno et ses données jusqu’à ce que vous ayez vérifié la restauration de votre travail. Ne déplacez pas le dossier de données actif de Skladno vers Warplyn.

Téléchargez le programme d’installation Windows 11 x64 ou le paquet Debian x64 depuis la [dernière version de Warplyn](https://github.com/punk-link/warplyn/releases/latest). Consultez [Installer Warplyn](installation.md) pour les instructions propres à chaque plateforme.

Avant la migration, choisissez un **Dossier des sauvegardes** dans **Paramètres** → **Données**, puis sélectionnez **Sauvegarder**. Gardez chaque sauvegarde `.sqlite` avec le dossier `.sqlite.skills` associé. Consultez [Sauvegardes et récupération](backups-and-recovery.md) pour en savoir plus.

## Procédure de migration

1. Dans Skladno, terminez ou annulez les opérations d’IA en cours, puis fermez et rouvrez l’application afin d’enregistrer le point de contrôle du *brouillon* le plus récent. Pendant la création de la sauvegarde, évitez de modifier les fichiers de *compétences* de la personne autrice depuis l’extérieur.
2. Créez une sauvegarde manuelle depuis Skladno en cours d’exécution, même si l’application utilise un répertoire de données personnalisé. Gardez le fichier `.sqlite` et le dossier `.sqlite.skills` associé ensemble, avec leurs noms d’origine. Fermez Skladno une fois la sauvegarde créée.
3. Installez et ouvrez Warplyn avec son propre profil vide. Ne le dirigez jamais vers le répertoire de données actif de Skladno.
4. Dans **Paramètres** → **Données**, choisissez le dossier de sauvegarde de migration, puis sélectionnez **Restaurer**. Choisissez l’instantané de Skladno, confirmez le remplacement et laissez Warplyn redémarrer. Si Warplyn contient déjà du travail, créez d’abord sa propre sauvegarde : la restauration remplace le travail existant et ne fusionne pas les bases de données.
5. Avant de reprendre l’écriture, vérifiez les *articles*, les *brouillons* les plus récents, l’historique des *versions enregistrées*, les conversations de l’assistant, les *paramètres*, les profils de publication et les *compétences* de la personne autrice.
6. Dans **Paramètres** → **Assistant IA**, ajoutez à nouveau les connexions et choisissez les modèles pour vos rôles. La restauration efface les connexions enregistrées et les choix de modèles, car la sauvegarde ne contient pas les identifiants. Les identifiants de Skladno restent inchangés.
7. Pour les connexions utilisant une variable d’environnement, ajoutez à nouveau le nom de la variable et vérifiez qu’elle existe dans l’environnement du processus Warplyn. Les sauvegardes ne copient jamais les fichiers `.env` ni leurs valeurs.
8. Choisissez un autre dossier pour les sauvegardes régulières de Warplyn. Configurez à nouveau vos préférences de réseau pour les mises à jour et de télémétrie. La migration ne copie pas les préférences du dossier de sauvegarde, l’identifiant de télémétrie, les mises à jour préparées ni les données de récupération en attente.

Les sauvegardes natives accompagnées d’un dossier `.sqlite.skills` restaurent les *compétences* actuelles de la personne autrice ainsi que l’historique immuable de leurs *versions*. Les anciens instantanés `.sqlite` contenant uniquement la base de données restaurent celle-ci et laissent les *compétences* déjà présentes dans la destination inchangées. Ils ne peuvent pas restaurer les fichiers qu’ils ne contenaient pas. Les noms des fichiers de base de données et les formats des manifestes restent compatibles avec Skladno.

## Récupération

Gardez Skladno installé jusqu’à ce que vous ayez vérifié la restauration. Les applications ne synchronisent pas les modifications ultérieures et ne les fusionnent pas. Si vous revenez à Skladno, il conserve son état d’avant la migration.

Si la restauration échoue, continuez à utiliser Skladno et conservez la paire de fichiers de sauvegarde d’origine. Warplyn valide la sauvegarde et conserve un instantané de récupération de la destination ; si le démarrage échoue, l’application revient à cet instantané. Résolvez le problème signalé, puis réessayez. Consultez [Sauvegardes et récupération](backups-and-recovery.md) et [Récupération après une mise à jour de l’application de bureau](update-recovery.md).

Par défaut, Warplyn utilise `~/.warplyn`. Définissez `WARPLYN_DATA_DIR` pour choisir un autre dossier. Warplyn ignore `SKLADNO_DATA_DIR` pour le stockage actif et refuse les chemins qui chevauchent des emplacements hérités connus. Choisissez un dossier distinct et vide, puis restaurez une sauvegarde au lieu de copier une base de données SQLite active.
