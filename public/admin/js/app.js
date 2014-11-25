'use strict';

var adminApp = angular.module('adminApp', [
    'ngRoute',
    'adminControllers',
    'ui.grid'
]);

adminApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/angular/?id=adminPartials.dashboard',
                controller: 'AdminCtrl'
            }).
            when('/users', {
                templateUrl: '/angular/?id=adminPartials.users',
                controller: 'AdminCtrl'
            }).
            when('/pages', {
                templateUrl: '/angular/?id=adminPartials.pages',
                controller: 'AdminCtrl'
            }).
            when('/products', {
                templateUrl: '/angular/?id=adminPartials.products',
                controller: 'AdminCtrl'
            }).
            when('/settings', {
                templateUrl: '/angular/?id=adminPartials.settings',
                controller: 'AdminCtrl'
            })
            .when('/entities', {
                templateUrl: '/angular/?id=adminPartials.entities',
                controller: 'EntityCtrl'
            })
            ;
    }]);

adminApp.controller('activCtrl', ['$scope',
    function ($scope) {
        //$scope.active = "active";
        $scope.cl = ["active", "", "", "", ""];

        $scope.active = function (act) {
            $scope.cl[0] = "";
            $scope.cl[1] = "";
            $scope.cl[2] = "";
            $scope.cl[3] = "";
            $scope.cl[4] = "";
            $scope.cl[5] = "";

            $scope.cl[act] = "active";
        };
    }]);