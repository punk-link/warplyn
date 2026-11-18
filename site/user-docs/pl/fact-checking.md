---
description: "Sprawdzaj twierdzenia faktyczne, analizuj źródła i werdykty oraz decyduj, jak postępować z uwagami Weryfikacja faktów."
---

# Weryfikacja faktów

Użyj **Sprawdź fakty**, aby sprawdzić weryfikowalne twierdzenia w *artykule*, na przykład szczegóły historyczne lub informacje o danym miejscu. Asystent zwraca doradcze *uwagi* z wyjaśnieniami, źródłami i informacją o niepewności. Sprawdzenie nie zmienia tekstu.

Weryfikacja faktów wymaga [połączenia AI i modelu](providers.md) obsługujących sprawdzanie faktów ze źródłami. Dostawca może naliczyć opłatę.

## Rozpocznij sprawdzanie

1. Otwórz *artykuł*. Jeśli chcesz skupić sprawdzanie na fragmencie, zaznacz go.
2. Otwórz **Szybkie działania** i wybierz **Sprawdź fakty**. Możesz też poprosić asystenta o sprawdzenie faktów w tekście.
3. Przejrzyj twierdzenia wybrane przez asystenta i odznacz te, których nie chcesz sprawdzać.
4. Wybierz **Wyślij żądanie redakcyjne**.
5. Otwórz **Weryfikacja faktów**, aby sprawdzić wyniki dotyczące weryfikowanej, zapisanej *wersji*.

::: tip Przykład
W The River at Dusk Ana mówi, że pełnia podniesie poziom wody na tyle, by zakryć ścieżkę. Sprawdź to twierdzenie w źródłach dotyczących rzeki i miejsca, w którym rozgrywa się historia. Zanim zmienisz scenę, sprawdź, czy źródła opisują właśnie tę rzekę.
:::

Podczas sprawdzania możesz dalej pisać lub przejść w inne miejsce. Jeśli sprawdzanie nie zostanie ukończone, dostępne będą tylko ukończone *uwagi*. Zleć ponowne sprawdzenie niedokończonych twierdzeń.

## Przeczytaj werdykt i źródła

Wybierz twierdzenie w **Weryfikacja faktów**, aby przeczytać jego wyjaśnienie, źródła, datę sprawdzenia i informację o niepewności.

| Werdykt | Znaczenie |
| --- | --- |
| **Potwierdzone** | Znalezione dowody potwierdzają twierdzenie. Warto jednak sprawdzić, czy źródła pasują do Twojego kontekstu. |
| **Zakwestionowane** | Znalezione dowody podważają twierdzenie. Przed decyzją o zmianie przeczytaj wyjaśnienie i źródła. |
| **Nieweryfikowalne** | Na podstawie dostępnych dowodów nie udało się ustalić, czy twierdzenie jest prawdziwe. Sam ten wynik nie oznacza, że twierdzenie jest fałszywe. |

Otwórz linki do źródeł i sprawdź ich przydatność, daty oraz sformułowania. *Uwaga* jest wskazówką, a nie dowodem. Data sprawdzenia informuje, kiedy zweryfikowano twierdzenie; nie oznacza, że wszystkie źródła opublikowano tego dnia.

## Zdecyduj, co zrobić z uwagą

Dla nierozstrzygniętej *uwagi* z najnowszego sprawdzenia bieżącej *zapisanej wersji* wybierz działanie odpowiadające Twojej decyzji.

| Działanie | Wynik |
| --- | --- |
| **Zaakceptuj bez zmian** | Zapisuje, że zamierzasz pozostawić twierdzenie w obecnym brzmieniu. Przy *uwadze* pojawi się **Zaakceptowano bez zmian**. |
| **Zaakceptuj dowody** | Zapisuje, że sprawdzono i zaakceptowano przedstawione dowody. Przy *uwadze* pojawi się **Dowody zaakceptowane**. |
| **Zaproponuj poprawkę** | W przypadku twierdzenia **Zakwestionowane** lub **Nieweryfikowalne** prosi asystenta o przygotowanie poprawki jako *propozycji*. Sprawdź ją przed zastosowaniem zmian. |

Oba działania akceptacji oznaczają *uwagę* jako rozstrzygniętą, usuwają przyciski decyzji i sprawiają, że przestaje ona wymagać uwagi w bibliotece artykułów. Żadne z nich nie zmienia *artykułu* ani werdyktu. Zapisują różne powody decyzji, ale poza tym tak samo wpływają na proces przeglądu.

Na przykład **Disputed · Dowody zaakceptowane** oznacza, że sprawdzenie podważyło twierdzenie, a Ty zaakceptowałeś przedstawione dowody. **Nie oznacza**, że twierdzenie zostało poprawione lub jest teraz potwierdzone. Jeśli tekst wymaga zmiany, popraw *artykuł* albo poproś o korektę przed rozstrzygnięciem *uwagi*.

Aby poprosić o kilka poprawek naraz, zaznacz nierozstrzygnięte twierdzenia **Zakwestionowane** lub **Nieweryfikowalne** i wybierz **Zaproponuj poprawki**. W widoku [Przegląd propozycji](reviewing-articles.md#review-a-proposal) sprawdź proponowane brzmienie i zastosuj zaakceptowane zmiany. Zastosowanie zaakceptowanego tekstu tworzy nową *zapisaną wersję*.

## Sprawdź ponownie po zmianach

*Uwagi* dotyczą *zapisanej wersji*, która była sprawdzana. Gdy bieżąca stanie się inna *zapisana wersja*, wcześniejsze *uwagi* nadal można odczytać, ale będą nieaktualne. Przed podjęciem działań wybierz **Sprawdź fakty ponownie**.

Użyj **Historia weryfikacji faktów**, aby przejrzeć wcześniejsze sprawdzenia. Są one tylko do odczytu; możesz podejmować działania wyłącznie na podstawie najnowszego sprawdzenia bieżącej *zapisanej wersji*.

Późniejsze sprawdzenie może ponownie wykorzystać dowody i decyzje o akceptacji, jeśli rozpozna niezmieniony fakt, również w przypadku zmienionego sformułowania twierdzenia. Przy ponownie użytych wynikach pojawi się **Evidence reused from Revision**, a wcześniejsza data sprawdzenia zostanie zachowana. Zmiana znaczenia faktu może wymagać nowego wyszukiwania.

Ponowne sprawdzenie nie gwarantuje nowego wyszukiwania dla każdego niezmienionego twierdzenia. W przypadku informacji zależnych od czasu sprawdź źródła i daty, a następnie poproś asystenta o weryfikację twierdzenia na podstawie aktualnych źródeł.
