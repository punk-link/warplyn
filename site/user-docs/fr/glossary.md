---
description: "Définitions des articles, brouillons, versions enregistrées, propositions, observations et compétences de Warplyn."
---

# Glossaire de Warplyn

Retrouvez ici les termes que vous rencontrez dans Warplyn et dans ce guide.

## Articles et versions

- **Article** : texte de votre bibliothèque que vous pouvez restaurer séparément. Warplyn utilise « article » plutôt que « document ».
- **Bibliothèque d’articles** : collection locale d’*articles* de la personne autrice. L’**article actuel** est ouvert dans l’espace de travail ; la **liste d’articles** présente la collection.
- **Brouillon** : texte d’un *article* en cours de modification qui n’a pas encore été enregistré comme *version enregistrée*.
- **Point de contrôle du brouillon** : état récupérable et modifiable du *brouillon*, enregistré localement et lié à une *version enregistrée* de base. Ce n’est pas une *version enregistrée*. Un **brouillon actuel** est basé sur la *version enregistrée* actuelle de l’*article* ; un **brouillon obsolète** est basé sur une version antérieure.
- **Version enregistrée** : texte d’un *article* tel qu’il était au moment de l’enregistrement. Une fois enregistrée, cette version ne change plus.
- **Enregistrement d’une version** : action explicite de la personne autrice qui enregistre le *brouillon actuel* comme nouvelle *version enregistrée*. Elle efface uniquement le point de contrôle correspondant du *brouillon*.
- **Proposition** : contenu ou modifications générés par l’IA qui nécessitent l’approbation explicite de la personne autrice.
- **Version de base de la proposition** : *version enregistrée* examinée pour produire une *proposition*. Celle-ci devient obsolète lorsqu’elle ne correspond plus à la *version enregistrée* actuelle.
- **Sélection des modifications** : partie d’une *proposition* que la personne autrice choisit d’accepter. L’acceptation crée une nouvelle *version enregistrée*.
- **Observation** : résultat informatif, par exemple une vérification des faits ou une relecture du style, qui ne modifie pas un *article*.
- **Article source** et **article traduit** : *articles* liés et récupérables indépendamment. Une traduction n’est jamais une *version enregistrée* de sa source.

## Travail éditorial

- **Capacité éditoriale** : opération Warplyn validée qui déclare le contexte de l’*article* qu’elle peut utiliser, ses prérequis et son résultat. Les vues de l’espace de travail et les compétences de l’assistant peuvent invoquer la même capacité.
- **Compétence** : paquet d’instructions réutilisable qui aide l’assistant à choisir et à organiser les capacités éditoriales pour répondre à une demande. Une *compétence* n’accorde aucune capacité ni autorisation. Une **compétence intégrée** est fournie avec Warplyn. Une **compétence créée par la personne autrice** est un paquet Markdown local créé dans le chat de l’assistant et possède un historique distinct de *versions de la compétence*.
- **Opération éditoriale** : activité de l’assistant demandée par la personne autrice, comme rédiger, améliorer la fluidité, vérifier les faits, relire le style ou traduire.
- **Demande éditoriale** : exécution d’une opération éditoriale.
- **Session éditoriale** : séquence d’interactions et historique d’activité des demandes éditoriales.
- **Consignes éditoriales** : instructions ou contexte fournis par la personne autrice avec une demande éditoriale.
- **Corpus de style** : échantillons d’écriture locaux fournis par la personne autrice. Le **profil de style** résume les caractéristiques que Warplyn relève dans ces textes.
- **Étape du flux de travail** : indication facultative sur l’avancement, choisie par la personne autrice. Elle ne lance jamais d’IA et ne modifie pas le contenu d’un *article*.

## Publication et paramètres

- **Profil de publication** : consignes configurables pour une plateforme, y compris une limite de caractères. Le profil par défaut ne s’applique qu’aux nouveaux *articles*.
- **Texte à publier** : texte Markdown ou brut explicitement copié depuis l’*article* actuel avec la barre d’état de l’article. Warplyn ne fournit pas de vue de prévisualisation de publication dans l’espace de travail.
- **Paramètres de l’application** : préférences de l’espace de travail, configuration de l’IA, profils de publication et gestion des données locales. Les paramètres ne font jamais partie de l’historique des *versions enregistrées* d’un *article*.
- **Connexion d’IA** : configuration nommée d’un fournisseur sur le serveur, avec une source d’identifiants. La **connexion d’IA active** est utilisée pour les nouvelles demandes éditoriales.
- **Source d’identifiants** : source privée utilisée par une connexion d’IA. Il s’agit d’une référence à une variable d’environnement ou d’un identifiant géré.
- **Identifiant géré** : clé API conservée dans le gestionnaire d’identifiants du système d’exploitation. Warplyn conserve les métadonnées de connexion, mais n’écrit jamais la clé dans SQLite ni dans un instantané de sauvegarde.
- **Préférence de modèle** : identifiant du modèle par défaut ou remplacement spécifique à une opération éditoriale.
- **Langue de l’interface** : langue de l’interface Warplyn, distincte des langues des *articles* et de leurs traductions.
- **Langue par défaut des articles** : langue attribuée à un nouvel *article* si aucune langue n’est fournie.
- **Langues de traduction par défaut** : langues proposées en premier, dans l’ordre choisi, pour les demandes de traduction. Elles ne lancent jamais les traductions automatiquement.
- **Dossier de sauvegarde** : répertoire local dans lequel Warplyn écrit les instantanés de sauvegarde.
- **Instantané de sauvegarde** : copie cohérente des données locales à un moment donné, distincte de la base de données active et excluant les identifiants.
- **Emplacement des données** : répertoire local actif qui contient les données SQLite de Warplyn.
- **Déplacement des données** : copie et redémarrage confirmés par la personne autrice qui basculent Warplyn vers un nouvel emplacement des données tout en conservant l’ancienne copie pour récupération.
- **Instantané de récupération** : instantané de sauvegarde conservé avant que Warplyn remplace les données actives pendant une restauration.
- **Mise à jour de l’application** : version empaquetée plus récente de Warplyn que le client de bureau peut rechercher, télécharger et appliquer uniquement selon les étapes contrôlées par la personne autrice. Une mise à jour ne modifie jamais le contenu d’un *article* d’elle-même.
- **Mise à jour de sécurité** : mise à jour de l’application dont l’étiquette de version se termine par `.security`. Warplyn affiche un avertissement, mais ne force jamais la recherche, le téléchargement ou le redémarrage.
- **Mise à jour préparée** : mise à jour de l’application téléchargée qui attend que la personne autrice choisisse **Installer et relancer**. Une fermeture ordinaire ne l’applique pas.
- **Instantané préalable à la mise à jour** : instantané de sauvegarde des données locales créé avant que Warplyn applique une mise à jour préparée. Sa restauration nécessite la version précédente correspondante de l’application.
- **Événement de diagnostic** : enregistrement local du service, expurgé, écrit dans les journaux du processus hôte pour faciliter le diagnostic du démarrage ou d’un échec récupérable. Il ne contient jamais de contenu privé d’*article*, de corps de modèle ni de valeurs de variables d’environnement.

## Interface

### Plan de l’espace de travail

Schéma de l’application de bureau avec les deux panneaux latéraux ouverts et l’éditeur d’article sélectionné. Les encadrés indiquent l’emplacement et le regroupement, pas les dimensions exactes.

```text
Espace de travail éditorial
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Panneau bibliothèque    │ Espace de travail de        │ Panneau assistant       │
│ d’articles               │ l’article                    │ éditorial               │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · Nouvel article │ En-tête de l’article         │ En-tête de l’assistant   │
│ Commande réduire         │ Titre et métadonnées article│ Commande réduire         │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Recherche d’articles     │ Barre des vues de l’espace  │ Conversation             │
├──────────────────────────┼──────────────────────────────┤ État de la demande       │
│ Liste d’articles         │ Vue de l’espace de travail  │ et activité              │
│                          │                              │                          │
│                          │ Éditeur d’article             │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Zone d’écriture           │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Bibliothèque d’articles │                              │ Actions rapides          │
│ zone utilitaire          │                              │ Champ de message         │
│ Profil de style ·        ├──────────────────────────────┤ Consignes éditoriales   │
│ Paramètres               │ Barre d’état de l’article    │ et Envoyer               │
│ Langue · Local           │ Enregistrement · Métadonnées · Copier│                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

En bas du panneau de la bibliothèque, lorsqu’il est ouvert, se trouve la **zone utilitaire du panneau de la bibliothèque d’articles**. Sa rangée inférieure indique le code de langue de l’*article* actuel et l’étiquette **Local**. La **barre d’état de l’article**, sous la vue centrale de l’article, indique l’état d’enregistrement.

### Termes de l’interface

- **Espace de travail éditorial** : écran principal d’écriture contenant le panneau de la bibliothèque d’articles, l’espace de travail de l’article et le panneau de l’assistant éditorial.
- **Panneau de la bibliothèque d’articles** : recherche d’articles, liste d’articles et accès aux fonctions de l’espace de travail. Lorsqu’il est replié, il devient la **barre de navigation** ; sur un petit écran, il s’ouvre temporairement sous la forme d’un **tiroir de navigation**.
- **Zone utilitaire du panneau de la bibliothèque d’articles** : pied du panneau développé, qui contient le profil de style, les paramètres, une commande de mise à jour lorsqu’elle est pertinente et le code de langue de l’article actuel avec l’étiquette **Local**.
- **Indicateur d’enregistrement** : état de la barre d’état de l’article qui précise si le *brouillon* actuel est enregistré, en cours d’enregistrement ou nécessite votre attention.
- **Espace de travail de l’article** : en-tête de l’article, barre des vues de l’espace de travail, vue sélectionnée et barre d’état de l’article.
- **En-tête de l’article** : commandes du titre et des métadonnées situées au-dessus de la barre des vues de l’espace de travail.
- **Barre des vues de l’espace de travail** : onglets servant à sélectionner une vue de l’espace de travail.
- **Vue de l’espace de travail** : éditeur d’article sélectionné ou vue complémentaire, comme Examen des propositions, Historique des versions enregistrées, Vérification des faits ou Traductions.
- **Profil de style** : écran séparé qui présente les caractéristiques détectées, les *observations* de révision du style, les règles typographiques, les consignes manuelles et les échantillons d’écriture.
- **Éditeur d’article** : vue d’écriture. Sa principale zone de modification est la **zone d’écriture**.
- **Barre d’état de l’article** : barre sous la vue sélectionnée, qui indique l’état et les métadonnées de l’article, la langue, les consignes du profil de publication et les commandes de copie.
- **Panneau de l’assistant éditorial** : consignes éditoriales, actions, état des demandes et activité. Sur un petit écran, il s’ouvre temporairement sous la forme **tiroir de l’assistant**.
- **Actions rapides** : menu déroulant au-dessus du champ de message de l’assistant, qui permet d’insérer une compétence intégrée dans une demande.
- **Champ de message de l’assistant** : champ en bas du panneau de l’assistant éditorial, dans lequel la personne autrice saisit des consignes éditoriales et envoie une demande.
- **Navigation des paramètres de l’application** : navigation entre **Général**, **Raccourcis**, **Fournisseurs**, **Assistant IA**, **Publication**, **Langues par défaut**, **Orthographe**, **Données** et **À propos**.
