<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Disable FK checks for safe truncation
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Call individual seeders
        $this->call([
            UsersTableSeeder::class,
            CategoriesTableSeeder::class,
            ExpensesTableSeeder::class,
            BudgetsTableSeeder::class,
        ]);

        // Re-enable FK checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
