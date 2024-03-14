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
        this.ProfileView = new ProfileView(bot);
    }

    async getMsg(msg) {
        try {
            let userId = msg.from.id;
            let text = msg.text;
            let result = await this.DB.getUserProfile(userId);
            setTimeout(async () => {
                this.bot.deleteMessage(userId, msg.message_id);
            }, 5000);

            if ( result == undefined ) { // If the user has sent a message for the first time
                this.bot.sendMessage(userId, ' Вижу ты тут впервые, отправь любое сообщение.\nОтлично, я работаю!');
                await this.DB.createUserProfile(userId, msg.from.first_name, msg.from.username);
            } else {
                let flag;
                switch (text) {
                    case '/profile':
                        flag = await this.MsgProfile.init(userId, result.userState);
                        if (flag == 1) {
                            this.ProfileView.test(userId, userId);
                        }
                        break;

                    case '/clear':
                        flag = await this.MsgClear.init(userId, result.userState);
                        if (flag == 1) {
                            this.Auth.clear(userId);
                            await this.DB.updateAtrUser(userId, 'userState', 1);
                            await this.Check.delete(userId);
                            this.bot.sendMessage(userId, 'Почистили базу от дурочков\nКак тебя звать то?');
                        }
                        break;
                    default:
                        if ( result.userState == 1 ) {

                            flag = await this.Auth.init(msg);
                            if (flag == 1) {
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
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { MsgController };