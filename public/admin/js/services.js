'use strict';

/* Services */

var groupServices = angular.module('groupServices', ['ngResource']);

groupServices.factory('Group', ['$resource',
  function($resource){
    return $resource('/adm/groupInfo', {}, {
      queryInfo: {method:'POST', params:{}, isArray:true}
    });
}]);

groupServices.factory('AddGroup', ['$resource',
  function($resource, $title, $groupDescription){
    return $resource('/adm/addGroup', {}, {
        query: {method:'POST', params:{gN:$title, gD: $groupDescription}, isArray:false}
    });
}]);

groupServices.factory('RemoveGroup', ['$resource',
  function($resource, $groupId){
    return $resource('/adm/removeGroup', {}, {
      query: {method:'POST', params:{id: $groupId}, isArray:true}
    });
}]);

groupServices.factory('EditGroup', ['$resource',
  function($resource, $groupId, $title, $groupDescription){
    return $resource('/adm/editGroup', {}, {
      query: {method:'POST', params:{id: $groupId, gN:$title, gD: $groupDescription}, isArray:true}
    });
}]);


var permissionServices = angular.module('permissionServices', ['ngResource']);

permissionServices.factory('Permission', ['$resource',
  function($resource){
    return $resource('/adm/permissionInfo', {}, {
      queryInfo: {method:'POST', params:{}, isArray:true}
    });
}]);

permissionServices.factory('AddPermission', ['$resource',
  function($resource, $title, $permissionDescription){
    return $resource('/adm/addPermission', {}, {
        query: {method:'POST', params:{gN:$title, gD: $permissionDescription}, isArray:false}
    });
}]);

permissionServices.factory('RemovePermission', ['$resource',
  function($resource, $permissionId){
    return $resource('/adm/removePermission', {}, {
      query: {method:'POST', params:{id: $permissionId}, isArray:true}
    });
}]);

permissionServices.factory('EditPermission', ['$resource',
  function($resource, $permissionId, $title, $permissionDescription){
    return $resource('/adm/editPermission', {}, {
      query: {method:'POST', params:{id: $permissionId, gN:$title, gD: $permissionDescription}, isArray:true}
    });
}]);

groupServices.factory('GroupOptions', ['$resource',
  function($resource, $groupId){
    return $resource('/adm/groupOptions', {}, {
      query: {method:'POST', params:{gId: $groupId}, isArray:true}
    });
}]);

groupServices.factory('ChangePermissionsInGroup', ['$resource',
  function($resource, $groupId, $accept, $permId){
    return $resource('/adm/changePermissionsInGroup', {}, {
      query: {method:'POST', params:{gId: $groupId, accept: $accept, permId: $permId}, isArray:true}
    });
}]);

var pagesServices = angular.module('pagesServices', ['ngResource']);

pagesServices.factory('Pages', ['$resource', function($resource) {
    return $resource('/adm/allPages', {}, {
        query: {method:'GET', params:{}, isArray:true}
    });
}]);

pagesServices.factory('AddPage', ['$resource', function($resource, $title, $body, $status, $url) {
    return $resource('/adm/addPage', {}, {
        query: {method:'POST', params:{
            title: $title,
            body: $body,
            status_id: $status,
            url: $url
        }, isArray:true}
    });
}]);

pagesServices.factory('Status', ['$resource', function($resource) {
    return $resource('/adm/allStatuses', {}, {
        query: {method:'GET', params:{}, isArray:true}
    });
}]);