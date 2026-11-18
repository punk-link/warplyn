---
description: "Popraw artykuł w Warplyn z pomocą AI: ukierunkuj zlecenie, porównaj proponowane zmiany, zastosuj wybrane poprawki i zachowaj wcześniejsze zapisane wersje."
---

# Popraw artykuł z pomocą AI i sprawdź każdą zmianę

Gdy w scenie wydarzenia są odpowiednie, ale tempo narracji wydaje się nierówne, asystent redakcyjny Warplyn może pomóc ją poprawić. Pracuj nad fragmentem lub całym *artykułem*, porównaj proponowane brzmienie i zastosuj wybrane zmiany.

Warplyn to lokalne środowisko do pisania na Windows i Linux, rozwijane jako open source. Twoje teksty pozostają na komputerze. Pomoc AI wymaga połączenia z internetem, obsługiwanego dostawcy i klucza API. Odpowiedni tekst i kontekst są wysyłane do tego dostawcy, którego cennik i zasady ochrony danych mają zastosowanie.

## Zacznij od ukierunkowanego zlecenia

Otwórz *artykuł* i zaznacz fragment, który chcesz poprawić. W Composer opisz, co należy ulepszyć i co zachować. Na przykład, pracując nad The River at Dusk:

> Popraw płynność, zachowując punkt widzenia Any i spokojny nastrój. Nie dodawaj nowych wydarzeń.

Wybierz **Wyślij żądanie redakcyjne**. Warplyn wysyła zaznaczenie oraz do 500 znaków z każdej jego strony jako kontekst tylko do odczytu. Zastąpiony może być wyłącznie zaznaczony fragment. Przed wysłaniem wrażliwego tekstu sprawdź wyjaśnienie kontekstu w Composer. Więcej informacji znajdziesz w sekcji [Asystent redakcyjny](editorial-assistant.md).

[![Composer Warplyn z prośbą o poprawę opowiadania.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Przykładowe zlecenie w Composer. Zrzut ekranu pokazuje wcześniejszą nazwę umiejętności.*

## Porównaj oryginalne i proponowane brzmienie

Po zakończeniu zlecenia otwórz **Przegląd propozycji** z karty wyniku. Porównaj **Oryginał** i **Propozycja**, sprawdzając, czy poprawiona wersja zachowuje wydarzenia w scenie, punkt widzenia i styl.

[![Przegląd propozycji porównujący tekst Oryginał i Propozycja, indywidualne decyzje i przycisk Zastosuj.](/images/proposal-review.png)](/images/proposal-review.png)

*Przykładowa recenzja dla The River at Dusk. Wygenerowane brzmienie zależy od zlecenia i modelu.*

Dla poszczególnych zmian wybierz **Akceptuj** lub **Odrzuć**. Przed zastosowaniem możesz edytować proponowany tekst w **Propozycja**. Jeśli Warplyn nie może bezpiecznie podzielić *propozycji*, wyjaśni, że należy sprawdzić ją w całości.

## Zastosuj zmiany i zachowaj historię

Po podjęciu decyzji dotyczącej każdej zmiany wybierz **Zastosuj**. Zaakceptowany tekst tworzy nową *zapisaną wersję*. Odrzucenie wszystkich zmian pozostawia *artykuł* bez zmian i nie tworzy *zapisanej wersji*. Same decyzje nie zmieniają Twojego tekstu.

Otwórz **Historia wersji**, aby sprawdzić wcześniejsze zapisane wersje. Przywrócenie jednej z nich dodaje kolejną *zapisaną wersję* i zachowuje historię pomiędzy wersjami. Możliwości odzyskiwania i nieaktualne *propozycje* opisano w sekcji [Recenzowanie artykułów](reviewing-articles.md).

Poprawki AI mogą nie uwzględnić Twojego zamiaru lub zmienić szczegóły, które chcesz zachować. Przed zastosowaniem sprawdź wynik; jeśli trzeba, ponów prośbę, zawężając jej zakres. Anulowane lub nieudane zlecenie nie zmienia *artykułu*.

## Wypróbuj na własnym tekście

[Pobierz Warplyn](https://github.com/punk-link/warplyn/releases/latest), skorzystaj z [instrukcji instalacji](installation.md) i połącz się z obsługiwanym [dostawcą AI](providers.md). Instalatory Windows nie są podpisane; w instrukcji instalacji wyjaśniono ostrzeżenie, które może się pojawić.
