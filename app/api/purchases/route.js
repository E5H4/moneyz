import db from "../../../lib/db";

export async function POST(request) {
  const body = await request.json();

  const { credit_card_id, description, amount_cents, purchase_date } = body;

  if (!credit_card_id || !description || !amount_cents || !purchase_date) {
    return Response.json(
      { error: "Missing purchase information." },
      { status: 400 }
    );
  }

  const result = db.prepare(`
    INSERT INTO purchases (
      credit_card_id,
      description,
      amount_cents,
      purchase_date
    )
    VALUES (?, ?, ?, ?)
  `).run(
    credit_card_id,
    description,
    amount_cents,
    purchase_date
  );

  return Response.json({
    success: true,
    purchase_id: result.lastInsertRowid
  });
}
// post saves a purchase
// get retrieves saved purchases
// api correctly identifies cred card by name

export async function GET() {
  const purchases = db.prepare(`
    SELECT
      purchases.id,
      purchases.description,
      purchases.amount_cents,
      purchases.purchase_date,
      credit_cards.name AS card_name
    FROM purchases
    JOIN credit_cards
      ON purchases.credit_card_id = credit_cards.id
    ORDER BY purchases.purchase_date DESC, purchases.id DESC
  `).all();

  return Response.json(purchases);
}