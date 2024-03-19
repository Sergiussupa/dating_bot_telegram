const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const { BotService } = require('./services/BotService');
const { DBMessages } = new require('./managers/DBMessages');

const DBMes = new DBMessages();
const bot = new TelegramBot(config.telegramToken, { polling: true });
bot.send = async function(id, text, keyboard){
    let message = await bot.sendMessage(id, text, bot.addKeyboard(keyboard));
    
    DBMes.add(message.message_id, message.chat.id, 2);
}
bot.addKeyboard = function(...args) {

    if (args[0] == undefined || args[0] == -1) {
        return {
            reply_markup: {
              remove_keyboard: true
            }
        }
    } else {
        return {

        reply_markup: {

            keyboard:

                args[0]

            }
        }
    }
    
}
const botService = new BotService(bot);

botService.init();
