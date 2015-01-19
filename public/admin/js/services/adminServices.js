'use strict';

/* Services */

var groupServices = angular.module('groupServices', ['ngResource']);

groupServices.factory('Group', ['$resource',
  function($resource){
    return $resource('/' + lang +  '/adm/group/show', {}, {
      queryInfo: {method:'POST', params:{}, isArray:true}
    });
}]);

groupServices.factory('AddGroup', ['$resource',
  function($resource, $title, $groupDescription){
    return $resource('/' + lang +  '/adm/group/add', {}, {
        query: {method:'POST', params:{gN:$title, gD: $groupDescription}, isArray:false}
    });
}]);

groupServices.factory('RemoveGroup', ['$resource',
  function($resource, $groupId){
    return $resource('/' + lang +  '/adm/group/remove', {}, {
      query: {method:'POST', params:{id: $groupId}, isArray:true}
    });
}]);

groupServices.factory('EditGroup', ['$resource',
  function($resource, $groupId, $title, $groupDescription){
    return $resource('/' + lang +  '/adm/group/edit', {}, {
      query: {method:'POST', params:{id: $groupId, gN:$title, gD: $groupDescription}, isArray:true}
    });
}]);


var permissionServices = angular.module('permissionServices', ['ngResource']);

permissionServices.factory('Permission', ['$resource',
  function($resource){
    return $resource('/' + lang +  '/adm/permission/show', {}, {
      queryInfo: {method:'POST', params:{}, isArray:true}
    });
}]);

permissionServices.factory('AddPermission', ['$resource',
  function($resource, $title, $permissionDescription){
    return $resource('/' + lang +  '/adm/permission/add', {}, {
        query: {method:'POST', params:{gN:$title, gD: $permissionDescription}, isArray:false}
    });
}]);

permissionServices.factory('RemovePermission', ['$resource',
  function($resource, $permissionId){
    return $resource('/' + lang +  '/adm/permission/remove', {}, {
      query: {method:'POST', params:{id: $permissionId}, isArray:true}
    });
}]);

permissionServices.factory('EditPermission', ['$resource',
  function($resource, $permissionId, $title, $permissionDescription){
    return $resource('/' + lang +  '/adm/permission/edit', {}, {
      query: {method:'POST', params:{id: $permissionId, gN:$title, gD: $permissionDescription}, isArray:true}
    });
}]);

groupServices.factory('GroupOptions', ['$resource',
  function($resource, $groupId){
    return $resource('/' + lang +  '/adm/permission/group-options', {}, {
      query: {method:'POST', params:{gId: $groupId}, isArray:true}
    });
}]);

groupServices.factory('ChangePermissionsInGroup', ['$resource',
  function($resource, $groupId, $accept, $permId){
    return $resource('/' + lang +  '/adm/permission/change-permissions-in-group', {}, {
      query: {method:'POST', params:{gId: $groupId, accept: $accept, permId: $permId}, isArray:true}
    });
}]);


var userServices = angular.module('userServices', ['ngResource']);
userServices.factory('User', ['$resource',
  function($resource, $lim, $off, $direction, $field){
    return $resource('/' + lang +  '/adm/user/show', {}, {
      queryInfo: {method:'POST', params:{lim: $lim, off: $off, direction: $direction, field: $field}, isArray:true}
    });
}]);

userServices.factory('AddUser', ['$resource',
  function($resource, $email, $password){
    return $resource('/' + lang +  '/adm/user/add', {}, {
      query: {method:'POST', params:{email: $email, password: $password}, isArray:true}
    });
}]);

userServices.factory('RemoveUser', ['$resource',
  function($resource, $userId){
    return $resource('/' + lang +  '/adm/user/remove', {}, {
      query: {method:'POST', params:{id: $userId}, isArray:true}
    });
}]);

userServices.factory('EditUser', ['$resource',
  function($resource, $email, $userId){
    return $resource('/' + lang +  '/adm/user/edit', {}, {
      query: {method:'POST', params:{email: $email, userId: $userId}, isArray:true}
    });
}]);

userServices.factory('UserOptions', ['$resource',
  function($resource, $userId){
    return $resource('/' + lang +  '/adm/user/options', {}, {
      query: {method:'POST', params:{uId: $userId}, isArray:true}
    });
}]);

userServices.factory('ChangeGroupByUser', ['$resource',
  function($resource, $userId, $accept, $groupId){
    return $resource('/' + lang +  '/adm/user/change-group-by-user', {}, {
      query: {method:'POST', params:{uId: $userId, accept: $accept, gId: $groupId}, isArray:true}
    });
}]);

userServices.factory('SearchUsers', ['$resource',
    function($resource, $text, $lim, $off, $direction, $field){
        return $resource('/' + lang +  '/adm/user/search', {}, {
            query: {method:'POST', params:{sText: $text, lim: $lim, off: $off, direction: $direction, field: $field}, isArray:true}
        });
    }]);

var pagesServices = angular.module('pagesServices', ['ngResource']);

pagesServices.factory('Pages', ['$resource', function($resource) {
    return $resource('/' + lang +  '/adm/page/show', {}, {
        query: {method:'POST', params:{}, isArray:true}
    });
}]);

pagesServices.factory('AddPage', ['$resource', function($resource, $title, $body, $status, $url) {
    return $resource('/' + lang +  '/adm/page/add', {}, {
        query: {method:'POST', params:{
            title: $title,
            body: $body,
            status_id: $status,
            url: $url
        }, isArray:true}
    });
}]);

pagesServices.factory('Status', ['$resource', function($resource) {
    return $resource('/' + lang +  '/adm/page/all-statuses', {}, {
        query: {method:'POST', params:{}, isArray:true}
    });
}]);

pagesServices.factory('GetPage', ['$resource', function($resource, $id) {
    return $resource('/' + lang +  '/adm/page/get', {}, {
        query: {method:'POST', params:{
            id: $id
        }, isArray:false}
    });
}]);

pagesServices.factory('DeletePage', ['$resource', function($resource, $id) {
    return $resource('/' + lang +  '/adm/page/delete', {}, {
        query: {method:'POST', params:{
            id: $id
        }, isArray:true}
    });
}]);

pagesServices.factory('SavePage', ['$resource', function($resource, $id, $title, $body, $status, $url) {
    return $resource('/' + lang +  '/adm/page/save', {}, {
        query: {method:'POST', params:{
            id: $id,
            title: $title,
            body: $body,
            status_id: $status,
            url: $url
        }, isArray:true}
    });
}]);



var resourceServices = angular.module('resourceServices', ['ngResource']);

resourceServices.factory('AddResource', ['$resource', function($resource, $title, $file){
    return $resource('/' + lang +  '/adm/resource/add', {}, {
        query: {method:'POST', params:{
            title: $title,
            file: $file
        }, isArray:true}
    });
}]);

resourceServices.service('AllResource', ['$resource', function($resource){
    return $resource('/' + lang +  '/adm/resource/show', {}, {
        query: {method:'POST', params:{}, isArray:true}
    });
}]);


resourceServices.service('DeleteResource', ['$resource', function($resource, $id){
    return $resource('/' + lang +  '/adm/resource/delete', {}, {
        query: {method:'POST', params:{
            id: $id
        }, isArray:true}
    });
}]);

var langServices = angular.module('langServices', ['ngResource']);

langServices.service('CheckLang', ['$resource', function($resource, $language){
    return $resource('/' + lang +  '/checklang', {}, {
        query: {method:'POST', params:{language: $language}, isArray:false}
    });
}]);