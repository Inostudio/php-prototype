'use strict';

var adminApp = angular.module('adminApp', [
    'ngRoute',
    'adminControllers',
    'groupServices',
    'permissionServices',
    'ngAnimate',
    'mgcrea.ngStrap',
    'mgcrea.ngStrap.alert'

]);

adminApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl:  '/angular/?ns=admin&id=adminPartials.dashboard',
        controller: 'AdminCtrl'
      }).
      when('/users', {
        templateUrl:  '/angular/?ns=admin&id=adminPartials.users',
        controller: 'AdminCtrl'
      }).
      when('/pages', {
        templateUrl:  '/angular/?ns=admin&id=adminPartials.pages',
        controller: 'AdminCtrl'
      }).
      when('/products', {
        templateUrl:  '/angular/?ns=admin&id=adminPartials.products',
        controller: 'AdminCtrl'
      }).
      when('/settings', {
        templateUrl:  '/angular/?ns=admin&id=adminPartials.settings',
        controller: 'AdminCtrl'
      }).
      when('/groups', {
        templateUrl:  '/angular/?ns=admin&id=adminPartials.groups',
        controller: 'GroupCtrl'
      }).
      when('/permissions', {
        templateUrl:  '/angular/?ns=admin&id=adminPartials.permissions',
        controller: 'PermissionCtrl'
      })
     .when('/entities', {
        templateUrl: '/angular/?ns=admin&id=adminPartials.entities',
        controller: 'EntityCtrl'
      }).
      when('/groups/:groupId', {
        templateUrl:  '/angular/?ns=admin&id=adminPartials.groupOptions',
        controller: 'GroupOptionsCtrl'
      });
  }]);

  adminApp.controller('activCtrl', ['$scope', '$location',
  function($scope, $location) {
      $scope.isActive = function(path){  
            return ((path === $location.path()) || (($location.path().indexOf('/groups/') === 0) && (path === '/groupsPermis')));  
      };
  }]);