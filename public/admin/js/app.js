'use strict';

var adminApp = angular.module('adminApp', [
    'ngRoute',
    'adminControllers',
    'pagesControllers',
    'groupServices',
    'permissionServices',
    'userServices',
    'pagesServices',
    'resourceServices',
    'langServices',
    'ngAnimate',
    'ngSanitize',
    'ngImgCrop'
]);

adminApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.dashboard',
        controller: 'AdminCtrl'
      }).
      when('/users', {
        templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.users',
        controller: 'UsersCtrl'
      }).
      when('/pages', {
        templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.pages',
        controller: 'PagesCtrl'
      }).
      when('/products', {
        templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.products',
        controller: 'AdminCtrl'
      }).
      when('/settings', {
        templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.settings',
        controller: 'AdminCtrl'
      }).
      when('/groups', {
        templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.groups',
        controller: 'GroupCtrl'
      }).
      when('/permissions', {
        templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.permissions',
        controller: 'PermissionCtrl'
      })
     .when('/entities', {
        templateUrl: '/' + lang + '/angular/?ns=admin&id=adminPartials.entities',
        controller: 'EntityCtrl'
      }).
      when('/groups/:groupId', {
        templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.groupOptions',
        controller: 'GroupOptionsCtrl'
      }).
      when('/users/:userId', {
        templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.userOptions',
        controller: 'UserOptionsCtrl'
      }).
      when('/resources', {
          templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.resources',
          controller: 'ResourcesCtrl'
      });
  }]);

  adminApp.controller('activCtrl', ['$scope', '$location', 'CheckLang',
  function($scope, $location, CheckLang) {
      $scope.isActive = function(path){  
            return ((path === $location.path()) || (($location.path().indexOf('/groups/') === 0) && (path === '/groupsPermis'))
                    || (($location.path().indexOf('/users/') === 0) && (path === '/userGroups')));  
      };
      
      $scope.checkLang = function(lang){
        CheckLang.query({language: lang}, function(answer){
            var oldLang =  window.location.pathname.substr(1, 2);
            //console.log(document.location.href);
            window.location.href = document.location.href.replace('/' + oldLang +'/', '/' + lang +'/');
        });
            
      };
  }]);