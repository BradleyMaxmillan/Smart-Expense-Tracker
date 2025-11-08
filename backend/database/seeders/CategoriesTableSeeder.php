<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        Category::truncate();

        $categories = [
            'Groceries', 'Transport', 'Entertainment', 'Utilities', 'Health', 
            'Education', 'Dining', 'Travel', 'Shopping', 'Savings'
        ];

        foreach ($categories as $cat) {
            Category::create(['category_name' => $cat]);
        }
    }
}
