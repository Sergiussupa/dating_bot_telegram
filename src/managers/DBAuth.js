const mysql = require('mysql2/promise');
const config = require('../config');

//userState TINYINY UNSIGNED DEFAULT 1
class DBAuth {
  constructor() {
    this.pool = mysql.createPool(config.db); // Используем пул соединений для эффективного управления множественными запросами
  }

  async getProfile(telegramId) {
    try {
      const [rows] = await this.pool.query('SELECT * FROM profiles WHERE profileId= ?', [telegramId]);
      return rows[0];
    } catch (error) {
      console.error('Ошибка getUserProfile', error);
      throw error;
    }
  }

  async createProfile(telegramId, userName) {
    //const { userName, userState } = userProfile;
    await this.pool.query('INSERT INTO profiles (profileId) VALUES (?) '+
                        'ON DUPLICATE KEY UPDATE last_activity = NOW()', [telegramId]);
    console.log('Пользоватьль записан');
  }

  async updateAtrProfile(telegramId, atr, val) {
    await this.pool.query('UPDATE profiles SET ' +
                          `${atr} = ? ` +
                          'WHERE profileId = ?', [val, telegramId]);
  }
}

module.exports = { DBAuth };