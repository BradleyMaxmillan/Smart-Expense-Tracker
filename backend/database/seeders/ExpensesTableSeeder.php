<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Expense;
use App\Models\User;
use App\Models\Category;
use Carbon\Carbon;

class ExpensesTableSeeder extends Seeder
{
    public function run(): void
    {
        Expense::truncate();

        $users = User::all();
        $categories = Category::all();

        foreach ($users as $user) {
            // Each user gets 10 random expenses
            for ($i = 0; $i < 10; $i++) {
                $category = $categories->random();
                Expense::create([
                    'user_id' => $user->id,
                    'category_id' => $category->id,
                    'amount' => rand(100, 5000) + rand(0, 99)/100, // random decimal
                    'date' => Carbon::now()->subDays(rand(0, 30)),
                    'note' => $category->category_name . ' expense',
                ]);
            }
        }
    }
}
