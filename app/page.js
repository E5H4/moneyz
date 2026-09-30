"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [financialData, setFinancialData] = useState(null);

  const paycheck = 2100;

  useEffect(() => {
    fetch("/api/financial")
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

  const fixedExpenses = financialData.expenses.reduce(
    (total, expense) => total + expense.amount_cents,
    0
  );

  const availableAfterBills = paycheck * 100 - fixedExpenses;

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
            ${paycheck.toFixed(2)}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Available paycheck
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
            Available After Bills
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            ${(availableAfterBills / 100).toFixed(2)}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Before other allocations
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

      {/* Expenses */}
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
              key={card.id}
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
            </div>
          ))}
        </div>
      </section>

      {/* Goals */}
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
                key={goal.id}
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