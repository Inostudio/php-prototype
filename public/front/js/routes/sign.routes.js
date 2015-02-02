/**
 * Created by Nikolay on 18.01.2015.
 */

(function() {
    'use strict';

    angular
        .module('frontApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.
            when('/sign_in', {
                templateUrl: '/angular/?ns=front&id=authPartials.signin',
                controller: 'SignInCtrl',
                controllerAs: 'vm'
            }).
            when('/sign_up', {
                templateUrl: '/angular/?ns=front&id=authPartials.signup',
                controller: 'SignUpCtrl',
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
            });
    }
})();