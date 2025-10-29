<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //register
   public function register(Request $request){
    $validated =$request->validate([
        'name'=>'required|string|max:255',
        'email'=>'required|email|unique:users',
        'password'=>'required|strring|min:6|confirmed',
    ]);

    $user=User::create ([
        'name'=>$validated['name'],
        'email'=>$validated['email'],
        'password'=>$validated['password'],
    ]);

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json(['user'=>$user,'token'=>$token],201);

   }

   //Login

   public function login(Request $request){

    // validate input

    $credentials =$request->validate([
        'email'=>'required|string|email',
        'password'=>'required|string',
    ]);

    // attempt authentication

     if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials provided.'],
            ]);
        }

    $user = Auth::user();

    // Create token 
   $token = $user->createToken('api-token')->plainTextToken;

   }
}
