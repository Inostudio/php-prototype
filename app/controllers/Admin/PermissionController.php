<?php
/**
 * Created by PhpStorm.
 * User: nikolay
 * Date: 25.12.2014
 * Time: 12:49
 */

namespace Admin;

use Illuminate\Support\Facades\Input;

class PermissionController extends \BaseController
{
    /**
     *
     * @var \PermissionsService
     */
    protected $permissions = null;


    public function __construct(\PermissionsService $ps)
    {
        $this->permissions = $ps;
    }

    protected $rulesAddPermission = [
        'title' => 'required|unique:permissions'
    ];

    //Получение списка прав +++
    public function postShow()
    {
        $permissions = \Permission::all();
        return \Response::json($permissions);
    }

    //Добавление права +++
    public function postAdd(){
        $result = true;
        $id = -1;
        $message = "";

        $validator = \Validator::make(\Input::all(), $this->rulesAddPermission);

        if($validator->fails()) {
            $result = false;
            $message = $validator->messages()->first();
        } else {
            $id = $this->permissions->addPermission(Input::get("title"), (empty(\Input::get("permissionDescription"))) ? NULL : \Input::get("permissionDescription"));
        }

        return \Response::json(["res" => $result, "id" => $id, "message" => $message]);
    }

    //Удаление права +++
    public function postRemove(){

        $this->permissions->removePermission(Input::get("permissionId"));
        return \Response::json([true]);
    }

    //Редактирование права +++
    public function postEdit(){
        $result = true;
        $message = '';
        $permission = \Permission::where('title', '=', Input::get('title'))
            ->where('id', '<>', Input::get("permissionId"))->first();

        if ($permission != null){
            $message = "The title has already been taken.";
            $result = false;
        } else {
            if(trim(\Input::get("title")) != ""){
                $this->permissions->editPermission(Input::get("permissionId"), Input::get("title"), Input::get("permissionDescription"));
            } else {
                $result = false;
                $message = 'The title field is required.';
            }
        }

        return \Response::json([$result, $message]);
    }

    //Получение прав группы +++
    public function postGroupOptions(){

        $group = \Group::where('id', '=', Input::get('groupId'))->first();

        return \Response::json([$group, [$this->permissions->permissionToGroup(Input::get('groupId'))], [\Permission::all()]]);
    }

    //Изменение прав группы +++
    public function postChangePermissionsInGroup(){
        $this->permissions->permissionAccept(Input::get('groupId'), Input::get('permId'), Input::get("accept"));

        return \Response::json([true]);
    }
} 