(function() {
    'use strict';

    angular
        .module('articlesApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/angular/?ns=front&id=articlesPartials.index',
                controller: 'ShowCtrl',
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
            when('/:articleId', {
                templateUrl:  '/angular/?ns=front&id=articlesPartials.show',
                controller: 'ShowArticleCtrl',
                controllerAs: 'vm'
            }).          
            otherwise({
                redirectTo: '/'
            });
    }
})();
