/**
 * Created by Nikolay on 18.01.2015.
 */

(function() {
    'use strict';

    angular
        .module('profileApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/angular/?ns=front&id=profilePartials.profile',
                controller: 'ShowCtrl',
                controllerAs: 'vm'
            }).
            when('/edit_password', {
                templateUrl:  '/angular/?ns=front&id=profilePartials.edit_password',
                controller: 'EditCtrl',
                controllerAs: 'vm'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
})();