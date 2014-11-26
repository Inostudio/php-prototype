'use strict';

var adminApp = angular.module('adminApp', [
    'ngRoute',
    'adminControllers',

    'groupServices',
    'ngAnimate',
    'mgcrea.ngStrap',
    'mgcrea.ngStrap.alert',
    'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav'
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
      when('/groups/:groupId', {
        templateUrl:  '/angular/?ns=admin&id=adminPartials.groups',
        controller: 'GroupRemoveCtrl'
      })
     .when('/entities', {
        templateUrl: '/angular/?ns=admin&id=adminPartials.entities',
        controller: 'EntityCtrl'
      });
  }]);
  
  adminApp.controller('activCtrl', ['$scope',
  function($scope) {
    //$scope.active = "active";
    $scope.cl = ["active", "", "", "", "", ""];
    
    $scope.active = function(act){
        $scope.cl[0] = "";
        $scope.cl[1] = "";
        $scope.cl[2] = "";
        $scope.cl[3] = "";
        $scope.cl[4] = "";
        $scope.cl[5] = "";
        
        $scope.cl[act] = "active";
    };
  }]);

