---
description: "Utwórz lokalny Profil stylu na podstawie własnych tekstów i zarządzaj zasadami stylu oraz typografii."
---

# Profil stylu

W sekcji **Profil stylu** możesz dodać próbki swoich tekstów i zapisać wskazówki, z których asystent będzie korzystać przy kolejnych poprawkach. Próbki pozostają na tym urządzeniu. Nie stają się częścią *artykułu* ani *zapisanej wersji*.

Otwórz **Profil stylu** w obszarze narzędzi panelu biblioteki artykułów. Użyj menu bocznego lub selektora sekcji w wąskim oknie, aby wybrać **Próbki pisania**, **Reguły ręczne** albo **Reguły typograficzne**. Przycisk **Wróć** przenosi do *artykułu* i poprzednio otwartego widoku.

::: tip Wybierz punkt wyjścia
Dodaj próbki, aby Warplyn rozpoznał cechy Twojego stylu. Jeśli wiesz, jakich zasad ma przestrzegać asystent, wpisz je w sekcji **Reguły ręczne**. Możesz używać każdej z tych opcji niezależnie.
:::

## Dodaj próbki tekstu

Otwórz **Próbki pisania**, jeśli chcesz, aby asystent uczył się na podstawie Twoich istniejących tekstów. Wybierz **Dodaj próbkę pisania**, aby wkleić tekst, albo prześlij plik `.txt` lub `.md`. Możesz też wybrać **Dodaj ten artykuł**, aby użyć zapisanej wersji *artykułu* jako próbki. Nadaj jej nazwę, która ułatwi późniejsze rozpoznanie.

Zaznacz pole wyboru próbki, aby uwzględnić ją w profilu lub ją wykluczyć. Wykluczona próbka pozostaje na liście. Usuń próbkę, gdy nie jest już potrzebna. Usunięcie wymaga potwierdzenia, ponieważ próbka zostanie skasowana z Profil stylu.

## Dodaj wskazówki i przebuduj profil

Użyj **Reguły ręczne**, aby opisać preferencje, których asystent ma przestrzegać. Możesz na przykład poprosić o zachowanie narracji pierwszoosobowej albo rozwinięcie skrótu przy pierwszym użyciu. Wskazówki można dodawać bez próbek.

Po zmianie próbek lub wskazówek wybierz **Przebuduj profil**, aby odświeżyć wykryte cechy. Profil pokazuje, których próbek użył i kiedy został przebudowany. Do tego czasu wykryte cechy mogą odzwierciedlać poprzedni zestaw próbek. *Uwagi* z przeglądu stylu są wskazówkami i pozostają oddzielone od tekstu *artykułu*.

[![Ekran Reguły ręczne w Profil stylu z globalną zasadą dotyczącą punktu widzenia Any i kontrolką Przebuduj profil.](/images/style-profile-rules.png)](/images/style-profile-rules.png)

*Przykładowa zasada ręczna w Profil stylu.*

::: details Przykład zasady ręcznej
Dodaj sceny pokazujące bliski punkt widzenia Any i spokojne obrazy, wyklucz próbki, których nie chcesz używać, a następnie przebuduj profil. Dodaj na przykład zasadę „Prowadź narrację z bliskiego punktu widzenia Any”, jeśli ta preferencja ma obowiązywać nawet wtedy, gdy próbki nie pokazują jej wyraźnie.
:::

## Zasady typografii

Otwórz **Reguły typograficzne**, a następnie wybierz **Język typografii**. Konwencje są zapisywane osobno dla każdego języka pisania, niezależnie od języka interfejsu. W opcji **Zastosuj reguły do** wybierz **Wszystkich artykułów w tym języku** lub **Tylko tego artykułu**. *Tłumaczenie* korzysta z własnego języka i preferencji.

Menu **Język źródłowy** na pasku stanu zawiera języki regionalne z katalogu ustawień wstępnych. Dla innego języka wybierz **Inny język…** i wpisz jego kod, na przykład `ja` dla japońskiego. Możesz wtedy zapisać niestandardowe zasady typografii dla tego języka, nawet jeśli nie ma dla niego wbudowanego ustawienia.

Użyj **Dodaj regułę**, aby wybrać cudzysłowy, pauzy w prozie, wielokropek, odstępy przy znakach interpunkcyjnych, powtórzone spacje albo parę tokenów nierozdzielanych, taką jak `10 kg`. **Własna para** obsługuje otwierający i zamykający cudzysłów oraz odstępy wewnątrz nich. **Dosłowne zastąpienie interpunkcji** stosuje dokładną konwencję interpunkcji lub odstępów. Jeśli zasada wymaga oceny kontekstu, użyj **Kontekstowa instrukcja typograficzna**.

::: info Język i zakres
Wybierz język pisania oraz zdecyduj, czy zasady mają dotyczyć wszystkich *artykułów* w tym języku, czy tylko bieżącego *artykułu*. *Tłumaczenie* ma własny język i preferencje typograficzne.
:::

**Gotowy zestaw konwencji** pokazuje podglądy konwencji regionalnych. Podgląd oznaczony **oczekuje na sprawdzenie przez rodzimego użytkownika języka** nie może być jeszcze zastosowany; możesz samodzielnie skonfigurować zasady. Konwencje regionalne nie stosują się automatycznie do innych regionów. Jeśli wcześniejsze zasady były globalne, **Skopiuj dotychczasowe reguły do tego języka** przypisuje ich kopię bez usuwania oryginałów.

Zasady *artykułu* dziedziczą zapisane konwencje językowe. Edycja odziedziczonej zasady zastępuje ją; jej usunięcie wyłącza zasadę w danym zakresie. **Przywróć odziedziczone reguły** usuwa te nadpisania. Zmiana języka zachowuje niezapisane edycje zasad, gdy Profil stylu pozostaje otwarty.

Zasady są wyświetlane jako krótkie podsumowania oznaczone **Zapisana** lub **Niezapisana**. Wybierz **Edytuj**, aby otworzyć zasadę; można edytować tylko jedną naraz. Wybierz **Zapisz**, aby zachować reguły dla wybranego zakresu. Gdy zapiszesz ustawienia języka, Warplyn przebuduje też *profil stylu* na Twoim urządzeniu. Użyje próbek zaznaczonych w tym momencie oraz zapisanych wskazówek. Nadpisania *artykułu* są zapisywane dla tego *artykułu*. Niezapisany tekst w innych formularzach nadal pozostaje niezapisany. Możesz stosować jawne zasady typografii bez próbek tekstu; próbki są potrzebne do wyprowadzenia cech stylu.

Zapisz bieżący *szkic*, a następnie wybierz **Sprawdź typografię**, aby sprawdzić wybrany *artykuł* bez połączenia AI. Sprawdzenie korzysta z zapisanej *wersji* i jej języka, widocznego na pasku stanu. Podczas sprawdzania wybierz ten sam język z listy **Język typografii**. Kod, adresy URL, identyfikatory techniczne i niejednoznaczne przypadki cudzysłowów pozostają bez zmian. Zasady kontekstowe wymagają uruchomienia przez asystenta pełnego sprawdzenia za pomocą **Przejrzyj styl pisania**. Dla języka bez odpowiednich reguł mechanicznych nie ma lokalnej obsługi typografii; przed sprawdzeniem dodaj i zapisz własne zasady.

Otwórz **Przejrzyj propozycję**, aby sprawdzić poprawki i wspierające je zasady. Oznacz poprawki, które chcesz zaakceptować, a następnie wybierz **Zastosuj**. Zaakceptowane poprawki tworzą *zapisaną wersję*; odrzucenie wszystkich pozostawia *artykuł* bez zmian. Zapisanie zasad lub uruchomienie sprawdzania nie stosuje poprawek. Recenzja zachowuje użyty język i definicje zasad; po zmianie języka lub obowiązujących preferencji wyświetla się powiadomienie z propozycją ponownego uruchomienia. Typografia nie wykrywa granic języków w tekstach wielojęzycznych. Niejednoznaczne przypadki pozostają bez zmian.
