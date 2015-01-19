<?php

namespace Front;

use \Auth;
use \View;
use \Input;
use \Validator;
use \Redirect;

/**
 * Class PagesController
 * @package Front
 */
class PagesController extends \BaseController
{

    /**
     * @return mixed
     */
    public function home()
    {
        return \View::make('front.home');
    }

    /**
     * @return mixed
     */
    public function about()
    {
        return \View::make('front.pages.about', [
            'faker' => \Faker\Factory::create('ru_RU')
        ]);
    }


    /**
     * @return mixed
     */
    public function contact()
    {
        return \View::make('front.pages.contact');
    }

    /**
     * @return mixed
     */
    public function index()
    {
        return \View::make('front.pages.contact');
    }

    /**
     * @param $url
     * @return mixed
     */
    public function showPage($lang, $url)
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