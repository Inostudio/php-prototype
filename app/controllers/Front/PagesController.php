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

    public function index()
    {
        return \View::make('front.pages.contact');
    }

    public function showPage($url)
    {
        if($url === null) {
            //Redirect 404 page not found
        }

        $page = \Page::where('url', $url)->first();
        if($page === null) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
            //return Redirect::to('404');
        }

        return \View::make('front.pages.static', [
            'page' => $page
        ]);
    }
}