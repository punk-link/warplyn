---
description: "Połącz dostawcę AI z Warplyn, zapisz klucz API, wybierz modele oraz poznaj kontrole połączenia i obsługiwane możliwości."
---

# Dostawcy i modele AI

Warplyn wysyła zlecenia AI do dostawcy skonfigurowanego w **Ustawienia** → **Asystent AI**. Potrzebujesz konta i klucza API tego dostawcy. Dostawca może pobierać opłaty za korzystanie z API.

## Dodaj połączenie

W aplikacji desktopowej otwórz **Ustawienia** → **Asystent AI**. W sekcji **Jak chcesz podać klucz?** wybierz **Dodaj klucz API** albo **Zmienna środowiskowa**.

- **Dodaj klucz API:** wybierz dostawcę, nadaj połączeniu nazwę i wpisz klucz. Warplyn zapisze go w Windows Credential Manager lub Linux Secret Service. Klucz nie będzie ponownie wyświetlany ani przechowywany w bazie danych Warplyn lub w kopiach zapasowych.
- **Zmienna środowiskowa:** wybierz dostawcę, nadaj połączeniu nazwę i wpisz nazwę zmiennej zawierającej klucz. Warplyn zapisuje nazwę, a nie jej wartość. Usługa aplikacji musi zostać uruchomiona z ustawioną zmienną.

::: tip Dane logowania
Zarządzane klucze API wymagają aplikacji desktopowej i dostępnej usługi systemowego magazynu danych logowania. W systemie Linux usługa Secret Service musi być odblokowana. Aplikacja webowa obsługuje połączenia ze zmiennymi środowiskowymi, ale nie zarządza danymi logowania systemu operacyjnego. Instalator nie tworzy ani nie importuje pliku `.env`.
:::

Dodanie połączenia z kluczem API powoduje sprawdzenie klucza u dostawcy. Dodanie połączenia ze zmienną środowiskową zapisuje tylko jego ustawienia. Warplyn ponownie kontaktuje się z dostawcą podczas odświeżania modeli lub wysyłania zlecenia AI. Te kontrole nie obejmują treści *artykułu*.

Połączenia są wyświetlane w **Ustawienia** → **Asystent AI**. Użyj **Aktywne**, **Aktywuj** lub **Dezaktywuj**, aby określić, z których połączeń Warplyn może korzystać przy nowych zleceniach. Wybierz **Zmień nazwę**, aby zmienić lokalną nazwę połączenia, albo **Usuń** i potwierdź, aby usunąć je z Warplyn. Usunięcie połączenia ze zmienną środowiskową nie kasuje zmiennej ani klucza.

::: tip Jeśli odświeżanie modeli się nie powiedzie
Sprawdź, czy połączenie jest **Aktywne**, zapisany klucz jest prawidłowy albo usługa aplikacji ma dostęp do zmiennej środowiskowej, a także czy konto dostawcy ma dostęp do jego API.
:::

## Wybierz dostawców i modele

Warplyn obsługuje OpenAI, OpenCode Zen, Anthropic, Google Gemini API, xAI Grok i DeepSeek. Katalog OpenCode Zen zawiera również modele innych dostawców.

W **Ustawienia** → **Asystent AI** wybierz **Odśwież modele**, a następnie **Model domyślny**. Aby użyć innego modelu dla określonej *umiejętności*, wybierz go w sekcji **Modele do konkretnych zadań**. Zadanie ustawione na **Użyj modelu domyślnego** korzysta z Model domyślny.

Odśwież listę modeli po zmianie połączeń albo gdy chcesz zobaczyć aktualny katalog dostawcy. Użyj opcji **Szukaj modeli**, **Filtruj modele według dostawcy** i **Ulubione**, aby zawęzić listę. Wybór modelu dotyczy przyszłych zleceń. **Poziom rozumowania** pojawia się dla obsługiwanych modeli OpenAI; wyższe ustawienia mogą wydłużyć czas działania. Opcjonalny **Model aplikacji** w ustawieniach AI jest niezależny od Model domyślny i obsługuje zadania pomocnicze Warplyn, takie jak streszczenia i tytuły.

::: tip Dostępność modeli
Dostępne działania redakcyjne zależą od modelu. Niektóre modele nie obsługują weryfikacji faktów ze źródłami, ustrukturyzowanych wyników ani ustawień rozumowania. Modele OpenCode Zen podlegają możliwościom i dostępności swojego katalogu.
:::

[![Ustawienia Asystent AI z skonfigurowanymi połączeniami z dostawcami, opcjami konfiguracji klucza i kontrolkami modeli.](/images/ai-providers-and-models.png)](/images/ai-providers-and-models.png)

*Ustawienia Asystent AI z połączeniami dostawców i kontrolkami modeli.*

### Model aplikacji

**Model aplikacji** obsługuje krótkie zadania pomocnicze, takie jak podsumowania *propozycji*, tytuły i rozpoznawanie zamiaru zlecenia dla asystenta. Jeśli nie wybierzesz modelu, Warplyn korzysta z Model domyślny.

Wybierz wydajny model tekstowy o niższym koszcie. **GPT-6 Luna** to jedna z opcji OpenAI dla takich ukierunkowanych zadań ([szczegóły modelu](https://developers.openai.com/api/docs/models/gpt-6-luna)). W przypadku innego dostawcy wybierz porównywalny model. Jeśli wyniki nie są wystarczająco dobre, wypróbuj mocniejszy model.
