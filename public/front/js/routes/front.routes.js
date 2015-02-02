/**
 * Created by nikolay on 2/2/15.
 */

(function() {
    'use strict';

    angular
        .module('frontApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/angular/?ns=front&id=pagesPartials.home',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
            }).
            when('/about', {
                templateUrl: '/angular/?ns=front&id=pagesPartials.about',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
            }).
            when('/contact', {
                templateUrl: '/angular/?ns=front&id=pagesPartials.contact',
                controller: 'ContactCtrl',
                controllerAs: 'vm'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
})();
