<?php

namespace Admin;

use \Auth;
use \View;
use \Input;
use \Validator;
use \Redirect;
use \Response;


/**
 * Class AuthController
 * @package Admin
 */
class AuthController extends \Controller
{

    /**
     * @var array
     */
    protected static $signinValidation = [
        'email' => 'required|email',
        'password' => 'required|alpha_num',
    ];

    /**
     * @return mixed
     */
    public function getSignin()
    {
        return View::make('admin.signin');
    }

    /**
     * @return mixed
     */
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

    /**
     * @return mixed
     */
    public function getLogout()
    {
        Auth::logout();
        return Redirect::route('admin.signin');
    }
    
}

