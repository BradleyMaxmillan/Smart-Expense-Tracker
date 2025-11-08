<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;
use App\Models\Budget;
use App\Models\Category;

class AnalyticsController extends Controller
{
    // Get total expenses per month for the authenticated user
    public function monthlyExpenses(Request $request)
    {
        $userId = $request->user()->id;

        $monthlyExpenses = Expense::selectRaw('YEAR(date) as year, MONTH(date) as month, SUM(amount) as total')
            ->where('user_id', $userId)
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return response()->json($monthlyExpenses);
    }

    // Get expenses grouped by category for the authenticated user
    public function expensesByCategory(Request $request)
    {
        $userId = $request->user()->id;

        $categoryExpenses = Expense::selectRaw('category_id, SUM(amount) as total')
            ->where('user_id', $userId)
            ->groupBy('category_id')
            ->with('category')
            ->get();

        return response()->json($categoryExpenses);
    }
    public function recentExpenses(Request $request)
{
    $userId = $request->user()->id;

    // Get the 5 most recent expenses with category info
    $recentExpenses = Expense::with('category')
        ->where('user_id', $userId)
        ->orderBy('date', 'desc')
        ->take(5)
        ->get();

    return response()->json([
        'message' => 'Recent expenses retrieved successfully!',
        'data' => $recentExpenses
    ]);
}


    // Compare budget vs actual spending for each category
    public function budgetVsActual(Request $request)
    {
        $userId = $request->user()->id;

        $budgets = Budget::where('user_id', $userId)
            ->with('category')
            ->get();

        $data = $budgets->map(function ($budget) use ($userId) {
            $spent = Expense::where('user_id', $userId)
                ->where('category_id', $budget->category_id)
                ->whereYear('date', date('Y', strtotime($budget->month)))
                ->whereMonth('date', date('m', strtotime($budget->month)))
                ->sum('amount');

            return [
                'category' => $budget->category->category_name,
                'budget' => $budget->amount,
                'spent' => $spent,
                'remaining' => $budget->amount - $spent,
            ];
        });

        return response()->json($data);
    }
}
