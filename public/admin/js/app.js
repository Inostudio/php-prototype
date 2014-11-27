'use strict';

var adminApp = angular.module('adminApp', [
    'ngRoute',
    'adminControllers',
    'groupServices',
    'ngAnimate',
    'mgcrea.ngStrap',
    'mgcrea.ngStrap.alert'
    //
]);

/*
adminApp.config(function($modalProvider) {
  angular.extend($modalProvider.defaults, {
    animation: 'am-flip-x'
  });
});*/

adminApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl:  '/angular/?id=adminPartials.dashboard', 
        controller: 'AdminCtrl'
      }).
      when('/users', {
        templateUrl:  '/angular/?id=adminPartials.users',
        controller: 'AdminCtrl'
      }).
      when('/pages', {
        templateUrl:  '/angular/?id=adminPartials.pages',
        controller: 'AdminCtrl'
      }).
      when('/products', {
        templateUrl:  '/angular/?id=adminPartials.products',
        controller: 'AdminCtrl'
      }).
      when('/settings', {
        templateUrl:  '/angular/?id=adminPartials.settings',
        controller: 'AdminCtrl'
      }).
      when('/groups', {
        templateUrl:  '/angular/?id=adminPartials.groups',
        controller: 'GroupCtrl'
      }).
      when('/groups/:groupId', {
        templateUrl:  '/angular/?id=adminPartials.groups',
        controller: 'GroupRemoveCtrl'
      });
  }]);
  
  adminApp.controller('activCtrl', ['$scope', '$location',
  function($scope, $location) {
      $scope.isActive = function(path){
        return path === $location.path();  
      };
  }]);