(function() {
    'use strict';

    angular
        .module('frontApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.
            when('/articles', {
                templateUrl: '/angular/?ns=front&id=articlesPartials.index',
                controller: 'ShowArticlesCtrl',
                controllerAs: 'vm'
            }).
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
            when('/article/:articleId', {
                templateUrl:  '/angular/?ns=front&id=articlesPartials.show',
                controller: 'ShowArticleCtrl',
                controllerAs: 'vm'
            }).
            when('/user/:userId', {
                templateUrl:  '/angular/?ns=front&id=profilePartials.user',
                controller: 'ShowUserCtrl',
                controllerAs: 'vm'
            });
    }
})();
