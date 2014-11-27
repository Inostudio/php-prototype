/**
 * Created by user on 21.11.2014.
 */

var profileApp = angular.module('profileApp', [
    'ngImgCrop',
    'ngRoute',
    'profileControllers',
    'profileServices',
    'ui.bootstrap'
]);

profileApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/angular/?ns=front&id=profilePartials.profile',
            controller: 'ShowCtrl'
        }).
        when('/edit_password', {
            templateUrl: '/angular/?ns=front&id=profilePartials.edit_password',
            controller: 'EditCtrl'
        }).
        when('/photo', {
            templateUrl: '/angular/?ns=front&id=profilePartials.photo',
            controller: 'PhotoCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);