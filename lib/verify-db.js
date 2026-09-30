const db = require("./db");

console.log("\n--- Fixed Expenses ---");

const expenses = db.prepare(`
  SELECT name, amount_cents
  FROM recurring_expenses
`).all();

for (const expense of expenses) {
  console.log(
    `${expense.name}: $${(expense.amount_cents / 100).toFixed(2)}`
  );
}

console.log("\n--- Credit Cards ---");

const cards = db.prepare(`
  SELECT name, balance_cents, minimum_payment_cents
  FROM credit_cards
`).all();

for (const card of cards) {
  console.log(
    `${card.name}: Balance $${(card.balance_cents / 100).toFixed(2)} | Minimum $${(card.minimum_payment_cents / 100).toFixed(2)}`
  );
}

console.log("\n--- Savings Goals ---");

const goals = db.prepare(`
  SELECT name, target_cents, saved_cents
  FROM goals
`).all();

for (const goal of goals) {
  console.log(
    `${goal.name}: $${(goal.saved_cents / 100).toFixed(2)} / $${(goal.target_cents / 100).toFixed(2)}`
  );
}

console.log("\n--- Variable Expenses ---");

const variableExpenses = db.prepare(`
  SELECT name, cap_cents, current_cents
  FROM variable_expenses
`).all();

for (const expense of variableExpenses) {
  console.log(
    `${expense.name}: Cap $${(expense.cap_cents / 100).toFixed(2)} | Current $${(expense.current_cents / 100).toFixed(2)}`
  );
}