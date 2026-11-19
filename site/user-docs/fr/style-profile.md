---
description: "Créez un profil de style local à partir de vos textes et gérez des règles de ton et de typographie."
---

# Profil de style

Dans le **Profil de style**, ajoutez des exemples de vos textes et indiquez à l’assistant les règles à suivre lors de ses prochaines révisions. Vos échantillons restent sur cet appareil. Ils ne font partie ni d’un *article* ni d’une *version enregistrée*.

Ouvrez le **Profil de style** depuis la zone utilitaire du panneau de la bibliothèque d’articles. Utilisez le menu latéral ou, dans une fenêtre étroite, le sélecteur de section pour choisir **Échantillons d’écriture**, **Règles manuelles** ou **Règles typographiques**. Le bouton **Retour** vous ramène à votre *article* et à la vue que vous aviez quittée.

::: tip Choisir un point de départ
Ajoutez des échantillons d’écriture pour détecter les caractéristiques de votre voix, ou des **Règles manuelles** si vous savez déjà quelles consignes donner. Vous pouvez utiliser l’un sans l’autre.
:::

## Ajouter des échantillons d’écriture

Ouvrez **Échantillons d’écriture** si vous souhaitez que l’assistant s’inspire de vos textes existants. Choisissez **Ajouter un échantillon d’écriture** pour coller du texte ou importer un fichier `.txt` ou `.md`. Vous pouvez aussi choisir **Ajouter cet article** pour utiliser comme échantillon une version enregistrée d’un *article*. Donnez à chaque échantillon un nom qui vous aidera à le reconnaître plus tard.

Utilisez la case à cocher de l’échantillon pour l’inclure dans le profil ou l’en exclure. Un échantillon exclu reste dans votre liste. Supprimez un échantillon lorsque vous n’en avez plus besoin. Une confirmation est demandée, car sa suppression l’efface du profil de style.

## Ajouter des consignes et reconstruire le profil

Utilisez **Règles manuelles** pour décrire les préférences que l’assistant doit respecter. Vous pouvez, par exemple, lui demander de garder une narration à la première personne ou de développer une abréviation à sa première occurrence. Vous pouvez ajouter des consignes sans fournir d’échantillons.

Après avoir modifié les échantillons ou les consignes, choisissez **Reconstruire le profil** pour actualiser les caractéristiques détectées. Le profil indique les échantillons utilisés et la date de sa reconstruction. Tant que vous n’avez pas reconstruit le profil, les caractéristiques affichées peuvent encore refléter l’ancienne sélection d’échantillons. Les *observations* de révision du style sont des avis qui restent séparés du texte de l’*article*.

[![Écran Règles manuelles du Profil de style avec une règle générale sur le point de vue d’Ana et la commande Reconstruire le profil.](/images/style-profile-rules.png)](/images/style-profile-rules.png)

*Exemple de règle manuelle dans le Profil de style.*

::: details Exemple de règle manuelle
Écrivez des scènes qui conservent le point de vue rapproché d’Ana et des images discrètes, excluez les échantillons que vous ne souhaitez pas utiliser, puis reconstruisez le profil. Ajoutez une règle comme « Garder la narration proche du point de vue d’Ana » si cette préférence doit s’appliquer même lorsque les échantillons ne la montrent pas clairement.
:::

## Règles typographiques

Ouvrez **Règles typographiques**, puis sélectionnez **Langue de la typographie**. Les conventions sont enregistrées séparément pour chaque langue d’écriture, indépendamment de la langue de l’interface. **Appliquer les règles à** permet de choisir entre **Tous les articles dans cette langue** et **Cet article uniquement**. Une *traduction* utilise sa propre langue et ses propres préférences.

Le menu **Langue source** de la barre d’état comprend des variantes régionales du catalogue prédéfini. Pour une autre langue, choisissez **Autre langue…** et saisissez son code, par exemple `ja` pour le japonais. Vous pouvez ensuite enregistrer des règles typographiques personnalisées pour cette langue, même sans préréglage intégré.

Utilisez **Ajouter une règle** pour choisir les guillemets, les tirets de prose, les points de suspension, l’espacement autour de la ponctuation, les espaces répétés ou une paire de termes insécables comme `10 kg`. **Paire personnalisée** permet de définir les guillemets ouvrants et fermants ainsi que les espaces à l’intérieur. **Remplacement littéral de ponctuation** applique une convention précise de ponctuation ou d’espacement. Utilisez **Consigne typographique contextuelle** lorsqu’une règle nécessite une interprétation.

::: info Langue et portée
Choisissez la langue d’écriture et indiquez si les règles s’appliquent à tous les *articles* dans cette langue ou uniquement à l’*article* actuel. Une *traduction* possède ses propres préférences de langue et de typographie.
:::

**Conventions prédéfinies** affiche des aperçus des conventions régionales. Les aperçus marqués **en attente de relecture par un locuteur natif** ne peuvent pas encore être appliqués ; vous pouvez définir vos propres règles. Les conventions d’une région ne s’appliquent pas automatiquement aux autres. Si vos règles précédentes s’appliquaient partout, **Copier les anciennes règles vers cette langue** en attribue une copie à cette langue sans supprimer les originales.

Les règles de l’*article* héritent des conventions enregistrées pour sa langue. Modifier une règle héritée la remplace ; la supprimer la désactive pour cette portée. **Rétablir les règles héritées** efface ces remplacements. Changer de langue conserve les modifications de règles non enregistrées tant que le Profil de style reste ouvert.

Les règles s’affichent sous forme de résumés compacts marqués **Enregistrée** ou **Non enregistrée**. Choisissez **Modifier** pour ouvrir une règle. Une seule règle peut être modifiée à la fois. Sélectionnez **Enregistrer** pour conserver les règles de la portée choisie. Lorsque vous enregistrez les préférences de langue, Warplyn reconstruit le *Profil de style* sur votre appareil à partir des échantillons sélectionnés à ce moment-là et des consignes déjà enregistrées. Les remplacements propres à un *article* sont enregistrés pour cet *article*. Le texte non enregistré dans les autres formulaires le reste. Vous pouvez utiliser des règles typographiques explicites sans échantillons d’écriture ; les échantillons sont nécessaires pour déduire les caractéristiques de votre voix.

Enregistrez le *brouillon* actuel, puis sélectionnez **Vérifier la typographie** pour vérifier l’*article* choisi sans connexion à un service d’IA. La vérification utilise la *version enregistrée* et sa langue, indiquées dans la barre d’état. Choisissez cette même langue dans **Langue de la typographie**. Le code, les URL, les identifiants techniques et les cas ambigus de guillemets restent inchangés. Pour vérifier les règles contextuelles, utilisez l’action **Réviser le style** avec l’assistant. Si aucune règle mécanique ne s’applique à une langue, la vérification typographique locale ne la couvre pas ; ajoutez et enregistrez vos propres règles avant de la vérifier.

Ouvrez **Examiner la proposition** pour examiner les corrections et les règles qui les justifient. Marquez les corrections à accepter, puis choisissez **Appliquer**. Les corrections acceptées créent une *version enregistrée* ; si vous les rejetez toutes, l’*article* reste inchangé. L’enregistrement de règles ou le lancement d’une vérification n’applique aucune correction. Une vérification conserve la langue et les définitions de règles qu’elle a utilisées. Si vous changez de langue ou de préférences applicables, un avis vous propose de la relancer. La typographie ne détecte pas les changements de langue au sein de passages multilingues. Les cas ambigus restent inchangés.
