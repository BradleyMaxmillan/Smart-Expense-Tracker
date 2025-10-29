<?php

namespace App\Http\Controllers;
use App\Models\Expense; 
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses=Expense::all();
           return response()->json([
        'message' => 'Expenses retrieved successfully!',
        'data' => $expenses,
    ], 200);
    }

    
    public function store(Request $request)
    {
        // validates the input
      $validated=$request->validate([
        'amount' =>'required|numeric',
        'category' =>'required|string|max:255',
        'date' =>'required|date',
        'note' =>'nullable|string',
      ]);
      
        // this create a new expense
       $expense= Expense::create($validated);

    //    reutrn respone
       return response()->json([
        'message'=> 'Expense Created Successfully!',
        'data'=> $expense,
       ],201);
    
    }
   
    public function show(string $id)
    {
        $expense=Expense::find($id);

        if(!$expense){
            return response()->json(['message'=>'Expense not found'],404);
        };


        return response()->json([
            'message'=>'Expense Retrieved Successfully!',
            'data'=> $expense
        ],200);

    }

   
    public function update(Request $request, string $id)
    {
        $expense =expense::find($id);
        if (!$expense) {
           return response()->json(['message'=>'Expense not found'],404);
        }

        $request->validate([
            'amount'=>'numeric',
            'category'=>'string',
            'date'=>'date',
            'note'=>'nullable|string',
        ]);

        $expense->update($request->all());

        return response()->json([
            'message'=>'Expense updated successfully!',
            'data'=>$expense,
        ]);
    }

  
    public function destroy(string $id)
    {
        $expense =Expense::find($id);
        if (!$expense) {
            return response()->json(['message'=>'Expense not found'],404);
        
        }
        $expense->delete();

        return response()->json([
            'message'=>'Expense deleted successfully',
        ],200);

    }
}
