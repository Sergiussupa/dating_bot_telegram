const { DBAuth } = new require('../managers/DBAuth');

class PhotoController {
	constructor(bot) {
		this.bot = bot;
		this.AuthDB = new DBAuth();
	}

    async init(userId) {
        try {
            let result = await this.AuthDB.getProfileState(userId);
            console.log('Я работаю!');
            if (typeof result !== 'undefined') {
                console.log('Неизвестный пользователь отправил фотографию');
                if ( result.getProfileState == 5) {
                    console.log('теперь я должен работать');
                }
                console.log('HHHH');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { PhotoController };