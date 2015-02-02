(function() {
    'use strict';

    angular
        .module('searchApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/angular/?ns=front&id=userPartials.users',
                controller: 'IndexCtrl',
                controllerAs: 'vm'
            })./*
            when('/create', {
                templateUrl:  '/angular/?ns=front&id=articlesPartials.create',
                controller: 'CreateArticleCtrl',
                controllerAs: 'vm'
            }).
            when('/edit/:articleId', {
                templateUrl:  '/angular/?ns=front&id=articlesPartials.edit',
                controller: 'EditArticleCtrl',
                controllerAs: 'vm'
            }).
            when('/:articleId', {
                templateUrl:  '/angular/?ns=front&id=articlesPartials.show',
                controller: 'ShowArticleCtrl',
                controllerAs: 'vm'
            }).
            when('/user/:userId', {
                templateUrl:  '/angular/?ns=front&id=profilePartials.user',
                controller: 'ShowUserCtrl',
                controllerAs: 'vm'
            }).
*/
            otherwise({
                redirectTo: '/'
            });
    }
})();
