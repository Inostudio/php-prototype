(function() {
    'use strict';

    angular
        .module('searchApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/angular/?ns=front&id=profilePartials.users',
                controller: 'IndexCtrl',
                controllerAs: 'vm'
            }).
            when('/user/:userId', {
                templateUrl:  '/angular/?ns=front&id=profilePartials.user',
                controller: 'ShowUserCtrl',
                controllerAs: 'vm'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
})();
