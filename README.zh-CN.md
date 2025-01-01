## 自述文件翻译

**Languages:**[英语](README.md)\|[简体中文](README.zh-CN.md)\|[繁体中文](README.zh-TW.md)\|[印地语](README.hi.md)\|[阿拉伯](README.ar.md)\|[法语](README.fr.md)\|[西班牙语](README.es.md)\|[德语](README.de.md)\|[日本人](README.ja.md)\|[葡萄牙语](README.pt.md)\|[俄语](README.ru.md)\|[意大利语](README.it.md)\|[韩国人](README.ko.md)\|[土耳其](README.tr.md)\|[荷兰语](README.nl.md)\|[泰国](README.th.md)\|[越南语](README.vi.md)\|[抛光](README.pl.md)\|[乌克兰](README.uk.md)\|[希腊语](README.el.md)

# Group Shield 电报机器人

Group Shield Telegram Bot 的主要功能是验证新成员。用户必须通过验证后才能在群中发送消息。

支持多语言设置，动态适应用户语言。

## 特征

-   /静音{分钟}
    您可以使用 /mute 命令来阻止某人发送消息。在使用它之前，请回复该人的消息。默认情况下，静音是永久性的，但您可以在命令后添加持续时间（以分钟为单位）。例如，添加“1”将其静音 1 分钟。
-   /unmute 要取消群组中某人的静音并允许他们再次发送消息，请在使用该命令之前回复他们的消息。
-   /踢出{分钟} 
    您可以使用 /kickout 命令将某人从组中删除。在使用该命令之前回复此人的消息。默认情况下，删除是永久性的，但您可以在命令后添加持续时间（以分钟为单位）。例如，加“1”表示1分钟后可以重新加入。

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## 部署指南

### 第 1 步：创建您的 Telegram 机器人

1.  前往**@BotFather**在 Telegram 上并使用`/newbot`命令来创建你的机器人。
2.  按照提示提供所需的信息。
3.  一旦创建，**@BotFather**将向您发送机器人的令牌。此令牌对于部署至关重要 - 保存它以供以后使用。

### 第 2 步：将机器人部署到服务器

您需要将 docker-compose.yml 文件从源目录复制到服务器目录。然后，在 docker-compose.yml 文件中配置 BOT_TOKEN 和 BOT_USERNAME 的值。

-   BOT_TOKEN – 这是机器人的令牌。
-   BOT_USERNAME – 这是机器人的用户名，不带“@”符号。

填写完毕后，您就可以开始了。

-   VERIFICATION_EXPIRATION_SECONDS – 默认为 120 秒。这意味着用户在加入群组时有 120 秒的时间来完成验证过程。如果失败，他们将被移除。
-   RE_JOIN_SECONDS – 默认为 120 秒。被移除后，用户可以在 120 秒后重新加入群组。
-   LANGUAGE_CODE – 默认为“en”。[“en”、“zh”、“es”、“of”、“nl”、“it”、“ar”、“pt”、“ko”、“ru”、“fr”、“id”、“ms” ”、“fa”、“英国”、“vi”、“tr”、“ja”"]
-   ADMIN_CHAT_ID - 输入您的聊天 ID。进入后，机器人启动后会通知您。
-   ENFORCE_PRIMARY_LANGUAGE - 默认为 false，“false”表示系统将根据用户的语言代码动态切换。将其设置为“true”意味着所有配置都将遵循您设置的主要语言。
-   UPDATE_NOTIFICATION_URL - 您可以定义通知 URL，机器人将通过 POST 向您的服务器应用程序发送更新消息。如果留空，则默认情况下禁用此功能。
-   UPDATE_NOTIFICATION_AUTHORIZATION - 您可以为通知身份验证定义授权标头。如果留空，则默认禁用此功能。

### 第 3 步：启动机器人

配置完所有内容后，通过运行以下命令启动机器人：

```bash
docker compose up -d
```
