## READMEの翻訳

**言語:**[英語](README.md)\|[簡体字中国語](README.zh-CN.md)\|[繁体中文](README.zh-TW.md)\|[ヒンディー語](README.hi.md)\|[アラブ](README.ar.md)\|[フランス語](README.fr.md)\|[スペイン語](README.es.md)\|[ドイツ語](README.de.md)\|[日本語](README.ja.md)\|[ポルトガル語](README.pt.md)\|[ロシア](README.ru.md)\|[イタリア語](README.it.md)\|[韓国語](README.ko.md)\|[トルコ語](README.tr.md)\|[オランダ語](README.nl.md)\|[タイ語](README.th.md)\|[ベトナム語](README.vi.md)\|[研磨](README.pl.md)\|[ウクライナ語](README.uk.md)\|[ギリシャ語](README.el.md)

# グループシールド電報ボット

Group Shield Telegram ボットの主な機能は、新しいメンバーを確認することです。ユーザーは、グループ内にメッセージを送信する前に、検証プロセスに合格する必要があります。

多言語設定とユーザーの言語への動的な適応をサポートします。

## 特徴

-   /mute {分}
    /mute コマンドを使用すると、誰かがメッセージを送信できないようにすることができます。使用する前に相手のメッセージに返信してください。デフォルトでは、ミュートは永続的ですが、コマンドの後に分単位で継続時間を追加できます。たとえば、「1」を追加すると 1 分間ミュートされます。
-   /unmute グループ内のユーザーのミュートを解除してメッセージの再送信を許可するには、コマンドを使用する前にそのメッセージに返信します。
-   /キックアウト {分} 
    /kickout コマンドを使用すると、グループから誰かを削除できます。コマンドを使用する前に、相手のメッセージに返信してください。デフォルトでは、削除は永続的ですが、コマンドの後に分単位で期間を追加できます。たとえば、「1」を追加すると、1 分後に再参加できることを意味します。

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## 導入ガイド

### ステップ 1: Telegram ボットを作成する

1.  に行く**@BotFather**Telegram で、`/newbot`ボットを作成するコマンド。
2.  プロンプトに従って必要な情報を入力します。
3.  一度作成すると、**@BotFather** will send you the bot's token. This token is essential for deployment—save it for later use.  

### ステップ 2: ボットをサーバーにデプロイする

docker-compose.yml ファイルをソース ディレクトリからサーバー ディレクトリにコピーする必要があります。次に、docker-compose.yml ファイルで BOT_TOKEN と BOT_USERNAME の値を構成します。

-   BOT_TOKEN – これはボットのトークンです。
-   BOT_USERNAME – これは、「@」記号を除いたボットのユーザー名です。

入力したら準備完了です。

-   VERIFICATION_EXPIRATION_SECONDS – デフォルトは 120 秒です。これは、ユーザーがグループに参加するときに検証プロセスを完了するまでに 120 秒の時間が必要であることを意味します。失敗した場合は削除されます。
-   RE_JOIN_SECONDS – デフォルトは 120 秒です。ユーザーは削除された後、120 秒後にグループに再参加できます。
-   LANGUAGE_CODE – デフォルトは「en」です。[「in」、「zh」、「es」、「of」、「nl」、「it」、「ar」、「pt」、「ko」、「ru」、「fr」、「id」、「ms」 "、",fa"、",uk"、",vi"、",tr"、",ja"]
-   ADMIN_CHAT_ID - チャット ID を入力します。入力後、ロボットが開始すると通知します。
-   ENFORCE_PRIMARY_LANGUAGE - デフォルトは false です。「false」は、システムがユーザーの言語コードに基づいて動的に切り替わることを意味します。これを「true」に設定すると、すべての設定が設定した主言語に従います。
-   UPDATE_NOTIFICATION_URL - 通知 URL を定義できます。ボットは POST 経由で更新メッセージをサーバー アプリケーションに送信します。空白のままにすると、この機能はデフォルトで無効になります。
-   UPDATE_NOTIFICATION_AUTHORIZATION - 通知認証用の Authorization ヘッダーを定義できます。空白のままにすると、この機能はデフォルトで無効になります。

### ステップ 3: ボットを開始する

すべてを構成した後、次のコマンドを実行してボットを起動します。

```bash
docker compose up -d
```
