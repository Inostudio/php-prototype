<?php

namespace Admin;

//use \Response;

class DashboardController extends \BaseController
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
    
    public function postGroup()
    {
        $groups = \Group::all();
        return \Response::json($groups);
    }
    
    public function postRemoveGroup(){
        $result = true;
        \DB::table('groups')->where('id', '=', \Input::get("groupId"))->delete();
        \DB::table('group_permission')->where('group_id', '=', \Input::get("groupId"))->delete();
        
        return \Response::json([$result]);
    }
    
    public function postAddGroup(){
        $result = true;
        $id = -1;
        $message = "";
                
        $validator = \Validator::make(\Input::all(), $this->rulesAddGroup);

        if($validator->fails()) {
            $result = false;
            $message = $validator->messages()->first();
        } else {
            $id = \DB::table("groups")->insertGetId(array("title" => \Input::get("title"), "description" => (empty(\Input::get("groupDescription"))) ? NULL : \Input::get("groupDescription")));
        }
        
        return \Response::json(["res" => $result, "id" => $id, "message" => $message]);
    }
    
    public function postEditGroup(){
        $result = true;
        $message = '';
        $group = \DB::table('groups')->where('title', \Input::get('title'))
                ->where('id', '<>', (\Input::get("groupId")))
                ->first();
        
        if ($group != null){
            $message = "The title has already been taken.";
            $result = false;
        } else {
            if(trim(\Input::get("title")) != ""){
                \DB::table('groups')->where('id', (\Input::get("groupId")))
                ->update(array('title' => (\Input::get("title")), 'description' => (\Input::get("groupDescription"))));
            } else {
                $result = false;
                $message = 'The title field is required.'; 
            }
        }
 
        return \Response::json([$result, $message]);
    }
    
    public function postPermission()
    {
        $groups = \Permission::all();
        return \Response::json($groups);
    }
    
    public function postAddPermission(){
        $result = true;
        $id = -1;
        $message = "";
                
        $validator = \Validator::make(\Input::all(), $this->rulesAddPermission);

        if($validator->fails()) {
            $result = false;
            $message = $validator->messages()->first();
        } else {
            $id = \DB::table("permissions")->insertGetId(array("title" => \Input::get("title"), "description" => (empty(\Input::get("permissionDescription"))) ? NULL : \Input::get("permissionDescription")));
        }
        
        return \Response::json(["res" => $result, "id" => $id, "message" => $message]);
    }
    public function postRemovePermission(){
        $result = true;
        \DB::table('permissions')->where('id', '=', \Input::get("permissionId"))->delete();
        \DB::table('group_permission')->where('permission_id', '=', \Input::get("permissionId"))->delete(); //
        
        return \Response::json([$result]);
    }
    
    
    public function postEditPermission(){
        $result = true;
        $message = '';
        $permission = \DB::table('permissions')->where('title', \Input::get('title'))
                ->where('id', '<>', (\Input::get("permissionId")))
                ->first();
        
        if ($permission != null){
            $message = "The title has already been taken.";
            $result = false;
        } else {
            if(trim(\Input::get("title")) != ""){
                \DB::table('permissions')->where('id', (\Input::get("permissionId")))
                ->update(array('title' => (\Input::get("title")), 'description' => (\Input::get("permissionDescription"))));
            } else {
                $result = false;
                $message = 'The title field is required.'; 
            }
        }
 
        return \Response::json([$result, $message]);
    }
    
    public function postGroupOptions(){

        $group = \DB::table('groups')
                ->where('id', '=', \Input::get('groupId'))
                ->first();
        
        $permissionToGroup = \DB::table('groups')
                ->join('group_permission', 'groups.id', '=', 'group_permission.group_id')
                ->join('permissions', 'group_permission.permission_id', '=', 'permissions.id')
                ->where('group_id', '=', \Input::get('groupId'))
                ->select(//'permissions.description as permission_description',
                        'permissions.id as permission_id'//,
                        //'permissions.title as permission_title'
                        )
                ->get();
        
        $permissions = \DB::table('permissions')->get();
        
        return \Response::json([$group, [$permissionToGroup], [$permissions]]);
    }
    
    public function postChangePermissionsInGroup(){

        $res = true;
        if(\Input::get("accept")){
            \DB::table('group_permission')
                    ->where('group_id', '=', \Input::get('groupId'))
                    ->where('permission_id', '=', \Input::get('permId'))
                    ->delete();
        } else {
            \DB::table('group_permission')->insert(
                array('group_id' => \Input::get('groupId'), 'permission_id' => \Input::get('permId'))
            );
        }
        
        return \Response::json([$res]);
    }
    
    public function postUsers(){
        $users = \DB::table('users')
                    ->join('user_profile', 'users.id', '=', 'user_profile.user_id')
                    ->select('users.id as id',
                        'users.email as email',
                        'user_profile.first_name as firstName',
                        'user_profile.last_name as lastName',
                        'user_profile.phone as phone');
        $lenth = $users->count();
        $users = $users->skip(\Input::get('off'))->take(\Input::get('lim'))
                    ->get();
        
        return \Response::json([$users, $lenth]);
    }
    
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
    
    public function postRemoveUser(){
        $result = true;
        \DB::table('users')->where('id', '=', \Input::get("userId"))->delete();
        \DB::table('user_profile')->where('user_id', '=', \Input::get("userId"))->delete();
        \DB::table('group_user')->where('user_id', '=', \Input::get("userId"))->delete();
        
        return \Response::json([$result]);
    }
    
    public function postEditUser(){
        $result = true;
        $message = '';
        $validator = \Validator::make(\Input::all(), $this->rulesAddUser);

        if($validator->fails()) {
            $result = false;
            $message = $validator->messages()->first();
        } else {
            \DB::table('users')->where('id', (\Input::get("userId")))
                ->update(array('email' => (\Input::get("email"))));
        }
        
        return \Response::json([$result, $message]);
    }
    
    public function postUserOptions(){

        $user = \DB::table('users')
                ->join('user_profile', 'users.id', '=', 'user_profile.user_id')
                ->where('users.id', '=', \Input::get('userId'))
                ->select('users.id as id',
                        'users.email as email',
                        'user_profile.first_name as firstName',
                        'user_profile.last_name as lastName')
                ->first();
        
        $groupToUser = \DB::table('users')
                ->join('group_user', 'users.id', '=', 'group_user.user_id')
                ->join('groups', 'group_user.group_id', '=', 'groups.id')
                ->where('user_id', '=', \Input::get('userId'))
                ->select('groups.id as group_id')
                ->get();
      
        $groups = \DB::table('groups')->get();

        return \Response::json([$user, [$groupToUser], [$groups]]);
    }
    
    public function postChangeGroupByUser(){
        $res = true;
        
         if(\Input::get("accept")){
            \DB::table('group_user')
                    ->where('group_id', '=', \Input::get('groupId'))
                    ->where('user_id', '=', \Input::get('userId'))
                    ->delete();
        } else {
            \DB::table('group_user')->insert(
                array('group_id' => \Input::get('groupId'), 'user_id' => \Input::get('userId'))
            );
        }

        return \Response::json([$res]);
    }
}