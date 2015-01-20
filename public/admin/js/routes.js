(function(){
    'use strict';
    
    angular
            .module('adminApp')
            .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.dashboard',
            controller: 'AdminCtrl',
            controllerAs: 'vm'
          }).
          when('/users', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.users',
            controller: 'UsersCtrl',
            controllerAs: 'vm'
          }).
          when('/pages', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.pages',
            controller: 'PagesCtrl',
            controllerAs: 'vm'
          }).
          when('/products', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.products',
            controller: 'AdminCtrl',
            controllerAs: 'vm'
          }).
          when('/settings', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.settings',
            controller: 'AdminCtrl',
            controllerAs: 'vm'
          }).
          when('/groups', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.groups',
            controller: 'GroupCtrl',
            controllerAs: 'vm'
          }).
          when('/permissions', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.permissions',
            controller: 'PermissionCtrl',
            controllerAs: 'vm'
          })
         .when('/entities', {
            templateUrl: '/' + lang + '/angular/?ns=admin&id=adminPartials.entities',
            controller: 'EntityCtrl',
            controllerAs: 'vm'
          }).
          when('/groups/:groupId', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.groupOptions',
            controller: 'GroupOptionsCtrl',
            controllerAs: 'vm'
          }).
          when('/users/:userId', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.userOptions',
            controller: 'UserOptionsCtrl',
            controllerAs: 'vm'
          }).
          when('/resources', {
              templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.resources',
              controller: 'ResourcesCtrl',
              controllerAs: 'vm'
          });
      }]);
})();