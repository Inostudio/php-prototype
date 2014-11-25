<?php

namespace Front;

use \Auth;
use \Response;
use \View;
use \Input;
use \Redirect;

class ProfileController extends \BaseController
{
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
        $userProfile = \UserProfile::where('user_id', Auth::user()->id)->first();

        $userProfile->first_name = Input::get('first_name');
        $userProfile->last_name = Input::get('last_name');
        $userProfile->phone = Input::get('phone');

        $userProfile->save();

        return Response::json(['Success']);
    }

    public function postChangePassword()
    {
        /*$userProfile = \UserProfile::where('user_id', Auth::user()->id)->first();

        $userProfile->first_name = Input::get('first_name');
        $userProfile->last_name = Input::get('last_name');
        $userProfile->phone = Input::get('phone');

        $userProfile->save();*/

        return Response::json(Input::all());
    }
}