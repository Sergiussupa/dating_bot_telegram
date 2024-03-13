const mysql = require('mysql2/promise');
const config = require('../config');

//userState TINYINY UNSIGNED DEFAULT 1
class DBCheck {
  constructor() {
    this.pool = mysql.createPool(config.db); // Используем пул соединений для эффективного управления множественными запросами
  }

  async getCheck(telegramId) {
    try {
      const [rows] = await this.pool.query('SELECT * FROM check_table WHERE checkId= ?', [telegramId]);
      return rows[0];
    } catch (error) {
      console.error('Ошибка getUserProfile', error);
      throw error;
    }
  }
  async delete(telegramId) {
    await this.pool.query('DELETE from check_table ' +
                          `WHERE checkId = ${telegramId}` );
  }

  async all(telegramId, gender, idx) {
    try {
      const [rows] = await this.pool.query('SELECT * FROM check_table ' +
                                         `WHERE gender != ${gender} AND id > ${idx} AND id != ${telegramId};`);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async createCheck(telegramId, gender) {
    //const { userName, userState } = userProfile;
    await this.pool.query('INSERT INTO check_table  (checkId, gender) VALUES (?, ?) '+
                        'ON DUPLICATE KEY UPDATE last_activity = NOW()', [telegramId, gender]);
    console.log('CHECK записан');
  }

  async updateUserProfile(telegramId, userProfile) {
    const { age, gender, photoUrl, description } = userProfile;
    await this.pool.query('UPDATE users SET age = ?, gender = ?, photo_url = ?, description = ? WHERE telegram_id = ?', [age, gender, photoUrl, description, telegramId]);
  }
  async updateAtr(telegramId, atr, val) {
    await this.pool.query('UPDATE check_table SET ' +
                          `${atr} = ? ` +
                          'WHERE checkId = ?', [val, telegramId]);
  }
}

module.exports = { DBCheck };