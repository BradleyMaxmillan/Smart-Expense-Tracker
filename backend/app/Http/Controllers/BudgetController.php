<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BudgetController extends Controller
{
    // List all budgets for the authenticated user
    public function index(Request $request)
    {
        $budgets = Budget::with('category')
            ->where('user_id', $request->user()->id)
            ->orderBy('month', 'desc')
            ->get();

        return response()->json($budgets);
    }

    // Store a new budget
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:0',
            'month' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $budget = Budget::create(array_merge(
            $validator->validated(),
            ['user_id' => $request->user()->id]
        ));

        return response()->json([
            'message' => 'Budget added successfully!',
            'data' => $budget
        ], 201);
    }

    // Show a specific budget
    public function show(Request $request, $id)
    {
        $budget = Budget::with('category')
            ->where('user_id', $request->user()->id)
            ->find($id);

        if (!$budget) {
            return response()->json(['message' => 'Budget not found'], 404);
        }

        return response()->json($budget);
    }

    // Update a budget
    public function update(Request $request, $id)
    {
        $budget = Budget::where('user_id', $request->user()->id)->find($id);

        if (!$budget) {
            return response()->json(['message' => 'Budget not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'category_id' => 'sometimes|exists:categories,id',
            'amount' => 'sometimes|numeric|min:0',
            'month' => 'sometimes|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $budget->update($validator->validated());

        return response()->json([
            'message' => 'Budget updated successfully!',
            'data' => $budget
        ]);
    }

    // Delete a budget
    public function destroy(Request $request, $id)
    {
        $budget = Budget::where('user_id', $request->user()->id)->find($id);

        if (!$budget) {
            return response()->json(['message' => 'Budget not found'], 404);
        }

        $budget->delete();

        return response()->json(['message' => 'Budget deleted successfully']);
    }
}
