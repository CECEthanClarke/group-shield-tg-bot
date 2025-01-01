
const fs = require('fs');
const path = require('path');
const YAML = require('yaml')
const ISO6391 = require('iso-639-1');

const i18n = {
  lang: 'en',
  langs: ['en', 'fr', 'de', 'pt', 'ja', 'ru', 'ar', 'es', 'zh', 'ko'],
  enforcePrimaryLanguage: false,
  cache: {},
  userLangCache: new Map(),
  init(enforcePrimaryLanguage = false, lang = 'en') {
    try {
      this.enforcePrimaryLanguage = JSON.parse(enforcePrimaryLanguage);
      this.lang = lang;
    } catch(e) {
      console.error(e);
    }
    for (let i = 0; i < this.langs.length; i++) {
      const lang = this.langs[i];
      const filepath = path.join(__dirname, 'locales', `${lang}.yaml`);
      const data = fs.readFileSync(filepath, 'utf-8');
      if (data) {
        try {
          this.cache[lang] = YAML.parse(data, 'utf-8');
          console.log(`Loaded ${lang} into cache`);
        } catch (error) {
          console.error(`Failed to load ${lang}: ${error.message}`);
        }
      }
    }
    // Loading user language into cache
    I18nTable.list().then(items => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        this.userLangCache.set(item.chat_id, item.lang);
      }
    }).catch(e => console.error(e));
  },
  saveUserLangCache(chat_id, lang) {
    this.userLangCache.set(chat_id, lang);
  },
  get(lang) {
    if (lang) {
      let language = '';
      if (lang.includes('_')) {
        language = lang.split('_')[0];
      } else if (lang.includes('-')) {
        language = lang.split('-')[0];
      } else {
        language = lang;
      }
      const data = this.cache[language];
      if (data) {
        return data;
      }
    }
    return this.cache[this.lang];
  },
  contains(language) {
    for (let i = 0; i < this.langs.length; i++) {
      const lang = this.langs[i];
      if (lang === language) {
        return true;
      }
    }
    return false;
  },
  list() {
    const languageList = [];
    for (let i = 0; i < this.langs.length; i++) {
      const lang = this.langs[i];
      const nativeName = ISO6391.getNativeName(lang);
      if (nativeName) {
        languageList.push({
          lang, nativeName
        });
      }
    }
    return languageList;
  },
  t(user) {
    if (user) {
      const userLang = this.userLangCache.get(String(user.id));
      if (userLang) {
        return this.get(userLang);
      }

      const language_code = user.language_code;
      if (language_code) {
        if (!this.enforcePrimaryLanguage) {
          return this.get(language_code);
        }
      }
    }
    return this.get();
  },
};

module.exports = i18n;