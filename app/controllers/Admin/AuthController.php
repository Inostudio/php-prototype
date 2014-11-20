<?php

namespace Admin;

use \Auth;
use \View;
use \Input;
use \Validator;
use \Redirect;
use \Response;


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

        return Response::json($response);
    }
    
    public function getLogout()
    {
        Auth::logout();
        return Redirect::route('admin.signin');
    }
    
}

