'use strict';

var adminApp = angular.module('adminApp', [
    'ngRoute',
    'adminControllers',
    'groupServices'
    //
]);

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
  
  
  /*
adminApp.controller('MainCtrl', ['$scope', function ($scope) {
$scope.gridOptions = {
        enableSorting: true,
        columnDefs: [
          { name:'firstName', field: 'first-name' },
          { name:'1stFriend', field: 'friends[0]' },
          { name:'city', field: 'address.city'},
          { name:'getZip', field: 'getZip()', enableCellEdit:false}
        ],
        data : [      {
                           "first-name": "Cox",
                           "friends": ["friend0"],
                           "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
                           "getZip" : function() {return this.address.zip;}
                       }
                   ]
      };
 
}]);*/