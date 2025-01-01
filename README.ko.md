## 읽어보기 번역

**언어:**[영어](README.md)\|[중국어 간체](README.zh-CN.md)\|[중국어 번체](README.zh-TW.md)\|[힌디 어](README.hi.md)\|[아라비아 사람](README.ar.md)\|[프랑스 국민](README.fr.md)\|[스페인 사람](README.es.md)\|[독일 사람](README.de.md)\|[일본어](README.ja.md)\|[포르투갈 인](README.pt.md)\|[러시아인](README.ru.md)\|[이탈리아 사람](README.it.md)\|[한국어](README.ko.md)\|[터키어](README.tr.md)\|[네덜란드 사람](README.nl.md)\|[태국어](README.th.md)\|[베트남 사람](README.vi.md)\|[광택](README.pl.md)\|[우크라이나 말](README.uk.md)\|[그리스 사람](README.el.md)

# 그룹 쉴드 텔레그램 봇

Group Shield Telegram Bot의 주요 기능은 신규 회원을 확인하는 것입니다. 사용자는 그룹에서 메시지를 보내기 전에 확인 절차를 통과해야 합니다.

다국어 설정과 사용자 언어에 대한 동적 적응을 지원합니다.

## 특징

-   /음소거 {분}
    /mute 명령을 사용하면 누군가가 메시지를 보내는 것을 방지할 수 있습니다. 사용하기 전에 상대방의 메시지에 답장하세요. 기본적으로 음소거는 영구적이지만 명령 후에 지속 시간을 분 단위로 추가할 수 있습니다. 예를 들어 "1"을 추가하면 1분 동안 음소거됩니다.
-   /unmute 그룹의 누군가를 음소거 해제하고 메시지를 다시 보낼 수 있도록 하려면 명령을 사용하기 전에 메시지에 답장하세요.
-   /킥아웃 {분} 
    /kickout 명령을 사용하여 그룹에서 누군가를 제거할 수 있습니다. 명령을 사용하기 전에 상대방의 메시지에 답장하세요. 기본적으로 제거는 영구적이지만 명령 후에 기간을 분 단위로 추가할 수 있습니다. 예를 들어 "1"을 추가하면 1분 후에 다시 참여할 수 있다는 의미입니다.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## 배포 가이드

### 1단계: 텔레그램 봇 만들기

1.  이동**@BotFather**텔레그램에서 다음을 사용하세요.`/newbot`봇을 생성하는 명령입니다.
2.  프롬프트에 따라 필요한 정보를 제공하십시오.
3.  일단 생성되면,**@BotFather**봇의 토큰을 보내드립니다. 이 토큰은 배포에 필수적입니다. 나중에 사용할 수 있도록 저장하세요.

### 2단계: 서버에 봇 배포

소스 디렉터리에서 서버 디렉터리로 docker-compose.yml 파일을 복사해야 합니다. 그런 다음 docker-compose.yml 파일에서 BOT_TOKEN 및 BOT_USERNAME의 값을 구성합니다.

-   BOT_TOKEN - 봇의 토큰입니다.
-   BOT_USERNAME – "@" 기호가 없는 봇의 사용자 이름입니다.

입력이 완료되면 이용이 가능합니다.

-   VERIFICATION_EXPIRATION_SECONDS – 기본값은 120초입니다. 이는 사용자가 그룹에 가입할 때 확인 프로세스를 완료하는 데 120초가 있음을 의미합니다. 실패하면 제거됩니다.
-   RE_JOIN_SECONDS – 기본값은 120초입니다. 제거된 후 사용자는 120초 후에 그룹에 다시 가입할 수 있습니다.
-   LANGUAGE_CODE – 기본값은 "en"입니다.["in", "zh", "es", "of", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms ", "fa", "uk", "vi", "tr", "ja"]
-   ADMIN_CHAT_ID - 채팅 ID를 입력하세요. 입장 후 로봇이 시작되면 알려드립니다.
-   ENFORCE_PRIMARY_LANGUAGE - 기본값은 false입니다. 'false'는 시스템이 사용자의 언어 코드에 따라 동적으로 전환함을 의미합니다. 'true'로 설정하면 모든 구성이 설정한 기본 언어를 따릅니다.
-   UPDATE_NOTIFICATION_URL - 알림 URL을 정의할 수 있으며, 봇은 POST를 통해 서버 애플리케이션에 업데이트 메시지를 보냅니다. 공백으로 두면 이 기능은 기본적으로 비활성화됩니다.
-   UPDATE_NOTIFICATION_AUTHORIZATION - 알림 인증을 위한 Authorization 헤더를 정의할 수 있습니다. 공백으로 두면 이 기능은 기본적으로 비활성화됩니다.

### 3단계: 봇 시작

모든 것을 구성한 후 다음 명령을 실행하여 봇을 시작합니다.

```bash
docker compose up -d
```
