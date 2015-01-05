<?php


/**
 * Class GroupsService
 */
class GroupsService
{

    /**
     * @var null
     */
    protected $gs = null;


    /**
     *
     */
    public function __construct() {
    }

    /**
     * @param $id
     */
    public function removeGroup($id){
        Group::destroy($id);
    }

    /**
     * @param $title
     * @param $description
     * @return mixed
     */
    public function addGroup($title, $description){
        $group = new Group;
        $group->title = $title;
        $group->description = $description;
        $group->save();
        
        return $group->id;
    }

    /**
     * @param $title
     * @param $description
     * @param $id
     */
    public function editGroup($title, $description, $id){
        $group = Group::where('id', '=', $id)->first();
        $group->title = $title;
        $group->description = $description;
        $group->save();
    }
    
}