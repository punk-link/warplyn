---
description: "Przenieś się ze Skladno do Warplyn za pomocą kopii zapasowej, zachowując oryginalną instalację i teksty do czasu ich odzyskania."
---

# Migracja ze Skladno do Warplyn

Warplyn jest osobną aplikacją. Zachowaj Skladno i jego dane do czasu sprawdzenia odzyskanych tekstów. Nie przenoś aktywnego folderu danych Skladno do Warplyn.

Pobierz instalator Windows 11 x64 albo pakiet Debian x64 z [najnowszego wydania Warplyn](https://github.com/punk-link/warplyn/releases/latest). Instrukcje dla poszczególnych platform znajdziesz w sekcji [Instalacja](installation.md).

Przed migracją wybierz folder w polu **Folder kopii zapasowych** w sekcji **Ustawienia** → **Dane i kopie**, a następnie wybierz **Utwórz kopię**. Każdą kopię `.sqlite` przechowuj razem z sąsiadującym folderem `.sqlite.skills`. Szczegóły opisano w sekcji [Kopie zapasowe i odzyskiwanie danych](backups-and-recovery.md).

## Procedura migracji

1. W Skladno dokończ lub anuluj aktywne zadania AI, a następnie zamknij i ponownie otwórz aplikację, aby zapisać najnowszy punkt kontrolny. Podczas tworzenia kopii nie zmieniaj plików swoich *umiejętności* w innym programie.
2. Utwórz ręczną kopię zapasową z uruchomionej aplikacji Skladno, również jeśli korzysta z niestandardowego katalogu danych. Zachowaj plik `.sqlite` i sąsiadujący folder `.sqlite.skills` razem, pod ich oryginalnymi nazwami. Po utworzeniu kopii zamknij Skladno.
3. Zainstaluj i otwórz Warplyn z osobnym, pustym profilem. Nigdy nie wskazuj aktywnego katalogu danych Skladno.
4. W sekcji **Ustawienia** → **Dane i kopie** wybierz folder kopii migracyjnej i **Przywróć kopię**. Wybierz migawkę Skladno, potwierdź zastąpienie danych i poczekaj na ponowne uruchomienie Warplyn. Jeśli w Warplyn są już teksty, najpierw utwórz ich kopię zapasową: przywracanie zastępuje dane, a nie łączy baz.
5. Przed rozpoczęciem nowych prac sprawdź *artykuły*, najnowsze *szkice*, historię *zapisanych wersji*, rozmowy z asystentem, **Ustawienia**, profile publikacji i autorskie *umiejętności*.
6. W sekcji **Ustawienia** → **Asystent AI** ponownie dodaj połączenia i wybierz modele dla swoich zadań. Przywracanie czyści zapisane połączenia i wybór modeli, ponieważ dane logowania nie są częścią kopii. Dane logowania w Skladno pozostają bez zmian.
7. W przypadku połączeń opartych na zmiennych środowiskowych ponownie podaj nazwę zmiennej i upewnij się, że Warplyn ma dostęp do tej zmiennej. Kopie zapasowe nigdy nie kopiują plików `.env` ani ich wartości.
8. Wybierz osobny folder na kolejne kopie zapasowe Warplyn. Ponownie ustaw preferencje dotyczące sieci aktualizacji i telemetrii. Migracja nie kopiuje ustawień folderu kopii zapasowych, identyfikatora telemetrii, oczekujących aktualizacji ani oczekujących zapisów odzyskiwania.

Natywne kopie z folderem `.sqlite.skills` przywracają bieżące autorskie *umiejętności* oraz niezmienną historię *zapisanych wersji umiejętności*. Starsze migawki `.sqlite` zawierające tylko bazę danych przywracają bazę i pozostawiają *umiejętności* w miejscu docelowym bez zmian; nie mogą odtworzyć plików, których nie zawierały. Nazwy plików bazy danych i formaty manifestów pozostają zgodne ze Skladno.

## Odzyskiwanie

Zachowaj zainstalowane Skladno do czasu sprawdzenia przywróconych danych. Aplikacje nie synchronizują ani nie łączą późniejszych zmian. Powrót do Skladno oznacza powrót do jego stanu sprzed migracji.

Jeśli przywracanie się nie powiedzie, nadal korzystaj ze Skladno i zachowaj oryginalny zestaw plików kopii. Warplyn sprawdza kopię i zapisuje migawkę swoich danych sprzed przywrócenia. Jeśli po przywróceniu aplikacja się nie uruchomi, odzyska poprzednie dane z tej migawki. Ponów próbę po rozwiązaniu zgłoszonego problemu. Zobacz sekcje [Kopie zapasowe i odzyskiwanie danych](backups-and-recovery.md) oraz [Odzyskiwanie po aktualizacji](update-recovery.md).

Domyślnie Warplyn używa `~/.warplyn`, a niestandardowy folder wskazuje przez `WARPLYN_DATA_DIR`. Ignoruje `SKLADNO_DATA_DIR` dla aktywnych danych i odrzuca ścieżki nakładające się na znane starsze lokalizacje. Zamiast kopiować aktywną bazę SQLite, użyj osobnego, pustego folderu i przywróć kopię zapasową.
