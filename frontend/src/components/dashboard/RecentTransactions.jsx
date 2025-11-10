import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { categories as dummyCategories } from '../../api/dummyData';

const RecentTransactions = ({ transactions }) => {
  const getCategoryColor = (categoryName) => {
    const cat = dummyCategories.find(c => c.name === categoryName);
    return cat?.color || '#ccc';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent transactions</p>
      ) : (
        <ul>
          {transactions.map(tx => (
            <li key={tx.id} className="flex justify-between py-2 border-b">
              <div>
                <p className="font-medium">{tx.note}</p>
                <span
                  className="px-2 py-1 rounded text-white text-xs"
                  style={{ backgroundColor: getCategoryColor(tx.category) }}
                >
                  {tx.category}
                </span>
              </div>
              <p className={tx.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                {tx.amount < 0 ? '-' : '+'}
                {formatCurrency(Math.abs(tx.amount))}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
