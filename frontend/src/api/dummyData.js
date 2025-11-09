// src/api/dummyData.js

export const categories = [
  { id: 1, name: 'Rent', color: '#f87171' },
  { id: 2, name: 'Food', color: '#fbbf24' },
  { id: 3, name: 'Transportation', color: '#60a5fa' },
  { id: 4, name: 'Entertainment', color: '#a78bfa' },
  { id: 5, name: 'Utilities', color: '#34d399' },
];

export const transactions = [
  { id: 1, title: 'Rent Payment', category: 'Rent', amount: -1200 },
  { id: 2, title: 'Monthly Salary', category: 'Income', amount: 2500 },
  { id: 3, title: 'Grocery Shopping', category: 'Food', amount: -150 },
  { id: 4, title: 'Dinner with Friends', category: 'Entertainment', amount: -50 },
  { id: 5, title: 'Bus Pass', category: 'Transportation', amount: -20 },
  { id: 6, title: 'Electricity Bill', category: 'Utilities', amount: -80 },
];

export const budgets = [
  { id: 1, category: 'Rent', amount: 1500 },
  { id: 2, category: 'Food', amount: 500 },
];
