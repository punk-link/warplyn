---
description: "Skonfiguruj wygląd Warplyn, domyślne ustawienia pisania, działanie asystenta, wskazówki publikacyjne i preferencje aktualizacji aplikacji desktopowej."
---

# Ustawienia aplikacji

Ustawienia aplikacji określają wygląd i działanie Warplyn. Nie należą do historii *zapisanych wersji* *artykułu*. Otwórz **Ustawienia** w obszarze narzędzi panelu biblioteki artykułów. Niektóre ustawienia są dostępne tylko w aplikacji desktopowej; zostały oznaczone poniżej.

## Ustaw wygląd i język

W sekcji **Ogólne** → **Wygląd i język** wybierz **Systemowy**, **Jasny** lub **Ciemny** dla opcji **Preferowany wygląd**. Gdy wybierzesz **Systemowy**, Warplyn przejmie wygląd systemu. Zmiany w ustawieniach urządzenia będą widoczne także wtedy, gdy aplikacja jest otwarta. Wybierz **Język interfejsu** dla menu i komunikatów. Obecnie jedynym w pełni dostępnym językiem interfejsu jest angielski. Te ustawienia nie zmieniają języka pisania ani zasad typograficznych *artykułu*.

W sekcji **Data i godzina** wybierz format daty, zegar 12- lub 24-godzinny oraz strefę czasową. Opcje systemowe korzystają z ustawień urządzenia. Zmieniają sposób wyświetlania zapisanych godzin w Warplyn, ale nie same zapisane wartości.

## Ustaw domyślne opcje pisania

W sekcji **Domyślne języki** ustaw **Domyślny język artykułu** dla nowych *artykułów*. Ustaw **Domyślne języki tłumaczenia**, aby te języki były proponowane jako pierwsze podczas zlecania *tłumaczenia*. Wpisz nazwę języka, wariant regionalny lub kod, a następnie wybierz **Dodaj**. Warplyn nadal prosi o potwierdzenie każdego zlecenia tłumaczenia.

## Ustaw działanie asystenta

W sekcji **Asystent AI** wybierz **Proponuj zmiany do przeglądu** jako domyślną opcję dla nowych rozmów o *artykule* albo włącz **Stosuj zmiany bezpośrednio** dla zmian wyraźnie zleconych przez Ciebie. To ustawienie nie zmienia istniejących rozmów, a pozostałe wygenerowane wyniki nadal wymagają sprawdzenia.

**Limit czasu żądania** dotyczy każdego nowego zlecenia i ponownej próby. Domyślnie wynosi dwie minuty. Wybierz dłuższy limit lub **Bez limitu**, jeśli zadanie wymaga więcej czasu. Przekroczenie limitu nie zmienia *artykułu*.

Wybierz **Enter** lub **Ctrl + Enter** jako klawisz wysyłania wiadomości do asystenta. Pozostałe skróty aplikacji możesz zmienić w sekcji **Skróty klawiaturowe**. Przed zapisaniem skrótu Warplyn wykrywa konflikty.

## Ustaw wskazówki publikacyjne

W sekcji **Publikacja** wybierz domyślny profil dla nowych *artykułów*. Profile takie jak **Post na LinkedIn** i **Artykuł na LinkedIn** pokazują wskazówki dotyczące liczby znaków na pasku stanu artykułu. Możesz też wybrać **Bez ograniczeń** albo dodać własny profil z nazwą i całkowitym limitem znaków. Domyślny profil dotyczy nowych *artykułów*; istniejący *artykuł* może zachować własny profil. Limity są jedynie wskazówkami i nigdy nie blokują kopiowania. Na pasku stanu artykułu wybierz **Kopiuj Markdown** albo otwórz menu i wybierz **Kopiuj zwykły tekst**. Warplyn kopiuje tekst na Twoje polecenie; nie publikuje go bezpośrednio.

## Sprawdź opcje modeli AI

W sekcji **Asystent AI** możesz przechowywać połączenia z wieloma dostawcami, aktywować tylko te, których chcesz używać, oraz przypisywać różne modele do ogólnych zadań asystenta i konkretnych *umiejętności*. **Model domyślny** jest używany do zadań AI, chyba że zadanie ma własny wybór. Opcjonalny **Model aplikacji** obsługuje zadania Warplyn, takie jak podsumowania i tytuły; jeśli go nie ustawisz, używany jest Model domyślny. Wyszukaj model za pomocą **Ulubione**, wyszukiwania lub filtra dostawców. **Poziom rozumowania** jest dostępny dla obsługiwanych modeli OpenAI. Dostępne zadania i kontrolki zależą od modelu. Informacje o konfiguracji połączeń i ograniczeniach dostawców znajdziesz w sekcji [Dostawcy i modele AI](providers.md).

W sekcji **Skróty klawiaturowe** wybierz skrót obok działania, a następnie naciśnij wybraną kombinację klawiszy. Możesz ustawić skróty do zapisywania *zapisanej wersji*, przełączania widoków lub włączania i wyłączania trybu skupienia. Warplyn wskazuje działanie, które już używa konfliktującego skrótu; wybierz inną kombinację. **Wysyłaj za pomocą** określa, czy zlecenie dla asystenta wysyła klawisz **Enter**, czy **Ctrl + Enter**. Zmiana skrótów nie zmienia treści *artykułu*.

## Sprawdź aktualizacje aplikacji desktopowej

Spakowane aplikacje desktopowe mogą sprawdzać nowe wersje w sekcji **Ustawienia** → **O Warplyn** → **Aktualizacje**. Najpierw włącz **Zezwól na dostęp do sieci w celu aktualizacji**. Dzięki temu Warplyn może kontaktować się z GitHubem, aby pobierać publiczne informacje o wydaniach i aktualizacje, które zdecydujesz się pobrać. Następnie wybierz **Automatycznie sprawdzaj aktualizacje** i zdecyduj, czy **Uwzględniaj wydania wstępne**. W dowolnym momencie wybierz **Sprawdź teraz**. Jeśli jest dostępna aktualizacja, Warplyn wyświetli informacje o wydaniu. Instalacje Windows i Linux AppImage udostępniają przyciski **Pobierz** oraz **Uruchom ponownie i zaktualizuj**. Instalacje Debian używają **Zobacz informacje o wydaniu**, a następnie aktualizacji za pomocą menedżera pakietów lub nowszego instalatora `.deb`. Jeśli po aktualizacji aplikacja nie uruchamia się, zobacz [Odzyskiwanie po aktualizacji aplikacji desktopowej](update-recovery.md).

## Usuń dane lokalne

W aplikacji desktopowej polecenie **Usuń dane lokalne** trwale usuwa aktywne dane Warplyn, w tym *artykuły*, *zapisane wersje*, punkty kontrolne *szkiców*, historię asystenta, dane stylu, ustawienia i lokalne kopie zapasowe przechowywane w tym folderze danych. Jeśli skonfigurowano folder kopii zapasowych, okno potwierdzenia oferuje **Utwórz kopię zapasową przed usunięciem**. Warplyn musi ukończyć tworzenie kopii zapasowej, zanim cokolwiek usunie. Po pomyślnym usunięciu aplikacja zostaje zamknięta. Zwykłe odinstalowanie nie usuwa Twoich tekstów. Słowa dodane do osobistego słownika systemu operacyjnego pozostają w nim; jeśli chcesz je usunąć, zrób to osobno w sekcji **Ustawienia** → **Pisownia**.

Otwórz **Ustawienia** → **O Warplyn**, aby znaleźć podręcznik użytkownika, repozytorium źródłowe, system zgłaszania problemów i licencję. Wybierz **Otwórz szybki start**, aby ponownie zobaczyć wprowadzenie wyświetlane przy pierwszym uruchomieniu.
