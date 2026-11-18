---
description: "Korzystaj z asystenta redakcyjnego Warplyn, aby tworzyć i poprawiać teksty, sprawdzać fakty i styl oraz przygotowywać tłumaczenia. Przed akceptacją sprawdź wygenerowane zmiany."
---

# Asystent redakcyjny

Korzystaj z asystenta redakcyjnego, gdy potrzebujesz pomocy w pisaniu, poprawianiu tekstu, sprawdzaniu faktów, przeglądzie stylu lub przygotowaniu tłumaczenia. Każde zlecenie rozpoczynasz jawnie. Wybranie opcji z **Szybkie działania** jedynie wstawia do Composer początek *umiejętności*. Aby rozpocząć pracę, wybierz **Wyślij żądanie redakcyjne**.

Zaznaczenie tekstu pozwala skupić poprawki na tym fragmencie. Definicje i wskazówki dotyczące stylu znajdujące się w pobliżu mogą pomóc asystentowi zinterpretować krótki fragment, ale ich udostępnienie ujawnia dostawcy także niezaznaczony tekst. Gdy zlecenie dotyczące zaznaczenia wymaga tekstu *artykułu*, Warplyn wysyła zaznaczenie oraz do 500 znaków przed nim i po nim jako osobny, tylko do odczytu kontekst. Zastąpić można wyłącznie zaznaczony fragment. Composer wyjaśnia to przed wysłaniem; nie wysyłaj tekstu, jeśli sąsiadująca treść jest wrażliwa. Ogólne porady i zarządzanie *umiejętnościami* nie wymagają tego tekstu. Warplyn nigdy po cichu nie rozszerza kontekstu na cały *artykuł*. Jeśli kontekst jest niewystarczający, podaj odpowiedni fragment albo ponów prośbę z innym zaznaczeniem.

::: tip Przykład
Podczas poprawiania opowiadania zaznacz fragment i poproś: „Popraw płynność, zachowując punkt widzenia Any i spokojny nastrój. Nie dodawaj nowych wydarzeń”. Asystent przygotuje *propozycję* do **Przegląd propozycji**. Możesz też poprosić o sprawdzenie, czy w rozdziale nie zmieniają się bez powodu czasy przeszły i teraźniejszy; uwagi z przeglądu stylu pojawią się w **Profil stylu**.
:::

[![Asystent redakcyjny Warplyn z prośbą o poprawę opowiadania i wybraną umiejętnością.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Przykładowe zlecenie w Composer. Przed wysłaniem połącz się z dostawcą. Zrzut ekranu pokazuje wcześniejszą nazwę umiejętności.*

Podczas pracy asystent wyświetla krótki komunikat o postępie. Wybierz **Zatrzymaj żądanie**, aby anulować zbyt długo trwającą pracę. Anulowane lub nieudane zlecenie nie zmienia *artykułu*; wybierz **Ponów**, aby ponowić próbę. Asystent nie ujawnia promptów, prywatnych danych wejściowych, danych logowania ani błędów dostawcy. Gdy wynik jest gotowy, otwórz go za pomocą karty wyniku:

- **Przegląd propozycji** — wygenerowany lub poprawiony tekst.
- **Weryfikacja faktów** — doradcze *uwagi*.
- **Profil stylu** — *uwagi* z przeglądu stylu.
- **Tłumaczenia** — *propozycja* tłumaczenia.

Otwarcie wyniku nie zmienia *artykułu*. Przed zaakceptowaniem zmian sprawdź *propozycję*. *Uwagi* mają charakter doradczy, a tłumaczenia pozostają osobnymi, połączonymi *artykułami*. Informacje o propozycjach, historii, odzyskiwaniu danych i weryfikacji faktów znajdziesz w sekcji [Recenzowanie artykułów](reviewing-articles.md). Sposób porównywania i używania wyników tłumaczenia opisano w sekcji [Tłumaczenia](translations.md).

Aby skupić się na terminologii technicznej, wybierz **Sprawdź terminy techniczne** z **Szybkie działania**. Oparte na źródłach *uwagi* pojawią się w **Weryfikacja faktów**. Kroki i ograniczenia opisano w sekcji [Weryfikacja terminów technicznych](built-in-skills/check-technical-terms.md).

W **Przegląd propozycji** edytuj tekst **Propozycja** bezpośrednio w układzie **Obok siebie** albo **Jeden pod drugim**. **Oryginał** pozostaje tylko do odczytu. Edycja nie zmienia decyzji **Akceptuj** lub **Odrzuć** dotyczącej każdej zmiany. Wybierz decyzję dla każdej zmiany, a następnie **Zastosuj**, aby zakończyć przegląd. Zaakceptowane sformułowania tworzą jedną nową *zapisaną wersję*. Jeśli wszystkie sugestie zostaną odrzucone, Zastosuj zamknie przegląd bez zmiany *artykułu* i bez utworzenia *zapisanej wersji*. Aby zaakceptować wszystkie zmiany, wybierz **Oznacz wszystkie jako zaakceptowane** w menu **Decyzje…**, a następnie zastosuj je. **Oznacz wszystkie jako odrzucone** pozostawia *artykuł* bez zmian. **Resetuj decyzje** przywraca stan Oczekuje dla każdej sugestii i zachowuje Twoje poprawki tekstu proponowanego. Wybierz **Odrzuć propozycję**, aby zamknąć przegląd.

Niezastosowane poprawki pozostają dostępne podczas zmiany układów lub Workspace Views. Ponowne załadowanie strony, przełączenie na inny *artykuł*, zamknięcie *propozycji* lub wygenerowanie nowej usuwa te poprawki. Po nieudanym zastosowaniu pozostają one dostępne do ponownej próby. Zachowaj proponowane liczby, łącza, kod i terminy techniczne. Nieaktualne, niewiarygodne i już zaakceptowane *propozycje* są tylko do odczytu. Jeśli zmienisz treść poprawki faktograficznej, powiązane *uwagi* po jej zastosowaniu nadal będą miały charakter doradczy.

*Umiejętności* pomagają ukierunkować zlecenie, ale nie dodają uprawnień. Przy zleceniu bez oznaczenia asystent wybiera odpowiednie *umiejętności*. Zwykłych próśb nie kieruje przez domyślny proces edycji. Warplyn nie wykonuje zadań w tle, nie publikuje bezpośrednio ani nie zmienia *artykułu* bez Twojej zgody.

Poproś asystenta o utworzenie wielokrotnego użytku [umiejętności](skills.md), gdy chcesz ponownie korzystać z danej procedury. Jeśli cel, kroki lub materiały źródłowe są niejasne, asystent może zadać krótkie pytanie uzupełniające. Utworzona *umiejętność* jest od razu dostępna i ma własną lokalną historię *zapisanych wersji umiejętności*. Jej tworzenie nie odczytuje treści *artykułu* ani nie zmienia jego *szkicu*, *propozycji* lub *zapisanej wersji*.

Możesz poprosić asystenta redakcyjnego o sprawdzenie **Historia wersji**, zapisanej pracy redakcyjnej, wskazówek publikacyjnych lub gotowości Style Corpus. Na wyraźne polecenie może dodać bieżącą, niezmienną *zapisaną wersję* do lokalnego Style Corpus i ponownie utworzyć Profil stylu. Nie może akceptować *propozycji*, przywracać *zapisanych wersji*, rozstrzygać *uwag*, edytować *szkiców*, usuwać próbek stylu ani publikować.

Próbki tekstu, wielokrotnego użytku wskazówki i zasady typografii znajdziesz w sekcji [Profil stylu](style-profile.md). Pojawiają się tam *uwagi* z przeglądu stylu; są oddzielone od treści *artykułu*.
