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
        'password' => 'required|between:6,32',
    ];
    
    protected static $signupValidation = [
        'email' => 'required|email|unique:users',
        'password' => 'required|between:6,32|confirmed',
        'password_confirmation' => 'required|between:6,32',
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
        $code = 200;
        $response = [true, 'Success'];

        $v = Validator::make(Input::all(), self::$signinValidation);
        if(\App::getLocale() == 'ru') {
            $v->setAttributeNames([
                'email' => 'емаил',
                'password' => 'пароль'
            ]);
        }

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

        $ban = \UserBans::where('user_id', '=', Auth::user()->id)->where('end', '>', date("Y-m-d H:i:s"))->first();
        if($ban){
            Auth::logout();
            $response = [
                false,
                ['auth' => 'Access denied. The Reason: ' . $ban->reason]
            ];
        }
        return Response::json($response, $code);
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
        if(\App::getLocale() == 'ru') {
            $v->setAttributeNames([
                'email' => 'емаил',
                'password' => 'пароль',
                'password_confirmation' => 'подтверждение пароля',
            ]);
        }

        if($v->fails()){
            $response = [
                false,
                $v->messages()
            ];
            return Response::json($response); 
        } else {
            $user = $this->users->registerUser(Input::get('email'), Input::get('password'));
            Auth::login($user);
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