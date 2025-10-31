<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::insert([
            ['category_name' => 'Food', 'color_code' => '#FF5733'],
            ['category_name' => 'Transport', 'color_code' => '#33C3FF'],
            ['category_name' => 'Entertainment', 'color_code' => '#33FF57'],
        ]);
    }
}
