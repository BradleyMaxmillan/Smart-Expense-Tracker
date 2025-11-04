import React, { useState } from 'react'

export default function TransactionForm({ onAdd, categories }){
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0]?.name || '')
  const submit = (e) => {
    e.preventDefault()
    const tx = { id: Date.now(), description, amount: Number(amount), category, date: new Date().toISOString().slice(0,10) }
    onAdd(tx)
    setDescription(''); setAmount('')
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
      <h3 className="font-semibold">Add Transaction</h3>
      <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-3 border rounded" required />
      <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" type="number" className="w-full p-3 border rounded" required />
      <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-3 border rounded">
        {categories.map(c=> <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-[color:var(--accent-blue)] text-white rounded">Save</button>
      </div>
    </form>
  )
}
