<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Transaction;
use App\Models\Category;
use App\Models\Budget;

class AnalyticsController extends Controller
{
    public function index()
    {
        try {
            $year  = now()->year;
            $month = now()->month;

            // -------------------------------------------------
            // 1. Monthly expenses
            // -------------------------------------------------
            $monthlyExpenses = Transaction::selectRaw(
                    'MONTH(expense_date) as month,
                     YEAR(expense_date) as year,
                     SUM(amount) as total_spending'
                )
                ->where('type', 'expense')
                ->whereYear('expense_date', $year)
                ->groupByRaw('YEAR(expense_date), MONTH(expense_date)')
                ->orderBy('year')
                ->orderBy('month')
                ->get();

            // -------------------------------------------------
            // 2. Monthly income
            // -------------------------------------------------
            $monthlyIncome = Transaction::selectRaw(
                    'MONTH(expense_date) as month,
                     YEAR(expense_date) as year,
                     SUM(amount) as total_income'
                )
                ->where('type', 'income')
                ->whereYear('expense_date', $year)
                ->groupByRaw('YEAR(expense_date), MONTH(expense_date)')
                ->orderBy('year')
                ->orderBy('month')
                ->get();

            // -------------------------------------------------
            // 3. Category spending
            // -------------------------------------------------
            $categories = Transaction::join('categories', 'transactions.category_id', '=', 'categories.id')
                ->select('categories.name as category', DB::raw('SUM(transactions.amount) as total_amount'))
                ->where('transactions.type', 'expense')
                ->whereYear('transactions.expense_date', $year)
                ->groupBy('categories.name')
                ->orderByDesc('total_amount')
                ->get();

            // -------------------------------------------------
            // 4. Recent transactions
            // -------------------------------------------------
            $recent = Transaction::join('categories', 'transactions.category_id', '=', 'categories.id')
                ->select(
                    'transactions.description',
                    'transactions.amount',
                    'transactions.expense_date as date',
                    'transactions.type',
                    'categories.name as category',
                    'categories.color'
                )
                ->orderByDesc('transactions.expense_date')
                ->limit(8)
                ->get();

            // -------------------------------------------------
            // 5. Budget vs actual (current month)
            // -------------------------------------------------
            $budgets = Category::leftJoin('transactions as e', function ($join) use ($month, $year) {
                    $join->on('categories.id', '=', 'e.category_id')
                         ->whereMonth('e.expense_date', $month)
                         ->whereYear('e.expense_date', $year)
                         ->where('e.type', 'expense');
                })
                ->leftJoin('budgets as b', function ($join) use ($month, $year) {
                    $join->on('categories.id', '=', 'b.category_id')
                         ->whereMonth('b.budget_month', $month)
                         ->whereYear('b.budget_month', $year);
                })
                ->select(
                    'categories.name as category',
                    DB::raw('COALESCE(SUM(e.amount), 0) as actual_spending'),
                    DB::raw('COALESCE(b.budget_amount, 0) as budget_amount')
                )
                ->groupBy('categories.id', 'categories.name', 'b.budget_amount')
                ->havingRaw('budget_amount > 0')
                ->get();

            // -------------------------------------------------
            // 6. Total transaction count
            // -------------------------------------------------
            $totalTransactions = Transaction::count();

            return response()->json([
                'monthlyExpenses'    => $monthlyExpenses,
                'monthlyIncome'      => $monthlyIncome,
                'categories'         => $categories,
                'recent'             => $recent,
                'budgets'            => $budgets,
                'totalTransactions'  => $totalTransactions,
                'connection_status'  => 'connected',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'monthlyExpenses'    => [],
                'monthlyIncome'      => [],
                'categories'         => [],
                'recent'             => [],
                'budgets'            => [],
                'totalTransactions'  => 0,
                'connection_status'  => 'disconnected',
                'error'              => $e->getMessage(),
            ], 500);
        }
    }
}
