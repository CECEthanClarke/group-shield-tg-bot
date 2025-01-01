## 自述文件翻譯

**語言：**[英語](README.md)\|[簡體中文](README.zh-CN.md)\|[繁體中文](README.zh-TW.md)\|[印地語](README.hi.md)\|[阿拉伯](README.ar.md)\|[法語](README.fr.md)\|[西班牙語](README.es.md)\|[德文](README.de.md)\|[日本人](README.ja.md) \| [葡萄牙語](README.pt.md)\|[俄文](README.ru.md)\|[義大利語](README.it.md)\|[韓國人](README.ko.md)\|[土耳其](README.tr.md)\|[荷蘭語](README.nl.md)\|[泰國](README.th.md)\|[越南語](README.vi.md)\|[拋光](README.pl.md)\|[烏克蘭](README.uk.md)\|[希臘文](README.el.md)

# Group Shield 電報機器人

Group Shield Telegram Bot 的主要功能是驗證新成員。用戶必須通過驗證後才能在群組中發送訊息。

支援多語言設置，動態適應用戶語言。

## 特徵

-   /靜音{分鐘}
    您可以使用 /mute 命令來阻止某人發送訊息。在使用它之前，請回覆該人的訊息。預設情況下，靜音是永久性的，但您可以在命令後添加持續時間（以分鐘為單位）。例如，新增“1”將其靜音 1 分鐘。
-   /unmute 要取消群組中某人的靜音並允許他們再次發送訊息，請在使用該命令之前回覆他們的訊息。
-   /踢出{分鐘} 
    您可以使用 /kickout 命令將某人從群組中刪除。在使用該命令之前回覆此人的消息。預設情況下，刪除是永久性的，但您可以在命令後添加持續時間（以分鐘為單位）。例如，加“1”表示1分鐘後可以重新加入。

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)
![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## 部署指南

### 第 1 步：建立您的 Telegram 機器人

1.  前往**@BotFather**在 Telegram 上並使用`/newbot`命令來創建你的機器人。
2.  依照提示提供所需的資訊。
3.  一旦創建，**@BotFather**將向您發送機器人的令牌。此令牌對於部署至關重要 - 保存它以供以後使用。

### 第 2 步：將機器人部署到伺服器

您需要將 docker-compose.yml 檔案從來源目錄複製到伺服器目錄。然後，在 docker-compose.yml 檔案中配置 BOT_TOKEN 和 BOT_USERNAME 的值。

-   BOT_TOKEN – 這是機器人的代幣。
-   BOT_USERNAME – 這是機器人的用戶名，不含「@」符號。

填寫完畢後，您就可以開始了。

-   VERIFICATION_EXPIRATION_SECONDS – 預設為 120 秒。這意味著用戶在加入群組時有 120 秒的時間來完成驗證過程。如果失敗，他們將被移除。
-   RE_JOIN_SECONDS – 預設為 120 秒。被移除後，使用者可以在 120 秒後重新加入群組。
-   LANGUAGE_CODE – 預設為「en」。[「en」、「zh」、「es」、「of」、「nl」、「it」、「ar」、「pt」、「ko」、「ru」、「fr」、「id」、「ms ” ”、“fa”、“英國”、“vi”、“tr”、“ja”"]
-   ADMIN_CHAT_ID - 輸入您的聊天 ID。進入後，機器人啟動後會通知您。
-   ENFORCE_PRIMARY_LANGUAGE - 預設為 false，「false」表示系統將根據使用者的語言程式碼動態切換。將其設為“true”意味著所有配置都將遵循您設定的主要語言。
-   UPDATE_NOTIFICATION_URL - 您可以定義通知 URL，機器人將透過 POST 向您的伺服器應用程式傳送更新訊息。如果留空，則預設情況下停用此功能。
-   UPDATE_NOTIFICATION_AUTHORIZATION - 您可以為通知身分驗證定義授權標頭。如果留空，則預設為停用此功能。

### 第 3 步：啟動機器人

配置完所有內容後，透過執行以下命令啟動機器人：

```bash
docker compose up -d
```
