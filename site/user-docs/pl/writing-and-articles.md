---
description: "Pisz i porządkuj artykuły, poznaj sposób zapisywania szkiców oraz skonfiguruj lokalną pomoc w pisowni."
---

# Pisanie i porządkowanie artykułów

*Artykuł* to tekst w bibliotece Warplyn. Podczas edycji Warplyn zapisuje odzyskiwalny punkt kontrolny *szkicu*. *Zapisana wersja* to zapisany punkt w historii *artykułu*. Dzięki temu możesz kontynuować pracę, nie uznając każdej edycji za wersję ukończoną.

## Pisz i zapisuj artykuł

Wybierz **Nowy artykuł** w Library, aby rozpocząć. Zmień nazwę *artykułu* w polu tytułu. Za pomocą paska formatowania dodawaj nagłówki, listy, wyróżnienia, łącza, cytaty i kod. Po wklejeniu tekstu sformatowanego Warplyn zachowuje obsługiwane formatowanie i usuwa niebezpieczne lub nieobsługiwane znaczniki. *Artykuł* jest zapisywany jako Markdown, więc złożone układy stron i osadzone elementy nie zostaną przeniesione.

Podczas edycji Warplyn automatycznie zapisuje bieżący *szkic*. Punkt kontrolny *szkicu* to odzyskiwalny tekst roboczy, a nie nowy element Historia wersji. Jeśli chcesz sprawdzić, czy ostatnie zmiany zapisano w punkcie kontrolnym, spójrz na wskaźnik stanu zapisu na Article Status Bar. Warplyn zapisuje również oczekujący punkt kontrolny po przełączeniu *artykułów* lub otwarciu Settings.

[![Obszar pisania z artykułem The River at Dusk w edytorze, paskiem formatowania, biblioteką i wskaźnikiem Saved Draft.](/images/writing-workspace.png)](/images/writing-workspace.png)

*Przykładowy artykuł zapisany jako szkic w obszarze pisania.*

Wybierz **Zapisz wersję**, jeśli chcesz zachować bieżący *szkic* jako nazwany punkt w jego historii. Zapisanie *zapisanej wersji* nie usuwa wcześniejszych *zapisanych wersji*. Jeśli tekst lokalny i zapisany *szkic* przestały być zgodne, skorzystaj z sekcji [Recenzowanie artykułów](reviewing-articles.md#recover-a-draft).

## Znajdź i porządkuj artykuły

Użyj wyszukiwarki Library, aby znaleźć *artykuły*, również te zarchiwizowane. Wybierz **Artykuły**, aby przeglądać przypięte i ostatnie teksty, albo **Archiwizuj**, by zobaczyć zarchiwizowane grupy *artykułów*. Zwinięty Navigation Rail zawiera skróty **Nowy artykuł**, **Search**, **Artykuły** i **Archiwizuj**. Aby dodać skrót do Rail, przypnij źródłowy *artykuł* z jego menu w Library. Użyj **Przenieś w górę** lub **Przenieś w dół**, aby zmienić kolejność przypiętych *artykułów*. Przypinanie i zmiana kolejności nie modyfikują treści *artykułu*. Zmieniaj nazwę *artykułu* w polu tytułu.

Wybierz **Archiwizuj artykuł**, aby usunąć grupę *artykułu* z aktywnej listy, zachowując ją w **Archiwizuj**. Zaznacz zarchiwizowaną grupę i wybierz **Przywróć artykuł z archiwum**, aby ją przywrócić. Usunięcie *artykułu* wymaga potwierdzenia i kasuje jego *zapisane wersje* oraz odzyskiwalne *szkice*. Usunięcie źródłowego *artykułu* kasuje również połączone *tłumaczenia*; usunięcie *tłumaczenia* pozostawia jego źródłowy *artykuł*. Jeśli chcesz tylko odłożyć tekst na później, zarchiwizuj go.

## Korzystaj z pomocy w pisowni

Edytor oznacza prawdopodobne błędy, korzystając z funkcji sprawdzania pisowni urządzenia. W aplikacji desktopowej kliknij oznaczone słowo prawym przyciskiem myszy, aby wybrać sugerowaną poprawkę lub **Dodaj do słownika**. Poprawka jest zwykłą edycją, więc można ją cofnąć i staje się częścią bieżącego *szkicu*. Sprawdzanie pisowni odbywa się na Twoim urządzeniu i nie wysyła tekstu *artykułu* do dostawcy AI.

W aplikacji desktopowej otwórz **Ustawienia** → **Pisownia**. Użyj **Filtruj języki**, aby znaleźć język, wybierz go w sekcji **Przygotuj pisanie bez internetu**, a następnie wybierz **Pobierz słowniki**. Przed użyciem offline poczekaj, aż stan zmieni się na **Pobrany**. **Dostępny** oznacza, że język jest obsługiwany; nie potwierdza ukończenia pobierania słownika. Wybierz **Zwolnij z pamięci**, aby przestać używać przygotowanego słownika w tej sesji. Przygotowanie słowników nie zmienia języka *artykułu*. Pobieranie wymaga dostępu do internetu. W systemie Windows dodawanie i usuwanie osobistych słów wpływa również na słownik systemu operacyjnego i może oddziaływać na inne aplikacje.

W **Słownik osobisty** wyszukaj zapisane słowa albo wpisz pod nagłówkiem **Słowa do dodania** po jednym słowie lub terminie technicznym w każdym wierszu, a następnie wybierz **Dodaj słowa**. Jednorazowo możesz dodać do 500 słów. Usuń zapisane słowa, jeśli chcesz, aby pomoc w pisowni ponownie je oznaczała. Lista jest wspólna dla wszystkich *artykułów* i języków. Aplikacja webowa korzysta z ustawień pisowni przeglądarki i nie oferuje zarządzania słownikiem.

Użyj **Tryb skupienia**, aby podczas pisania ukryć oba panele pomocnicze. Wybierz tę opcję ponownie, aby je przywrócić. Kontrolką zwijania panelu zamykaj go lub otwieraj; przeciągnij separator obok panelu, aby zmienić jego szerokość. W wąskim oknie panele mogą otwierać się jako tymczasowe szuflady nad edytorem.

Korzystając z klawiatury, użyj **Tab** i **Shift + Tab**, aby przechodzić między Library, Article header, widokami, paskiem formatowania, edytorem, paskiem stanu i asystentem. W edytorze, wyszukiwarce i Composer nadal działają standardowe klawisze edycji tekstu. Settings ma własną nawigację klawiaturową. Na desktopowym pasku bocznym użyj **Up**, **Down**, **Home** lub **End**, aby przejść między sekcjami, a następnie **Enter** lub **Space**, aby otworzyć wybraną.

Aby przenieść cały *artykuł* do Warplyn lub z niego, zobacz [Pliki artykułów](article-files.md). Informacje o kopiach zapasowych całego obszaru roboczego znajdziesz w sekcji [Kopie zapasowe i odzyskiwanie danych](backups-and-recovery.md).
