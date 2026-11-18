---
description: "Configurez l’apparence de Warplyn, les préférences d’écriture, le comportement de l’assistant, les consignes de publication et les mises à jour de bureau."
---

# Paramètres de l’application

Les paramètres de l’application définissent l’apparence et le comportement de Warplyn. Ils ne font pas partie de l’historique des *versions enregistrées* d’un *article*. Ouvrez **Paramètres** depuis la **zone utilitaire du panneau de la bibliothèque d’articles**. Les paramètres réservés à l’application de bureau sont signalés ci-dessous.

## Définir l’apparence et la langue

Dans **Général** → **Apparence et langue**, choisissez **Système**, **Claire** ou **Sombre** pour **Apparence préférée**. Le mode **Système** suit les paramètres de votre appareil et s’actualise tant que Warplyn reste ouvert. Choisissez une **Langue de l’interface** pour les menus et les messages. L’anglais est actuellement la seule langue d’interface complète. Ces choix ne modifient ni la langue d’écriture ni les règles typographiques d’un *article*.

Dans **Date et heure**, choisissez le format de date, l’affichage de l’heure sur 12 ou 24 heures et un fuseau horaire. Les options système suivent les paramètres de votre appareil. Ces choix modifient l’affichage des heures enregistrées dans Warplyn, pas les heures elles-mêmes.

## Définir les paramètres d’écriture par défaut

Dans **Langues par défaut**, définissez **Langue par défaut des articles** pour les nouveaux *articles*. Définissez **Langues de traduction par défaut** pour que ces langues cibles soient proposées en premier lorsque vous demandez une *traduction*. Saisissez un nom de langue, une variante régionale ou un code, puis choisissez **Ajouter**. Warplyn vous demande toujours de confirmer chaque demande de traduction.

## Définir le comportement de l’assistant

Dans **Assistant IA**, choisissez **Proposer des retouches** par défaut pour les nouvelles conversations sur un *article*, ou activez **Appliquer directement** pour les modifications explicitement demandées. Ce choix par défaut ne modifie pas les conversations existantes, et les autres résultats générés doivent toujours être vérifiés.

**Durée maximale des demandes** s’applique à chaque nouvelle demande et à chaque nouvelle tentative. La durée par défaut est de deux minutes. Choisissez une durée plus longue ou **Illimitée** pour une tâche qui nécessite davantage de temps. Une demande qui dépasse cette limite ne modifie pas votre *article*.

Choisissez **Entrée** ou **Ctrl + Entrée** comme touche d’envoi de l’assistant. Vous pouvez modifier les autres raccourcis de l’application dans **Raccourcis**. Warplyn signale les conflits avant d’enregistrer un raccourci.

## Définir les consignes de publication

Dans **Publication**, choisissez un profil par défaut pour les nouveaux *articles*. Les profils tels que **Publication LinkedIn** et **Article LinkedIn** affichent des indications de longueur dans la barre d’état de l’article. Vous pouvez aussi choisir **Aucune restriction** ou ajouter un profil personnalisé avec un nom et une limite en nombre entier de caractères. Le profil par défaut concerne les nouveaux *articles* ; un *article* existant peut conserver son propre profil. Ces limites sont indicatives et n’empêchent jamais la copie. Dans la barre d’état de l’article, choisissez **Copier en Markdown**, ou ouvrez son menu et choisissez **Copier en texte brut**. Warplyn copie le texte à votre demande, mais ne publie pas directement.

## Choisir les options des modèles d’IA

Dans **Assistant IA**, vous pouvez conserver plusieurs connexions à des fournisseurs, n’activer que celles que vous voulez utiliser et attribuer des modèles différents aux tâches générales de l’assistant et à des *compétences* particulières. Le **Modèle par défaut** est utilisé pour les tâches d’IA, sauf si une tâche a son propre choix. L’**Modèle de l’application**, facultatif, gère des tâches de Warplyn comme les résumés et les titres ; si vous ne le définissez pas, il suit le Modèle par défaut. Utilisez **Favoris**, la recherche ou le filtre par fournisseur pour trouver un modèle. **Niveau de raisonnement** est disponible pour certains modèles OpenAI. Les tâches et les commandes disponibles dépendent du modèle. Consultez [Fournisseurs et modèles d’IA](providers.md) pour configurer les connexions et connaître les limites des fournisseurs.

Dans **Raccourcis**, choisissez un raccourci à côté d’une action, puis appuyez sur la combinaison de touches voulue. Vous pouvez définir des raccourcis pour enregistrer une *version enregistrée*, changer de vue ou activer le Mode concentration. Si une combinaison est déjà utilisée, Warplyn vous indique l’action concernée ; choisissez-en une autre. **Envoyer avec** détermine si **Entrée** ou **Ctrl + Entrée** envoie une demande à l’assistant. Modifier les raccourcis ne change pas le contenu des *articles*.

## Vérifier les mises à jour de bureau

Les applications de bureau empaquetées peuvent rechercher les nouvelles versions dans **Paramètres** → **À propos** → **Mises à jour**. Commencez par autoriser **Autoriser l’accès au réseau pour les mises à jour**. Warplyn pourra alors contacter GitHub pour consulter les informations publiques des versions et les mises à jour que vous choisissez de télécharger. Choisissez ensuite **Rechercher automatiquement les mises à jour** et indiquez si vous souhaitez **Inclure les préversions**. Sélectionnez **Vérifier maintenant** pour lancer une recherche à tout moment. Une nouvelle version disponible affiche ses notes. Les versions Windows et Linux AppImage proposent **Télécharger** et **Installer et relancer**. Les installations Debian proposent **Notes de version**, puis une mise à jour avec le gestionnaire de paquets ou le nouveau programme d’installation `.deb`. Consultez [Récupération après une mise à jour de l’application de bureau](update-recovery.md) si Warplyn ne démarre plus après une mise à jour.

## Supprimer les données locales

Dans l’application de bureau, **Supprimer les données locales** supprime définitivement les données actives de Warplyn, notamment les *articles*, les *versions enregistrées*, les points de contrôle des *brouillons*, l’historique de l’assistant, les données de style, les paramètres et les sauvegardes locales stockées dans ce dossier de données. Si un dossier de sauvegarde est configuré, la confirmation propose **Créer une sauvegarde avant la suppression**. Warplyn doit terminer cette sauvegarde avant de supprimer quoi que ce soit. L’application se ferme une fois la suppression terminée. Une désinstallation ordinaire ne supprime pas vos textes. Les mots personnels enregistrés dans le dictionnaire du système d’exploitation y restent ; pour les supprimer également, effacez-les séparément dans **Paramètres** → **Orthographe**.

Ouvrez **Paramètres** → **À propos** pour trouver le guide utilisateur, le dépôt du code source, le suivi des problèmes et la licence. Choisissez **Ouvrir le guide** pour revoir l’introduction du premier lancement.
