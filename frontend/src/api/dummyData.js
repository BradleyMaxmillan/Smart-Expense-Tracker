// src/api/dummyData.js

export const categories = [
  { id: 1, name: 'Rent', color: '#f87171' },
  { id: 2, name: 'Food', color: '#fbbf24' },
  { id: 3, name: 'Transportation', color: '#60a5fa' },
  { id: 4, name: 'Entertainment', color: '#a78bfa' },
  { id: 5, name: 'Utilities', color: '#34d399' },
  { id: 6, name: 'Income', color: '#10b981' }, // added Income category for positive transactions
];

export const transactions = [
  { id: 1, note: 'Rent Payment', category: 'Rent', amount: -1200, date: '2025-11-01' },
  { id: 2, note: 'Monthly Salary', category: 'Income', amount: 2500, date: '2025-11-05' },
  { id: 3, note: 'Grocery Shopping', category: 'Food', amount: -150, date: '2025-11-06' },
  { id: 4, note: 'Dinner with Friends', category: 'Entertainment', amount: -50, date: '2025-11-07' },
  { id: 5, note: 'Bus Pass', category: 'Transportation', amount: -20, date: '2025-11-08' },
  { id: 6, note: 'Electricity Bill', category: 'Utilities', amount: -80, date: '2025-11-09' },
];

export const budgets = [
  { id: 1, category: 'Rent', amount: 1500 },
  { id: 2, category: 'Food', amount: 500 },
  { id: 3, category: 'Transportation', amount: 100 },
  { id: 4, category: 'Entertainment', amount: 200 },
  { id: 5, category: 'Utilities', amount: 150 },
];
