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
        return \View::make('front.pages.contact', ['lang' => \App::getLocale()]);
    }

    protected static $contact = [
        'name' => 'required',
        'email' => 'required|email',
        'message' => 'required|min:30',
    ];

    public function postSendContact()
    {
        $response = [true, 'Email success send!'];
        $data = Input::only('name', 'email', 'message');

        $v = \Validator::make($data, self::$contact);

        if($v->fails()) {
            $response = [false, $v->messages()];
        } else {
            $config = \Config::get('prototype.contact');
            try {
                \Mail::send($config['view'] , ['user' => $data], function($message) use ($config) {
                    $message->to($config['email'], $config['whom'])->subject($config['subject']);
                });
            } catch(\Exception $ex) {
                $response = [false, $ex->getMessage()];
            }
        }

        return $response;
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
        if($page !== null) {
            if($page->status->title !== 'Public'
                && !(Auth::check() && Auth::user()->IsAdmin()))
                throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
        } else {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
        }

        return \View::make('front.pages.static', [
            'page' => $page
        ]);
    }
}