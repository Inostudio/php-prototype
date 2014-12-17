<?php

class PermissionsService
{
    protected $ps = null;


    public function __construct() {        
    }
    
    public function addPermission($title, $desription){
        $permission = new Permission;
        
        $permission->title = $title;
        $permission->description = $desription;
        $permission->save();
        
        return $permission->id;
    }
    
    public function removePermission($id){
        Permission::destroy($id);
    }
    
    public function editPermission($id, $title, $description){
        $permission  = Permission::where('id', '=', $id)->first();
        $permission->title = $title;
        $permission->description = $description;
        $permission->save();
    }
    
    public function permissionToGroup($groupId){
        
      return Group::where('id', '=', $groupId)->with('permissions')->get();  
    }
    
    public function permissionAccept($groupId, $permId, $accept){
        if($accept){
            PermissionToGroups::destroy(PermissionToGroups::where('permission_id', '=', $permId)->where('group_id', '=', $groupId)->first()->id);
            
        }else {
            $permToGroup = new PermissionToGroups();
            $permToGroup->permission_id = $permId;
            $permToGroup->group_id = $groupId;
            $permToGroup->save();
        }
    }
}