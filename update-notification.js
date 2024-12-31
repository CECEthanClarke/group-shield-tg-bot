const util = require("./util");
const unirest = require('unirest');

/**
 * You can configure message notifications to be sent to your backend. 
 * This is disabled by default, but you can enable it yourself.
 */
const notification = {
  status: false,
  updateNotificationUrl: '',
  authorization: '',
  botToken: '',
  queue: [],
  init(botToken, updateNotificationUrl, authorization) {
    this.updateNotificationUrl = updateNotificationUrl;
    this.authorization = authorization;
    this.botToken = botToken;
    if (this.updateNotificationUrl) {
      if (this.updateNotificationUrl.startsWith('http')) {
        this.status = true;
        this.loopHandle();
      }
    }
  },
  push(update) {
    if (this.status) {
      this.queue.push(update);
    }
  },
  async loopHandle() {
    while (true) {
      try {
        if (this.queue.length > 0) {
          const update = this.queue.shift();
          if (update) {
            const updateStr = JSON.stringify(update);

            const response = await new Promise((resolve, reject) => {
              unirest.post(this.updateNotificationUrl)
                .header('Authorization', this.authorization)
                .header('BotToken', this.botToken)
                .header('Content-Type', 'application/json')
                .send(updateStr)
                .timeout({
                  connect: 20000,
                  response: 20000
                })
                .end(response => {
                  if (response.status === 200) {
                    resolve(response.body);
                  } else {
                    reject(`Error: ${response.status}`);
                  }
                });
            });
            console.log('Update notification response: ', response);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        await util.sleep(100);
      }
    }
  }
}
module.exports = notification;