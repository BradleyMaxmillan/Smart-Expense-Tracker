// src/utils/chartHelpers.js

export const getSpendingByCategory = (transactions = [], categories = []) => {
  if (!transactions.length || !categories.length) return [];

  return categories
    .map(cat => {
      // sum only negative amounts (expenses)
      const totalSpent = transactions
        .filter(t => t.category === cat.name && t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      return {
        name: cat.name,
        value: totalSpent,
        color: cat.color,
      };
    })
    .filter(cat => cat.value > 0); // only show categories with expenses
};
