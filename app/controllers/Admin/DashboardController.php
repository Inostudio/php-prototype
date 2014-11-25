<?php

namespace Admin;

//use \Response;

class DashboardController extends \BaseController
{
    public static function rules ($id=0, $merge=[]) {
    return array_merge(
        [
            'title' => 'required|unique:groups' . ($id ? ",id,$id" : '')
        ], 
        $merge);
    }
    
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
    
    public function postEditGroups(){
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
 
        return \Response::json([$result, $message, $groups = \Group::all()]);
    }
}