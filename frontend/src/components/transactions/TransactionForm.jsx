import React, { useState } from 'react';
import { categories as dummyCategories } from '../../api/dummyData'; // import categories directly

const TransactionForm = ({ onAdd }) => {
  const [noteInput, setNoteInput] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!noteInput || !amount || !categoryId) {
      alert('Please fill in all fields');
      return;
    }

    const selectedCategory = dummyCategories.find(cat => cat.id === Number(categoryId));

    const newTransaction = {
      id: Date.now(),
      note: noteInput,
      category: selectedCategory?.name || 'Unknown',
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
    };

    onAdd(newTransaction);

    // Reset form
    setNoteInput('');
    setAmount('');
    setCategoryId('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

      <input
        type="text"
        placeholder="Description"
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        className="w-full p-2 mb-3 border rounded-md"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-3 border rounded-md"
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full p-2 mb-3 border rounded-md"
      >
        <option value="">Select Category</option>
        {dummyCategories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
};

export default TransactionForm;
