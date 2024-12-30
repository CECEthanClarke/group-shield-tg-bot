FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV BOT_TOKEN= \
    BOT_USERNAME= \
    VERIFICATION_EXPIRATION_SECONDS=120 \
    RE_JOIN_SECONDS=120 \
    LANGUAGE_CODE=en \
    ADMIN_CHAT_ID=

CMD ["node", "index.js"]