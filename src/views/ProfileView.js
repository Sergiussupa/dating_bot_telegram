const { DBAuth } = new require('../managers/DBAuth');

class ProfileView {
	constructor(bot) {
		this.bot = bot;
		this.AuthDB = new DBAuth();
	}

    async test(userId, checkId) {
        try {
            let result = await this.AuthDB.getProfile(checkId);
            let caption = result.name + '\nlvl: ' + result.age + '\n' + result.description;
            
            this.bot.sendPhoto(userId, result.photo_url, {caption: caption});

        } catch (error) {
            console.error('Ошибка getUserProfile', error);
            throw error;
        }
    }

}

module.exports = { ProfileView };