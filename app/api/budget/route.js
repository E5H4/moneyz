import db from "../../../lib/db";

export async function GET() {
  const settings = db.prepare(`
    SELECT paycheck_cents, pay_frequency
    FROM settings
    LIMIT 1
  `).get();

  const expenses = db.prepare(`
    SELECT id, name, amount_cents, active
    FROM recurring_expenses
    WHERE active = 1
   `).all();

  const variableExpenses = db.prepare(`
    SELECT name, cap_cents, current_cents
    FROM variable_expenses
    WHERE active = 1
  `).all();

  const cards = db.prepare(`
  SELECT
    name,
    balance_cents,
    minimum_payment_cents,
    payment_method,
    payment_day
  FROM credit_cards
`).all();

  const goals = db.prepare(`
    SELECT name, target_cents, saved_cents
    FROM goals
  `).all();

  const paycheck = settings.paycheck_cents;

  const fixedExpenses = expenses.reduce(
    (total, expense) => total + expense.amount_cents,
    0
  );

  const minimumPayments = cards.reduce(
    (total, card) => total + card.minimum_payment_cents,
    0
  );

  const gas = variableExpenses.find(
    (expense) => expense.name === "Gas"
  );

  const electricity = variableExpenses.find(
    (expense) => expense.name === "Electricity"
  );

  const gasReserve = gas ? gas.cap_cents : 0;

  const electricityCurrent = electricity
    ? electricity.current_cents
    : 0;

  const availableAfterObligations =
    paycheck -
    fixedExpenses -
    gasReserve -
    electricityCurrent -
    minimumPayments;

    return Response.json({
    paycheck,
    pay_frequency: settings.pay_frequency,
    fixed_expenses: fixedExpenses,
    expenses,
    gas_reserve: gasReserve,
    electricity_current: electricityCurrent,
    minimum_payments: minimumPayments,
    available_after_obligations: availableAfterObligations,
    cards,
    goals
    });
}