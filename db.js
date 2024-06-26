const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('orders.db');

// Создаем таблицу, если она не существует
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, name TEXT, amount REAL)');
});

module.exports = db;
