const fs = require('fs')
const path = require('path')
const YAML = require('yaml')
const crypto = require('crypto')
const JSON5 = require('json5')
const unirest = require('unirest')
require('dotenv').config();

const DEFAULT_LANG = 'en';
const AI_KEY = process.env.AI_KEY;
const AI_MODEL = 'gpt-4o-mini';
const LANGS = ['fr', 'de', 'pt', 'ja', 'ru', 'ar', 'es', 'zh', 'ko'];
const LANG_DIR_NAME = 'locales'
const I18N_LOG_FILE = path.join(__dirname, `i18n-log.json`);

class SignItem {
  constructor(languageList = new Set(), key = '', sign = null) {
    this.languageList = languageList;
    this.key = key;
    this.sign = sign;
  }

  containsLanguage(language) {
    if (this.languageList && this.languageList.size > 0) {
      for (const lang of this.languageList) {
        if (lang === language) {
          return true;
        }
      }
    }
    return false;
  }
}

main();
async function main() {
  initI18nFiles();

  const i18nDefaultMap = getI18nDefaultMap();
  console.log(`${DEFAULT_LANG} -> keys length: ${Object.keys(i18nDefaultMap).length}`);
  for (const [key, value] of Object.entries(i18nDefaultMap)) {
    // console.log(`${DEFAULT_LANG} -> `, key, value);
    // Check if there are any changes to the content. If there are changes, all languages need to be retranslated.
    for (let i = 0; i < LANGS.length; i++) {
      const lang = LANGS[i];
      if (lang === DEFAULT_LANG) {
        continue;
      }
      const signItem = getI18nSignItem(key);
      if (sha256(value) !== signItem.sign) {
        signItem.languageList = new Set();
        setI18nSignItem(signItem);
      }
    }
    // Start translating
    for (let i = 0; i < LANGS.length; i++) {
      const lang = LANGS[i];
      if (lang === DEFAULT_LANG) {
        continue;
      }
      const signItem = getI18nSignItem(key);
      if (signItem.containsLanguage(lang)) {
        continue;
      }
      console.log(`Translating key: ${signItem.key} -> ${lang}`);
      const transText = await completions(lang, value);
      if (transText) {
        signItem.languageList.add(lang);
        signItem.sign = sha256(value);
        setI18nSignItem(signItem);

        setI18nKeyValue(lang, key, transText);

        console.log(`Translation complete: ${signItem.key} -> ${lang} -> ${transText}`);
      } else {
        throw new Error('Translation failed');
      }
    }
  }
}

function sha256(content) {
  return crypto
    .createHash('sha256')
    .update(content)
    .digest('hex');
}
function initI18nFiles() {
  for (let i = 0; i < LANGS.length; i++) {
    const lang = LANGS[i];
    const filePath = path.join(__dirname, LANG_DIR_NAME, `${lang}.yaml`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '', 'utf-8');
    }
  }

  if (!fs.existsSync(I18N_LOG_FILE)) {
    fs.writeFileSync(I18N_LOG_FILE, '{}', 'utf-8');
  }
}
function getI18nDefaultMap() {
  const data = YAML.parse(fs.readFileSync(path.join(__dirname, LANG_DIR_NAME, `${DEFAULT_LANG}.yaml`), 'utf-8'));
  return typeof data === 'object' ? data : {};
}
function getI18nSignItem(key) {
  const logStr = fs.readFileSync(I18N_LOG_FILE);
  const log = JSON.parse(logStr);
  const item = log[key];
  if (item) {
    const signItem = Object.assign(new SignItem(), item);
    signItem.languageList = new Set(signItem.languageList);
    return signItem;
  } else {
    return new SignItem(new Set(), key, null);
  }
}
function setI18nSignItem(signItem) {
  signItem.languageList = [...signItem.languageList];

  const logStr = fs.readFileSync(I18N_LOG_FILE);
  const log = JSON.parse(logStr);
  log[signItem.key] = signItem;
  fs.writeFileSync(I18N_LOG_FILE, JSON.stringify(log, null, 2), 'utf-8');
}
async function completions(toLang, content) {
  let paramsContent = `
  {
      "model": "${AI_MODEL}",
      "messages": [
        {
          "role": "system",
          "content": "You are a professional Telegram translation specialist, skilled in accurate translation while preserving the original formatting. I will provide the text that needs translation, please translate it into ${toLang}, and strictly maintain the original line breaks and all %s variable symbols unchanged."
        },
        {
          "role": "user",
          "content": "%s"
        }
      ],
       "response_format": {
        "type": "json_schema",
        "json_schema": {
           "name": "translation",
           "strict": true,
           "schema": {
             "type": "object",
             "properties": {
               "original_text": {
                 "type": "string",
                 "description": "The original text that needs to be translated."
               },
               "translated_text": {
                 "type": "string",
                 "description": "The translated text."
               }
             },
             "required": [
               "original_text",
               "translated_text"
             ],
             "additionalProperties": false
           }
         }
      }
    }
  `;

  let params = JSON5.parse(paramsContent);
  params.messages[1].content = content;

  try {
    const response = await new Promise((resolve, reject) => {
      unirest.post('https://api.openai.com/v1/chat/completions')
        .header('Authorization', `Bearer ${AI_KEY}`)
        .header('Content-Type', 'application/json')
        .send(JSON.stringify(params))
        .timeout({
          connect: 3600000,
          response: 3600000
        })
        .end(response => {
          if (response.status === 200) {
            resolve(response.body);
          } else {
            reject(`Error: ${response.status}`);
          }
        });
    });

    let choices = response.choices;
    let message = choices[0].message;
    let result = message.content;
    let parsed = JSON5.parse(result);
    let transText = parsed.translated_text;
    return transText;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function setI18nKeyValue(lang, key, value) {
  const filePath = path.join(__dirname, LANG_DIR_NAME, `${lang}.yaml`);
  let data = YAML.parse(fs.readFileSync(filePath, 'utf8')) || {};
  data[key] = value;

  const yamlContent = YAML.stringify(data, { indent: 2 });
  fs.writeFileSync(filePath, yamlContent, 'utf8');
}