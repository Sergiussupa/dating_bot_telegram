const { MsgController } = new require('../controllers/MsgController');

class BotService {
	constructor(bot) {
		this.bot = bot;
		this.MsgController = new MsgController(bot);
	}

	init() {
		const commands = [

			{
		
				command: "start",
				description: "Запуск бота"
		
			},
			{
		
				command: "profile",
				description: "Полюбоваться красавчиком"
		
			},
			{
				command: "clear",
				description: "Заполнить профайл заново"
			}
		
		]
		this.bot.setMyCommands(commands);

		this.bot.on('message', (msg) => this.handleMessage(msg));
		//this.bot.on('photo', (msg) => this.handlePhoto(msg));
	}

	async handleMessage(msg) {
		console.log(msg);
		// Логика обработки сообщений
		this.MsgController.getMsg(msg);
		//this.bot.sendMessage(msg.from.id, msg.text, this.addKeyboard(['3', '2'], ['4']));
		//this.bot.send(msg.from.id, msg.text, [['1', '4'], ['loh', 'io'], ['poh']]);

	}

	async handlePhoto(msg) {
		// Логика обработки получения фото
		try {
			console.log(msg);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = { BotService };
