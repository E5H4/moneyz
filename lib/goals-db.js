const db = require("./db");

const insertGoal = db.prepare(`
  INSERT INTO goals (name, target_cents)
  VALUES (?, ?)
`);

const goals = [
  ["New York Trip", 200000],
  ["Tattoo", 70000]
];

for (const goal of goals) {
  insertGoal.run(goal[0], goal[1]);
}

console.log("Savings goals added.");