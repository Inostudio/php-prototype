<?php

namespace Front;

use \Auth;
use \View;
use \Input;
use \Validator;
use \Redirect;
use \Response;

class AuthController extends \Controller
{
    /**
     *
     * @var \UsersService
     */
    protected $users = null;

    
    public function __construct(\UsersService $us) 
    {
        $this->users = $us;
    }
    
    
    protected static $signinValidation = [
        'email' => 'required|email',
        'password' => 'required|between:6,18',
    ];
    
    protected static $signupValidation = [
        'email' => 'required|email|unique:users',
        'password' => 'required|between:6,18|confirmed',
        'password_confirmation' => 'required|between:6,18',
    ];

    /**
     * Show signin form
     * 
     * @return \Illuminate\View\View
     */
    public function getSignin()
    {
        return View::make('front.auth.signin');
    }
    
    /**
     * Handle signin form
     * 
     * @return \Illuminate\Http\Response
     */
    public function postSignin()
    {
        $response = [true, 'Success'];

        $v = Validator::make(Input::all(), self::$signinValidation);

        if($v->fails()){
            $response = [
                false,
                $v->messages()
            ];
            return Response::json($response); 
        }

        $loginInfo = ['email' => Input::get('email'), 'password' => Input::get('password')];

        if(!Auth::attempt($loginInfo, Input::get('remember'))){
            $response = [
                false,
                ["auth" => trans('front/auth/signin.message_invalid_credentials')]
            ];
        }

        return Response::json($response);
    }
    
    /**
     * Show signup form
     * 
     * @return \Illuminate\View\View
     */
    public function getSignup()
    {
        return View::make('front.auth.signup');
    }
    
    /**
     * Handle signup requet
     * 
     * @return \Illuminate\Http\Response
     */
    public function postSignup()
    {
        $response = [true, 'Success'];

        $v = Validator::make(Input::all(), self::$signupValidation);
        
        if($messages = $v->fails()){
            $response = [
                false,
                'Invalid form data'
            ];
            return Response::json($response); 
        }
        
        
        if(($this->users->existUser(Input::get('email'))) === false) {
            $user = $this->users->registerUser(Input::get('email'), Input::get('password'));
            Auth::login($user);    
        } else {
            $response = [
                false,
                'This user already is exists'
            ];   
        }
                
        
        return Response::json($response);        
    }
    
    /**
     * Logout from application
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getLogout()
    {
        Auth::logout();
        return Redirect::to('/');
    }
    
}