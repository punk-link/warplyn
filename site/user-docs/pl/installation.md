---
description: "Zainstaluj Warplyn w systemie Windows lub Linux z pakietu Debian albo AppImage, a następnie skonfiguruj obszar roboczy do pisania."
---

# Instalacja Warplyn

Warplyn jest dostępny dla Windows 11 x64 i Linux. Pobierz aktualne instalatory ze strony [wydania Warplyn](https://github.com/punk-link/warplyn/releases). Jeśli korzystasz ze Skladno, postępuj zgodnie z [przewodnikiem migracji](migration.md) i zachowaj jego instalację oraz kopie zapasowe do czasu sprawdzenia odzyskanych tekstów.

## Windows

1. Otwórz stronę [wydań Warplyn](https://github.com/punk-link/warplyn/releases).
2. W sekcji **Assets** pobierz instalator Windows `.exe` i uruchom go.
3. Jeśli Windows wyświetli ostrzeżenie SmartScreen, upewnij się, że instalator pochodzi ze strony wydań tego repozytorium. Wydania nie są podpisane cyfrowo.
4. Otwórz Warplyn z menu Start.

Informacje o ustawieniach aktualizacji i odzyskiwaniu danych znajdziesz w sekcji [Odzyskiwanie po aktualizacji aplikacji desktopowej](update-recovery.md).

::: info Podpisy cyfrowe
Podpis cyfrowy wykorzystuje certyfikat podpisywania kodu, aby wskazać wydawcę i pokazać, czy instalator został zmieniony po podpisaniu. Nie gwarantuje, że oprogramowanie jest bezpieczne. Warplyn nie ma jeszcze podpisu wydawcy, dlatego Windows nie może zweryfikować wydawcy na podstawie instalatora. Pobieraj go wyłącznie z oficjalnej strony wydań.
:::

## Debian i dystrybucje oparte na Debianie

Ubuntu 22.04 x64 jest głównym zweryfikowanym celem dla Debiana; zgodność z innymi wersjami dystrybucji nie jest gwarantowana. Użyj systemu amd64 z graficznym środowiskiem pulpitu.

1. Otwórz stronę [wydań Warplyn](https://github.com/punk-link/warplyn/releases).
2. W sekcji **Assets** pobierz pakiet `warplyn_VERSION_amd64.deb`.
3. Otwórz terminal w folderze pobierania. Jeśli znajduje się tam tylko ten pakiet Warplyn, zainstaluj go poleceniem:

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. Otwórz Warplyn z menu aplikacji.

Aby ręcznie zaktualizować aplikację, pobierz nowszy plik `.deb` i uruchom to samo polecenie `sudo apt install`, wskazując ten plik. Pobranie nie konfiguruje automatycznego repozytorium pakietów. Apt rozwiązuje zadeklarowane zależności; nie wymuszaj instalacji, jeśli nie da się ich spełnić.

Domyślnie teksty są przechowywane w `~/.warplyn`. Przed aktualizacją utwórz kopię zapasową. Ponowna instalacja lub usunięcie aplikacji powinny zachować ten folder i dane logowania w pęku kluczy pulpitu.

Zarządzane klucze API w systemie Linux wymagają dostępnej i odblokowanej usługi Secret Service, takiej jak GNOME Keyring. Inne możliwości nawiązywania połączeń opisano w sekcji [Dostawcy i modele AI](providers.md).

Jeśli nie można zapisać lub odczytać klucza, odblokuj pęk kluczy pulpitu i ponów próbę. Jeśli sesja nie ma usługi Secret Service, włącz ją albo skorzystaj z połączenia opartego na zmiennej środowiskowej, opisanego w tym przewodniku. Edycja offline pozostaje dostępna. Nie wyłączaj piaskownicy, aby obejść problem z uruchamianiem; zgłoś dystrybucję, wersję i błąd.

### Linux AppImage {#linux-appimage}

W wydaniach zawierających plik x64 `.AppImage` przechowuj go w folderze z prawem zapisu. Pobierz plik ze strony [wydań Warplyn](https://github.com/punk-link/warplyn/releases), ustaw go jako wykonywalny w menedżerze plików i uruchom. Możesz też wykonać w folderze pobierania polecenie `chmod +x Warplyn-*-linux-x64.AppImage`. Linux wymaga obsługi FUSE z dostępem do `/dev/fuse`, bibliotek pulpitu Electron oraz pęku kluczy Secret Service dla zarządzanych danych logowania. AppImage nie zawiera środowiska pulpitu ani pęku kluczy.

Na docelowym Ubuntu 22.04 zależności pulpitu obejmują `libgtk-3-0`, `libnss3`, `libasound2`, `libatk-bridge2.0-0`, `libdrm2`, `libgbm1`, `libxkbcommon0`, `libnotify4`, `libxcb-dri3-0` i `xdg-utils`. GNOME Keyring udostępnia usługę Secret Service. Standardowa instalacja GNOME zawiera większość tych pakietów. Inne dystrybucje używają odmiennych nazw pakietów i wymagają własnego sprawdzenia zgodności.

Integracja z pulpitem jest opcjonalna: utwórz skrót wskazujący pełną ścieżkę do obrazu. Zachowaj tę samą ścieżkę podczas aktualizacji. Weryfikacja AppImage w środowisku pulpitu jest w toku. Ubuntu 22.04 x64 jest głównym celem weryfikacji; Ubuntu 24.04 x64 i Fedora 43 x64 to dodatkowe cele zgodności. Nie oznacza to uniwersalnej obsługi wszystkich dystrybucji Linux.

Jawne kroki pobierania, ponownego uruchomienia i odzyskiwania opisano w sekcji [Odzyskiwanie po aktualizacji aplikacji desktopowej](update-recovery.md).

Aby dodać aplikację do menu, możesz zmienić nazwę obrazu na `Warplyn.AppImage` i umieścić go w folderze `Applications` w katalogu domowym. Jeśli nie istnieje, utwórz `~/.local/share/applications`, a następnie zapisz tam poniższy plik jako `warplyn.desktop`. Zastąp `YOUR_USER` nazwą użytkownika Linux albo użyj pełnej ścieżki do obrazu:

```ini
[Desktop Entry]
Type=Application
Name=Warplyn
Exec="/home/YOUR_USER/Applications/Warplyn.AppImage" %U
Terminal=false
Categories=Office;
StartupWMClass=Warplyn
```

Skrót w menu będzie nadal działać, ponieważ aktualizacje w aplikacji zastępują obraz w tej samej lokalizacji. Aby dodać ikonę Warplyn, uruchom obok obrazu `./Warplyn.AppImage --appimage-extract warplyn.png`, zachowaj wyodrębniony plik PNG w stałym miejscu, a następnie dodaj do pliku skrótu `Icon=` i pełną ścieżkę do ikony.

## Po instalacji

Aby korzystać z funkcji AI, dodaj połączenie z dostawcą w sekcji **Ustawienia** → **Asystent AI**. Aby chronić swoje *artykuły*, wybierz folder w polu **Folder kopii zapasowych** w sekcji **Ustawienia** → **Dane i kopie**.

Warplyn przechowuje *artykuły* i punkty kontrolne *szkiców* na Twoim komputerze. Zlecenia AI wymagają połączenia z internetem i wysyłają odpowiedni tekst *artykułu* oraz kontekst do wybranego dostawcy. Obowiązują zasady ochrony danych i cennik dostawcy.
