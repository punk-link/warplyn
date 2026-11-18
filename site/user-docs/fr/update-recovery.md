---
description: "Récupérez Warplyn après l’échec d’une mise à jour de bureau avec la version précédente et l’instantané correspondant."
---

# Récupération après une mise à jour de l’application de bureau

Les mises à jour préliminaires sont facultatives. Si Warplyn ne démarre pas après une mise à jour, réinstallez la version préliminaire précédente et restaurez l’instantané correspondant, créé avant la mise à jour.

::: warning N’ouvrez pas la base de données la plus récente
N’ouvrez pas avec une ancienne version une base de données créée par une version préliminaire plus récente. Restaurez d’abord l’instantané enregistré avant la mise à jour.
:::

1. Téléchargez et réinstallez la version préliminaire précédente depuis sa [version GitHub](https://github.com/punk-link/warplyn/releases).
2. Restaurez l’instantané SQLite correspondant, enregistré par Warplyn avant la mise à jour.
3. Démarrez la version préliminaire précédente et vérifiez vos *articles*, vos *brouillons*, vos *versions enregistrées* et vos paramètres.

## AppImage pour Linux

Conservez votre AppImage dans un dossier où vous avez le droit d’écrire. Consultez [Installer Warplyn](installation.md#linux-appimage) pour connaître les exigences d’exécution, le lancement et l’intégration facultative au bureau. La validation de l’installation AppImage au bureau est en attente.

Après avoir autorisé l’accès de mise à jour à GitHub, choisissez **Télécharger**, puis **Installer et relancer**. Une fermeture normale n’installe pas la mise à jour téléchargée. Les paquets Debian continuent d’utiliser le gestionnaire de paquets.

Si une mise à jour AppImage ne démarre pas, fermez Warplyn. L’exécutable précédent est conservé à côté de l’image avec le suffixe `.previous`. En suivant l’avertissement ci-dessus, restaurez l’instantané correspondant créé avant la mise à jour avant de lancer la version précédente. Gardez les deux exécutables et l’instantané jusqu’à la réussite de la récupération. Si vous ne pouvez pas écrire dans le dossier de l’image, déplacez-la vers un dossier qui vous appartient ou téléchargez manuellement son remplacement. Ne désactivez pas le bac à sable d’Electron pour lancer l’image.
