---
description: "Twórz automatyczne lub ręczne kopie zapasowe Warplyn, przywracaj teksty i umiejętności oraz bezpiecznie odzyskuj dane po problemach."
---

# Kopie zapasowe i odzyskiwanie danych

## Utwórz kopię zapasową

W sekcji **Ustawienia** → **Dane i kopie** wybierz folder w polu **Folder kopii zapasowych**, a następnie wybierz **Utwórz kopię**. Obsługiwane przeglądarki proszą Warplyn o zgodę na zapisywanie kopii wyłącznie w tym folderze.

[![Ustawienia Data and backups z folderem kopii zapasowych, kontrolkami Utwórz kopię i Przywróć kopię oraz opcjami automatycznego tworzenia kopii.](/images/backups-and-recovery.png)](/images/backups-and-recovery.png)

*Ustawienia Dane i kopie w aplikacji desktopowej.*

::: tip Co zawiera kopia zapasowa
Nowa kopia `.skladno` zawiera bazę danych, bieżące autorskie *umiejętności*, ich historię *zapisanych wersji umiejętności* oraz manifest plików. Kopie zapasowe nie zawierają plików `.env` ani kluczy API.
:::

::: tip Ograniczenia kopii w przeglądarce
Transfer kopii zapasowej w przeglądarce obsługuje pliki do 100 MB każdy i 500 MB łącznie. W przypadku większej ilości danych lokalnych użyj aplikacji desktopowej.
:::

W aplikacji desktopowej każdej migawce bazy danych towarzyszy folder `.sqlite.skills` zawierający bieżące autorskie *umiejętności*, ich historię *zapisanych wersji umiejętności*, Twoje osobiste słowa ze słownika i manifest. Podczas kopiowania lub przywracania migawki zachowaj razem plik `.sqlite` i folder `.sqlite.skills`. Kopie tworzone w przeglądarce nie zawierają osobistych słów ze słownika.

Starsze kopie `.sqlite` zawierają tylko bazę danych. Ich przywrócenie zachowuje bieżące pliki *umiejętności* i ich historię.

## Kopie automatyczne

Ustaw **Automatyczne kopie zapasowe** na **Codziennie**, aby tworzyć migawkę krótko po uruchomieniu Warplyn, a następnie co 24 godziny, gdy aplikacja pozostaje otwarta. W przeglądarce Warplyn potrzebuje zgody na użycie wybranego folderu. Jeśli automatyczna kopia się nie powiedzie, sprawdź folder i utwórz kopię ręcznie; następna zaplanowana próba pozostanie aktywna.

**Przechowywanie automatycznych kopii** określa, ile automatycznych migawek zachowuje Warplyn. Usuwa tylko starsze automatyczne migawki; ręcznie utworzone kopie są zawsze zachowywane.

## Przywróć kopię zapasową

1. W sekcji **Ustawienia** → **Dane i kopie** wybierz **Przywróć kopię**.
2. Wybierz kopię do przywrócenia. Warplyn sprawdzi jej pliki i zachowa lokalną kopię odzyskiwania bieżącej bazy danych oraz plików *umiejętności*.
3. Po zakończeniu przywracania sprawdź swoje *artykuły* i *zapisane wersje*.

Przywrócenie kopii `.skladno` lub migawki desktopowej wraz z dołączonym folderem zastępuje bazę danych i zapisane *umiejętności*. Przywrócenie starszej kopii `.sqlite` zawierającej tylko bazę zastępuje wyłącznie bazę danych.

Przywrócenie kopii desktopowej dodaje do słownika również zapisane w niej osobiste słowa. Istniejące słowa pozostają. Starsze kopie bez osobistych słów nie zmieniają słownika. Pobrane słowniki językowe i ustawienia wstępnego ładowania słowników nie są uwzględniane.

::: warning Ustawienia AI po przywróceniu
Przywracanie zachowuje istniejące w tej instalacji połączenia AI, dane logowania i wybór modeli. Jeśli nie skonfigurowano połączeń, Warplyn przywraca z kopii nazwy i odwołania do zmiennych środowiskowych, ale nigdy klucze API ani wartości zmiennych środowiskowych. Ustaw brakujące zmienne na tym komputerze, a następnie wybierz modele w sekcji **Ustawienia** → **Asystent AI**. Połączenia oparte na zapisanych kluczach API nie są importowane do nowej instalacji; dodaj je w **Ustawieniach**. Pozostałe ustawienia są przywracane. Nieudane przywracanie i wycofanie zmian zachowują poprzednią konfigurację AI.
:::

## Ręcznie odzyskaj kopię zawierającą tylko bazę danych

Te kroki stosuj wyłącznie do starszej kopii `.sqlite`. Nie uruchamiaj Warplyn, dopóki baza danych nie znajdzie się na swoim miejscu.

1. Zrób kopię bieżącej lokalnej bazy danych.
2. Skopiuj kopię zapasową, zastępując nią plik `skladno.sqlite` w skonfigurowanym folderze danych Warplyn.
3. Uruchom Warplyn i sprawdź swoje *artykuły* oraz *zapisane wersje*.

Aby przywrócić kopię zawierającą *umiejętności*, użyj opcji **Przywróć kopię** w sekcji **Ustawienia**, aby Warplyn mógł sprawdzić i odtworzyć również manifest oraz historię *umiejętności*.

## Jeśli nie można utworzyć kopii zapasowej

Warplyn nie zmienia aktywnej bazy danych ani sesji edycji. Sprawdź, czy folder docelowy istnieje i czy Twoje konto ma do niego prawo zapisu, a następnie ponów próbę.

## Uprawnienia do plików

Domyślnie usługa lokalna przechowuje bazę danych w `~/.warplyn`. Ustaw `WARPLYN_DATA_DIR`, aby wybrać inny folder. Warplyn ignoruje `SKLADNO_DATA_DIR` i nie użyje folderu nakładającego się na starą lokalizację danych Skladno. Jeśli przenosisz dane ze Skladno, wybierz osobny folder Warplyn i przywróć kopię zapasową.

W systemach POSIX Warplyn ogranicza dostęp do folderu danych i plików SQLite do Twojego konta, również po aktualizacji. Windows korzysta z uprawnień systemu plików zarządzanych przez Windows. Pliki kopii utworzone w przeglądarce używają uprawnień wybranego folderu, dlatego przechowuj kopie w prywatnym miejscu i sprawdź ustawienia udostępniania przed użyciem folderu współdzielonego lub synchronizowanego.
