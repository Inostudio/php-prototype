<?php
/**
 * Created by PhpStorm.
 * User: nikolay
 * Date: 23.12.2014
 * Time: 14:38
 */

namespace Admin;

//use \Response;
use Illuminate\Support\Facades\Input;
use Symfony\Component\HttpFoundation\Response;


class UserController extends \BaseController
{
    /**
     *
     * @var \UsersService
     */
    protected $users = null;

    public function __construct(\UsersService $us)
    {
        $this->users = $us;
    }

    protected $rulesAddUser = [
        'email' => 'required|unique:users|email'
    ];

    //Получение пользователей +++
    public function postShow(){

        return \Response::json([$this->users->getPageOfUsers(Input::get('off'), Input::get('lim'), Input::get('direction'), Input::get('field')), $this->users->countUsers()]);
    }

    //Добавление пользователя +++
    public function postAdd(){
        $status = true;
        $message = '';
        $id = -1;

        $validator = \Validator::make(\Input::all(), $this->rulesAddUser);

        if($validator->fails()) {
            $status = false;
            $message = $validator->messages()->first();
        } else {
            $id = $this->users->registerUser(\Input::get("email"), \Input::get("password"))->id;
        }

        return \Response::json([$status, $message, $id]);
    }

    //Удаление пользователя +++
    public function postRemove(){
        $result = true;
        $this->users->removeUser(Input::get("userId"));

        return \Response::json([$result]);
    }

    //Редактирование пользователя +++
    public function postEditUser(){
        $result = true;
        $message = '';
        $validator = \Validator::make(\Input::all(), $this->rulesAddUser);

        if($validator->fails()) {
            $result = false;
            $message = $validator->messages()->first();
        } else {
            $this->users->editUser(Input::get("userId"), Input::get("email"));
        }

        return \Response::json([$result, $message]);
    }

    //Получение групп, в которых состоит пользователь +++
    public function postOptions(){

        return \Response::json([\User::with('profile')->find(Input::get('userId')), [$this->users->groupsToUser(Input::get('userId'))], [\Group::all()]]);
    }

    //Включение/исключение пользователя из группы +++
    public function postChangeGroupByUser(){
        $this->users->groupAccept(Input::get('groupId'), Input::get('userId'), Input::get("accept"));

        return \Response::json([true]);
    }

    //Поиск пользователей
    public function postSearch(){
        return \Response::json($this->users->searchUsers(Input::get('text'), Input::get('lim'), Input::get('off'), Input::get('direction'), Input::get('field')));
    }
} 