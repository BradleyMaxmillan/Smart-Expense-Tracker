<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    protected $fillable = [
        'category_id',
        'amount',
        'month',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'month' => 'date',
    ];

    // Each budget belongs to one category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Each budget belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
