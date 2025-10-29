<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',    // 👈 fixed (no space)
        'category',
        'date',      // 👈 fixed (correct spelling)
        'note',
    ];
}
