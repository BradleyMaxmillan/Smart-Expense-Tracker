import React from 'react';
import { FaDollarSign, FaShoppingCart, FaPiggyBank, FaWallet } from 'react-icons/fa';
import { formatCurrency } from '../../utils/formatCurrency';

const cards = [
  { title: 'Total Income', value: 5200, icon: <FaDollarSign />, color: 'text-green-500' },
  { title: 'Total Expenses', value: 3150, icon: <FaShoppingCart />, color: 'text-red-500' },
  { title: 'Savings', value: 2050, icon: <FaPiggyBank />, color: 'text-gray-700' },
  { title: 'Net Worth', value: 15000, icon: <FaWallet />, color: 'text-gray-700' },
];

const SummaryCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
    {cards.map((card, i) => (
      <div key={i} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
        <div className="text-2xl">{card.icon}</div>
        <div>
          <p className="text-sm text-gray-500">{card.title}</p>
          <p className={`text-lg font-semibold ${card.color}`}>{formatCurrency(card.value)}</p>
        </div>
      </div>
    ))}
  </div>
);

export default SummaryCards;
