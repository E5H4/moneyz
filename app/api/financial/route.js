import db from "../../../lib/db";

export async function GET() {
  const expenses = db.prepare(`
    SELECT id, name, amount_cents, active
    FROM recurring_expenses
    WHERE active = 1
  `).all();

  const cards = db.prepare(`
    SELECT id, name, balance_cents, minimum_payment_cents
    FROM credit_cards
  `).all();

  const goals = db.prepare(`
    SELECT id, name, target_cents, saved_cents
    FROM goals
  `).all();

  return Response.json({
    expenses,
    cards,
    goals
  });
}