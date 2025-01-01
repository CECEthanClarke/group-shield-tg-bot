## CZYTAJ TŁUMACZENIE

**Języki:**[angielski](README.md)\|[Uproszczony chiński](README.zh-CN.md)\|[Tradycyjny chiński](README.zh-TW.md)\|[hinduski](README.hi.md)\|[Arab](README.ar.md)\|[francuski](README.fr.md)\|[hiszpański](README.es.md)\|[niemiecki](README.de.md)\|[japoński](README.ja.md)\|[portugalski](README.pt.md)\|[rosyjski](README.ru.md)\|[włoski](README.it.md)\|[koreański](README.ko.md)\|[turecki](README.tr.md)\|[Holenderski](README.nl.md)\|[tajski](README.th.md)\|[wietnamski](README.vi.md)\|[Polski](README.pl.md)\|[ukraiński](README.uk.md)\|[grecki](README.el.md)

# Bot telegramowy Tarcza Grupowa

Główną funkcją bota telegramowego Group Shield jest weryfikacja nowych członków. Użytkownicy muszą przejść proces weryfikacji, zanim będą mogli wysyłać wiadomości w grupie.

Obsługuje ustawienia wielojęzyczne i dynamiczną adaptację do języka użytkownika.

## Cechy

-   /mute {minuty}
    Możesz użyć polecenia /mute, aby uniemożliwić komuś wysyłanie wiadomości. Przed użyciem odpowiedz na wiadomość danej osoby. Domyślnie wyciszenie jest trwałe, ale po poleceniu możesz dodać czas trwania w minutach. Na przykład dodanie „1” wycisza je na 1 minutę.
-   /unmute Aby wyłączyć wyciszenie kogoś w grupie i pozwolić mu ponownie wysyłać wiadomości, odpowiedz na jego wiadomość przed użyciem polecenia.
-   /wyrzucenie {minuty} 
    Możesz użyć polecenia /kickout, aby usunąć kogoś z grupy. Odpowiedz na wiadomość danej osoby przed użyciem polecenia. Domyślnie usunięcie jest trwałe, ale po poleceniu możesz dodać czas trwania w minutach. Na przykład dodanie „1” oznacza, że ​​mogą dołączyć ponownie po 1 minucie.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Przewodnik wdrażania

### Krok 1: Utwórz bota telegramu

1.  Idź do**@BotFather**na Telegramie i skorzystaj z`/newbot`polecenie utworzenia bota.
2.  Postępuj zgodnie z instrukcjami, aby podać wymagane informacje.
3.  Raz stworzony,**@BotFather**wyśle ​​Ci token bota. Ten token jest niezbędny do wdrożenia — zachowaj go do późniejszego wykorzystania.

### Krok 2: Wdróż bota na serwerze

Musisz skopiować plik docker-compose.yml z katalogu źródłowego do katalogu na serwerze. Następnie skonfiguruj wartości dla BOT_TOKEN i BOT_USERNAME w pliku docker-compose.yml.

-   BOT_TOKEN – To jest token bota.
-   BOT_USERNAME – Jest to nazwa użytkownika bota bez symbolu „@”.

Po wypełnieniu możesz zaczynać.

-   VERIFICATION_EXPIRATION_SECONDS – domyślnie 120 sekund. Oznacza to, że użytkownicy mają 120 sekund na dokończenie procesu weryfikacji podczas dołączania do grupy. Jeżeli im się to nie uda, zostaną usunięte.
-   RE_JOIN_SECONDS – domyślnie 120 sekund. Po usunięciu użytkownicy mogą ponownie dołączyć do grupy po 120 sekundach.
-   LANGUAGE_CODE – Defaults to “en”. [„in”" „zh”", „es”" „of”", „nl”" „it”", „ar”" „pt”", „ko”" „ru”", „fr”" „id”", „ms " ",fa" ",uk" ",vi" ",tr" ",ja"]
-   ADMIN_CHAT_ID - Wprowadź swój identyfikator czatu. Po wejściu robot powiadomi Cię o uruchomieniu.
-   ENFORCE_PRIMARY_LANGUAGE — wartość domyślna to false, „false” oznacza, że ​​system będzie dynamicznie przełączał się w oparciu o kod języka użytkownika. Ustawienie wartości „true” oznacza, że ​​wszystkie konfiguracje będą zgodne z ustawionym językiem podstawowym.
-   UPDATE_NOTIFICATION_URL - Możesz zdefiniować adres URL powiadomień, a bot będzie wysyłał wiadomości aktualizacyjne poprzez POST do aplikacji serwera. Jeśli pozostawisz puste, ta funkcja będzie domyślnie wyłączona.
-   UPDATE_NOTIFICATION_AUTHORIZATION — można zdefiniować nagłówek autoryzacji na potrzeby uwierzytelniania powiadomień. Jeśli pozostawisz puste, ta funkcja jest domyślnie wyłączona.

### Krok 3: Uruchom bota

Po skonfigurowaniu wszystkiego uruchom bota wydając następującą komendę:

```bash
docker compose up -d
```
