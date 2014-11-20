<?php

namespace Front;

use \Auth;
use \View;
use \Input;
use \Validator;
use \Redirect;

class ProfileController extends \BaseController
{
    
    public function getShow()
    {
        return \View::make('front.pages.profile');
    }
    
}