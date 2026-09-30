const db = require("./db");

const insertCard = db.prepare(`
  INSERT INTO credit_cards (name, balance_cents, minimum_payment_cents)
  VALUES (?, ?, ?)
`);

const cards = [
  ["PNC Rewards", 0, 0],
  ["Capital One", 0, 0],
  ["Discover", 0, 0],
  ["Levin Furniture", 171395, 6000]
];

for (const card of cards) {
  insertCard.run(card[0], card[1], card[2]);
}

console.log("Credit cards added.");