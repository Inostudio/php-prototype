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

