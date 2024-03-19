const mysql = require('mysql2/promise');
const config = require('../config');

//userState TINYINY UNSIGNED DEFAULT 1
class DBMessages {
  constructor() {
    this.pool = mysql.createPool(config.db); // Используем пул соединений для эффективного управления множественными запросами
  }

  async add(message_id, login, indentifier) {
    try {
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      this.pool.query('INSERT INTO user_messages (message_id, login, indentifier, created_at) VALUES (?, ?, ?, ?)',
      [message_id, login, indentifier,  now]);
      
    } catch (error) {
      console.error('Ошибка getUserProfile', error);
      throw error;
    }
  }

  async log() {
    console.log('Я работаю!!!!!!!\n');
  }

}

module.exports = { DBMessages };