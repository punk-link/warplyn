---
description: "Exportieren und importieren Sie vollständige Artikel als Markdown-, HTML-, DOCX- oder RTF-Dateien."
---

# Artikeldateien

Verwenden Sie **In Datei speichern** und **Aus Datei laden**, um vollständige *Artikel* zwischen Warplyn und anderen Schreibprogrammen zu übertragen. Diese Aktionen sind in der Desktop- und der Web-App verfügbar.

## In Datei speichern

1. Öffnen Sie den *Artikel*, den Sie speichern möchten.
2. Wählen Sie im Artikelkopf neben **Version speichern** die Option **In Datei speichern**. Sie können auch in der Bibliothek mit der rechten Maustaste auf einen *Artikel* klicken und **In Datei speichern…** wählen, ohne ihn zu öffnen.
3. Wählen Sie im Speicherdialog der Desktop-App im Dateityp-Menü Markdown, HTML, DOCX oder RTF. Legen Sie dann Dateinamen und Speicherort fest. Behalten Sie die passende Dateiendung bei. Wählen Sie in der Web-App **Dateiformat**, dann **Herunterladen**, und verwenden Sie die Download-Steuerung Ihres Browsers.

Die Datei enthält den gesamten aktuellen *Entwurf*, einschließlich nicht gespeicherter Änderungen. Eine Textauswahl begrenzt den gespeicherten Inhalt nicht. Diese Aktion erstellt keine *Version*. Mit **Version speichern** fügen Sie den aktuellen *Entwurf* weiterhin Ihrem Verlauf hinzu.

::: tip Sie benötigen eine portable Kopie Ihres Arbeitsbereichs?
*Artikel*-Dateien enthalten nur den Text. Um Verlauf, Arbeit des Assistenten, *Fähigkeiten* und Einstellungen zu bewahren, erstellen Sie stattdessen eine [Sicherung](backups-and-recovery.md).
:::

Die Web-App meldet **Artikel-Download gestartet**, sobald sie die Datei an den Browser übergibt. Prüfen Sie im Downloadbereich des Browsers, ob der Vorgang abgeschlossen wurde oder ein Fehler aufgetreten ist.

## Aus Datei laden

1. Wählen Sie im Artikelkopf neben **Version speichern** die Option **Aus Datei laden**, oder klicken Sie in der Bibliothek mit der rechten Maustaste auf einen *Artikel* und wählen Sie **Aus Datei laden…**. Ist die Bibliothek leer, wählen Sie zuerst **Erstellen**.
2. Wählen Sie eine einzelne Datei mit der Endung `.md`, `.html`, `.htm`, `.docx` oder `.rtf` aus.
3. Aktivieren Sie bei HTML, DOCX und RTF die Option **Importierten Artikel prüfen** und wählen Sie dann **Importieren**. Sie können die Prüfung abbrechen. Markdown wird direkt geöffnet.
4. Warplyn öffnet den importierten Text als separaten *Artikel*. Der vorherige *Artikel* und sein wiederherstellbarer *Entwurf* bleiben in der Bibliothek verfügbar.

Eine einleitende Überschrift der Ebene 1 wird als neuer Titel verwendet. Andernfalls verwendet Warplyn den Dateinamen ohne Endung. Die Überschrift bleibt im Text des *Artikels* erhalten. Wenn Sie dieselbe Datei erneut laden, wird ein weiterer unabhängiger *Artikel* erstellt.

::: warning Beim Import wird ein separater Artikel erstellt
Das Laden einer Datei ersetzt nicht den *Artikel*, von dem aus Sie den Dateiauswahldialog geöffnet haben. Prüfen Sie den importierten *Artikel* und verschieben oder löschen Sie bei Bedarf einen der beiden *Artikel*.
:::

Wählen Sie eine Datei mit höchstens 10 MiB. Markdown und HTML müssen UTF-8 verwenden. DOCX und RTF funktionieren auch ohne installiertes Microsoft Office.

Warplyn übernimmt – soweit das Quellformat es unterstützt – Absätze, Überschriften, bearbeitbare verschachtelte Listen und Nummerierungen, Fettdruck, Kursivschrift, Durchstreichungen, sichere Links, Zitate, Code und Unicode-Text. Seitenlayout, Schriftarten, Bilder, eingebettete Objekte und komplexe formatspezifische Funktionen können entfallen oder vereinfacht werden. Tabelleninhalte werden zu normalem *Artikel*-Text. Prüfen Sie die Importvorschau, bevor Sie fortfahren. Nicht unterstützte Markdown-Erweiterungen können im Editor ebenfalls Formatierungen verlieren.

Sie können den Dateiauswahldialog schließen, ohne etwas zu importieren. Falls Ihr aktueller *Entwurf* nicht zur Wiederherstellung gespeichert werden kann, beheben Sie den Speicherfehler und versuchen Sie das Laden erneut.

## Eine Version in Datei speichern

1. Öffnen Sie **Versionen**.
2. Öffnen Sie die gespeicherte *Version*, die Sie exportieren möchten.
3. Wählen Sie neben den Versionsdetails **In Datei speichern**.

Die Datei enthält den gesamten *Artikel* aus dieser *Version*, unabhängig von Ihrem aktuellen *Entwurf*. Der Export stellt die *Version* nicht wieder her und ändert den Verlauf nicht. Der vorgeschlagene Dateiname enthält die Versionsnummer.

Für den Datei-Export gilt ebenfalls eine Grenze von 10 MiB. Falls das Speichern in der Desktop-App fehlschlägt, wählen Sie einen beschreibbaren Speicherort und versuchen Sie es erneut. Bei einem fehlgeschlagenen Ersetzen bleibt die vorhandene Zieldatei erhalten.

Exportierte Dateien enthalten den Text des *Artikels*, nicht den vollständigen Verlauf, Unterhaltungen oder Einstellungen. Informationen zum Schutz des gesamten Arbeitsbereichs finden Sie unter [Sicherungen und Wiederherstellung](backups-and-recovery.md).
