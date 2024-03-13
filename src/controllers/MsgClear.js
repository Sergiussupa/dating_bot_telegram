//const { DBAuth } = new require('../managers/DBAuth');

class MsgClear {
	constructor(bot) {
		this.bot = bot;
		//this.AuthDB = new DBAuth();
	}

	async init(userId, userState) {
		try {
            let flag;
            if (userState == 1) { // If the user is not authorized
                this.bot.sendMessage(userId, 'Для исполнения этой команды тебе нужно закончить текущее заполнение до конца');
                flag = 0;
            } else { // If the user is aithrized
                flag = 1;
            }
            return flag;
		} catch (error) {
			console.log(error);
		}
	}

}

module.exports = { MsgClear };