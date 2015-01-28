(function(){
    'use strict';
    
    angular
            .module('adminApp')
            .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.dashboard',
            controller: 'DashboardCtrl',
            controllerAs: 'vm'
          }).
          when('/users', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.users',
            controller: 'UsersCtrl',
            controllerAs: 'vm'
          }).
          when('/pages', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.pages',
            controller: 'PagesCtrl',
            controllerAs: 'vm'
          }).
          when('/categories_of_articles', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.categoriesOfArticles',
            controller: 'CategoriesOfArticlesCtrl',
            controllerAs: 'vm'
          }).
          when('/allArticle', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.articleCategory',
            controller: 'ArticleCategoryCtrl',
            controllerAs: 'vm'
          }).
                  
          when('/categories_of_articles/:categoryId', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.articleCategory',
            controller: 'ArticleCategoryCtrl',
            controllerAs: 'vm'
          }).
          when('/groups', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.groups',
            controller: 'GroupCtrl',
            controllerAs: 'vm'
          }).
          when('/permissions', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.permissions',
            controller: 'PermissionCtrl',
            controllerAs: 'vm'
          })
         .when('/entities', {
            templateUrl: '/' + lang + '/angular/?ns=admin&id=adminPartials.entities',
            controller: 'EntityCtrl',
            controllerAs: 'vm'
          }).
          when('/groups/:groupId', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.groupOptions',
            controller: 'GroupOptionsCtrl',
            controllerAs: 'vm'
          }).
          when('/users/:userId', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.userOptions',
            controller: 'UserOptionsCtrl',
            controllerAs: 'vm'
          }).
          when('/resources', {
              templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.resources',
              controller: 'ResourcesCtrl',
              controllerAs: 'vm'
          }).
          when('/languages', {
              templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.languages',
              controller: 'LanguagesCtrl',
              controllerAs: 'vm'
          });
      }]);
})();