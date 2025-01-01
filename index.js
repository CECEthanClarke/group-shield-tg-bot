const process = require('node:process');
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

require('dotenv').config();

const util = require('./util');

const notification = require('./update-notification')
notification.init(process.env.BOT_TOKEN, process.env.UPDATE_NOTIFICATION_URL, process.env.UPDATE_NOTIFICATION_AUTHORIZATION);

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database("./config/database.db", (err) => {
    if (err) {
        console.log('Could not connect to database', err)
    } else {
        console.log('Connected to database')
    }
})
db.on("error", function (error) {
    console.log("Getting an error : ", error);
});
global.GroupUserVerifyTable = require('./group-user-verify-table');
global.QuizTable = require('./quiz-table');
global.I18nTable = require('./i18n-table');
GroupUserVerifyTable.init(db);
QuizTable.init(db);
I18nTable.init(db);

const i18n = require('./i18n')
i18n.init(process.env.ENFORCE_PRIMARY_LANGUAGE, process.env.LANGUAGE_CODE);
global.textConfig = i18n.get(process.env.LANGUAGE_CODE);
// console.log(textConfig);

const TelegramBot = require('node-telegram-bot-api');
global.bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: {
        params: {
            allowed_updates: JSON.stringify([
                "update_id",
                "message",
                "edited_message",
                "channel_post",
                "edited_channel_post",
                "inline_query",
                "chosen_inline_result",
                "callback_query",
                "shipping_query",
                "pre_checkout_query",
                "poll",
                "poll_answer",
                "my_chat_member",
                "chat_member",
                "chat_join_request"
            ])
        }
    }
});
const originalProcessUpdate = bot.processUpdate;
bot.processUpdate = (update) => {
  notification.push(update);
  return originalProcessUpdate.call(bot, update);
};
console.log(bot);

bot.onText(/\/start/, async function onText(msg) {
    const text = msg.text;
    const match = text.match(/VM_([^\s&]+)/);
    if (match) {
        const verify_chat_id = match[1];
        const result = await GroupUserVerifyTable.getById(verify_chat_id + String(msg.from.id));
        if (result) {
            const quiz = util.generateAdditionQuiz(6);
            console.log(quiz);
            const now = util.getUnixTimestamp();
            await QuizTable.add({
                "id": quiz.id,
                "group_user_verify_id": result.id,
                "question": quiz.question,
                "answer": quiz.answer,
                "options": JSON.stringify(quiz.options),
                "create_timestamp": now,
                "expire_timestamp": now + result.verification_expiration_seconds
            });

            let send_text = i18n.t(msg.from).reply_verifying_send_text;
            send_text = send_text.replace("${chat_title}", `<code>${result.chat_title}</code>`);
            send_text += `\n\n${quiz.question}`;

            const option_inline_keyboard = [];
            for (let i = 0; i < quiz.options.length; i++) {
                const option = quiz.options[i];
                option_inline_keyboard.push({
                    text: `${option}`,
                    callback_data: `answer|${quiz.id}|${option}`
                });
            }

            await bot.sendMessage(msg.chat.id, send_text, {
                parse_mode: 'HTML',
                reply_to_message_id: msg.message_id,
                disable_web_page_preview: true,
                reply_markup: {
                    inline_keyboard: [
                        option_inline_keyboard
                    ]
                }
            });
        } else {
            await bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_you_dont_have_verification_in_group, {
                reply_to_message_id: msg.message_id,
            });
        }
    } else {
        bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_start_text, {
            parse_mode: "HTML",
            reply_to_message_id: msg.message_id,
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: i18n.t(msg.from).button_invite_to_join_group, url: `https://t.me/${process.env.BOT_USERNAME}?startgroup=BotUrlInviteJoin` }
                    ]
                ]
            }
        });
    }
});
bot.onText(/\/help/, function onText(msg) {
    bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_help_text, {
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id
    });
});
bot.onText(/\/mute/, async function onText(msg) {
    const type = msg.chat.type;
    if (type.includes('group')) {
        const reply_to_message = msg.reply_to_message;
        if (reply_to_message) {
            const can_restrict_members = await canRestrictMembers(msg.chat.id, msg.from.id);
            if (can_restrict_members) {
                const split = msg.text.split(' ');
                const minutes = split.length >= 2 ? (parseInt(split[1]) || 0) : 0;
                const result = await restrictChatMember(msg.chat.id, reply_to_message.from.id, minutes * 60).catch(e => console.log(e));
                if (result) {
                    bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_mute_successful, {
                        parse_mode: "HTML",
                        reply_to_message_id: msg.message_id
                    });
                } else {
                    bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_insufficient_bot_permissions, {
                        parse_mode: "HTML",
                        reply_to_message_id: msg.message_id
                    });
                }
            } else {
                bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_not_have_permissions, {
                    parse_mode: "HTML",
                    reply_to_message_id: msg.message_id
                });
            }
        } else {
            bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_please_reply_to_a_message, {
                parse_mode: "HTML",
                reply_to_message_id: msg.message_id
            });
        }
    }
});
bot.onText(/\/unmute/, async function onText(msg) {
    const type = msg.chat.type;
    if (type.includes('group')) {
        const reply_to_message = msg.reply_to_message;
        if (reply_to_message) {
            const can_restrict_members = await canRestrictMembers(msg.chat.id, msg.from.id);
            if (can_restrict_members) {
                const result = await unlockChatMember(msg.chat.id, reply_to_message.from.id).catch(e => console.log(e));
                if (result) {
                    bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_unmute_successful, {
                        parse_mode: "HTML",
                        reply_to_message_id: msg.message_id
                    });
                } else {
                    bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_insufficient_bot_permissions, {
                        parse_mode: "HTML",
                        reply_to_message_id: msg.message_id
                    });
                }
            } else {
                bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_not_have_permissions, {
                    parse_mode: "HTML",
                    reply_to_message_id: msg.message_id
                });
            }
        } else {
            bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_please_reply_to_a_message, {
                parse_mode: "HTML",
                reply_to_message_id: msg.message_id
            });
        }
    }
});
bot.onText(/\/kickout/, async function onText(msg) {
    const type = msg.chat.type;
    if (type.includes('group')) {
        const reply_to_message = msg.reply_to_message;
        if (reply_to_message) {
            const can_restrict_members = await canRestrictMembers(msg.chat.id, msg.from.id);
            if (can_restrict_members) {
                const split = msg.text.split(' ');
                const minutes = split.length >= 2 ? (parseInt(split[1]) || 0) : 0;
                const result = await bot.banChatMember(msg.chat.id, reply_to_message.from.id, { until_date: util.getUnixTimestamp() + minutes * 60 }).catch(e => console.log(e));
                if (result) {
                    bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_kickout_successful, {
                        parse_mode: "HTML",
                        reply_to_message_id: msg.message_id
                    });
                } else {
                    bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_insufficient_bot_permissions, {
                        parse_mode: "HTML",
                        reply_to_message_id: msg.message_id
                    });
                }
            } else {
                bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_not_have_permissions, {
                    parse_mode: "HTML",
                    reply_to_message_id: msg.message_id
                });
            }
        } else {
            bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_please_reply_to_a_message, {
                parse_mode: "HTML",
                reply_to_message_id: msg.message_id
            });
        }
    }
});
bot.onText(/\/language/, function onText(msg) {
    if (msg.chat.type === 'private') {
        const items = i18n.list();
        const itemsArray = util.chunkArray(items, 3);
        const inline_keyboard = [];
        for (let i = 0; i < itemsArray.length; i++) {
            const chunk = itemsArray[i];
            const keyboard = [];
            for (let c = 0; c < chunk.length; c++) {
                const item = chunk[c];
                keyboard.push({
                    text: item.nativeName,
                    callback_data: `language|${msg.from.id}|${item.lang}`
                });
            }
            inline_keyboard.push(keyboard);
        }
        inline_keyboard.push([
            {
                text: i18n.t(msg.from).button_got_it,
                callback_data: `gotit|${msg.from.id}`
            }
        ]);

        bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_switch_language, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard
            }
        });
    } else {
        bot.sendMessage(msg.chat.id, i18n.t(msg.from).reply_command_only_be_configured_interface_with_bot, {
            parse_mode: "HTML",
            reply_to_message_id: msg.message_id
        });
    }
});

bot.on("callback_query", async function handle(callback_query) {
    const data = callback_query.data;
    if (data) {
        const dataSplit = data.split('|');
        const method = dataSplit[0];
        if (method === 'answer') {
            const quizId = dataSplit[1];
            const answer = dataSplit[2];
            const quiz = await QuizTable.getById(quizId);
            if (quiz) {
                const groupUserVerify = await GroupUserVerifyTable.getById(quiz.group_user_verify_id);
                if (callback_query.from.id == groupUserVerify.user_id) {
                    try {
                        if (answer == quiz.answer) {
                            // unlock
                            const chat = await bot.getChat(groupUserVerify.chat_id);
                            await unlockChatMember(groupUserVerify.chat_id, groupUserVerify.user_id).catch(e => console.log(e));
                            await bot.sendMessage(groupUserVerify.user_id, i18n.t(callback_query.from).reply_chosen_answer_correct_text, { reply_to_message_id: callback_query.message.message_id, });
                        } else {
                            // remove
                            const re_join_seconds = parseInt(process.env.RE_JOIN_SECONDS);
                            const until_date = util.getUnixTimestamp() + re_join_seconds;
                            console.log(until_date);
                            await bot.banChatMember(groupUserVerify.chat_id, groupUserVerify.user_id, { until_date }).catch(e => console.log(e));

                            let send_text = i18n.t(callback_query.from).reply_wrong_choice_text;
                            send_text = send_text.replace("${answer}", quiz.answer);
                            send_text = send_text.replace("${seconds}", re_join_seconds);
                            await bot.sendMessage(groupUserVerify.user_id, send_text, { reply_to_message_id: callback_query.message.message_id, });
                        }
                    } finally {
                        await QuizTable.deleteById(quiz.id);
                        await GroupUserVerifyTable.deleteById(quiz.group_user_verify_id);
                        await bot.deleteMessage(groupUserVerify.chat_id, groupUserVerify.verification_message_id).catch(e => console.log(e));
                    }
                }
            } else {
                await bot.answerCallbackQuery(callback_query.id, {
                    show_alert: true,
                    text: i18n.t(callback_query.from).reply_verification_expired
                });
            }
        }
        else if (method === 'gotit') {
            const fromId = dataSplit[1];
            if (callback_query.from.id == fromId) {
                bot.deleteMessage(callback_query.message.chat.id, callback_query.message.message_id);
            }
        }
        else if (method === 'language') {
            const fromId = dataSplit[1];
            const lang = dataSplit[2];
            if (callback_query.from.id == fromId && i18n.contains(lang)) {
                const result = await I18nTable.save({
                    "chat_id": fromId,
                    "lang": lang
                }).catch(e => console.error(e));
                if (result) {
                    i18n.saveUserLangCache(fromId, lang);
                    bot.answerCallbackQuery(callback_query.id, {
                        show_alert: true,
                        text: i18n.t(callback_query.from).reply_operation_successful
                    }).then(rsp => {
                        bot.deleteMessage(callback_query.message.chat.id, callback_query.message.message_id);
                    });
                } else {
                    await bot.answerCallbackQuery(callback_query.id, {
                        show_alert: true,
                        text: i18n.t(callback_query.from).reply_operation_failed
                    });
                }
            }
        }
    }
});

bot.on("chat_member", async function handle(chat_member) {
    chatMemberUpdated(chat_member);
});
bot.on("my_chat_member", async function handle(my_chat_member) {
    chatMemberUpdated(my_chat_member);
});

async function canRestrictMembers(chat_id, user_id) {
    const chatMember = await bot.getChatMember(chat_id, user_id);
    if (chatMember) {
        if (chatMember.status === 'creator') {
            return true;
        } else if (chatMember.status === 'administrator') {
            const can_restrict_members = chatMember.can_restrict_members;
            if (can_restrict_members) {
                return true;
            }
        }
        return false;
    }
}

async function restrictChatMember(chat_id, user_id, seconds) {
    const result = await bot.restrictChatMember(chat_id, user_id, {
        can_send_messages: false,
        can_send_audios: false,
        can_send_documents: false,
        can_send_photos: false,
        can_send_videos: false,
        can_send_video_notes: false,
        can_send_voice_notes: false,
        can_send_polls: false,
        can_send_other_messages: false,
        can_add_web_page_previews: false,
        can_change_info: false,
        can_invite_users: false,
        can_pin_messages: false,
        can_manage_topics: false
    }, {
        use_independent_chat_permissions: true,
        until_date: util.getUnixTimestamp() + seconds
    }).catch(e => console.log(e));
    return result;
}
async function unlockChatMember(chat_id, user_id) {
    const chat = await bot.getChat(chat_id).catch(e => console.log(e));
    const result = await bot.restrictChatMember(chat_id, user_id, chat.permissions, {
        use_independent_chat_permissions: false,
        until_date: util.getUnixTimestamp() + 31
    }).catch(e => console.log(e));
    return result;
}

async function chatMemberUpdated(chat_member_updated) {
    if (chat_member_updated) {
        const new_chat_member = chat_member_updated.new_chat_member;
        const chat = chat_member_updated.chat;
        if (new_chat_member && chat && chat.type.includes('group')) {
            const status = new_chat_member.status;
            const new_chat_member_user = new_chat_member.user;
            if (status === 'member' && !new_chat_member_user.is_bot) {
                const old_chat_member = chat_member_updated.old_chat_member;
                if (old_chat_member) {
                    if (old_chat_member.status && old_chat_member.status !== 'left' && old_chat_member.status !== 'kicked') {
                        return;
                    }
                }

                const chat_id = String(chat.id);
                const user_id = String(new_chat_member_user.id);
                const item = await GroupUserVerifyTable.getById(chat_id + user_id);
                if (item) {
                    return;
                }

                const user_name = `${new_chat_member_user.first_name || ''}${new_chat_member_user.last_name || ''}`;
                const chat_title = chat.title;
                const verification_expiration_seconds = parseInt(process.env.VERIFICATION_EXPIRATION_SECONDS);

                let send_text = i18n.t(new_chat_member_user).reply_group_verification_text;
                send_text = send_text.replace("${user_name}", `<a href="tg://user?id=${user_id}">${user_name}</a>`);
                send_text = send_text.replace("${seconds}", verification_expiration_seconds);
                send_text = send_text.replace("${chat_title}", `<code>${chat_title}</code>`);
                const message = await bot.sendMessage(chat_id, send_text, {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: i18n.t(new_chat_member_user).button_click_to_verify, url: `https://t.me/${process.env.BOT_USERNAME}?start=VM_${chat_id}` }
                            ]
                        ]
                    }
                }).catch(e => console.log(e));
                if (message) {
                    const now = util.getUnixTimestamp();

                    await GroupUserVerifyTable.add({
                        "id": chat_id + user_id,
                        "chat_id": chat_id,
                        "user_id": user_id,
                        "create_timestamp": now,
                        "expire_timestamp": now + verification_expiration_seconds,
                        "verification_expiration_seconds": verification_expiration_seconds,
                        "chat_title": chat_title,
                        "verification_message_id": String(message.message_id)
                    }).catch(e => { });
                    await restrictChatMember(chat_id, user_id, 0).catch(e => console.log(e));
                }
            } else if (status === 'restricted' && !new_chat_member_user.is_bot && !new_chat_member.is_member) {
                // remove verification message
                const chat_id = String(chat.id);
                const user_id = String(new_chat_member_user.id);
                const result = await GroupUserVerifyTable.getById(chat_id + user_id);
                if (result) {
                    await GroupUserVerifyTable.deleteById(chat_id + user_id);
                    await bot.deleteMessage(chat_id, result.verification_message_id);
                }
            }
        }
    }
}

setBotBaseConfig();
checkGroupUserVerify();
deleteExpiredQuiz();

async function setBotBaseConfig() {
    bot.setMyCommands([
        {
            "command": "start",
            "description": textConfig.command_start_description
        },
        {
            "command": "mute",
            "description": textConfig.command_mute_description
        },
        {
            "command": "unmute",
            "description": textConfig.command_unmute_description
        },
        {
            "command": "kickout",
            "description": textConfig.command_kickout_description
        },
        {
            "command": "language",
            "description": textConfig.command_language_description
        },
        {
            "command": "help",
            "description": textConfig.command_help_description
        }
    ]);

    if (process.env.ADMIN_CHAT_ID) {
        bot.sendMessage(process.env.ADMIN_CHAT_ID, textConfig.reply_bot_started, {
            parse_mode: "HTML"
        });
    }
}

async function checkGroupUserVerify() {
    await util.sleep(2000);
    while (true) {
        try {
            const items = await GroupUserVerifyTable.listExpired(util.getUnixTimestamp());
            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                // remove
                const re_join_seconds = parseInt(process.env.RE_JOIN_SECONDS);
                const until_date = util.getUnixTimestamp() + re_join_seconds;
                console.log(until_date);
                await bot.banChatMember(item.chat_id, item.user_id, { until_date }).catch(e => console.log(e));
                await bot.deleteMessage(item.chat_id, item.verification_message_id).catch(e => console.log(e));
                await GroupUserVerifyTable.deleteById(item.id);
            }
        } catch (e) {
            console.log(e);
        } finally {
            await util.sleep(1000);
        }
    }
}
async function deleteExpiredQuiz() {
    await util.sleep(2000);
    while (true) {
        try {
            const items = await QuizTable.listExpired(util.getUnixTimestamp());
            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                // remove
                await QuizTable.deleteById(item.id);
            }
        } catch (e) {
            console.log(e);
        } finally {
            await util.sleep(1000);
        }
    }
}