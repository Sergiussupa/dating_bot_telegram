const { DBAuth } = new require('../managers/DBAuth');

class ProfileView {
	constructor() {
		//this.bot = bot;
		this.AuthDB = new DBAuth();
	}

    async test(userId) {
        try {
            let result = await this.AuthDB.getProfile(userId);
            let caption = result.name + '\nlvl: ' + result.age + '\n' + result.description; 
            return [result.photo_url, caption];
        } catch (error) {
            console.error('Ошибка getUserProfile', error);
            throw error;
        }
    }

}

module.exports = { ProfileView };