class MsgProfile {
	constructor(bot) {
		this.bot = bot;
	}
    
	async init(userId, userState) {
		try {
            let flag;
            if (userState == 1) { // If the user is not authorized
                this.bot.sendMessage(userId, 'У тебя еще не до конца заполнен профиль');
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

module.exports = { MsgProfile };