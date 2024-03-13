const mysql = require('mysql2/promise');
const config = require('../config');

//userState TINYINY UNSIGNED DEFAULT 1
class DBManager {
  constructor() {
    this.pool = mysql.createPool(config.db); // Используем пул соединений для эффективного управления множественными запросами
  }

  async getUserProfile(telegramId) {
    try {
      const [rows] = await this.pool.query('SELECT * FROM users WHERE userId= ?', [telegramId]);
      return rows[0];
    } catch (error) {
      console.error('Ошибка getUserProfile', error);
      throw error;
    }
  }

  async createUserProfile(telegramId, userName) {
    //const { userName, userState } = userProfile;
    await this.pool.query('INSERT INTO users (userId, userName) VALUES (?, ?) '+
                        'ON DUPLICATE KEY UPDATE last_activity = NOW()', [telegramId, userName]);
    console.log('Пользоватьль записан');
  }

  async updateUserProfile(telegramId, userProfile) {
    const { age, gender, photoUrl, description } = userProfile;
    await this.pool.query('UPDATE users SET age = ?, gender = ?, photo_url = ?, description = ? WHERE telegram_id = ?', [age, gender, photoUrl, description, telegramId]);
  }
  async updateAtrUser(telegramId, atr, val) {
    await this.pool.query('UPDATE users SET ' +
                          `${atr} = ? ` +
                          'WHERE userId = ?', [val, telegramId]);
  }
}

module.exports = { DBManager };