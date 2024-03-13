const mysql = require('mysql2/promise');
const config = require('../config');

//userState TINYINY UNSIGNED DEFAULT 1
class DBMatch {
  constructor() {
    this.pool = mysql.createPool(config.db); // Используем пул соединений для эффективного управления множественными запросами
  }

  async createMatch(telegramId, gender) {
    //const { userName, userState } = userProfile;
    await this.pool.query('INSERT INTO check_table  (userId, userId2) VALUES (?, ?) '+
                        'ON DUPLICATE KEY UPDATE last_activity = NOW()', [telegramId, gender]);
    console.log('CHECK записан');
  }
}

module.exports = { DBMatch };