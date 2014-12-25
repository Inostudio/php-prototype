<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 23.12.2014
 * Time: 15:04
 */

namespace Admin;

use Illuminate\Support\Facades\Input;
use Symfony\Component\HttpFoundation\Response;

class GroupController extends \BaseController {
    /**
     *
     * @var \GroupsService
     */

    protected $groups = null;

    public function __construct( \GroupsService $gs) {
        $this->groups = $gs;
    }

    protected $rulesAddGroup = [
        'title' => 'required|unique:groups'
    ];

    // Получение групп +++
    public function postShow() {
        $groups = \Group::all();
        return \Response::json($groups);
    }

    // Удаление группы +++
    public function postRemove(){
        $this->groups->removeGroup(Input::get("groupId"));

        return \Response::json([true]);
    }

    //Добавление группы +++
    public function postAdd(){
        $result = true;
        $id = -1;
        $message = "";

        $validator = \Validator::make(\Input::all(), $this->rulesAddGroup);

        if($validator->fails()) {
            $result = false;
            $message = $validator->messages()->first();
        } else {
            $id = $this->groups->addGroup(Input::get("title"), Input::get("groupDescription"));
        }

        return \Response::json(["res" => $result, "id" => $id, "message" => $message]);
    }

    //Редактирование группы +++
    public function postEdit(){
        $result = true;
        $message = '';
        $group = \Group::where('title', '=', Input::get('title'))
            ->where('id', '<>', Input::get("groupId"))
            ->first();

        if ($group != null){
            $message = "The title has already been taken.";
            $result = false;
        } else {
            if(trim(\Input::get("title")) != ""){
                $this->groups->editGroup(Input::get("title"), Input::get("groupDescription"), Input::get("groupId"));
            } else {
                $result = false;
                $message = 'The title field is required.';
            }
        }

        return \Response::json([$result, $message]);
    }

} 