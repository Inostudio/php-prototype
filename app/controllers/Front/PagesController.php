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
        $page = \Page::where('url', $url)->first();
        if($page === null || $page->status->title !== 'Public') {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
        }

        return \View::make('front.pages.static', [
            'page' => $page
        ]);
    }
}