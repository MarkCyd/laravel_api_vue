<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        //validate
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);
        //create user
        $user = User::create($fields);
        //generate token for user
        $token = $user->createToken($request->name); 
        
        return [
           'user'=>$user, 
           'token'=>$token->plainTextToken]; // remove uwanted data 
    }

    public function login(Request $request)
    {
          //validate
         $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
       
        if(!$user || !Hash::check($request->password,$user->password))
        {
            return [
                'errors'=>[
                    'email'=> ['this email is not exist']
                ]
            ];

           /*  return ["message"=>"invalid credentials"]; */
        }

        $token = $user->createToken($user->name); 
        
        return [
           'user'=>$user, 
           'token'=>$token->plainTextToken]; // remove uwanted data 
    }

    public function logout(Request $request)
    {
        
        $request->user()->tokens()->delete();
        return ["message"=>"you are logout"];
    }
}
