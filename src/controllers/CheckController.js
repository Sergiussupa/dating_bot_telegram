const { DBCheck } = new require('../managers/DBCheck');
const { DBAuth } = new require('../managers/DBAuth');
const { ProfileView } = new require('../views/ProfileView');


class Check {
	constructor(bot) {
		this.bot = bot;
		this.DBCheck = new DBCheck();
        this.AuthDB = new DBAuth();
        this.ProfileView = new ProfileView();

	}
    async delete(userId) {
        try {
            this.DBCheck.delete(userId);
        } catch (error) {
            console.log(error);
        }
    }
    async auth(userId) {
        try {
            let result = await this.DBCheck.getCheck(userId);
            if (result == undefined) {
                let res1 = await this.AuthDB.getProfile(userId);
                this.DBCheck.createCheck(userId, res1.gender);
                //this.bot.sendMessage(userId, 'Отлично, теперь твоя анкета в поиске\nДля просмотра анкет отправь любую цифру от 1 до 10');
                console.log(res1);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async test(userId, text) {
        try {
            text = text || 22;
            let result = await this.DBCheck.getCheck(userId)
            //console.log(result);

            let res2 = await this.DBCheck.all(userId, result.gender, result.idx);
            if (res2 == undefined) {
                this.bot.sendMessage(userId, 'Ты посмотрел уже все профили, посмотри немного, пока тебя кто то лайкнет в ответ');
            } else {
                this.bot.sendMessage(userId, 'Выбери цифру:\n1: Лайк\n 2: НеНеНеЛайк');
                await this.DBCheck.updateAtr(userId, 'idx', res2.id);
                let result3 = await this.ProfileView.test(res2.checkId);
                this.bot.sendPhoto(userId, result3[0], {caption: result3[1]});
            }
                
                //console.log(res2);
            //}
            //console.log(result);
        } catch (error) {
            console.log(error);
        }
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

module.exports = { Check };