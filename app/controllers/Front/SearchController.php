<?php namespace Front;
/**
 * Created by PhpStorm.
 * User: nikolay
 * Date: 2/2/15
 * Time: 2:32 PM
 */
use \Input;

class SearchController extends \BaseController {

    public function getIndex()
    {
        return \View::make('front.pages.search',
            ['offer' => Input::get('offer')]);
    }
}