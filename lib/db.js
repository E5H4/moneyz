const Database = require("better-sqlite3");

const db = new Database("data/money.db");

module.exports = db;