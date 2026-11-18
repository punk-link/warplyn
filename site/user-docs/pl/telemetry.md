---
description: "Dowiedz się, jakie dane diagnostyczne i statystyki użytkowania udostępnia Warplyn, co pozostaje prywatne i jak wyłączyć udostępnianie w Ustawieniach."
---

# Udostępnianie danych diagnostycznych i statystyk użytkowania

Po włączeniu udostępniania spakowane aplikacje Warplyn dla Windows i Linux wysyłają pseudonimowe zdarzenia dotyczące niezawodności i użytkowania do PostHog Cloud w amerykańskim stanie Wirginia. Domyślnie udostępnianie jest wyłączone. Włącz je, aby pomóc nam poznać Twoje doświadczenia i ulepszać Warplyn. Swoją decyzję możesz zmienić w sekcji **Ustawienia** → **Ogólne** → **Prywatność i diagnostyka**.

Wyłączenie udostępniania zatrzymuje przyszłe zbieranie danych oraz usuwa oczekujące zdarzenia i lokalny Identyfikator telemetrii. Ponowne włączenie tworzy nowe ID. Nie można cofnąć zdarzeń już wysłanych.

Oczekujące zdarzenia są przechowywane w lokalnym profilu aplikacji, aby Warplyn mógł ponowić wysyłkę po przywróceniu połączenia. Zdarzenia starsze niż 24 godziny są usuwane przy następnym sprawdzeniu kolejki przez aplikację. Wyłączenie udostępniania usuwa kolejkę.

[![Ustawienia Privacy and diagnostics z przełącznikiem udostępniania i kontrolkami Identyfikator telemetrii, którego wartość jest zasłonięta.](/images/diagnostic-and-usage-data.png)](/images/diagnostic-and-usage-data.png)

*Ustawienia Prywatność i diagnostyka w aplikacji desktopowej.*

## Co zbiera Warplyn

Zdarzenia obejmują:

- zakończoną powodzeniem lub nieudaną weryfikację połączenia, bez nazw połączeń i szczegółów dostawcy
- uruchomienia aplikacji oraz kategorie bezpiecznych awarii podczas startu, w rendererze lub procesie potomnym
- ukończone, nieudane lub anulowane działania i etapy AI, w tym kategorię awarii i — jeśli jest dostępny — status HTTP
- jawne przeglądy *propozycji* i zagregowane punkty kontrolne *szkiców*
- wyniki tworzenia kopii zapasowych i odzyskiwania danych

Zdarzenia nie zawierają tekstu *artykułu*, promptów, odpowiedzi AI ani kluczy API.

::: details Inne pola zdarzeń
Każde zdarzenie zawiera źródło analityki aplikacji desktopowej, wersję schematu, wersję aplikacji, platformę, architekturę, wersję systemu operacyjnego i znacznik czasu. Pola specyficzne dla zdarzenia są ograniczone do znanych kategorii, nieujemnych liczników lub czasu z ustaloną górną granicą.

Zdarzenia działań i etapów AI mogą zawierać losowe ID łączące zdarzenia z tego samego działania. Jest ono niezależne od ID artykułu i zlecenia.

Zdarzenia nie zawierają ID ani tytułów *artykułów* lub *zapisanych wersji*, wartości zmiennych środowiskowych, ścieżek plików, adresów URL, surowych błędów, szczegółów zamykania procesów ani treści żądań i odpowiedzi.
:::

## Zażądaj usunięcia danych

Informacje o dostępie, poprawianiu lub innych żądaniach dotyczących prywatności znajdziesz w sekcji [Żądania dotyczące danych](data-request.md).

1. W sekcji **Ustawienia** → **Ogólne** → **Prywatność i diagnostyka** wybierz **Kopiuj ID**.
2. Wyślij ID na adres [kirill.taran@punk.link](mailto:kirill.taran@punk.link) i zażądaj usunięcia.
3. Wyłącz **Udostępniaj dane diagnostyczne i dane użycia**.

Skopiuj ID przed wyłączeniem udostępniania. Wyłączenie usuwa ID z Twojego urządzenia. Właściciel projektu usuwa pasujący pseudonimowy wpis i potwierdza to e-mailem.

## Analityka witryny {#website-analytics}

Strona główna i strona planów korzystają z PostHog do mierzenia wizyt, informacji o odesłaniach i kampaniach oraz kliknięć łączy pobierania. Zdarzenia pobierania PostHog zawierają lokalizację przycisku na stronie. Google Analytics rejestruje też zdarzenie `download_clicked`, gdy ktoś otworzy łącze do najnowszego wydania na stronie głównej, stronie planów lub w podręczniku użytkownika. Kliknięcie nie potwierdza pobrania ani instalacji.

Śledzenie PostHog w witrynie nie używa plików cookie ani pamięci przeglądarki, nie tworzy profili osób i nie rejestruje nagrań sesji ani ogólnej aktywności kliknięć. PostHog szacuje liczbę odwiedzających, używając skrótu generowanego na serwerze. Zdarzenia witryny są niezależne od desktopowych Identyfikator telemetrii, a przełącznik udostępniania w aplikacji desktopowej nie steruje śledzeniem witryny.

Strony główne i podręcznik użytkownika korzystają również z Google Analytics, który może używać plików cookie do mierzenia wizyt i źródeł ruchu. Śledzenie zarówno przez Google Analytics, jak i PostHog jest pomijane, gdy przeglądarka wysyła sygnał Do Not Track lub Global Privacy Control. Opisane wyżej działanie bez plików cookie dotyczy PostHog.
