---
description: "Odzyskaj Warplyn po nieudanej aktualizacji aplikacji desktopowej, używając poprzedniej wersji i odpowiadającej jej migawki."
---

# Odzyskiwanie po aktualizacji aplikacji desktopowej

Aktualizacje wersji preview są opcjonalne. Jeśli po aktualizacji Warplyn się nie uruchamia, zainstaluj ponownie poprzednią wersję preview. Następnie przywróć dane z migawki zapisanej przed tą aktualizacją.

::: warning Nie otwieraj nowszej bazy danych
Nie otwieraj bazy danych utworzonej przez nowszą wersję preview w starszej wersji aplikacji. Najpierw przywróć migawkę zapisaną przed aktualizacją.
:::

1. Pobierz i ponownie zainstaluj poprzednią wersję preview z [wydania GitHub](https://github.com/punk-link/warplyn/releases).
2. Przywróć odpowiadającą jej migawkę SQLite zapisaną przez Warplyn przed aktualizacją.
3. Uruchom poprzednią wersję preview i sprawdź swoje *artykuły*, *szkice*, *zapisane wersje* oraz ustawienia.

## Linux AppImage

Przechowuj AppImage w folderze, do którego możesz zapisywać. Wymagania środowiska uruchomieniowego, sposób uruchamiania i opcjonalną integrację z pulpitem opisano w sekcji [Instalacja Warplyn](installation.md#linux-appimage). Weryfikacja AppImage w środowisku pulpitu jest w toku.

Po zezwoleniu na dostęp do aktualizacji GitHub wybierz **Pobierz**, a następnie **Uruchom ponownie i zaktualizuj**. Zwykłe zamknięcie aplikacji nie instaluje pobranej aktualizacji. Pakiety Debian nadal aktualizuje się za pomocą menedżera pakietów.

Jeśli Warplyn nie uruchamia się po aktualizacji AppImage, zamknij aplikację. Plik wykonywalny poprzedniej wersji znajdziesz w tym samym folderze co obraz. Jego nazwa kończy się na `.previous`. Zgodnie z powyższym ostrzeżeniem przed uruchomieniem poprzedniej wersji przywróć odpowiadającą jej migawkę sprzed aktualizacji. Zachowaj oba pliki wykonywalne i migawkę do czasu pomyślnego odzyskania danych. Jeśli nie masz prawa zapisu w folderze obrazu, przenieś obraz do własnego folderu lub pobierz plik zastępczy ręcznie. Nie wyłączaj piaskownicy Electron, aby uruchomić obraz.
