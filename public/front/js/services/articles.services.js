(function () {
    'use strict';

    angular
        .module('searchApp')
        .factory('GetArticlesAndCategories', GetArticlesAndCategories)
        .factory('GetArticleMore', GetArticleMore)
        .factory('GetSearchResult', GetSearchResult)
        .factory('ShowArticle', ShowArticle)
        .factory('RemoveArticle', RemoveArticle)
        .factory('GetCategory', GetCategory)
        .factory('CreateArticle', CreateArticle)
        .factory('EditArticle', EditArticle);

        GetArticlesAndCategories.$inject = ['$resource'];
        GetArticleMore.$inject = ['$resource'];
        GetSearchResult.$inject = ['$resource'];
        ShowArticle.$inject = ['$resource'];
        RemoveArticle.$inject = ['$resource'];
        GetCategory.$inject = ['$resource'];
        CreateArticle.$inject = ['$resource'];
        EditArticle.$inject = ['$resource'];

       
        function GetArticlesAndCategories($resource, lim){
            return $resource('/articles/articles-and-categories', {limit: lim}, {
                query: {method:'GET', params:{}, isArray:true}
            });
        };
        
        function GetArticleMore($resource, lim, off){
            return $resource('/articles/more-articles', {limit: lim, offset: off}, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }

        function GetSearchResult($resource, lim, off, cat, phr){
            return $resource('/articles/search-results', {limit: lim, offset: off, category: cat, phrase: phr}, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }

        function ShowArticle($resource, $articleId){
            return $resource('/articles/show-article', {artId: $articleId}, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }

        function RemoveArticle($resource, $removeId){
            return $resource('/articles/remove-article', {artId: $removeId}, {
                query: {method:'POST', params:{}, isArray:true}
            });
        }

        function GetCategory($resource){
            return $resource('/articles/category', {}, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }

        function CreateArticle($resource, $title, $category, $body){
            return $resource('/articles/create-article', {articleTitle: $title, articleCategory: $category, articleBody: $body}, {
                query: {method:'POST', params:{}, isArray:true}
            });
        }

        function EditArticle($resource, $title, $body, $category, $id){
            return $resource('/articles/edit-article', {title: $title, body: $body, category: $category, id: $id}, {
                query: {method:'POST', params:{}, isArray:true}
            });
        }

})();
