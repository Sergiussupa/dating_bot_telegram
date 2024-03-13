const { DBAuth } = new require('../managers/DBAuth');

class AuthController {
	constructor(bot) {
		this.bot = bot;
		this.AuthDB = new DBAuth();
	}

	async show(msg) {
		console.log('CHLEN');
		await this.userService.showUser(msg.from.id);
	}

    async clear(userId) {
        await this.AuthDB.updateAtrProfile(userId, 'profileState', 1);
    }

	async init(msg) {
		try {
			let userId = msg.from.id;
            let text = msg.text;
			let photo = msg.photo;
	
			
			let result = await this.AuthDB.getProfile(userId);

			let flag = 0;

			if (result == undefined) { //If the user is not 
				this.bot.sendMessage(userId, 'Как тебя зовут?');
				await this.AuthDB.createProfile(userId);
			} else if(result.profileState == 1) {
				this.bot.sendMessage(userId, 'Сколько тебе лет?');
				await this.AuthDB.updateAtrProfile(userId, 'name', text);
				await this.AuthDB.updateAtrProfile(userId, 'profileState', 2);
			} else if(result.profileState == 2) {
				console.log(text);
				console.log(isNaN(text));
				if (!isNaN(text) && text > 5 && text < 100) {
					this.bot.sendMessage(userId, 'Напиши короткое описание о себе.\nЕго увидят остальные');
					await this.AuthDB.updateAtrProfile(userId, 'age', text);
					await this.AuthDB.updateAtrProfile(userId, 'profileState', 3);
				} else {
					this.bot.sendMessage(userId, 'Юнный тестировщик, заканчивай и отправь мне число!');
				}
			} else if(result.profileState == 3) {
				this.bot.sendMessage(userId, 'Отправь нужную цифру\n1: Ты парень?\n2: Ты девушка?');
				await this.AuthDB.updateAtrProfile(userId, 'description', text);
				await this.AuthDB.updateAtrProfile(userId, 'profileState', 4);
			} else if(result.profileState == 4) {
				if (text == 1 || text == 2) {
					this.bot.sendMessage(userId, 'Отправь свою фотографию или отправь цифру 1, если не хочешь ей делиться');
					await this.AuthDB.updateAtrProfile(userId, 'gender', text);
					await this.AuthDB.updateAtrProfile(userId, 'profileState', 5);
				} else {
					this.bot.sendMessage(userId, 'Попробуй перечитать сообщение, я верю в тебя!');
				}
			} else if(result.profileState == 5) {
				if(text == 1) {
					this.bot.sendMessage(userId, 'Отлично!\nТеперь твой профиль полностью заполнен' +
												 '\nЕсли хочешь посмотреть, как он выглядит, введи /profile\n' +
												 'Если хочешь заполнить его заного, введи /clear' +
												 '\nВведи цифру 1, дабы посмотреть на других');
					await this.AuthDB.updateAtrProfile(userId, 'photo_url', 'images/index.jpeg');
					await this.AuthDB.updateAtrProfile(userId, 'profileState', 6);
					flag = 1;
				} else if (photo == undefined) {
					this.bot.sendMessage(userId, 'Отправь цифру 1 или фотографию');
				} else  {
					this.bot.sendMessage(userId, 'Отлично!\nТеперь твой профиль полностью заполнен' +
												 '\nЕсли хочешь посмотреть, как он выглядит, введи /profile\n' +
												 'Если хочешь заполнить его заного, введи /clear');
					let res = await this.bot.downloadFile(msg.photo[msg.photo.length-1].file_id, './images');
					console.log(res);
					//await this.bot.sendPhoto(msg.from.id, res, {caption: 'lowara'});
					await this.AuthDB.updateAtrProfile(userId, 'photo_url', res);
					await this.AuthDB.updateAtrProfile(userId, 'profileState', 6);
					flag = 1;
				}
			} else if (result.profileState == 6) {
				flag = 1;
			}

			return flag;
		} catch (error) {
			console.log(error);
		}
	}

	async viewProfile(msg) {
	}
}

module.exports = { AuthController };