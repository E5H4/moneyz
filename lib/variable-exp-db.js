const db = require("./db");

const insertExpense = db.prepare(`
  INSERT INTO variable_expenses (name, cap_cents)
  VALUES (?, ?)
`);

const expenses = [
  ["Gas", 5000],
  ["Electricity", 0]
];

for (const expense of expenses) {
  insertExpense.run(expense[0], expense[1]);
}

console.log("Variable expenses added.");