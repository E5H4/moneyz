const db = require("./db");

const existingSettings = db.prepare(`
  SELECT id
  FROM settings
`).get();

if (!existingSettings) {
  db.prepare(`
    INSERT INTO settings (paycheck_cents, pay_frequency)
    VALUES (?, ?)
  `).run(210000, "biweekly");

  console.log("Paycheck settings added.");
} else {
  console.log("Paycheck settings already exist.");
}