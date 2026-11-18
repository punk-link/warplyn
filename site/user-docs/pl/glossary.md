---
description: "Poznaj definicje artykułów, szkiców, zapisanych wersji, propozycji, uwag i umiejętności używane w całym obszarze roboczym Warplyn."
---

# Słownik Warplyn

Poniższe terminy opisują pojęcia widoczne dla autorów oraz język domenowy stosowany w całym Warplyn.

## Artykuły i zapisane wersje

- **Artykuł**: niezależnie odzyskiwalna jednostka pracy redakcyjnej. Warplyn używa terminu „artykuł”, a nie „dokument”.
- **Biblioteka artykułów**: lokalny zbiór *artykułów* autora. **Bieżący artykuł** to artykuł otwarty w obszarze roboczym; **lista artykułów** przedstawia cały zbiór.
- **Szkic**: tekst *artykułu*, który jest obecnie edytowany, ale nie został jeszcze zapisany jako *zapisana wersja*.
- **Punkt kontrolny szkicu**: możliwy do odzyskania, zmienny stan *szkicu*, zapisany lokalnie i powiązany z bazową *zapisaną wersją*. Nie jest *zapisaną wersją*. **Bieżący szkic** bazuje na bieżącej *zapisanej wersji* *artykułu*; **nieaktualny szkic** bazuje na starszej *zapisanej wersji*.
- **Zapisana wersja**: niezmienna zapisana migawka *artykułu*.
- **Zapisanie szkicu jako wersji**: jawne zapisanie przez autora bieżącego *szkicu* jako nowej *zapisanej wersji*. Usuwa wyłącznie odpowiadający mu punkt kontrolny *szkicu*.
- **Propozycja**: treść lub zmiany wygenerowane przez AI, które wymagają wyraźnej zgody autora.
- **Wersja źródłowa propozycji**: *zapisana wersja* sprawdzona przy tworzeniu *propozycji*. *Propozycja* staje się nieaktualna, gdy przestaje odpowiadać bieżącej *zapisanej wersji*.
- **Wybór zmian**: część *propozycji*, którą autor decyduje się zaakceptować. Akceptacja tworzy nową *zapisaną wersję*.
- **Uwaga**: doradczy wynik, taki jak uwaga z weryfikacji faktów lub przeglądu stylu, który nie zmienia *artykułu*.
- **Artykuł źródłowy** i **artykuł tłumaczenia**: połączone *artykuły*, z których każdy można odzyskać niezależnie. Tłumaczenie nigdy nie jest *zapisaną wersją* źródła.

## Praca redakcyjna

- **Możliwość redakcyjna**: zweryfikowana operacja Warplyn określająca, z jakiego kontekstu *artykułu* może korzystać, jakie ma wymagania wstępne i jaki daje wynik. Widoki obszaru roboczego i umiejętności asystenta mogą wywoływać tę samą funkcję.
- **Umiejętność**: wielokrotnego użytku pakiet instrukcji pomagający asystentowi wybierać i porządkować funkcje redakcyjne stosownie do prośby autora. *Umiejętność* nie przyznaje żadnych funkcji ani uprawnień. **Wbudowana umiejętność** jest dostarczana wraz z Warplyn. **Umiejętność utworzona przez autora** to lokalny pakiet Markdown utworzony w czacie asystenta, z osobną historią *zapisanych wersji umiejętności*.
- **Operacja redakcyjna**: działanie asystenta zlecone przez autora, takie jak pisanie, wygładzanie, weryfikacja faktów, przegląd stylu lub tłumaczenie.
- **Zlecenie redakcyjne**: pojedyncze uruchomienie operacji redakcyjnej.
- **Sesja redakcyjna**: sekwencja interakcji i historia aktywności związana ze zleceniami redakcyjnymi.
- **Wskazówki redakcyjne**: instrukcje lub kontekst wpisane przez autora i dołączone do zlecenia redakcyjnego.
- **Korpus stylu**: lokalne próbki tekstów dostarczone przez autora. **Profil stylu** to ich zwięzła, wyprowadzona reprezentacja.
- **Etap pracy**: opcjonalna wskazówka postępu wybrana przez autora. Nie uruchamia AI ani nie zmienia treści *artykułu*.

## Publikowanie i ustawienia

- **Profil publikacji**: konfigurowalne wskazówki dla platformy, w tym limit znaków. Domyślny profil dotyczy tylko nowych *artykułów*.
- **Tekst do publikacji**: tekst Markdown lub zwykły tekst jawnie skopiowany z bieżącego *artykułu* za pomocą paska stanu artykułu. Warplyn nie udostępnia widoku podglądu publikacji w obszarze roboczym.
- **Ustawienia aplikacji**: preferencje na poziomie obszaru roboczego, konfiguracja AI, profile publikacji i zarządzanie lokalnymi danymi. Ustawienia nie należą do historii zapisanych wersji *artykułu*.
- **Połączenie AI**: nazwana konfiguracja dostawcy po stronie serwera ze źródłem danych logowania. Nowe zlecenia redakcyjne korzystają z **aktywnego połączenia AI**.
- **Źródło danych logowania**: prywatne źródło używane przez połączenie AI. Jest nim odwołanie do zmiennej środowiskowej albo zarządzane poświadczenie.
- **Zarządzane poświadczenie**: klucz API przechowywany w systemowym magazynie danych logowania. Warplyn zapisuje metadane połączenia, ale nigdy nie umieszcza klucza w SQLite ani w migawce kopii zapasowej.
- **Preferencja modelu**: domyślny identyfikator modelu lub ustawienie zastępcze właściwe dla działania redakcyjnego.
- **Język interfejsu**: język interfejsu Warplyn, niezależny od języka *artykułu* i tłumaczeń.
- **Domyślny język artykułu**: język przypisywany nowemu *artykułowi*, jeśli nie został podany.
- **Domyślne języki tłumaczenia**: uporządkowane języki proponowane w pierwszej kolejności przy zlecaniu tłumaczeń. Nie rozpoczynają tłumaczenia automatycznie.
- **Miejsce kopii zapasowej**: lokalny katalog, w którym Warplyn zapisuje migawki kopii zapasowych.
- **Migawka kopii zapasowej**: spójna kopia lokalnych danych z określonego momentu, niezależna od aktywnej bazy danych i niezawierająca danych logowania.
- **Lokalizacja danych**: aktywny lokalny katalog z danymi SQLite Warplyn.
- **Przenoszenie danych**: potwierdzone przez autora kopiowanie i ponowne uruchomienie, które przełącza Warplyn na nową lokalizację danych, zachowując starą kopię do odzyskania.
- **Migawka odzyskiwania**: migawka kopii zapasowej zachowana przed zastąpieniem aktywnych danych przez Warplyn podczas przywracania.
- **Aktualizacja aplikacji**: nowsza spakowana wersja Warplyn, której aplikacja desktopowa może szukać, którą może pobrać i zastosować wyłącznie w krokach kontrolowanych przez autora. Sama aktualizacja nigdy nie zmienia treści *artykułu*.
- **Aktualizacja zabezpieczeń**: aktualizacja aplikacji, której tag wydania ma przyrostek `.security`. Warplyn wyświetla ostrzeżenie, ale nigdy nie wymusza sprawdzania, pobierania ani ponownego uruchomienia.
- **Oczekująca aktualizacja**: pobrana aktualizacja aplikacji oczekująca, aż autor wybierze Uruchom ponownie i zaktualizuj. Zwykłe zamknięcie jej nie stosuje.
- **Migawka sprzed aktualizacji**: migawka lokalnych danych utworzona przed zastosowaniem przez Warplyn oczekującej aktualizacji. Jej przywrócenie wymaga zgodnej, wcześniejszej wersji aplikacji.
- **Zdarzenie diagnostyczne**: zredagowany zapis lokalnej usługi, dodawany do logów procesu hosta na potrzeby diagnozowania uruchamiania lub odzyskiwalnych awarii. Nie zawiera prywatnej treści *artykułu*, treści modelu ani wartości zmiennych środowiskowych.

## Interfejs

### Mapa obszaru roboczego

Układ aplikacji desktopowej z rozwiniętymi oboma panelami bocznymi i wybranym edytorem artykułu. Ramki pokazują położenie i zawartość, a nie dokładne rozmiary.

```text
Obszar roboczy redakcji
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Panel biblioteki          │ Obszar roboczy artykułu      │ Panel asystenta          │
│ artykułów                 │                              │ redakcyjnego             │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · Nowy artykuł   │ Nagłówek artykułu            │ Nagłówek asystenta       │
│ Przycisk zwijania        │ Tytuł i metadane artykułu    │ Przycisk zwijania        │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Wyszukiwanie artykułów  │ Pasek kart obszaru roboczego │ Rozmowa                  │
├──────────────────────────┼──────────────────────────────┤ Stan żądania              │
│ Lista artykułów          │ Widok obszaru roboczego      │ i aktywność              │
│                          │                              │                          │
│                          │ Edytor artykułu              │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Obszar pisania            │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Biblioteka artykułów     │                              │ Szybkie działania        │
│ Obszar narzędzi          │                              │ Pole wiadomości          │
│ Profil stylu ·           ├──────────────────────────────┤ Wskazówki redakcyjne    │
│ Ustawienia               │ Pasek stanu artykułu         │ i Wyślij                 │
│ Język · Lokalnie         │ Stan zapisu · Metadane · Kopiuj│                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

W rozwiniętym układzie stopka na dole panelu biblioteki artykułów to **obszar narzędzi panelu biblioteki artykułów**. Jej dolny wiersz pokazuje kod języka bieżącego *artykułu* i etykietę **Lokalnie**. **Pasek stanu artykułu** pod środkowym widokiem pokazuje stan zapisu.

### Terminy interfejsu

- **Obszar roboczy redakcji**: główny ekran autora zawierający panel biblioteki artykułów, obszar roboczy artykułu i panel asystenta redakcyjnego.
- **Panel biblioteki artykułów**: wyszukiwanie artykułów, lista artykułów i punkty wejścia na poziomie obszaru roboczego. Po zwinięciu staje się **paskiem nawigacyjnym**; tymczasowa wersja na małym ekranie to **wysuwany panel nawigacyjny**.
- **Obszar narzędzi panelu biblioteki artykułów**: stopka rozwiniętego panelu biblioteki artykułów zawierająca Profil stylu, Ustawienia, odpowiedni element sterujący aktualizacją oraz kod języka bieżącego artykułu i etykietę **Lokalnie**.
- **Wskaźnik stanu zapisu**: stan na pasku stanu artykułu informujący, czy bieżący *szkic* jest zapisany, zapisuje się czy wymaga uwagi.
- **Obszar roboczy artykułu**: nagłówek artykułu, pasek kart obszaru roboczego, wybrany widok i pasek stanu artykułu.
- **Nagłówek artykułu**: elementy sterujące tytułem i metadanymi nad paskiem kart obszaru roboczego.
- **Pasek kart obszaru roboczego**: karty służące do wyboru widoku obszaru roboczego.
- **Widok obszaru roboczego**: wybrany edytor artykułu lub widok pomocniczy: Przegląd propozycji, Historia wersji, Weryfikacja faktów albo Tłumaczenia.
- **Profil stylu**: osobny ekran wykrytych cech, *uwag* z przeglądu stylu, zasad typografii, ręcznych wskazówek i próbek tekstu.
- **Edytor artykułu**: widok pisania. Jego główny obszar edycji to **obszar pisania**.
- **Pasek stanu artykułu**: pasek pod wybranym widokiem obszaru roboczego ze stanem i metadanymi artykułu, wyborem języka, wskazówkami profilu publikacji i elementami sterującymi kopiowaniem.
- **Panel asystenta redakcyjnego**: wskazówki redakcyjne, działania, stan zlecenia i aktywność. Tymczasowa wersja na małym ekranie to **wysuwany panel asystenta**.
- **Szybkie działania**: lista rozwijana nad polem wiadomości asystenta, która pozwala wstawić do zlecenia wbudowaną umiejętność.
- **Pole wiadomości asystenta**: pole u dołu panelu asystenta redakcyjnego, w którym autor wpisuje wskazówki redakcyjne i wysyła zlecenie.
- **Nawigacja po ustawieniach aplikacji**: nawigacja między sekcjami **Ogólne**, **Skróty klawiaturowe**, **Dostawcy**, **Asystent AI**, **Publikacja**, **Domyślne języki**, **Pisownia**, **Dane i kopie** i **O Warplyn**.
