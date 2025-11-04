import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="py-16">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Take control of your finances</h1>
          <p className="text-gray-600 mb-6">Expensio helps you track expenses, set budgets and understand where your money goes.</p>
          <div className="flex gap-3">
            <Link to="/register" className="btn-primary">Get Started</Link>
            <Link to="/dashboard" className="btn-ghost">View Dashboard</Link>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow p-8 flex items-center justify-center">
            <img src="https://via.placeholder.com/360x220.png?text=Expensio+Illustration" alt="illustration" />
          </div>
        </div>
      </div>
    </section>
  )
}
