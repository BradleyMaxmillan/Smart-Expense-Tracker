<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    //register
    public function register(Request $request)
    {
        // 1) validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // 2) create user (use Hash facade)
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // 3. Fire the Registered event (for email verification or other listeners)
        event(new Registered($user));

        // 4) create sanctum token
        $token = $user->createToken('api-token')->plainTextToken;

        // 5) return response (201 Created)
        return response()->json([
            'message' => 'User registered successfully.',
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }

    //****Login
public function login(Request $request)
{
    // Validate input
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    // Find user by email
    $user = User::where('email', $validated['email'])->first();

    // Check if user exists and password matches
    if (!$user || !Hash::check($validated['password'], $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    // Revoke old tokens
    $user->tokens()->delete();

    // Create a new token
    $token = $user->createToken('api-token')->plainTextToken;

    // Return JSON response
    return response()->json([
        'message' => 'Login successful',
        'user' => $user,
        'token' => $token,
    ]);
}
}
