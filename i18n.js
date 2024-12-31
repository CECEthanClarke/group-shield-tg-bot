
const fs = require('fs');
const path = require('path');
const YAML = require('yaml')

const i18n = {
  lang: 'en',
  langs: ['en', 'fr', 'de', 'pt', 'ja', 'ru', 'ar', 'es', 'zh', 'ko'],
  enforcePrimaryLanguage: false,
  cache: {},
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
  t(user) {
    if (user) {
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