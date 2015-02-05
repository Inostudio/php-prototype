<?php namespace Front;
/**
 * Created by PhpStorm.
 * User: nikolay
 * Date: 2/2/15
 * Time: 2:32 PM
 */
use \Input;

class SearchController extends \BaseController {

    private $users = null;

    public function __construct(\UsersService $us)
    {
        $this->users = $us;
    }
    
    public function getIndex($lang)
    {
        $whereSearch = Input::get('search');
        $all = Input::all();
        return \View::make('front.pages.search',
            ['search' => Input::get('offer'), 'where' => $whereSearch]);
    }

    public function postUsers()
    {
        $findText = Input::get('offer');
        $offset = Input::get('offset');
        $limit = Input::get('limit');

        $users = $this->users->searchUsers($findText, $limit, $offset, 'desc', 'id');
        foreach($users[0] as $user){
            $user->photo = $user->getCroppedPhoto();
        }
        return \Response::json($users);
    }
}