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
}