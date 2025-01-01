## Traducción LÉAME

**Idiomas:**[Inglés](README.md)\|[Chino simplificado](README.zh-CN.md)\|[chino tradicional](README.zh-TW.md)\|[hindi](README.hi.md)\|[árabe](README.ar.md)\|[Francés](README.fr.md)\|[Español](README.es.md)\|[Alemán](README.de.md)\|[japonés](README.ja.md)\|[portugués](README.pt.md)\|[ruso](README.ru.md)\|[Italiano](README.it.md)\|[coreano](README.ko.md)\|[turco](README.tr.md)\|[Holandés](README.nl.md)\|[tailandés](README.th.md)\|[vietnamita](README.vi.md)\|[Polaco](README.pl.md)\|[ucranio](README.uk.md)\|[Griego](README.el.md)

# Bot de Telegram de escudo de grupo

La función principal del Group Shield Telegram Bot es verificar nuevos miembros. Los usuarios deben pasar el proceso de verificación antes de poder enviar mensajes en el grupo.

Admite configuraciones multilingües y adaptación dinámica al idioma del usuario.

## Características

-   /silenciar {minutos}
    Puede utilizar el comando /mute para evitar que alguien envíe mensajes. Antes de usarlo, responda el mensaje de la persona. De forma predeterminada, el silencio es permanente, pero puedes agregar la duración en minutos después del comando. Por ejemplo, agregar “1” los silencia durante 1 minuto.
-   /unmute Para reactivar el sonido de alguien del grupo y permitirle enviar mensajes nuevamente, responda a su mensaje antes de usar el comando.
-   /expulsión {minutos} 
    Puedes usar el comando /kickout para eliminar a alguien del grupo. Responda al mensaje de la persona antes de usar el comando. De forma predeterminada, la eliminación es permanente, pero puedes agregar la duración en minutos después del comando. Por ejemplo, agregar "1" significa que pueden volver a unirse después de 1 minuto.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Guía de implementación

### Paso 1: crea tu bot de Telegram

1.  Ir a**@BotFather**en Telegram y utiliza el`/newbot`Comando para crear tu bot.
2.  Siga las indicaciones para proporcionar la información requerida.
3.  Una vez creado,**@BotFather**le enviará el token del bot. Este token es esencial para la implementación; guárdelo para usarlo más adelante.

### Paso 2: implementar el bot en el servidor

Debe copiar el archivo docker-compose.yml del directorio de origen al directorio de su servidor. Luego, configure los valores para BOT_TOKEN y BOT_USERNAME en el archivo docker-compose.yml.

-   BOT_TOKEN: este es el token del bot.
-   BOT_USERNAME: este es el nombre de usuario del bot sin el símbolo "@".

Una vez completado, estará listo para comenzar.

-   VERIFICATION_EXPIRATION_SECONDS: el valor predeterminado es 120 segundos. Esto significa que los usuarios tienen 120 segundos para completar el proceso de verificación al unirse al grupo. Si fracasan, serán eliminados.
-   RE_JOIN_SECONDS: el valor predeterminado es 120 segundos. Después de ser eliminados, los usuarios pueden volver a unirse al grupo después de 120 segundos.
-   LANGUAGE_CODE: el valor predeterminado es "en".["en", "zh", "es", "of", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms ", "fa", "uk", "vi", "tr", "ja"]
-   ADMIN_CHAT_ID: ingrese su ID de chat. Después de ingresar, el robot te avisará una vez que haya comenzado.
-   ENFORCE_PRIMARY_LANGUAGE: el valor predeterminado es falso, "falso" significa que el sistema cambiará dinámicamente según el código de idioma del usuario. Establecerlo en "verdadero" significa que todas las configuraciones seguirán el idioma principal que establezca.
-   UPDATE_NOTIFICATION_URL: puede definir una URL de notificación y el bot enviará mensajes de actualización mediante POST a su aplicación de servidor. Si se deja en blanco, esta función se desactivará de forma predeterminada.
-   UPDATE_NOTIFICATION_AUTHORIZATION: puede definir un encabezado de Autorización para la autenticación de notificaciones. Si se deja en blanco, esta función está desactivada de forma predeterminada.

### Paso 3: inicia el bot

Después de configurar todo, inicie el bot ejecutando el siguiente comando:

```bash
docker compose up -d
```
