/**
 * Created by user on 21.11.2014.
 */

var profileApp = angular.module('profileApp', [
    'ngRoute',
    'profileControllers',
    'profileServices'
]);

profileApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/angular/?id=profilePartials.profile',
            controller: 'ShowCtrl'
        }).
        when('/edit', {
            templateUrl: '/angular/?id=profilePartials.profile',
            controller: 'ShowCtrl'
        }).
        when('/edit_password', {
            templateUrl: '/angular/?id=profilePartials.edit_password',
            controller: 'EditCtrl'
        }).
        when('/photo', {
            templateUrl: '/angular/?id=profilePartials.photo',
            controller: 'PhotoCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);