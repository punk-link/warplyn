---
description: "Rédigez et organisez vos articles, comprenez l’enregistrement des brouillons et configurez l’aide orthographique locale."
---

# Rédiger et organiser des articles

Un *article* est un texte de votre bibliothèque Warplyn. Pendant que vous le modifiez, Warplyn enregistre un point de contrôle récupérable du *brouillon*. Une *version enregistrée* est un état conservé dans l’historique de l’*article*. Vous pouvez ainsi continuer à écrire sans considérer chaque modification comme une version définitive.

## Rédiger et enregistrer un article

Choisissez **Nouvel article** dans la Library pour commencer. Renommez l’*article* dans son champ de titre. Utilisez la barre de mise en forme pour ajouter des titres, des listes, de l’emphase, des liens, des citations et du code. Lorsque vous collez du texte mis en forme, Warplyn conserve les formats pris en charge et supprime les balises non sûres ou non prises en charge. Warplyn enregistre l’*article* en Markdown. Les mises en page complexes et les éléments intégrés ne sont donc pas conservés.

Warplyn enregistre automatiquement le *brouillon* actuel pendant que vous écrivez. Un point de contrôle est un texte de travail récupérable, pas une nouvelle entrée dans Historique des versions enregistrées. Consultez l’indicateur d’enregistrement dans la barre d’état de l’article pour savoir si vos modifications récentes ont été enregistrées dans un point de contrôle. Warplyn enregistre aussi un point de contrôle en attente lorsque vous passez à un autre *article* ou ouvrez Paramètres.

[![Espace d’écriture affichant « La rivière au crépuscule » dans l’éditeur, la barre de mise en forme, la bibliothèque et l’indicateur de brouillon enregistré.](/images/writing-workspace.png)](/images/writing-workspace.png)

*Exemple d’article enregistré comme brouillon dans l’espace d’écriture.*

Choisissez **Enregistrer une version** pour conserver le *brouillon* actuel comme état nommé dans son historique. L’enregistrement d’une *version enregistrée* ne supprime pas les précédentes. Si le texte local et le *brouillon* enregistré ne correspondent plus, consultez [Relire des articles](reviewing-articles.md#recover-a-draft).

## Rechercher et organiser des articles

Utilisez la recherche de la Library pour trouver des *articles*, y compris ceux qui sont archivés. Choisissez **Articles** pour parcourir les textes épinglés et récents, ou **Archiver** pour voir les groupes d’*articles* archivés. La Navigation Rail repliée donne accès à **Nouvel article**, **Search**, **Articles** et **Archiver**. Depuis le menu de la Library, épinglez un *article* d’origine pour garder son raccourci dans la barre. Utilisez **Monter** ou **Descendre** pour réorganiser les *articles* épinglés. Épingler et réorganiser ne change pas le contenu des *articles*. Modifiez leur titre dans le champ de titre.

Choisissez **Archiver l’article** pour retirer un groupe d’*articles* de la liste active tout en le conservant dans **Archiver**. Sélectionnez le groupe archivé et choisissez **Désarchiver l’article** pour le rétablir. La suppression d’un *article* demande confirmation et supprime ses *versions enregistrées* ainsi que ses *brouillons* récupérables. La suppression d’un article d’origine supprime aussi ses *traductions* liées ; la suppression d’une *traduction* conserve son *article* source. Si vous souhaitez seulement le mettre de côté, archivez-le.

## Utiliser l’aide orthographique

L’éditeur signale les mots probablement mal orthographiés à l’aide du service de correction orthographique de votre appareil. Dans l’application de bureau, faites un clic droit sur un mot signalé pour choisir une suggestion ou **Ajouter au dictionnaire**. Une correction est une modification ordinaire. Vous pouvez l’annuler et elle est intégrée au *brouillon* actuel. La vérification orthographique reste sur votre appareil et n’envoie pas le texte de l’*article* à un fournisseur d’IA.

Dans **Paramètres** → **Orthographe** sur ordinateur, utilisez **Filtrer les langues** pour trouver une langue, sélectionnez-la sous **Préparer la rédaction hors ligne**, puis choisissez **Télécharger les dictionnaires**. Attendez que son état indique **Téléchargé** avant de compter sur cette langue hors ligne. **Disponible** signifie que la langue est prise en charge, pas que son dictionnaire a fini de télécharger. Choisissez **Décharger** pour cesser d’utiliser un dictionnaire préparé pendant cette session. La préparation des dictionnaires ne change pas la langue d’un *article*. Le téléchargement nécessite une connexion Internet. Sous Windows, l’ajout ou le retrait de mots personnels modifie aussi le dictionnaire du système et peut affecter d’autres applications.

Dans **Dictionnaire personnel**, recherchez les mots enregistrés ou saisissez un mot ou un terme technique par ligne sous **Mots à ajouter**, puis choisissez **Ajouter les mots**. Vous pouvez ajouter jusqu’à 500 mots à la fois. Supprimez les mots enregistrés pour que l’aide orthographique les signale de nouveau. La liste est partagée entre les *articles* et les langues. L’application dans le navigateur utilise les paramètres orthographiques de celui-ci et ne permet pas de gérer les dictionnaires.

Utilisez **Mode concentration** pour masquer les deux panneaux secondaires pendant que vous écrivez. Sélectionnez-le de nouveau pour les afficher. Utilisez la commande de chaque panneau pour le replier ou le rouvrir ; faites glisser le séparateur à côté d’un panneau pour le redimensionner. Dans une fenêtre étroite, les panneaux peuvent s’ouvrir temporairement par-dessus l’éditeur.

Au clavier, utilisez **Tab** et **Shift + Tab** pour parcourir la Library, l’en-tête de l’article, les vues, la barre de mise en forme, l’éditeur, la barre d’état et l’assistant. Dans l’éditeur, la recherche et le Composer, les raccourcis habituels d’édition de texte restent disponibles. Paramètres possède sa propre navigation au clavier. Dans sa barre latérale de bureau, utilisez **Up**, **Down**, **Home** ou **End** pour parcourir les sections, puis **Entrée** ou **Space** pour en ouvrir une.

Pour importer ou exporter un *article* entier dans Warplyn, consultez [Fichiers des articles](article-files.md). Pour sauvegarder tout votre espace de travail, consultez [Sauvegardes et récupération](backups-and-recovery.md).
