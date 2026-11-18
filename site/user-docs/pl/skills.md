---
description: "Twórz i zarządzaj umiejętnościami do własnych zadań pisarskich oraz przeglądaj ich zapisane wersje."
---

# Tworzenie i zarządzanie umiejętnościami

*Umiejętności* to lokalne pakiety instrukcji w formacie Markdown. Pomagają asystentowi wybierać i porządkować funkcje redakcyjne. Nie dodają uprawnień ani nie zmieniają *artykułu*.

## Twórz i zarządzaj własnymi umiejętnościami

Poproś asystenta prostymi słowami o utworzenie wielokrotnego użytku *umiejętności*. Opisz powtarzane zadanie oraz potrzebne zasady lub materiały źródłowe. Jeśli brakujący szczegół mógłby zmienić *umiejętność*, asystent zada krótkie pytanie uzupełniające zamiast zgadywać.

::: tip Przykład
Aby poprawiać fikcję w stylu spokojnej sceny nad rzeką, poproś: „Utwórz *umiejętność* o nazwie ‘Quiet fiction line edit’. Skróć zdania Any, zachowując jej głos, scenerię nad rzeką i wydarzenia w scenie. Nie dodawaj szczegółów; oznacz niejasne fragmenty”. Asystent może ponownie użyć tych instrukcji, gdy poprosisz o poprawę stylu.
:::

[![Asystent redakcyjny Warplyn z prośbą o utworzenie umiejętności do poprawy fikcji i wybranym narzędziem Kreator umiejętności.](/images/skill-creator-example.png)](/images/skill-creator-example.png)

*Przykładowa prośba o utworzenie umiejętności w polu wpisywania. Przed wysłaniem połącz się z dostawcą.*

Po pomyślnym utworzeniu *umiejętność* jest od razu dostępna w nowych zleceniach dla asystenta. Prośba o jej utworzenie nie wysyła treści *artykułu* do modelu ani nie zmienia *artykułu*, *szkicu*, *propozycji* lub *zapisanej wersji*.

Każda utworzona *umiejętność* ma lokalną, niezmienną historię *zapisanych wersji umiejętności*. Jest ona oddzielona od historii *zapisanych wersji artykułu*. Możesz też bezpośrednio edytować lokalny pakiet Markdown. Warplyn odświeży katalog przed następnym zleceniem. Usunięcie pliku `SKILL.md` usuwa umiejętność z listy dostępnych *umiejętności*.

Poproś asystenta o poprawienie lub usunięcie *umiejętności*, podając jej nazwę. Przed zmianą odczyta bieżący pakiet i sprawdzi, czy w międzyczasie plik nie został zmieniony. Nowa wersja zachowuje ID *umiejętności* i dodaje kolejną *zapisaną wersję umiejętności*. Usunięcie wyłącza *umiejętność* z nowych zleceń, ale zachowuje jej historię.

Aby przywrócić wcześniejsze instrukcje, poproś o *zapisane wersje* danej *umiejętności* i wskaż tę, którą chcesz przywrócić. Przywracanie zapisuje nową aktywną wersję i dodaje kolejną *zapisaną wersję umiejętności*. W ten sposób możesz też przywrócić usuniętą *umiejętność*. Przywrócenie punktu kontrolnego czatu asystenta nie przywraca ani nie zmienia żadnej *umiejętności*; jej przywracanie wymaga osobnego zlecenia.
