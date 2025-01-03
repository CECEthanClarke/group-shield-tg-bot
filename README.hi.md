## रीडमी अनुवाद

**भाषाएँ:**[अंग्रेज़ी](README.md)\|[सरलीकृत चीनी](README.zh-CN.md)\|[परंपरागत चीनी](README.zh-TW.md)\|[हिंदी](README.hi.md)\|[अरब](README.ar.md)\|[फ़्रेंच](README.fr.md)\|[स्पैनिश](README.es.md)\|[जर्मन](README.de.md)\|[जापानी](README.ja.md)\|[पुर्तगाली](README.pt.md)\|[रूसी](README.ru.md)\|[इतालवी](README.it.md)\|[कोरियाई](README.ko.md)\|[तुर्की](README.tr.md)\|[डच](README.nl.md)\|[थाई](README.th.md)\|[वियतनामी](README.vi.md)\|[पोलिश](README.pl.md)\|[यूक्रेनी](README.uk.md)\|[यूनानी](README.el.md)

# ग्रुप शील्ड टेलीग्राम बॉट

ग्रुप शील्ड टेलीग्राम बॉट का मुख्य कार्य नए सदस्यों को सत्यापित करना है। समूह में संदेश भेजने से पहले उपयोगकर्ताओं को सत्यापन प्रक्रिया से गुजरना होगा।

बहुभाषी सेटिंग्स और उपयोगकर्ता की भाषा में गतिशील अनुकूलन का समर्थन करता है।

## विशेषताएँ

-   /म्यूट करें {मिनट}
    आप किसी को संदेश भेजने से रोकने के लिए /म्यूट कमांड का उपयोग कर सकते हैं। इसका उपयोग करने से पहले व्यक्ति के संदेश का उत्तर दें। डिफ़ॉल्ट रूप से, म्यूट स्थायी है, लेकिन आप कमांड के बाद मिनटों में अवधि जोड़ सकते हैं। उदाहरण के लिए, "1" जोड़ने से वे 1 मिनट के लिए म्यूट हो जाते हैं।
-   /अनम्यूट समूह में किसी को अनम्यूट करने और उन्हें दोबारा संदेश भेजने की अनुमति देने के लिए, कमांड का उपयोग करने से पहले उनके संदेश का उत्तर दें।
-   /किकआउट {मिनट} 
    आप किसी को समूह से हटाने के लिए /किकआउट कमांड का उपयोग कर सकते हैं। आदेश का उपयोग करने से पहले व्यक्ति के संदेश का उत्तर दें। डिफ़ॉल्ट रूप से, निष्कासन स्थायी है, लेकिन आप आदेश के बाद मिनटों में अवधि जोड़ सकते हैं। उदाहरण के लिए, "1" जोड़ने का मतलब है कि वे 1 मिनट के बाद फिर से जुड़ सकते हैं।

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## परिनियोजन मार्गदर्शिका

### चरण 1: अपना टेलीग्राम बॉट बनाएं

1.  जाओ**@बॉटफ़ादर**टेलीग्राम पर और उपयोग करें`/newbot`अपना बॉट बनाने का आदेश दें।
2.  आवश्यक जानकारी प्रदान करने के लिए संकेतों का पालन करें।
3.  एक बार बनाया,**@बॉटफ़ादर**आपको बॉट का टोकन भेज देगा. यह टोकन परिनियोजन के लिए आवश्यक है—इसे बाद में उपयोग के लिए सहेजें।

### चरण 2: बॉट को सर्वर पर तैनात करें

आपको स्रोत निर्देशिका से docker-compose.yml फ़ाइल को अपनी सर्वर निर्देशिका में कॉपी करने की आवश्यकता है। फिर, docker-compose.yml फ़ाइल में BOT_TOKEN और BOT_USERNAME के ​​मानों को कॉन्फ़िगर करें।

-   BOT_TOKEN - यह बॉट का टोकन है।
-   BOT_USERNAME - यह "@" चिह्न के बिना बॉट का उपयोगकर्ता नाम है।

एक बार भरने के बाद, आप जाने के लिए तैयार हैं।

-   सत्यापन\_EXPIRATION_SECONDS - डिफ़ॉल्ट 120 सेकंड। इसका मतलब है कि समूह में शामिल होने पर उपयोगकर्ताओं के पास सत्यापन प्रक्रिया पूरी करने के लिए 120 सेकंड हैं। असफल होने पर उन्हें हटा दिया जायेगा.
-   RE_JOIN_SECONDS - डिफ़ॉल्ट 120 सेकंड। हटाए जाने के बाद, उपयोगकर्ता 120 सेकंड के बाद समूह में फिर से शामिल हो सकते हैं।
-   LANGUAGE_CODE - डिफ़ॉल्ट रूप से "एन"।["en", "zh", "es", "of", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms ", "एफए", "यूके", "वीआई", "टीआर", "जेए"]
-   ADMIN_CHAT_ID - अपनी चैट आईडी दर्ज करें। प्रवेश करने के बाद, रोबोट शुरू होने पर आपको सूचित करेगा।
-   ENFORCE_PRIMARY_LANGUAGE - डिफ़ॉल्ट रूप से गलत, 'गलत' का मतलब है कि सिस्टम उपयोगकर्ता के भाषा कोड के आधार पर गतिशील रूप से स्विच करेगा। इसे 'सही' पर सेट करने का मतलब है कि सभी कॉन्फ़िगरेशन आपके द्वारा निर्धारित प्राथमिक भाषा का पालन करेंगे।
-   UPDATE_NOTIFICATION_URL - आप एक अधिसूचना यूआरएल परिभाषित कर सकते हैं, और बॉट आपके सर्वर एप्लिकेशन पर POST के माध्यम से अपडेट संदेश भेजेगा। यदि खाली छोड़ दिया जाए तो यह सुविधा डिफ़ॉल्ट रूप से अक्षम हो जाएगी।
-   UPDATE_NOTIFICATION_AUTHORIZATION - आप अधिसूचना प्रमाणीकरण के लिए एक प्राधिकरण शीर्षलेख परिभाषित कर सकते हैं। यदि खाली छोड़ दिया जाए तो यह सुविधा डिफ़ॉल्ट रूप से अक्षम हो जाती है।

### चरण 3: बॉट प्रारंभ करें

सब कुछ कॉन्फ़िगर करने के बाद, निम्नलिखित कमांड चलाकर बॉट प्रारंभ करें:

```bash
docker compose up -d
```
