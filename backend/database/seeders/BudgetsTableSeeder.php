<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Budget;
use App\Models\User;
use App\Models\Category;
use Carbon\Carbon;

class BudgetsTableSeeder extends Seeder
{
    public function run(): void
    {
        Budget::truncate();

        $users = User::all();
        $categories = Category::all();

        foreach ($users as $user) {
            foreach ($categories as $category) {
                Budget::create([
                    'user_id' => $user->id,
                    'category_id' => $category->id,
                    'amount' => rand(500, 5000),
                    'month' => Carbon::now()->startOfMonth(),
                ]);
            }
        }
    }
}
