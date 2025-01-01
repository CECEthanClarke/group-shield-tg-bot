## README-Übersetzung

**Sprachen:**[Englisch](README.md)\|[Vereinfachtes Chinesisch](README.zh-CN.md)\|[Traditionelles Chinesisch](README.zh-TW.md)\|[Hindi](README.hi.md)\|[Araber](README.ar.md)\|[Französisch](README.fr.md)\|[Spanisch](README.es.md)\|[Deutsch](README.de.md)\|[japanisch](README.ja.md)\|[Portugiesisch](README.pt.md)\|[Russisch](README.ru.md)\|[Italienisch](README.it.md)\|[Koreanisch](README.ko.md)\|[Türkisch](README.tr.md)\|[Niederländisch](README.nl.md)\|[Thailändisch](README.th.md)\|[Vietnamesisch](README.vi.md)\|[Polieren](README.pl.md)\|[ukrainisch](README.uk.md)\|[griechisch](README.el.md)

# Group Shield Telegram Bot

The main function of the Group Shield Telegram Bot is to verify new members. Users must pass the verification process before they can send messages in the group.

Unterstützt mehrsprachige Einstellungen und dynamische Anpassung an die Sprache des Benutzers.

## Merkmale

-   /mute {Minuten}
    Mit dem Befehl /mute können Sie verhindern, dass jemand Nachrichten sendet. Antworten Sie vor der Verwendung auf die Nachricht der Person. Standardmäßig ist die Stummschaltung dauerhaft, Sie können die Dauer jedoch in Minuten nach dem Befehl hinzufügen. Wenn Sie beispielsweise „1“ hinzufügen, werden sie für eine Minute stummgeschaltet.
-   /unmute Um die Stummschaltung einer Person in der Gruppe aufzuheben und ihr das Senden von Nachrichten wieder zu ermöglichen, antworten Sie auf ihre Nachricht, bevor Sie den Befehl verwenden.
-   /kickout {Minuten} 
    Mit dem Befehl /kickout können Sie jemanden aus der Gruppe entfernen. Antworten Sie auf die Nachricht der Person, bevor Sie den Befehl verwenden. Standardmäßig ist die Entfernung dauerhaft, Sie können jedoch nach dem Befehl die Dauer in Minuten hinzufügen. Wenn Sie beispielsweise „1“ hinzufügen, bedeutet dies, dass sie nach einer Minute wieder beitreten können.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Bereitstellungshandbuch

### Schritt 1: Erstellen Sie Ihren Telegram-Bot

1.  Gehe zu**@BotFather**auf Telegram und nutzen Sie die`/newbot`Befehl zum Erstellen Ihres Bots.
2.  Befolgen Sie die Anweisungen, um die erforderlichen Informationen bereitzustellen.
3.  Einmal erstellt,**@BotFather**sendet Ihnen den Token des Bots. Dieses Token ist für die Bereitstellung unerlässlich – bewahren Sie es zur späteren Verwendung auf.

### Schritt 2: Stellen Sie den Bot auf dem Server bereit

Sie müssen die Datei docker-compose.yml aus dem Quellverzeichnis in Ihr Serververzeichnis kopieren. Konfigurieren Sie dann die Werte für BOT_TOKEN und BOT_USERNAME in der Datei docker-compose.yml.

-   BOT_TOKEN – Dies ist das Token des Bots.
-   BOT_USERNAME – Dies ist der Benutzername des Bots ohne das „@“-Symbol.

Sobald Sie es ausgefüllt haben, können Sie loslegen.

-   VERIFICATION_EXPIRATION_SECONDS – Standardmäßig 120 Sekunden. Dies bedeutet, dass Benutzer 120 Sekunden Zeit haben, um den Verifizierungsprozess abzuschließen, wenn sie der Gruppe beitreten. Wenn sie scheitern, werden sie entfernt.
-   RE_JOIN_SECONDS – Standardmäßig 120 Sekunden. Nach dem Entfernen können Benutzer der Gruppe nach 120 Sekunden wieder beitreten.
-   LANGUAGE_CODE – Standardmäßig „en“.["en", "zh", "es", "de", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms", "fa", "uk", "vi", "tr", "ja"]
-   ADMIN_CHAT_ID – Geben Sie Ihre Chat-ID ein. Nach dem Betreten benachrichtigt Sie der Roboter, sobald er gestartet ist.
-   ENFORCE_PRIMARY_LANGUAGE – Der Standardwert ist „false“. „false“ bedeutet, dass das System basierend auf dem Sprachcode des Benutzers dynamisch wechselt. Wenn Sie den Wert auf „true“ setzen, folgen alle Konfigurationen der von Ihnen festgelegten primären Sprache.
-   UPDATE_NOTIFICATION_URL – Sie können eine Benachrichtigungs-URL definieren und der Bot sendet Aktualisierungsnachrichten per POST an Ihre Serveranwendung. Wenn Sie das Feld leer lassen, ist diese Funktion standardmäßig deaktiviert.
-   UPDATE_NOTIFICATION_AUTHORIZATION – Sie können einen Autorisierungsheader für die Benachrichtigungsauthentifizierung definieren. Wenn Sie das Feld leer lassen, ist diese Funktion standardmäßig deaktiviert.

### Schritt 3: Starten Sie den Bot

Nachdem Sie alles konfiguriert haben, starten Sie den Bot, indem Sie den folgenden Befehl ausführen:

```bash
docker compose up -d
```
