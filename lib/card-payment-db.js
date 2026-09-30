const db = require("./db");

db.prepare(`
  UPDATE credit_cards
  SET payment_method = ?, payment_day = ?
  WHERE name = ?
`).run("autopay", 20, "Capital One");

db.prepare(`
  UPDATE credit_cards
  SET payment_method = ?, payment_day = ?
  WHERE name = ?
`).run("autopay", 6, "Discover");

db.prepare(`
  UPDATE credit_cards
  SET payment_method = ?, payment_day = ?
  WHERE name = ?
`).run("manual", null, "PNC Rewards");

console.log("Credit card payment settings updated.");