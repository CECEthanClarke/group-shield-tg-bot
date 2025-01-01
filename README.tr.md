## README Çevirisi

**Diller:**[İngilizce](README.md)\|[Basitleştirilmiş Çince](README.zh-CN.md)\|[Geleneksel Çince](README.zh-TW.md)\|[Hintçe](README.hi.md)\|[Arap](README.ar.md)\|[Fransızca](README.fr.md)\|[İspanyol](README.es.md)\|[Almanca](README.de.md)\|[Japonca](README.ja.md)\|[Portekizce](README.pt.md)\|[Rusça](README.ru.md)\|[İtalyan](README.it.md)\|[kore](README.ko.md)\|[Türkçe](README.tr.md)\|[Flemenkçe](README.nl.md)\|[Tay dili](README.th.md)\|[Vietnam](README.vi.md)\|[Lehçe](README.pl.md)\|[Ukrayna](README.uk.md)\|[Yunan](README.el.md)

# Grup Kalkanı Telgraf Botu

Group Shield Telegram Botunun ana işlevi yeni üyeleri doğrulamaktır. Kullanıcıların grupta mesaj gönderebilmeleri için doğrulama sürecinden geçmeleri gerekmektedir.

Çok dilli ayarları ve kullanıcının diline dinamik adaptasyonu destekler.

## Özellikler

-   /mute {dakika}
    Birisinin mesaj göndermesini engellemek için /mute komutunu kullanabilirsiniz. Kullanmadan önce kişinin mesajına yanıt verin. Varsayılan olarak sessize alma kalıcıdır ancak süreyi komuttan sonra dakika cinsinden ekleyebilirsiniz. Örneğin, “1” eklenmesi onları 1 dakikalığına susturur.
-   /unmute Gruptaki bir kişinin sesini açmak ve tekrar mesaj göndermesine izin vermek için, komutu kullanmadan önce mesajını yanıtlayın.
-   /kickout {dakika} 
    Bir kişiyi gruptan çıkarmak için /kickout komutunu kullanabilirsiniz. Komutu kullanmadan önce kişinin mesajını yanıtlayın. Varsayılan olarak kaldırma işlemi kalıcıdır ancak süreyi komuttan sonra dakika cinsinden ekleyebilirsiniz. Örneğin “1” eklenmesi, 1 dakika sonra yeniden katılabilecekleri anlamına gelir.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Dağıtım Kılavuzu

### Adım 1: Telegram Botunuzu Oluşturun

1.  Git**@BotFather**Telegram'da ve`/newbot`botunuzu oluşturma komutu.
2.  Gerekli bilgileri sağlamak için talimatları izleyin.
3.  Bir kez oluşturulduktan sonra,**@BotFather**size botun jetonunu gönderecek. Bu belirteç dağıtım için gereklidir; daha sonra kullanmak üzere saklayın.

### Adım 2: Botu Sunucuya Dağıtın

Docker-compose.yml dosyasını kaynak dizinden sunucu dizininize kopyalamanız gerekir. Daha sonra docker-compose.yml dosyasında BOT_TOKEN ve BOT_USERNAME değerlerini yapılandırın.

-   BOT_TOKEN – Bu botun jetonudur.
-   BOT_USERNAME – Bu, botun “@” simgesi olmayan kullanıcı adıdır.

Doldurulduktan sonra, gitmeye hazırsınız.

-   VERIFICATION_EXPIRATION_SECONDS – Varsayılan olarak 120 saniyeye ayarlanır. Bu, kullanıcıların gruba katılırken doğrulama işlemini tamamlamak için 120 saniyeye sahip olduğu anlamına gelir. Başarısız olmaları durumunda kaldırılacaklardır.
-   RE_JOIN_SECONDS – Varsayılan olarak 120 saniyedir. Kaldırıldıktan sonra kullanıcılar 120 saniye sonra gruba yeniden katılabilirler.
-   LANGUAGE_CODE – Varsayılan olarak “en” olur.["in", "zh", "es", "of", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms ", "fa", "uk", "vi", "tr", "ja"]
-   ADMIN_CHAT_ID - Sohbet kimliğinizi girin. Girdikten sonra robot başladığında sizi bilgilendirecektir.
-   ENFORCE_PRIMARY_LANGUAGE - Varsayılan değer yanlıştır; 'yanlış', sistemin kullanıcının dil koduna göre dinamik olarak geçiş yapacağı anlamına gelir. 'Doğru' olarak ayarlamak, tüm yapılandırmaların ayarladığınız birincil dili takip edeceği anlamına gelir.
-   UPDATE_NOTIFICATION_URL - Bir bildirim URL'si tanımlayabilirsiniz; bot, güncelleme mesajlarını POST aracılığıyla sunucu uygulamanıza gönderir. Boş bırakılırsa bu özellik varsayılan olarak devre dışı bırakılacaktır.
-   UPDATE_NOTIFICATION_AUTHORIZATION - Bildirim kimlik doğrulaması için bir Yetkilendirme başlığı tanımlayabilirsiniz. Boş bırakılırsa bu özellik varsayılan olarak devre dışıdır.

### 3. Adım: Botu Başlatın

Her şeyi yapılandırdıktan sonra aşağıdaki komutu çalıştırarak botu başlatın:

```bash
docker compose up -d
```
