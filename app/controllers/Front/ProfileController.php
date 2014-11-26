<?php

namespace Front;

use \Auth;
use \Response;
use \View;
use \Input;
use \Redirect;
use \Validator;

class ProfileController extends \BaseController
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

    protected static $changePasswordValidation = [
        'old_password' => 'required|alpha_num',
        'new_password' => 'required|alpha_num|between:4,18|confirmed',
        'new_password_confirmation' => 'required|alpha_num|between:4,18'
    ];

    protected static $changeProfileValidation = [
        'first_name' => 'required|alpha_num|between:2,32',
        'last_name' => 'required|alpha_num|between:2,32',
        'phone' => 'required'
    ];

    /**
     * Show layout profile page
     *
     * @return \Illuminate\View\View
     */
    public function getShow()
    {
        return View::make('front.pages.profile');
    }

    /**
     * Handle signin form
     *
     * @return \Illuminate\Http\Response
     */
    public function postProfileData()
    {
        return Response::json([]);
    }

    /**
     * Change user's profile data
     *
     * @return \Illuminate\Http\Response
     */
    public function postChangeProfile()
    {
        $response = [true, 'Success'];

        $v = Validator::make(Input::all(), self::$changeProfileValidation);

        if($v->fails()){
            $response = [
                false,
                'Invalid form data'
            ];
        } else {
            $this->users->changeProfile(Auth::user()->id, Input::all());
        }

        return Response::json($response);
    }



    public function postChangePassword()
    {
        $response = [true, 'Success'];

        $v = Validator::make(Input::all(), self::$changePasswordValidation);

        if($v->fails()){
            $response = [
                false,
                'Invalid form data'
            ];
        } else if (!\Hash::check(Input::get('old_password'), Auth::user()->password)) {
            $response = [
                false,
                'Invalid old password'
            ];
        } else {
            $this->users->changePassword(Auth::user()->id, Input::get('new_password'));
        }

        return Response::json($response);
    }
}