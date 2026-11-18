---
description: "Zapisuj całe artykuły lub wczytuj je jako pliki Markdown, HTML, DOCX albo RTF."
---

# Pliki artykułów

Użyj **Zapisz do pliku** i **Wczytaj z pliku**, aby przenosić całe *artykuły* między Warplyn a innymi narzędziami do pisania. Te działania są dostępne w aplikacji desktopowej i webowej.

## Zapisz do pliku

1. Otwórz *artykuł*, który chcesz zapisać.
2. W nagłówku artykułu wybierz **Zapisz do pliku** obok **Zapisz wersję**. Możesz też kliknąć *artykuł* prawym przyciskiem myszy w Library i wybrać **Zapisz do pliku…**, nie otwierając go.
3. W oknie zapisu aplikacji desktopowej wybierz Markdown, HTML, DOCX albo RTF z listy typów plików, a następnie wskaż nazwę i lokalizację. Zachowaj rozszerzenie pasujące do formatu. W aplikacji webowej wybierz **Format pliku**, a następnie **Pobierz** i użyj opcji pobierania w przeglądarce.

Plik zawiera cały bieżący *szkic*, w tym niezapisane zmiany. Zaznaczenie tekstu nie ogranicza zakresu zapisu. Ta czynność nie tworzy *zapisanej wersji*. **Zapisz wersję** nadal służy do dodania bieżącego *szkicu* do historii.

::: tip Chcesz przenośną kopię obszaru roboczego?
Pliki *artykułów* zawierają tylko tekst. Aby zachować historię, pracę asystenta, *umiejętności* i ustawienia, utwórz [kopię zapasową](backups-and-recovery.md).
:::

Aplikacja webowa wyświetla **Rozpoczęto pobieranie artykułu**, gdy przekazuje plik do przeglądarki. Sprawdź pobrane pliki w przeglądarce, aby upewnić się, że pobieranie się zakończyło lub sprawdzić błędy.

## Wczytaj z pliku

1. W nagłówku artykułu wybierz **Wczytaj z pliku** obok **Zapisz wersję** albo kliknij *artykuł* prawym przyciskiem myszy w Library i wybierz **Wczytaj z pliku…**. Jeśli biblioteka jest pusta, najpierw wybierz **Utwórz**.
2. Wybierz jeden plik `.md`, `.html`, `.htm`, `.docx` lub `.rtf`.
3. W przypadku HTML, DOCX i RTF zaznacz **Przejrzyj importowany artykuł**, a następnie wybierz **Importuj**. Możesz anulować sprawdzanie. Pliki Markdown otwierają się bezpośrednio.
4. Warplyn otworzy zaimportowany tekst jako osobny *artykuł*. Poprzedni *artykuł* i jego możliwy do odzyskania *szkic* pozostaną w Library.

Początkowy nagłówek pierwszego poziomu staje się nowym tytułem. Jeśli go nie ma, Warplyn użyje nazwy pliku bez rozszerzenia. Nagłówek pozostanie w treści *artykułu*. Ponowne wczytanie tego samego pliku tworzy kolejny niezależny *artykuł*.

::: warning Import tworzy osobny artykuł
Wczytanie pliku nie zastępuje *artykułu*, z którego otwarto okno wyboru pliku. Sprawdź zaimportowany *artykuł*, a następnie w razie potrzeby przenieś lub usuń jeden z nich.
:::

Wybierz plik o rozmiarze nie większym niż 10 MiB. Pliki Markdown i HTML muszą być zapisane w UTF-8. DOCX i RTF działają bez zainstalowanego Microsoft Office.

Warplyn zachowuje akapity, nagłówki, edytowalne listy zagnieżdżone i numerację, pogrubienie, kursywę, przekreślenie, bezpieczne łącza, cytaty, kod i tekst Unicode, jeśli obsługuje je format źródłowy. Układ strony, czcionki, obrazy, osadzone obiekty oraz złożone funkcje specyficzne dla formatu mogą zostać pominięte lub uproszczone. Tekst tabeli staje się zwykłą treścią *artykułu*. Przed kontynuowaniem sprawdź podgląd importu. Nieobsługiwane rozszerzenia Markdown mogą również utracić formatowanie w edytorze.

Możesz zamknąć okno wyboru pliku bez importowania czegokolwiek. Jeśli bieżącego *szkicu* nie można zapisać w celu odzyskania, napraw błąd zapisu i ponów wczytywanie.

## Zapisz zapisaną wersję do pliku

1. Otwórz **Wersje**.
2. Otwórz *zapisaną wersję*, którą chcesz wyeksportować.
3. Wybierz **Zapisz do pliku** obok jej szczegółów.

Plik zawiera cały *artykuł* z wybranej *zapisanej wersji*, niezależnie od bieżącego *szkicu*. Eksport nie przywraca *zapisanej wersji* ani nie zmienia historii. Sugerowana nazwa pliku zawiera numer *zapisanej wersji*.

Eksport pliku również podlega limitowi 10 MiB. Jeśli zapis z aplikacji desktopowej się nie powiedzie, wybierz lokalizację z prawem zapisu i ponów próbę. Nieudana operacja zastąpienia pliku pozostawia dotychczasowy plik docelowy bez zmian.

Wyeksportowane pliki zawierają tekst *artykułu*, a nie pełną historię, rozmowy ani ustawienia. Aby chronić cały obszar roboczy, użyj funkcji [Kopie zapasowe i odzyskiwanie danych](backups-and-recovery.md).
