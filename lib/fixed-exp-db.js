const db = require("./db");

const insertExpense = db.prepare(`
  INSERT INTO recurring_expenses (name, amount_cents)
  VALUES (?, ?)
`);

const expenses = [
  ["Rent", 100400],
  ["Water/Sewer", 3500],
  ["Rubbish Removal", 500],
  ["Pet Upcharge", 2500],
  ["Billing Fee", 600],
  ["Spotify", 1403],
];

for (const expense of expenses) {
  insertExpense.run(expense[0], expense[1]);
}

console.log("Recurring expenses added.");