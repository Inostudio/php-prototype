/**
 * Created by Nikolay on 18.01.2015.
 */

(function() {
    'use strict';

    angular
        .module('signApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/angular/?ns=front&id=authPartials.signin',
                controller: 'SignInCtrl',
                controllerAs: 'vm'
            }).
            when('/remind_password', {
                templateUrl: '/angular/?ns=front&id=authPartials.remind',
                controller: 'RemindCtrl',
                controllerAs: 'vm'
            }).
            when('/reset_password', {
                templateUrl: '/angular/?ns=front&id=authPartials.reset',
                controller: 'ResetCtrl',
                controllerAs: 'vm'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
})();