
const fs = require('fs');
const path = require('path');
const YAML = require('yaml')

const i18n = {
  lang: 'en',
  langs: ['en', 'fr', 'de', 'pt', 'ja', 'ru', 'ar', 'es', 'zh', 'ko'],
  cache: {},
  init() {
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
    const data = this.cache[lang || this.lang];
    if (data) {
      return data;
    }
    return this.cache[lang];
  },
};

module.exports = i18n;