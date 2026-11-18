---
description: "Enregistrez ou chargez des articles entiers au format Markdown, HTML, DOCX ou RTF."
---

# Fichiers des articles

Utilisez **Enregistrer dans un fichier** et **Charger un fichier** pour transférer des *articles* entiers entre Warplyn et d’autres outils d’écriture. Ces commandes sont disponibles dans l’application de bureau et dans l’application web.

## Enregistrer dans un fichier

1. Ouvrez l’*article* à enregistrer.
2. Dans l’en-tête de l’article, choisissez **Enregistrer dans un fichier** à côté de **Enregistrer une version**. Vous pouvez aussi faire un clic droit sur un *article* dans la Library et choisir **Enregistrer dans un fichier…** sans l’ouvrir.
3. Dans la fenêtre d’enregistrement de l’application de bureau, sélectionnez Markdown, HTML, DOCX ou RTF dans la liste des types de fichiers, puis indiquez un nom et un emplacement. Conservez l’extension correspondant au format. Dans l’application web, choisissez **Format du fichier**, puis **Télécharger**, et utilisez les commandes de téléchargement du navigateur.

Le fichier contient l’intégralité du *brouillon* actuel, y compris les modifications non enregistrées. La sélection de texte ne limite pas le contenu enregistré. Cette commande ne crée pas de *version enregistrée*. **Enregistrer une version** reste la commande pour ajouter le *brouillon* actuel à votre historique.

::: tip Vous avez besoin d’une copie transportable de votre espace de travail ?
Les fichiers d’*article* ne contiennent que le texte. Pour conserver l’historique, le travail de l’assistant, les *compétences* et les paramètres, créez une [sauvegarde](backups-and-recovery.md).
:::

L’application web affiche **Téléchargement de l’article lancé** lorsqu’elle transmet le fichier au navigateur. Consultez les téléchargements du navigateur pour vérifier que le transfert est terminé ou repérer une erreur.

## Charger depuis un fichier

1. Dans l’en-tête de l’article, choisissez **Charger un fichier** à côté de **Enregistrer une version**, ou faites un clic droit sur un *article* dans la Library et choisissez **Charger un fichier…**. Si la Library est vide, choisissez d’abord **Créer**.
2. Sélectionnez un fichier `.md`, `.html`, `.htm`, `.docx` ou `.rtf`.
3. Pour les fichiers HTML, DOCX et RTF, cochez **Vérifier l’article importé**, puis choisissez **Importer**. Vous pouvez annuler la vérification. Les fichiers Markdown s’ouvrent directement.
4. Warplyn ouvre le texte importé dans un *article* distinct. L’*article* précédent et son *brouillon* récupérable restent accessibles dans la Library.

Un titre de niveau 1 au début du fichier fournit le nouveau titre. Sinon, Warplyn utilise le nom du fichier sans son extension. Le titre reste dans le corps de l’*article*. Si vous chargez à nouveau le même fichier, Warplyn crée un autre *article* indépendant.

::: warning Le chargement crée un article distinct
Le chargement d’un fichier ne remplace pas l’*article* depuis lequel vous avez ouvert le sélecteur. Vérifiez l’*article* importé, puis déplacez ou supprimez l’un ou l’autre si nécessaire.
:::

Choisissez un fichier de 10 Mio maximum. Les fichiers Markdown et HTML doivent être encodés en UTF-8. DOCX et RTF fonctionnent sans que Microsoft Office soit installé.

Warplyn conserve les paragraphes, les titres, les listes imbriquées et leur numérotation modifiables, le gras, l’italique, le texte barré, les liens sûrs, les citations, le code et le texte Unicode pris en charge par le format source. La mise en page, les polices, les images, les objets intégrés et les fonctions complexes propres à certains formats peuvent être omis ou simplifiés. Le texte des tableaux devient du contenu ordinaire de l’*article*. Vérifiez l’aperçu d’importation avant de continuer. Les extensions Markdown non prises en charge peuvent aussi perdre leur mise en forme dans l’éditeur.

Vous pouvez annuler le sélecteur de fichiers sans rien importer. Si Warplyn ne peut pas enregistrer le *brouillon* actuel pour le récupérer, corrigez l’erreur d’enregistrement avant de réessayer.

## Enregistrer une version dans un fichier

1. Ouvrez **Versions**.
2. Ouvrez la *version enregistrée* à exporter.
3. Choisissez **Enregistrer dans un fichier** à côté de ses détails.

Le fichier contient l’intégralité de l’*article* de cette *version enregistrée*, quel que soit votre *brouillon* actuel. L’exportation ne restaure pas cette version et ne modifie pas l’historique. Le nom de fichier proposé contient le numéro de la *version enregistrée*.

L’exportation de fichiers est également limitée à 10 Mio. Si l’enregistrement échoue dans l’application de bureau, choisissez un emplacement accessible en écriture, puis réessayez. Si le remplacement échoue, le fichier de destination existant reste intact.

Les fichiers exportés contiennent le texte de l’*article*, pas tout son historique, les conversations ni les paramètres. Pour protéger l’ensemble de l’espace de travail, consultez [Sauvegardes et récupération](backups-and-recovery.md).
