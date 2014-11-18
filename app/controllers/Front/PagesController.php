<?php

namespace Front;

use \Auth;
use \View;
use \Input;
use \Validator;
use \Redirect;

class PagesController extends \BaseController
{
    
    public function home()
    {
        return \View::make('front.home');
    }
    
    public function about()
    {
        return \View::make('front.pages.about', [
            'faker' => \Faker\Factory::create('ru_RU')
        ]);        
    }
    
    
    public function contact()
    {
        return \View::make('front.pages.contact');
    }
    
    
}