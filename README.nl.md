## README-vertaling

**Talen:**[Engels](README.md)\|[Vereenvoudigd Chinees](README.zh-CN.md)\|[Traditioneel Chinees](README.zh-TW.md)\|[Hindi](README.hi.md)\|[Arabisch](README.ar.md)\|[Frans](README.fr.md)\|[Spaans](README.es.md)\|[Duits](README.de.md)\|[Japanse](README.ja.md) \| [Portugees](README.pt.md)\|[Russisch](README.ru.md)\|[Italiaans](README.it.md)\|[Koreaans](README.ko.md)\|[Turks](README.tr.md)\|[Nederlands](README.nl.md)\|[Thais](README.th.md)\|[Vietnamees](README.vi.md)\|[Pools](README.pl.md)\|[Oekraïens](README.uk.md)\|[Grieks](README.el.md)

# Groepsschild Telegram Bot

De belangrijkste functie van de Group Shield Telegram Bot is het verifiëren van nieuwe leden. Gebruikers moeten het verificatieproces doorlopen voordat ze berichten in de groep kunnen verzenden.

Ondersteunt meertalige instellingen en dynamische aanpassing aan de taal van de gebruiker.

## Functies

-   /mute {minuten}
    U kunt de opdracht /mute gebruiken om te voorkomen dat iemand berichten verzendt. Beantwoord het bericht van de persoon voordat u het gebruikt. Standaard is het dempen permanent, maar u kunt de duur in minuten toevoegen na de opdracht. Als u bijvoorbeeld “1” toevoegt, worden ze gedurende 1 minuut gedempt.
-   /unmute Om het dempen van iemand in de groep op te heffen en hem/haar weer berichten te laten sturen, beantwoordt u het bericht voordat u de opdracht gebruikt.
-   /kickout {minuten} 
    Je kunt het commando /kickout gebruiken om iemand uit de groep te verwijderen. Beantwoord het bericht van de persoon voordat u de opdracht gebruikt. Standaard is de verwijdering permanent, maar u kunt de duur in minuten na de opdracht toevoegen. Als u bijvoorbeeld '1' toevoegt, betekent dit dat ze na 1 minuut weer kunnen deelnemen.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Implementatiehandleiding

### Stap 1: Maak uw Telegram-bot

1.  Ga naar**@BotFather**op Telegram en gebruik de`/newbot`opdracht om uw bot te maken.
2.  Volg de aanwijzingen om de vereiste informatie op te geven.
3.  Eenmaal gemaakt,**@BotFather**zal u het token van de bot sturen. Dit token is essentieel voor de implementatie; bewaar het voor later gebruik.

### Stap 2: Implementeer de bot op de server

U moet het docker-compose.yml-bestand van de bronmap naar uw servermap kopiëren. Configureer vervolgens de waarden voor BOT_TOKEN en BOT_USERNAME in het docker-compose.yml bestand.

-   BOT_TOKEN – Dit is het token van de bot.
-   BOT_USERNAME – Dit is de gebruikersnaam van de bot zonder het “@”-symbool.

Eenmaal ingevuld, bent u klaar om te gaan.

-   VERIFICATION_EXPIRATION_SECONDS – Standaard ingesteld op 120 seconden. Dit betekent dat gebruikers 120 seconden de tijd hebben om het verificatieproces te voltooien wanneer ze lid worden van de groep. Als ze niet slagen, worden ze verwijderd.
-   RE_JOIN_SECONDS – Standaard ingesteld op 120 seconden. Nadat ze zijn verwijderd, kunnen gebruikers na 120 seconden weer lid worden van de groep.
-   LANGUAGE_CODE – Standaard ingesteld op “en”.["en", "zh", "es", "of", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms ", "fa", "uk", "vi", "tr", "ja"]
-   ADMIN_CHAT_ID - Voer uw chat-ID in. Na binnenkomst geeft de robot u een melding zodra hij is gestart.
-   ENFORCE_PRIMARY_LANGUAGE - Standaard ingesteld op false, 'false' betekent dat het systeem dynamisch zal overschakelen op basis van de taalcode van de gebruiker. Als u dit op ‘waar’ instelt, zullen alle configuraties de primaire taal volgen die u instelt.
-   UPDATE_NOTIFICATION_URL - U kunt een meldings-URL definiëren en de bot verzendt updateberichten via POST naar uw serverapplicatie. Als u dit veld leeg laat, wordt deze functie standaard uitgeschakeld.
-   UPDATE_NOTIFICATION_AUTHORIZATION - U kunt een autorisatieheader definiëren voor verificatie van meldingen. Als u dit veld leeg laat, is deze functie standaard uitgeschakeld.

### Stap 3: Start de bot

Nadat je alles hebt geconfigureerd, start je de bot door de volgende opdracht uit te voeren:

```bash
docker compose up -d
```
