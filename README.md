## README Translation
**Languages:** [English](README.md) | [简体中文](README.zh-CN.md) | [繁体中文](README.zh-TW.md) | [हिंदी](README.hi.md) | [عربى](README.ar.md) | [Française](README.fr.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [日本語](README.ja.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [Italiano](README.it.md) | [한국어](README.ko.md) | [Türkçe](README.tr.md) | [Nederlands](README.nl.md) | [ไทย](README.th.md) | [Tiếng Việt](README.vi.md) | [Polski](README.pl.md) | [Українська](README.uk.md) | [Ελληνικά](README.el.md)

# Group Shield Telegram Bot

The main function of the Group Shield Telegram Bot is to verify new members. Users must pass the verification process before they can send messages in the group.

Supports multilingual settings and dynamic adaptation to the user’s language.

## Features

- /mute {minutes}
You can use the /mute command to prevent someone from sending messages. Before using it, reply to the person’s message. By default, the mute is permanent, but you can add the duration in minutes after the command. For example, adding “1” mutes them for 1 minute.
- /unmute To unmute someone in the group and allow them to send messages again, reply to their message before using the command.
- /kickout {minutes} 
You can use the /kickout command to remove someone from the group. Reply to the person’s message before using the command. By default, the removal is permanent, but you can add the duration in minutes after the command. For example, adding “1” means they can rejoin after 1 minute.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)
![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Deployment Guide

### Step 1: Create Your Telegram Bot  
1. Go to **@BotFather** on Telegram and use the `/newbot` command to create your bot.  
2. Follow the prompts to provide the required information.  
3. Once created, **@BotFather** will send you the bot's token. This token is essential for deployment—save it for later use.  

### Step 2: Deploy the Bot to the Server

You need to copy the docker-compose.yml file from the source directory to your server directory. Then, configure the values for BOT_TOKEN and BOT_USERNAME in the docker-compose.yml file.
- BOT_TOKEN – This is the bot’s token.
- BOT_USERNAME – This is the bot’s username without the “@” symbol.

Once filled in, you’re good to go.
- VERIFICATION_EXPIRATION_SECONDS – Defaults to 120 seconds. This means users have 120 seconds to complete the verification process when joining the group. If they fail, they will be removed.
- RE_JOIN_SECONDS – Defaults to 120 seconds. After being removed, users can rejoin the group after 120 seconds.
- LANGUAGE_CODE – Defaults to “en”. ["en", "zh", "es", "de", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms", "fa", "uk", "vi", "tr", "ja"]
- ADMIN_CHAT_ID - Enter your chat ID. After entering, the robot will notify you once it has started.
- ENFORCE_PRIMARY_LANGUAGE - Defaults to false, ‘false’ means the system will dynamically switch based on the user’s language code. Setting it to ‘true’ means all configurations will follow the primary language you set.
- UPDATE_NOTIFICATION_URL - You can define a notification URL, and the bot will send update messages via POST to your server application. If left blank, this feature will be disabled by default.
- UPDATE_NOTIFICATION_AUTHORIZATION - You can define an Authorization header for notification authentication. If left blank, this feature is disabled by default.

### Step 3: Start the Bot
After configuring everything, start the bot by running the following command:
```bash
docker compose up -d
```