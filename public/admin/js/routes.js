(function(){
    'use strict';
    
    angular
            .module('adminApp')
            .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.dashboard',
            controller: 'DashboardCtrl',
            controllerAs: 'vm'
          }).
          when('/users', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.users',
            controller: 'UsersCtrl',
            controllerAs: 'vm'
          }).
          when('/pages', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.pages',
            controller: 'PagesCtrl',
            controllerAs: 'vm'
          }).
          when('/categories_of_articles', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.categoriesOfArticles',
            controller: 'CategoriesOfArticlesCtrl',
            controllerAs: 'vm'
          }).
          when('/allArticle', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.articleCategory',
            controller: 'ArticleCategoryCtrl',
            controllerAs: 'vm'
          }).
                  
          when('/categories_of_articles/:categoryId', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.articleCategory',
            controller: 'ArticleCategoryCtrl',
            controllerAs: 'vm'
          }).
          when('/groups', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.groups',
            controller: 'GroupCtrl',
            controllerAs: 'vm'
          }).
          when('/permissions', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.permissions',
            controller: 'PermissionCtrl',
            controllerAs: 'vm'
          })
         .when('/entities', {
            templateUrl: '/angular/?ns=admin&id=adminPartials.entities',
            controller: 'EntityCtrl',
            controllerAs: 'vm'
          }).
          when('/groups/:groupId', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.groupOptions',
            controller: 'GroupOptionsCtrl',
            controllerAs: 'vm'
          }).
          when('/users/:userId', {
            templateUrl:  '/angular/?ns=admin&id=adminPartials.userOptions',
            controller: 'UserOptionsCtrl',
            controllerAs: 'vm'
          }).
          when('/resources', {
              templateUrl:  '/angular/?ns=admin&id=adminPartials.resources',
              controller: 'ResourcesCtrl',
              controllerAs: 'vm'
          }).
          when('/languages', {
              templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.languages',
              controller: 'LanguagesCtrl',
              controllerAs: 'vm'
          }).
        when('/settings', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.settings',
            controller: 'SettingsCtrl',
            controllerAs: 'vm'
          }).
          when('/personalization', {
            templateUrl:  '/' + lang + '/angular/?ns=admin&id=adminPartials.personalization',
            controller: 'PersonalizationCtrl',
            controllerAs: 'vm'
          });
      }]);
})();