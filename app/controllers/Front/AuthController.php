<?php

namespace Front;

use \Auth;
use \View;
use \Input;
use \Validator;
use \Redirect;

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
        'password' => 'required|alpha_num',
    ];
    
    protected static $signupValidation = [
        'email' => 'required|email|unique:users',
        'password' => 'required|alpha_num|between:4,18|confirmed',
        'password_confirmation' => 'required|alpha_num|between:4,18',
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function postSignin()
    {
        $v = Validator::make(Input::all(), self::$signinValidation);
        
        if($v->fails()){
            return Redirect::route('front.signin')
                        ->withInput()
                        ->withErrors($v)
                        ->with('form_errors', 'Invalid form data');
        }
        
        $loginInfo = ['email' => Input::get('email'), 'password' => Input::get('password')];
        
        if(!Auth::attempt($loginInfo, Input::get('remember'))){
            
            return Redirect::route('front.signin')
                    ->withInput()
                    ->with('form_errors', "Invalid credentials");            
        }
        
        return Redirect::intended('/');
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function postSignup()
    {
        $v = Validator::make(Input::all(), self::$signupValidation);
        
        if($v->fails()){
            return Redirect::route('front.signup')
                        ->withInput()
                        ->withErrors($v)
                        ->with('form_errors', 'Invalid form data');
        }
        
        $user = $this->users->registerUser(Input::get('email'), Input::get('password'));
        Auth::login($user);
        
        return Redirect::intended('/');        
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