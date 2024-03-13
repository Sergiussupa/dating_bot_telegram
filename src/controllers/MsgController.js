const { DBManager } = new require('../managers/DBManager');
const { AuthController } = new require('./AuthController');
const { ProfileView } = new require('../views/ProfileView');
const { Check } = new require('./CheckController');
const { MsgProfile } = new require('./MsgProfile');
const { MsgClear } = new require('./MsgClear');

class MsgController {
    constructor(bot) {
        this.bot = bot;
        this.DB = new DBManager();
        this.MsgProfile = new MsgProfile(bot);
        this.MsgClear = new MsgClear(bot);
        this.Auth = new AuthController(bot);
        this.Check = new Check(bot);
        this.ProfileView = new ProfileView();
    }

    async getMsg(msg) {
        try {
            let userId = msg.from.id;
            let text = msg.text;
            let result = await this.DB.getUserProfile(userId);

            if ( result == undefined ) { // If the user has sent a message for the first time
                this.bot.sendMessage(userId, ' Вижу ты тут впервые, отправь любое сообщение.\nОтлично, я работаю!');
                await this.DB.createUserProfile(userId, msg.from.first_name, msg.from.username);
            } else {
                switch (text) {
                    case '/profile':
                    let flag = await this.MsgProfile(userId, result.userState);
                    if (flag == 1) {
                        
                    }
                    break;
                }
                if (text == '/profile') { // If the user want check ur profile
                if (result.userState == 1) { // If the user is not authorized
                    this.bot.sendMessage(userId, 'У тебя еще не до конца заполнен профиль');
                } else { // If the user is aithrized
                    let result = await this.ProfileView.test(userId);
                    await this.bot.sendPhoto(userId, result[0], {caption: result[1]});
                    //console.log(result);
                }
            } else if (text == '/clear') { // If the user want clear ur profile

                let flag = await this.MsgClear.init(userId, result.userState);

                if (flag == 1) {
                    this.Auth.clear(userId);
                    await this.DB.updateAtrUser(userId, 'userState', 1);
                    await this.Check.delete(userId);
                    this.bot.sendMessage(userId, 'Почистили базу от дурочков\nКак тебя звать то?');
                }
            } else if ( result.userState == 1 ) {

                let haha = await this.Auth.init(msg);
                if (haha == 1) {
                    await this.DB.updateAtrUser(userId, 'userState', 2);
                }
                
            } else if ( result.userState == 2 ) {
                if (msg.text == '1') {

                    await this.Check.auth(userId);
                    await this.DB.updateAtrUser(userId, 'userState', 3);
                    this.Check.test(userId);
                    
                } else {
                    this.bot.sendMessage(userId, 'Отправь 1, если хочешь начать просмотр анкет');
                }

            } else if ( result.userState == 3 ){
                    this.Check.test(userId, msg.text);
                
            }
        
        }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { MsgController };