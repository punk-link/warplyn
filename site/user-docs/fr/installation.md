---
description: "Installez Warplyn sous Windows ou Linux avec les paquets Debian ou AppImage, puis configurez votre espace de travail d’écriture."
---

# Installer Warplyn

Warplyn est disponible pour Windows 11 x64 et Linux. Téléchargez les installateurs actuels depuis les [versions de Warplyn](https://github.com/punk-link/warplyn/releases). Si vous utilisez Skladno, suivez le [guide de migration](migration.md) et conservez son installation et ses sauvegardes jusqu’à ce que vous ayez vérifié la restauration de votre travail.

## Windows

1. Ouvrez la page des [versions de Warplyn](https://github.com/punk-link/warplyn/releases).
2. Dans **Assets**, téléchargez le programme d’installation Windows `.exe`, puis exécutez-le.
3. Si Windows affiche un avertissement SmartScreen, vérifiez que le programme d’installation provient de la page des versions de ce dépôt. Les versions ne sont pas signées numériquement.
4. Ouvrez Warplyn depuis le menu Démarrer.

Pour connaître les commandes de mise à jour et les options de récupération, consultez la page [Récupération après une mise à jour de l’application de bureau](update-recovery.md).

::: info À propos des signatures numériques
Une signature numérique utilise un certificat de signature de code pour identifier l’éditeur et indiquer si un programme d’installation a été modifié depuis sa signature. Elle ne garantit pas qu’un logiciel est sûr. Warplyn n’a pas encore établi la signature de son éditeur. Windows ne peut donc pas vérifier l’éditeur à partir du programme d’installation. Téléchargez-le uniquement depuis la page officielle des versions.
:::

## Debian et distributions basées sur Debian

Ubuntu 22.04 x64 est la cible Debian principale validée. La compatibilité avec les autres versions des distributions n’est pas garantie. Utilisez un système amd64 avec une session graphique.

1. Ouvrez la page des [versions de Warplyn](https://github.com/punk-link/warplyn/releases).
2. Dans **Assets**, téléchargez le paquet `warplyn_VERSION_amd64.deb`.
3. Ouvrez un terminal dans le dossier où vous l’avez téléchargé. Si ce dossier ne contient que ce paquet Warplyn, installez-le avec :

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. Ouvrez Warplyn depuis le menu des applications.

Pour effectuer une mise à jour manuelle, téléchargez le nouveau fichier `.deb` et exécutez la même commande `sudo apt install` avec ce fichier. Le téléchargement ne configure pas de dépôt de paquets automatique. Apt résout les dépendances déclarées. Ne forcez pas l’installation si elles ne peuvent pas être satisfaites.

Par défaut, Warplyn stocke vos textes dans `~/.warplyn`. Faites-en une sauvegarde avant une mise à jour. La réinstallation ou la désinstallation de l’application devrait préserver ce dossier ainsi que les identifiants enregistrés dans le trousseau du bureau.

Sous Linux, les clés API gérées nécessitent un service Secret Service disponible et déverrouillé, tel que GNOME Keyring. Consultez [Fournisseurs et modèles d’IA](providers.md) pour découvrir d’autres options de connexion.

Si une clé ne peut pas être enregistrée ou lue, déverrouillez le trousseau du bureau, puis réessayez. Si votre session ne dispose pas de Secret Service, activez-en un ou utilisez une connexion par variable d’environnement décrite dans ce guide. La rédaction hors ligne reste possible. Ne désactivez pas le bac à sable pour contourner les échecs de démarrage. Signalez la distribution, sa version et l’erreur.

### AppImage pour Linux {#linux-appimage}

Si une version comprend un fichier `.AppImage` x64, placez-le dans un dossier où vous avez le droit d’écrire. Téléchargez-le depuis les [versions de Warplyn](https://github.com/punk-link/warplyn/releases), rendez-le exécutable dans votre gestionnaire de fichiers, puis lancez-le. Vous pouvez aussi exécuter `chmod +x Warplyn-*-linux-x64.AppImage` dans le dossier de téléchargement. Linux nécessite la prise en charge de FUSE avec un accès à `/dev/fuse`, les bibliothèques de bureau d’Electron et un trousseau Secret Service pour les identifiants gérés. AppImage ne fournit ni session de bureau ni trousseau.

Pour la cible Ubuntu 22.04, les dépendances du bureau comprennent `libgtk-3-0`, `libnss3`, `libasound2`, `libatk-bridge2.0-0`, `libdrm2`, `libgbm1`, `libxkbcommon0`, `libnotify4`, `libxcb-dri3-0` et `xdg-utils`. GNOME Keyring fournit Secret Service. Une installation standard de GNOME fournit la plupart de ces paquets. Les autres distributions utilisent des noms de paquets différents et nécessitent leurs propres vérifications de compatibilité.

L’intégration au bureau est facultative. Créez un lanceur qui pointe vers le chemin complet de votre image. Conservez ce même chemin lors des mises à jour. La validation de l’intégration AppImage au bureau est en attente. Ubuntu 22.04 x64 est la cible principale de validation ; Ubuntu 24.04 x64 et Fedora 43 x64 sont des cibles de compatibilité supplémentaires. Cela ne garantit pas la prise en charge de toutes les distributions Linux.

Consultez [Récupération après une mise à jour de l’application de bureau](update-recovery.md) pour les étapes de téléchargement, de redémarrage et de récupération.

Pour ajouter Warplyn au menu des applications, vous pouvez renommer l’image en `Warplyn.AppImage` et la placer dans un dossier `Applications` de votre dossier personnel. Si le dossier `~/.local/share/applications` n’existe pas, créez-le, puis enregistrez-y le fichier suivant sous le nom `warplyn.desktop`. Remplacez `YOUR_USER` par votre nom d’utilisateur Linux, ou utilisez le chemin complet vers l’image :

```ini
[Desktop Entry]
Type=Application
Name=Warplyn
Exec="/home/YOUR_USER/Applications/Warplyn.AppImage" %U
Terminal=false
Categories=Office;
StartupWMClass=Warplyn
```

L’entrée du menu reste valide, car les mises à jour dans l’application remplacent l’image au même emplacement. Pour ajouter l’icône Warplyn, exécutez `./Warplyn.AppImage --appimage-extract warplyn.png` à côté de l’image, placez le PNG extrait dans un emplacement permanent, puis ajoutez `Icon=` suivi de son chemin complet dans le fichier du lanceur.

## Après l’installation

Pour utiliser les fonctions d’IA, ajoutez une connexion de fournisseur dans **Paramètres** → **Assistant IA**. Choisissez un **Dossier des sauvegardes** dans **Paramètres** → **Données** pour protéger vos *articles*.

Warplyn conserve les *articles* et les points de contrôle de *brouillon* sur votre ordinateur. Les requêtes d’IA nécessitent une connexion Internet et transmettent au fournisseur choisi le texte et le contexte pertinents de l’*article*. Les politiques de données et les tarifs du fournisseur s’appliquent.
