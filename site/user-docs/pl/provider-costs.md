---
description: "Dowiedz się, co wpływa na koszt zleceń AI w Warplyn, jak działa rozliczanie API i jak sprawdzać opłaty za korzystanie z usług dostawcy."
---

# Koszty dostawców AI

Korzystanie z pomocy AI jest opcjonalne. Warplyn nie pobiera opłat za zlecenia. Dostawca AI może obciążyć Twoje konto, gdy Warplyn wyśle zlecenie.

## Co wpływa na koszt

Dostawca ustala własne stawki. Koszt zlecenia może zależeć od:

- wybranego dostawcy i modelu
- ilości tekstu *artykułu* i kontekstu instrukcji w zleceniu
- ilości tekstu zwróconego przez model

Tekst znajdujący się w pobliżu zaznaczenia może ułatwić interpretację krótkiego fragmentu, ale wymaga wysłania również części niezaznaczonej treści. Zlecenia wymagające tekstu *artykułu* wysyłają zaznaczony fragment oraz do 500 znaków przed nim i po nim jako kontekst tylko do odczytu, czyli maksymalnie 1 000 dodatkowych znaków. Edytować można wyłącznie zaznaczenie. Bez zaznaczenia zlecenie może obejmować cały *artykuł* i odpowiedni kontekst. Węższy zakres może kosztować mniej, zależnie od stawek dostawcy.

::: tip Rozliczanie API
Subskrypcja usługi czatu dostawcy może nie obejmować korzystania z API. Przed dodaniem klucza sprawdź aktualne ceny API i warunki rozliczeń dostawcy.
:::

Do zwykłych zadań, takich jak wygładzanie fragmentu lub ukierunkowana poprawka, najpierw wypróbuj tańszy model. Z modelu droższego skorzystaj, gdy wyniki pokażą, że zadanie go wymaga.

## Sprawdź wykorzystanie

Sprawdź wykorzystanie, opłaty, alerty i limity wydatków na koncie dostawcy. Warplyn nie pokazuje rachunku dostawcy ani nie egzekwuje limitów wydatków. W sprawie rozliczeń, zwrotów lub opłat na koncie skontaktuj się z dostawcą.

Model użyty w zleceniu wpływa na jego koszt. W sekcji **Ustawienia** → **Asystent AI** wybierz **Model domyślny**, **Model aplikacji** oraz modele dla konkretnych zadań. Instrukcję konfiguracji znajdziesz w sekcji [Dostawcy i modele AI](providers.md).

::: tip Możesz pracować bez AI
Możesz pisać i zarządzać *artykułami* bez połączenia AI. Edycja, zapisywanie *zapisanych wersji* i korzystanie z lokalnych kopii zapasowych nie wysyłają zleceń AI.
:::
