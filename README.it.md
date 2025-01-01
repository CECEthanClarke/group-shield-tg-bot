## Traduzione README

**Lingue:**[Inglese](README.md)\|[Cinese semplificato](README.zh-CN.md)\|[Cinese tradizionale](README.zh-TW.md)\|[hindi](README.hi.md)\|[arabo](README.ar.md)\|[francese](README.fr.md)\|[spagnolo](README.es.md)\|[tedesco](README.de.md)\|[giapponese](README.ja.md)\|[portoghese](README.pt.md)\|[russo](README.ru.md)\|[Italiano](README.it.md)\|[coreano](README.ko.md)\|[turco](README.tr.md)\|[Olandese](README.nl.md)\|[tailandese](README.th.md)\|[vietnamita](README.vi.md)\|[Polacco](README.pl.md)\|[ucraino](README.uk.md)\|[greco](README.el.md)

# Bot Telegram di gruppo scudo

La funzione principale del Group Shield Telegram Bot è verificare i nuovi membri. Gli utenti devono superare il processo di verifica prima di poter inviare messaggi nel gruppo.

Supporta impostazioni multilingue e adattamento dinamico alla lingua dell'utente.

## Caratteristiche

-   /muto {minuti}
    Puoi utilizzare il comando /mute per impedire a qualcuno di inviare messaggi. Prima di usarlo, rispondi al messaggio della persona. Per impostazione predefinita, l'audio è permanente, ma puoi aggiungere la durata in minuti dopo il comando. Ad esempio, aggiungendo "1" si disattiva l'audio per 1 minuto.
-   /unmute Per riattivare l'audio di qualcuno nel gruppo e consentirgli di inviare nuovamente messaggi, rispondere al messaggio prima di utilizzare il comando.
-   /kickout {minuti} 
    Puoi utilizzare il comando /kickout per rimuovere qualcuno dal gruppo. Rispondi al messaggio della persona prima di utilizzare il comando. Per impostazione predefinita, la rimozione è permanente, ma puoi aggiungere la durata in minuti dopo il comando. Ad esempio, aggiungendo "1" significa che possono riconnettersi dopo 1 minuto.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Guida alla distribuzione

### Passaggio 1: crea il tuo bot Telegram

1.  Vai a**@BotFather**su Telegram e usa il file`/newbot`comando per creare il tuo bot.
2.  Segui le istruzioni per fornire le informazioni richieste.
3.  Una volta creato,**@BotFather**ti invierà il token del bot. Questo token è essenziale per la distribuzione: salvalo per un utilizzo successivo.

### Passaggio 2: distribuire il bot sul server

È necessario copiare il file docker-compose.yml dalla directory di origine alla directory del server. Quindi, configura i valori per BOT_TOKEN e BOT_USERNAME nel file docker-compose.yml.

-   BOT_TOKEN – Questo è il token del bot.
-   BOT_USERNAME – Questo è il nome utente del bot senza il simbolo "@".

Una volta compilato, sei a posto.

-   VERIFICATION_EXPIRATION_SECONDS – Il valore predefinito è 120 secondi. Ciò significa che gli utenti hanno 120 secondi per completare il processo di verifica quando si uniscono al gruppo. Se falliscono, verranno rimossi.
-   RE_JOIN_SECONDS – Il valore predefinito è 120 secondi. Dopo essere stati rimossi, gli utenti possono rientrare nel gruppo dopo 120 secondi.
-   LANGUAGE_CODE – Il valore predefinito è "en".["in", "zh", "es", "of", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms ", "fa", "uk", "vi", "tr", "ja"]
-   ADMIN_CHAT_ID - Inserisci il tuo ID chat. Dopo essere entrato, il robot ti avviserà una volta avviato.
-   ENFORCE_PRIMARY_LANGUAGE - Il valore predefinito è false, "false" significa che il sistema cambierà dinamicamente in base al codice della lingua dell'utente. Impostandolo su "true" significa che tutte le configurazioni seguiranno la lingua principale impostata.
-   UPDATE_NOTIFICATION_URL: puoi definire un URL di notifica e il bot invierà messaggi di aggiornamento tramite POST alla tua applicazione server. Se lasciata vuota, questa funzione sarà disabilitata per impostazione predefinita.
-   UPDATE_NOTIFICATION_AUTHORIZATION: è possibile definire un'intestazione di autorizzazione per l'autenticazione della notifica. Se lasciata vuota, questa funzionalità è disabilitata per impostazione predefinita.

### Passaggio 3: avvia il bot

Dopo aver configurato tutto, avvia il bot eseguendo il seguente comando:

```bash
docker compose up -d
```
