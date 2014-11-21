<?php

namespace Admin;

//use \Response;z

class DashboardController extends \BaseController
{
    protected $rulesAddGroup = [
        'title' => 'required|unique:groups'
    ];
    
    public function getIndex()
    {
        
        return \View::make('admin.dashboard');
        
    }
    
    public function postGroups()
    {
        $groups = \Group::all();
        return \Response::json($groups);
    }
    
    public function postRemoveGroups(){
        $result = true;
        \DB::table('groups')->where('id', '=', \Input::get("groupId"))->delete();
        
        return \Response::json([$result]);
    }
    
    public function postAddGroup(){
        $result = true;
        $id = -1;

        $validator = \Validator::make(\Input::all(), $this->rulesAddGroup);
        if($validator->fails()) {
            $result = false;
        } else {
            $id = \DB::table("groups")->insertGetId(array("title" => \Input::get("title"), "description" => (empty(\Input::get("groupDescription"))) ? NULL : \Input::get("groupDescription")));
        }
        
        return \Response::json(["res" => $result, "id" => $id]);
    }
    
}