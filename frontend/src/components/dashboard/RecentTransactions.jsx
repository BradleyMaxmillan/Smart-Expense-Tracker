import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

const RecentTransactions = ({ transactions }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mt-4">
    <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
    <ul>
      {transactions.map(tx => (
        <li key={tx.id} className="flex justify-between py-2 border-b">
          <div>
            <p className="font-medium">{tx.title}</p>
            <p className="text-sm text-gray-500">{tx.category}</p>
          </div>
          <p className={tx.amount < 0 ? 'text-red-500' : 'text-green-500'}>
            {tx.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(tx.amount))}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentTransactions;
