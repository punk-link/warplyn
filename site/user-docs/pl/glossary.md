---
description: "Poznaj definicje artykułów, szkiców, zapisanych wersji, propozycji, uwag i umiejętności używane w całym obszarze roboczym Warplyn."
---

# Słownik Warplyn

Poniższe terminy opisują pojęcia widoczne dla autorów oraz język domenowy stosowany w całym Warplyn.

## Artykuły i zapisane wersje

- **Article**: niezależnie odzyskiwalna jednostka pracy redakcyjnej. Warplyn używa terminu „Article”, a nie „document”.
- **Biblioteka artykułów**: lokalny zbiór *artykułów* autora. **current Article** to artykuł otwarty w obszarze roboczym; **Article list** przedstawia cały zbiór.
- **Draft**: tekst *artykułu*, który jest obecnie edytowany, ale nie został jeszcze zapisany jako *zapisana wersja*.
- **Draft checkpoint**: możliwy do odzyskania, zmienny stan *szkicu*, zapisany lokalnie i powiązany z bazową *zapisaną wersją*. Nie jest *zapisaną wersją*. **Current Draft** bazuje na bieżącej *zapisanej wersji* *artykułu*; **stale Draft** bazuje na starszej *zapisanej wersji*.
- **Zapisana wersja**: niezmienna zapisana migawka *artykułu*.
- **Revision promotion**: jawne zapisanie przez autora bieżącego *szkicu* jako nowej *zapisanej wersji*. Usuwa wyłącznie odpowiadający mu punkt kontrolny *szkicu*.
- **Proposal**: treść lub zmiany wygenerowane przez AI, które wymagają wyraźnej zgody autora.
- **Proposal base Revision**: *zapisana wersja* sprawdzona przy tworzeniu *propozycji*. *Propozycja* staje się nieaktualna, gdy przestaje odpowiadać bieżącej *zapisanej wersji*.
- **Change selection**: część *propozycji*, którą autor decyduje się zaakceptować. Akceptacja tworzy nową *zapisaną wersję*.
- **Finding**: doradczy wynik, taki jak uwaga z weryfikacji faktów lub przeglądu stylu, który nie zmienia *artykułu*.
- **Source Article** i **translation Article**: połączone *artykuły*, z których każdy można odzyskać niezależnie. Tłumaczenie nigdy nie jest *zapisaną wersją* źródła.

## Praca redakcyjna

- **Editorial capability**: zweryfikowana operacja Warplyn określająca, z jakiego kontekstu *artykułu* może korzystać, jakie ma wymagania wstępne i jaki daje wynik. Workspace Views i Assistant Skills mogą wywoływać tę samą funkcję.
- **Skill**: wielokrotnego użytku pakiet instrukcji pomagający asystentowi wybierać i porządkować funkcje redakcyjne stosownie do prośby autora. *Umiejętność* nie przyznaje żadnych funkcji ani uprawnień. **built-in Skill** jest dostarczana wraz z Warplyn. **Author-created Skill** to lokalny pakiet Markdown utworzony w czacie asystenta, z osobną historią *zapisanych wersji umiejętności*.
- **Editorial operation**: działanie asystenta zlecone przez autora, takie jak pisanie, wygładzanie, weryfikacja faktów, przegląd stylu lub tłumaczenie.
- **Editorial request**: pojedyncze uruchomienie działania redakcyjnego.
- **Editorial session**: sekwencja interakcji i historia aktywności związana ze zleceniami redakcyjnymi.
- **Wskazówki redakcyjne**: instrukcje lub kontekst wpisane przez autora i dołączone do zlecenia redakcyjnego.
- **Style corpus**: lokalne próbki tekstów dostarczone przez autora. **style profile** to ich zwięzła, wyprowadzona reprezentacja.
- **Workflow stage**: opcjonalna wskazówka postępu wybrana przez autora. Nie uruchamia AI ani nie zmienia treści *artykułu*.

## Publikowanie i ustawienia

- **Publishing profile**: konfigurowalne wskazówki dla platformy, w tym limit znaków. Domyślny profil dotyczy tylko nowych *artykułów*.
- **Publishing copy**: tekst Markdown lub zwykły tekst jawnie skopiowany z bieżącego *artykułu* za pomocą Article Status Bar. Warplyn nie udostępnia widoku Publishing Preview Workspace View.
- **Application Settings**: preferencje na poziomie obszaru roboczego, konfiguracja AI, profile Publishing i zarządzanie lokalnymi danymi. Ustawienia nie należą do historii zapisanych wersji *artykułu*.
- **AI connection**: nazwana konfiguracja dostawcy po stronie serwera ze źródłem danych logowania. Nowe zlecenia redakcyjne korzystają z **active AI connection**.
- **Credential source**: prywatne źródło używane przez połączenie AI. Jest nim odwołanie do zmiennej środowiskowej albo Zarządzane poświadczenie.
- **Zarządzane poświadczenie**: klucz API przechowywany w systemowym magazynie danych logowania. Warplyn zapisuje metadane połączenia, ale nigdy nie umieszcza klucza w SQLite ani w migawce kopii zapasowej.
- **Model preference**: domyślny identyfikator modelu lub ustawienie zastępcze właściwe dla działania redakcyjnego.
- **Interface locale**: język interfejsu Warplyn, niezależny od języka *artykułu* i tłumaczeń.
- **Domyślny język artykułu**: język przypisywany nowemu *artykułowi*, jeśli nie został podany.
- **Domyślne języki tłumaczenia**: uporządkowane języki proponowane w pierwszej kolejności przy zlecaniu tłumaczeń. Nie rozpoczynają tłumaczenia automatycznie.
- **Backup destination**: lokalny katalog, w którym Warplyn zapisuje migawki kopii zapasowych.
- **Backup snapshot**: spójna kopia lokalnych danych z określonego momentu, niezależna od aktywnej bazy danych i niezawierająca danych logowania.
- **Data location**: aktywny lokalny katalog z danymi SQLite Warplyn.
- **Data relocation**: potwierdzone przez autora kopiowanie i ponowne uruchomienie, które przełącza Warplyn na nową lokalizację danych, zachowując starą kopię do odzyskania.
- **Recovery snapshot**: migawka kopii zapasowej zachowana przed zastąpieniem aktywnych danych przez Warplyn podczas przywracania.
- **Application update**: nowsza spakowana wersja Warplyn, której aplikacja desktopowa może szukać, którą może pobrać i zastosować wyłącznie w krokach kontrolowanych przez autora. Sama aktualizacja nigdy nie zmienia treści *artykułu*.
- **Aktualizacja zabezpieczeń**: aktualizacja aplikacji, której tag wydania ma przyrostek `.security`. Warplyn wyświetla ostrzeżenie, ale nigdy nie wymusza sprawdzania, pobierania ani ponownego uruchomienia.
- **Staged update**: pobrana aktualizacja aplikacji oczekująca, aż autor wybierze Uruchom ponownie i zaktualizuj. Zwykłe zamknięcie jej nie stosuje.
- **Pre-update snapshot**: migawka lokalnych danych utworzona przed zastosowaniem przez Warplyn oczekującej aktualizacji. Jej przywrócenie wymaga zgodnej, wcześniejszej wersji aplikacji.
- **Diagnostics event**: zredagowany zapis lokalnej usługi, dodawany do logów procesu hosta na potrzeby diagnozowania uruchamiania lub odzyskiwalnych awarii. Nie zawiera prywatnej treści *artykułu*, treści modelu ani wartości zmiennych środowiskowych.

## Interfejs

### Mapa obszaru roboczego

Układ aplikacji desktopowej z rozwiniętymi oboma panelami bocznymi i wybranym widokiem Article Editor. Ramki pokazują położenie i zawartość, a nie dokładne rozmiary.

```text
Editorial Workspace
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Article Library Panel    │ Article Workspace            │ Editorial Assistant Panel│
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · New Article    │ Article Header               │ Assistant header         │
│ Collapse control         │ Title and Article metadata   │ Collapse control         │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Article search           │ Workspace Tab Bar            │ Conversation             │
├──────────────────────────┼──────────────────────────────┤ Request status           │
│ Article list             │ Workspace View               │ and activity             │
│                          │                              │                          │
│                          │ Article Editor               │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Writing surface          │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Article Library          │                              │ Quick actions            │
│ utility area             │                              │ Composer                 │
│ Style Profile · Settings ├──────────────────────────────┤ Editorial guidance       │
│ Update, when relevant    │ Article Status Bar           │ and Send                 │
│ Language · Local         │ Save status · Metadata · Copy │                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

W rozwiniętym układzie stopka na dole panelu Library to **obszar narzędzi panelu biblioteki artykułów**. Jej dolny wiersz pokazuje kod języka bieżącego *artykułu* i etykietę **Lokalnie**. **Article Status Bar** pod środkowym widokiem Article pokazuje stan zapisu.

### Terminy interfejsu

- **Editorial Workspace**: główny ekran autora zawierający Panel biblioteki artykułów, Article Workspace i Panel asystenta redakcyjnego.
- **Panel biblioteki artykułów**: wyszukiwanie artykułów, lista artykułów i punkty wejścia na poziomie obszaru roboczego. Po zwinięciu staje się **Navigation Rail**; tymczasowa wersja na małym ekranie to **Navigation Drawer**.
- **obszar narzędzi panelu biblioteki artykułów**: stopka rozwiniętego Panel biblioteki artykułów zawierająca Profil stylu, Settings, odpowiedni element sterujący aktualizacją oraz kod języka bieżącego artykułu i etykietę **Lokalnie**.
- **Save-state indicator**: stan na Article Status Bar informujący, czy bieżący *szkic* jest zapisany, zapisuje się czy wymaga uwagi.
- **Article Workspace**: Article Header, Workspace Tab Bar, wybrany Workspace View i Article Status Bar.
- **Article Header**: elementy sterujące tytułem i metadanymi nad Workspace Tab Bar.
- **Workspace Tab Bar**: karty służące do wyboru Workspace View.
- **Workspace View**: wybrany Article Editor lub widok pomocniczy: Przegląd propozycji, Historia wersji, Weryfikacja faktów albo Translations.
- **Profil stylu**: osobny ekran wykrytych cech, *uwag* z przeglądu stylu, zasad typografii, ręcznych wskazówek i próbek tekstu.
- **Article Editor**: widok pisania. Jego główny obszar edycji to **writing surface**.
- **Article Status Bar**: pasek pod wybranym Workspace View ze stanem i metadanymi artykułu, wyborem języka, wskazówkami profilu publikacji i kontrolkami Copy.
- **Panel asystenta redakcyjnego**: wskazówki redakcyjne, działania, stan zlecenia i aktywność. Tymczasowa wersja na małym ekranie to **Assistant Drawer**.
- **Szybkie działania**: lista rozwijana nad polem Composer asystenta, która pozwala wstawić do zlecenia wbudowaną umiejętność.
- **Composer**: pole wiadomości u dołu Panel asystenta redakcyjnego, w którym autor wpisuje wskazówki redakcyjne i wysyła zlecenie.
- **Application Nawigacja ustawień**: nawigacja między sekcjami **Ogólne**, **Skróty klawiaturowe**, **Dostawcy**, **Asystent AI**, **Publikacja**, **Domyślne języki**, **Pisownia**, **Dane i kopie** i **O Warplyn**.
