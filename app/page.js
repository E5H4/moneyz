"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [financialData, setFinancialData] = useState(null);
  const [purchaseDescription, setPurchaseDescription] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [purchaseCard, setPurchaseCard] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

  useEffect(() => {
    fetch("/api/budget")
      .then((response) => response.json())
      .then((data) => {
        setFinancialData(data);
      });
  }, []);

  if (!financialData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  const paycheck = financialData.paycheck;
  const fixedExpenses = financialData.fixed_expenses;
  const availableAfterBills =
    financialData.available_after_obligations;

  const levinCard = financialData.cards.find(
    (card) => card.name === "Levin Furniture"
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Money Manager
        </h1>

        <p className="mt-1 text-gray-500">
          Your personal financial dashboard
        </p>
      </header>

      {/* Summary Cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* Paycheck */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Paycheck
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${(paycheck / 100).toFixed(2)}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Every 2 weeks
          </p>
        </div>

        {/* Fixed Expenses */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Fixed Expenses
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${(fixedExpenses / 100).toFixed(2)}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Bills and recurring expenses
          </p>
        </div>

        {/* Available */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Available After Obligations
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            ${(availableAfterBills / 100).toFixed(2)}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            After required expenses
          </p>
        </div>

        {/* Levin */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Levin Furniture
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${(levinCard.balance_cents / 100).toFixed(2)}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Minimum payment: $
            {(levinCard.minimum_payment_cents / 100).toFixed(2)}
          </p>
        </div>

      </section>



      {/* this is a form Add Purchase */}
    <section className="mt-10">
    <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">
        Add Purchase
        </h2>
        <p className="text-sm text-gray-500">
        Record a purchase made with a credit card
        </p>
    </div>

    <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">

        {/* Credit Card */}
        <div>
            <label className="block text-sm font-medium text-gray-700">
            Credit Card
            </label>

            <select
            value={purchaseCard}
            onChange={(event) => setPurchaseCard(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
            >
            <option value="">Select a card</option>

            {financialData.cards.map((card) => (
                <option key={card.name} value={card.name}>
                {card.name}
                </option>
            ))}
            </select>
        </div>

        {/* Description */}
        <div>
            <label className="block text-sm font-medium text-gray-700">
            Description
            </label>

            <input
            type="text"
            value={purchaseDescription}
            onChange={(event) => setPurchaseDescription(event.target.value)}
            placeholder="Groceries"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
            />
        </div>

        {/* Amount */}
        <div>
            <label className="block text-sm font-medium text-gray-700">
            Amount
            </label>

            <input
            type="number"
            step="0.01"
            min="0"
            value={purchaseAmount}
            onChange={(event) => setPurchaseAmount(event.target.value)}
            placeholder="25.50"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
            />
        </div>

        {/* Purchase Date */}
        <div>
            <label className="block text-sm font-medium text-gray-700">
            Purchase Date
            </label>

            <input
            type="date"
            value={purchaseDate}
            onChange={(event) => setPurchaseDate(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
            />
        </div>

        </div>

        <button
        type="button"
        className="mt-5 rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
        >
        Add Purchase
        </button>
    </div>
    </section>

      {/* Budget Breakdown */}
      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Budget Breakdown
          </h2>

          <p className="text-sm text-gray-500">
            Variable expenses and required payments
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">

          {/* Gas */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="font-medium text-gray-900">
              Gas
            </h3>

            <p className="mt-2 text-2xl font-bold">
              ${(financialData.gas_reserve / 100).toFixed(2)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Reserved maximum
            </p>
          </div>

          {/* Electricity */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="font-medium text-gray-900">
              Electricity
            </h3>

            <p className="mt-2 text-2xl font-bold">
              ${(financialData.electricity_current / 100).toFixed(2)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Current amount
            </p>
          </div>

          {/* Credit Card Minimums */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="font-medium text-gray-900">
              Credit Card Minimums
            </h3>

            <p className="mt-2 text-2xl font-bold">
              ${(financialData.minimum_payments / 100).toFixed(2)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Required payments
            </p>
          </div>

        </div>
      </section>

        {/* Fixed Expenses */}
        <section className="mt-10">
        <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
            Fixed Expenses
            </h2>

            <p className="text-sm text-gray-500">
            Your recurring monthly obligations
            </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {financialData.expenses.map((expense) => (
            <div
                key={expense.id}
                className="rounded-xl bg-white p-5 shadow-sm"
            >
                <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">
                    {expense.name}
                </h3>

                <span className="text-lg font-semibold">
                    ${(expense.amount_cents / 100).toFixed(2)}
                </span>
                </div>
            </div>
            ))}
        </div>
        </section>
      {/* Credit Cards */}
      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Credit Cards
          </h2>

          <p className="text-sm text-gray-500">
            Current balances and required payments
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {financialData.cards.map((card) => (
            <div
              key={card.name}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <h3 className="font-medium text-gray-900">
                {card.name}
              </h3>

              <p className="mt-3 text-2xl font-bold">
                ${(card.balance_cents / 100).toFixed(2)}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                    Minimum payment: $
                    {(card.minimum_payment_cents / 100).toFixed(2)}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                    {card.payment_method === "autopay"
                        ? `Autopay: ${card.payment_day}th`
                        : "Manual payment"}
                    </p>
            </div>
          ))}
        </div>
      </section>

      {/* Savings Goals */}
      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Savings Goals
          </h2>

          <p className="text-sm text-gray-500">
            Track your progress
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {financialData.goals.map((goal) => {
            const percentage =
              (goal.saved_cents / goal.target_cents) * 100;

            return (
              <div
                key={goal.name}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {goal.name}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {percentage.toFixed(0)}%
                  </span>
                </div>

                <p className="mt-2 text-2xl font-bold">
                  ${(goal.saved_cents / 100).toFixed(2)}
                </p>

                <p className="text-sm text-gray-500">
                  of ${(goal.target_cents / 100).toFixed(2)}
                </p>

                <div className="mt-4 h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}