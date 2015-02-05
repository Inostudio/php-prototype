(function() {
    'use strict';

    angular
        .module('searchApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/angular/?ns=front&id=otherPartials.blank',
                controller: 'IndexCtrl',
                controllerAs: 'vm'
            }).
            when('/articles', {
                templateUrl: '/angular/?ns=front&id=articlesPartials.index',
                controller: 'ShowCtrl',
                controllerAs: 'vm'
            }).
            when('/articles/create', {
                templateUrl:  '/angular/?ns=front&id=articlesPartials.create',
                controller: 'CreateArticleCtrl',
                controllerAs: 'vm'
            }).
            when('/articles/edit/:articleId', {
                templateUrl:  '/angular/?ns=front&id=articlesPartials.edit',
                controller: 'EditArticleCtrl',
                controllerAs: 'vm'
            }).
            when('/articles/:articleId', {
                templateUrl:  '/angular/?ns=front&id=articlesPartials.show',
                controller: 'ShowArticleCtrl',
                controllerAs: 'vm'
            }).
            when('/users', {
                templateUrl: '/angular/?ns=front&id=profilePartials.users',
                controller: 'UsersCtrl',
                controllerAs: 'vm'
            }).
            when('/users/:userId', {
                templateUrl:  '/angular/?ns=front&id=profilePartials.user',
                controller: 'ShowUserCtrl',
                controllerAs: 'vm'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
})();
