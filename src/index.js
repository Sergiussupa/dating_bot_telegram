const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const { BotService } = require('./services/BotService');

const bot = new TelegramBot(config.telegramToken, { polling: true });
const botService = new BotService(bot);

botService.init();
