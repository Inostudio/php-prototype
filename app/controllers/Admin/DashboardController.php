<?php

namespace Admin;

//use \Response;
use Illuminate\Support\Facades\Input;

class DashboardController extends \BaseController
{
    /**
     *
     * @var \UsersService
     */
    protected $users = null;
    protected $groups = null;
    protected $permissions = null;
    
    public function __construct(\UsersService $us, \GroupsService $gs, \PermissionsService $ps) 
    {
        $this->groups = $gs;
        $this->users = $us;
        $this->permissions = $ps;
    }
    
    
    
    protected $rulesAddGroup = [
        'title' => 'required|unique:groups'
    ];
    protected $rulesAddPermission = [
        'title' => 'required|unique:permissions'
    ];
    protected $rulesAddUser = [
        'email' => 'required|unique:users|email'
    ];
    
    public function getIndex()
    {
        
        return \View::make('admin.dashboard');  
    }
    
    // Получение групп +++
    public function postGroup()
    {
        $groups = \Group::all();
        return \Response::json($groups);
    }
    
    // Удаление группы +++
    public function postRemoveGroup(){      
        $this->groups->removeGroup(Input::get("groupId"));
        
        return \Response::json([true]);
    }
    
    //Добавление группы +++
    public function postAddGroup(){
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
    public function postEditGroup(){
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
    
    //Получение списка прав +++
    public function postPermission()
    {
        $permissions = \Permission::all();
        return \Response::json($permissions);
    }
    
    //Добавление права +++
    public function postAddPermission(){
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
    public function postRemovePermission(){
        
        $this->permissions->removePermission(Input::get("permissionId"));
        return \Response::json([true]);
    }
    
    //Редактирование права +++
    public function postEditPermission(){
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
    
    //Получение пользователей +++
    public function postUsers(){
        
        return \Response::json([$this->users->getPageOfUsers(Input::get('off'), Input::get('lim'), Input::get('direction'), Input::get('field')), $this->users->countUsers()]);
    }
    
    //Добавление пользователя +++
    public function postAddUser(){
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
    public function postRemoveUser(){
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
    public function postUserOptions(){
        
        return \Response::json([\User::with('profile')->find(Input::get('userId')), [$this->users->groupsToUser(Input::get('userId'))], [\Group::all()]]);
    }
    
    //Включение/исключение пользователя из группы +++
    public function postChangeGroupByUser(){
        $this->users->groupAccept(Input::get('groupId'), Input::get('userId'), Input::get("accept"));
         
        return \Response::json([true]);
    }
    
    //Поиск пользователей
    public function postSearchUsers(){
        return \Response::json($this->users->searchUsers(Input::get('text'), Input::get('lim'), Input::get('off'), Input::get('direction'), Input::get('field')));
    }    
}