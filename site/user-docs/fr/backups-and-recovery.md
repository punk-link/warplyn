---
description: "Créez des sauvegardes Warplyn automatiques ou manuelles, restaurez vos textes et vos compétences, et récupérez vos données en cas de problème."
---

# Sauvegardes et récupération

## Créer une sauvegarde

Dans **Paramètres** → **Données**, choisissez un **Dossier des sauvegardes**, puis sélectionnez **Sauvegarder**. Dans les navigateurs compatibles, Warplyn demande l’autorisation d’écrire les sauvegardes uniquement dans ce dossier.

[![Paramètres Données avec le dossier de sauvegarde, les commandes Sauvegarder et Restaurer, et les options de sauvegarde automatique.](/images/backups-and-recovery.png)](/images/backups-and-recovery.png)

*Paramètres Données dans l’application de bureau.*

::: tip Contenu d’une sauvegarde
Une nouvelle sauvegarde `.skladno` comprend la base de données, les *compétences* actuelles de la personne autrice, leur historique de *versions de compétence* et un manifeste de fichiers. Les sauvegardes ne comprennent ni les fichiers `.env` ni les clés API.
:::

::: tip Limites des sauvegardes dans le navigateur
Les transferts de sauvegarde depuis le navigateur prennent en charge des fichiers jusqu’à 100 Mo chacun et 500 Mo au total. Pour les données locales plus volumineuses, utilisez l’application de bureau.
:::

Dans l’application de bureau, chaque instantané de base de données est accompagné d’un dossier `.sqlite.skills` contenant les *compétences* actuelles de la personne autrice, leur historique de *versions de compétence*, vos mots personnels d’orthographe et un manifeste. Lors de la copie ou de la restauration d’un instantané, gardez ensemble le fichier `.sqlite` et le dossier `.sqlite.skills`. Les sauvegardes du navigateur n’incluent pas les mots personnels d’orthographe.

Les anciennes sauvegardes `.sqlite` ne contiennent que la base de données. La restauration de l’une d’elles conserve les fichiers et l’historique actuels de vos *compétences*.

## Sauvegardes automatiques

Réglez **Sauvegardes automatiques** sur **Quotidiennes** pour créer un instantané peu après le démarrage de Warplyn, puis toutes les 24 heures tant que l’application reste ouverte. Dans un navigateur, Warplyn doit être autorisé à utiliser le dossier choisi. Si une sauvegarde automatique échoue, vérifiez le dossier et créez une sauvegarde manuelle ; la prochaine tentative planifiée reste activée.

**Conservation des sauvegardes automatiques** définit le nombre d’instantanés automatiques conservés par Warplyn. L’application supprime uniquement les plus anciens ; les sauvegardes créées manuellement sont toujours conservées.

## Restaurer une sauvegarde

1. Dans **Paramètres** → **Données**, sélectionnez **Restaurer**.
2. Choisissez la sauvegarde à restaurer. Warplyn vérifie ses fichiers et conserve une copie de récupération locale de la base de données et des fichiers de *compétences* actuels.
3. À la fin de la restauration, vérifiez vos *articles* et vos *versions enregistrées*.

La restauration d’une sauvegarde `.skladno` ou d’un instantané de bureau accompagné de son dossier remplace la base de données et les *compétences* enregistrées. La restauration d’une ancienne sauvegarde `.sqlite` contenant uniquement la base de données ne remplace que celle-ci.

La restauration d’une sauvegarde de bureau ajoute aussi au dictionnaire les mots personnels d’orthographe qu’elle contient. Les mots déjà présents sont conservés. Les anciennes sauvegardes sans mots personnels ne modifient pas le dictionnaire. Les dictionnaires de langue téléchargés et les choix de préchargement orthographique ne sont pas inclus.

::: warning Paramètres d’IA après la restauration
La restauration conserve les connexions d’IA, les identifiants et les choix de modèles déjà présents sur cette installation. Si aucune connexion n’est configurée, Warplyn restaure depuis la sauvegarde les noms et les références de variables d’environnement, mais jamais les clés API ni les valeurs de ces variables. Définissez les variables manquantes sur cet ordinateur, puis choisissez les modèles dans **Paramètres** → **Assistant IA**. Les connexions utilisant des clés API enregistrées ne sont pas importées dans une nouvelle installation ; ajoutez-les dans Paramètres. Les autres paramètres sont restaurés. Si la restauration échoue et est annulée, votre configuration d’IA précédente est conservée.
:::

## Restaurer manuellement une sauvegarde contenant uniquement la base de données

Suivez ces étapes uniquement pour une ancienne sauvegarde `.sqlite`. Laissez Warplyn fermé jusqu’à ce que la base de données soit remise en place.

1. Faites une copie de votre base de données locale actuelle.
2. Copiez la sauvegarde par-dessus `skladno.sqlite` dans le dossier de données Warplyn configuré.
3. Démarrez Warplyn et vérifiez vos *articles* et vos *versions enregistrées*.

Pour restaurer une sauvegarde qui contient des *compétences*, utilisez **Restaurer** dans **Paramètres** afin que Warplyn vérifie et restaure aussi le manifeste et l’historique des *versions de compétence*.

## Si la création d’une sauvegarde échoue

Warplyn ne modifie ni la base de données active ni la session d’écriture. Vérifiez que le dossier de destination existe et que votre compte peut y écrire, puis réessayez.

## Autorisations des fichiers

Par défaut, le service local stocke la base de données dans `~/.warplyn`. Définissez `WARPLYN_DATA_DIR` pour choisir un autre dossier. Warplyn ignore `SKLADNO_DATA_DIR` et n’utilise pas de dossier qui chevauche l’ancien emplacement des données de Skladno. Si vous migrez depuis Skladno, choisissez un dossier Warplyn distinct et restaurez une sauvegarde.

Sur les systèmes POSIX, Warplyn limite l’accès au dossier de données et aux fichiers SQLite à votre compte, y compris après une mise à niveau. Sous Windows, les autorisations du système de fichiers sont gérées par Windows. Les fichiers de sauvegarde créés dans le navigateur héritent des autorisations du dossier choisi. Conservez-les dans un dossier privé et vérifiez les paramètres de partage avant d’utiliser un emplacement partagé ou synchronisé.
