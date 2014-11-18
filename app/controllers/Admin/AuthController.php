<?php

namespace Admin;

use \Auth;
use \View;
use \Input;
use \Validator;
use \Redirect;


class AuthController extends \Controller
{
    
    protected static $signinValidation = [
        'email' => 'required|email',
        'password' => 'required|alpha_num',
    ];    
    
    public function getSignin()
    {
        return View::make('admin.signin');
    }

    public function postSignin()
    {
        $response = [true, 'Success'];

        $v = Validator::make(Input::all(), self::$signinValidation);

        if($v->fails()){
            $response = [
                false,
                'Invalid form data'
            ];
        }

        $loginInfo = ['email' => Input::get('email'), 'password' => Input::get('password')];

        if(!Auth::attempt($loginInfo, Input::get('remember'))){
            $response = [
                false,
                'Invalid credentials'
            ];
        }

        return \Response::json($response);
    }

    /*public function postSignin()
    {
        $v = Validator::make(Input::all(), self::$signinValidation);
        
        if($v->fails()){
            return Redirect::route('admin.signin')
                        ->withInput()
                        ->withErrors($v)
                        ->with('signin_error', 'Invalid form data');
        }
        
        $loginInfo = ['email' => Input::get('email'), 'password' => Input::get('password')];
        
        if(!Auth::attempt($loginInfo, Input::get('remember'))){
            
            return Redirect::route('admin.signin')
                    ->withInput()
                    ->with('signin_error', "Invalid credentials");            
        }
        
        return Redirect::intended(action('admin.dashboard'));
    }*/
    
    public function getLogout()
    {
        Auth::logout();
        return \Redirect::route('admin.signin');
    }
    
}

