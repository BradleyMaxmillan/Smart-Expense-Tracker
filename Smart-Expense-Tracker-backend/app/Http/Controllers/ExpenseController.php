<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::all();

        return response()->json([
            'message' => 'Expenses retrieved successfully!',
            'data' => $expenses,
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'date' => 'required|date',
            'note' => 'nullable|string',
        ]);

        $expense = Expense::create($validated);

        return response()->json([
            'message' => 'Expense created successfully!',
            'data' => $expense,
        ], 201);
    }

    public function show(string $id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        return response()->json([
            'message' => 'Expense retrieved successfully!',
            'data' => $expense,
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $validated = $request->validate([
            'amount' => 'numeric',
            'category_id' => 'exists:categories,id',
            'date' => 'date',
            'note' => 'nullable|string',
        ]);

        $expense->update($validated);

        return response()->json([
            'message' => 'Expense updated successfully!',
            'data' => $expense,
        ], 200);
    }

    public function destroy(string $id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $expense->delete();

        return response()->json([
            'message' => 'Expense deleted successfully',
        ], 200);
    }
}
