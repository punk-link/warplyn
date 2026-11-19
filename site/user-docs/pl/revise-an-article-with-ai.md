---
description: "Popraw artykuł w Warplyn z pomocą AI: ukierunkuj zlecenie, porównaj proponowane zmiany, zastosuj wybrane poprawki i zachowaj wcześniejsze zapisane wersje."
---

# Popraw artykuł z pomocą AI i sprawdź każdą zmianę

Jeśli przebieg sceny Ci odpowiada, ale tempo narracji sprawia wrażenie nierównego, poproś asystenta redakcyjnego o pomoc w poprawkach. Pracuj nad fragmentem lub całym *artykułem*, porównaj proponowane brzmienie i zastosuj wybrane zmiany.

Warplyn to lokalne środowisko do pisania na Windows i Linux, rozwijane jako open source. Twoje teksty pozostają na komputerze. Pomoc AI wymaga połączenia z internetem, obsługiwanego dostawcy i klucza API. Warplyn przekazuje dostawcy tekst i kontekst potrzebne do wykonania zlecenia. Obowiązują cennik i zasady ochrony danych dostawcy.

## Zacznij od ukierunkowanego zlecenia

Otwórz *artykuł* i zaznacz fragment, który chcesz poprawić. W polu wpisywania opisz, co należy ulepszyć i co zachować. Na przykład, pracując nad The River at Dusk:

> Popraw płynność, zachowując punkt widzenia Any i spokojny nastrój. Nie dodawaj nowych wydarzeń.

Wybierz **Wyślij żądanie redakcyjne**. Warplyn wysyła zaznaczenie oraz do 500 znaków z każdej jego strony jako kontekst tylko do odczytu. Zastąpiony może być wyłącznie zaznaczony fragment. Jeśli tekst zawiera poufne informacje, przed wysłaniem przeczytaj komunikat w polu wpisywania. Dowiesz się z niego, jaki tekst zostanie przesłany. Więcej informacji znajdziesz w sekcji [Asystent redakcyjny](editorial-assistant.md).

[![Pole wpisywania w Warplyn z prośbą o poprawę opowiadania.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Przykładowe zlecenie w polu wpisywania. Zrzut ekranu pokazuje wcześniejszą nazwę umiejętności.*

## Porównaj oryginalne i proponowane brzmienie

Po zakończeniu zlecenia otwórz **Przegląd propozycji** z karty wyniku. Porównaj **Oryginał** i **Propozycja**, sprawdzając, czy poprawiona wersja zachowuje wydarzenia w scenie, punkt widzenia i styl.

[![Przegląd propozycji porównujący tekst Oryginał i Propozycja, indywidualne decyzje i przycisk Zastosuj.](/images/proposal-review.png)](/images/proposal-review.png)

*Przykładowa recenzja dla The River at Dusk. Wygenerowane brzmienie zależy od zlecenia i modelu.*

Dla poszczególnych zmian wybierz **Akceptuj** lub **Odrzuć**. Przed zastosowaniem możesz edytować proponowany tekst w polu **Propozycja**. Jeśli Warplyn nie może bezpiecznie podzielić *propozycji*, wyjaśni, że należy sprawdzić ją w całości.

## Zastosuj zmiany i zachowaj historię

Po podjęciu decyzji dotyczącej każdej zmiany wybierz **Zastosuj**. Zaakceptowany tekst tworzy nową *zapisaną wersję*. Odrzucenie wszystkich zmian pozostawia *artykuł* bez zmian i nie tworzy *zapisanej wersji*. Same decyzje nie zmieniają Twojego tekstu.

Otwórz **Historia wersji**, aby sprawdzić wcześniejsze zapisane wersje. Przywrócenie jednej z nich dodaje kolejną *zapisaną wersję* i zachowuje historię pomiędzy wersjami. Możliwości odzyskiwania i nieaktualne *propozycje* opisano w sekcji [Recenzowanie artykułów](reviewing-articles.md).

Poprawki AI mogą nie uwzględnić Twojego zamiaru lub zmienić szczegóły, które chcesz zachować. Przed zastosowaniem sprawdź wynik; jeśli trzeba, ponów prośbę, zawężając jej zakres. Anulowane lub nieudane zlecenie nie zmienia *artykułu*.

## Wypróbuj na własnym tekście

[Pobierz Warplyn](https://github.com/punk-link/warplyn/releases/latest), skorzystaj z [instrukcji instalacji](installation.md) i połącz się z obsługiwanym [dostawcą AI](providers.md). Instalatory Windows nie są podpisane; w instrukcji instalacji wyjaśniono ostrzeżenie, które może się pojawić.
