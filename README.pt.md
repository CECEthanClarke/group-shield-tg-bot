## Tradução LEIA-ME

**Idiomas:**[Inglês](README.md)\|[Chinês simplificado](README.zh-CN.md)\|[Chinês Tradicional](README.zh-TW.md)\|[hindi](README.hi.md)\|[árabe](README.ar.md)\|[Francês](README.fr.md)\|[Espanhol](README.es.md)\|[Alemão](README.de.md)\|[japonês](README.ja.md)\|[Português](README.pt.md)\|[russo](README.ru.md)\|[Italiano](README.it.md)\|[coreano](README.ko.md)\|[turco](README.tr.md)\|[Holandês](README.nl.md)\|[Tailandês](README.th.md)\|[vietnamita](README.vi.md)\|[polonês](README.pl.md)\|[ucraniano](README.uk.md)\|[grego](README.el.md)

# Bot de telegrama do escudo de grupo

A principal função do Group Shield Telegram Bot é verificar novos membros. Os usuários devem passar pelo processo de verificação antes de poderem enviar mensagens no grupo.

Suporta configurações multilíngues e adaptação dinâmica ao idioma do usuário.

## Características

-   /mudo {minutos}
    Você pode usar o comando /mute para impedir que alguém envie mensagens. Antes de usá-lo, responda à mensagem da pessoa. Por padrão, o mudo é permanente, mas você pode adicionar a duração em minutos após o comando. Por exemplo, adicionar “1” os silencia por 1 minuto.
-   /unmute Para ativar o som de alguém no grupo e permitir que ele envie mensagens novamente, responda à mensagem antes de usar o comando.
-   /kickout {minutos} 
    Você pode usar o comando /kickout para remover alguém do grupo. Responda à mensagem da pessoa antes de usar o comando. Por padrão, a remoção é permanente, mas você pode adicionar a duração em minutos após o comando. Por exemplo, adicionar “1” significa que eles podem voltar após 1 minuto.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Guia de implantação

### Etapa 1: crie seu bot de telegrama

1.  Vá para**@BotFather**no Telegram e use o`/newbot`comando para criar seu bot.
2.  Siga as instruções para fornecer as informações necessárias.
3.  Uma vez criado,**@BotFather**enviará a você o token do bot. Este token é essencial para a implantação – guarde-o para uso posterior.

### Etapa 2: implantar o bot no servidor

Você precisa copiar o arquivo docker-compose.yml do diretório de origem para o diretório do servidor. Em seguida, configure os valores para BOT_TOKEN e BOT_USERNAME no arquivo docker-compose.yml.

-   BOT_TOKEN – Este é o token do bot.
-   BOT_USERNAME – Este é o nome de usuário do bot sem o símbolo “@”.

Depois de preenchido, você está pronto para prosseguir.

-   VERIFICATION_EXPIRATION_SECONDS – O padrão é 120 segundos. Isso significa que os usuários têm 120 segundos para concluir o processo de verificação ao ingressar no grupo. Se falharem, serão removidos.
-   RE_JOIN_SECONDS – O padrão é 120 segundos. Após serem removidos, os usuários poderão ingressar novamente no grupo após 120 segundos.
-   LANGUAGE_CODE – O padrão é “en”.["in", "zh", "es", "of", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms ", "fa", "uk", "vi", "tr", "ja"]
-   ADMIN_CHAT_ID – Insira seu ID de bate-papo. Depois de entrar, o robô irá notificá-lo assim que for iniciado.
-   ENFORCE_PRIMARY_LANGUAGE - O padrão é falso, 'falso' significa que o sistema mudará dinamicamente com base no código do idioma do usuário. Definir como ‘true’ significa que todas as configurações seguirão o idioma principal que você definiu.
-   UPDATE_NOTIFICATION_URL - Você pode definir uma URL de notificação e o bot enviará mensagens de atualização via POST para seu aplicativo de servidor. Se deixado em branco, esse recurso estará desabilitado por padrão.
-   UPDATE_NOTIFICATION_AUTHORIZATION - Você pode definir um cabeçalho de autorização para autenticação de notificação. Se deixado em branco, esse recurso estará desabilitado por padrão.

### Etapa 3: inicie o bot

Após configurar tudo, inicie o bot executando o seguinte comando:

```bash
docker compose up -d
```
