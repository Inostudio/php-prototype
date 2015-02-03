/**
 * Created by user on 20.01.2015.
 */

(function() {
    'use strict';

    angular
        .module('articlesApp')
        .controller('ShowCtrl', ShowCtrl)
        .controller('ShowArticleCtrl', ShowArticleCtrl)
        .controller('CreateArticleCtrl', CreateArticleCtrl)
        .controller('EditArticleCtrl', EditArticleCtrl);

    ShowCtrl.$inject = ['GetArticlesAndCategories', 'GetArticleMore', 'GetSearchResult', '$modal', '$rootScope', 'RemoveArticle', '$alert'];
    ShowArticleCtrl.$inject = ['ShowArticle', '$routeParams'];
    CreateArticleCtrl.$inject = ['GetCategory', 'CreateArticle', '$alert'];
    EditArticleCtrl.$inject = ['$routeParams', 'ShowArticle', 'GetCategory', '$alert', 'EditArticle'];
    
    function ShowCtrl(GetArticlesAndCategories, GetArticleMore, GetSearchResult, $modal, $rootScope, RemoveArticle, $alert) {
        var alertSuccess;
        function showSuccessAlert(alertMessage){
            if(alertSuccess != null){
               alertSuccess.$promise.then(alertSuccess.hide);
            }
            alertSuccess = $alert({title: alertMessage, placement: 'top-right', type: 'success', container: '#alerts-container', duration: 3});
            alertSuccess.$promise.then(alertSuccess.show);
        }
        var vm = this;
        vm.showMoreBtn = false;
        vm.getMoreArticles = getMoreArticles;
        vm.categorys = [];
        vm.articles = [];
        vm.currentUserId = 0;
        vm.getSearchResults = getSearchResults;
        vm.searchPhrase = '';
        vm.searchCategory = 'All';
        vm.searchCategoryTitle = 'All';
        vm.removeArticle = removeArticle;
        vm.modal = {};
        vm.removeArticleId = 0;
        vm.resetSearch = resetSearch;
        vm.newArticles = [];
        vm.success_remove = '';
        
        var limit = 10;
        var offset = 10;
        var articles = [];
        var action = 0;
        var searchArticles = [];
        getArticles(limit);
        
        vm.modal = $modal({
            show: false,
            contentTemplate: 'ConfirmDelete.html'
        });
        
        function getMoreArticles(){
            vm.showMoreBtn = true;
            if(!action){    //Подгрузка при обучном просмотре
                GetArticleMore.query({lim: limit, off: offset}, function(answer){
                    if(offset >= answer[1]){
                        vm.showMoreBtn = false;
                    }
                    angular.forEach(answer[0], function(article) {
                        articles.push(article);
                    });
                    vm.articles = articles;
                });
            } else if (action === 1){   //Подгрузка при поиске
                searchRes(limit, offset);
            }
            offset += limit;
        }
        
        function getSearchResults(){
            offset = 0;
            vm.showMoreBtn = true;
            if((vm.searchCategory === 'All') && (vm.searchPhrase.trim() === '')){
                action = 0;
                getArticles(limit);
                offset += limit;
            } else {
                action = 1;
                searchArticles = [];
                searchRes(limit, offset);
                offset += limit;
            }
            vm.searchCategoryTitle = vm.searchCategory;
        }
        
        function getArticles(limit){
            articles = [];
            GetArticlesAndCategories.query({lim: limit}, function(answer){
                vm.categorys = answer[0];
                vm.currentUserId = answer[3];
                if(limit < answer[2]){
                    vm.showMoreBtn = true;
                }
                angular.forEach(answer[1], function(article) {
                    articles.push(article);
                });
                vm.articles = articles;
                vm.newArticles = answer[4];
            });
        }
        
        function searchRes(limit, offset){
            GetSearchResult.query({lim: limit, off: offset, cat: vm.searchCategory, phr: vm.searchPhrase}, function(answer){
                if((offset+limit) >= answer[1]){
                    vm.showMoreBtn = false;
                }
                angular.forEach(answer[0], function(article) {
                    searchArticles.push(article);
                });
                vm.articles = searchArticles;
            });
        }
        
        function resetSearch(){
            if(action){
                vm.showMoreBtn = true;
                action = 0;
                getArticles(limit);
                offset += limit;
                vm.searchPhrase = '';
            }
        }
        
        function removeArticle(id){
            vm.modal.show();
            vm.removeArticleId = id;
        }
        
        $rootScope.$on('cancelDeleteArticle', function(){
            vm.modal.hide();
        });

        $rootScope.$on('okDeleteArticle', function(){
            vm.modal.hide();
            RemoveArticle.query({removeId: vm.removeArticleId }, function(answer){
                showSuccessAlert(vm.success_remove);
                var arr = [];
                angular.forEach(vm.articles, function(article) {
                    if(vm.removeArticleId != article.id){
                        arr.push(article);
                    }
                });
                vm.articles = arr;
            });
        });
    }
    
    function ShowArticleCtrl(ShowArticle, $routeParams){
        var vm = this;
        vm.article = [];
        vm.currentUserId = 0;
        vm.userArticle = [];
        vm.you = (lang === 'en' ? 'you' : 'Вами');
        vm.byTheUser = (lang === 'en' ? 'by the user ' : 'пользователем ');
        
        ShowArticle.query({articleId: $routeParams.articleId}, function(answer){
            vm.article = answer[0];
            vm.currentUserId = answer[1];
            vm.userArticle = answer[2];
        }); 
    }
    
    function CreateArticleCtrl(GetCategory, CreateArticle, $alert){
        var alertError;
        function showErrorAlert(alertMessage){
            if(alertError != null){
                alertError.$promise.then(alertError.hide);
            }
            alertError = $alert({title: alertMessage, placement: 'top-right', type: 'danger', container: '#alerts-error-container'});
            alertError.$promise.then(alertError.show);
        }
        var vm = this;
        vm.saveArticle = saveArticle;
        vm.categorys = [];
        vm.disableCat = true;
        
        GetCategory.query({}, function(answer){
            vm.categorys = answer[0];
            vm.disableCat = false;
        });
        
        function saveArticle(){
            CreateArticle.query({title: vm.articleTitle, category: vm.articleCategory, body: vm.articleBody}, function(answer){
                if(!answer[0]){
                    showErrorAlert(answer[1]);
                } else {
                    window.location.href = '/' + lang + '/articles';
                }
            });
            
        }
    }
    
    function EditArticleCtrl($routeParams, ShowArticle, GetCategory, $alert, EditArticle){
        var alertError;
        var alertSuccess;
        function showErrorAlert(alertMessage){
            if(alertError != null){
                alertError.$promise.then(alertError.hide);
            }
            if(alertSuccess != null){
                alertSuccess.$promise.then(alertSuccess.hide);
            }
            alertError = $alert({title: alertMessage, placement: 'top-right', type: 'danger', container: '#alerts-error-container'});
            alertError.$promise.then(alertError.show);
        }
        function showSuccessAlert(alertMessage){
            if(alertError != null){
                alertError.$promise.then(alertError.hide);
            }
            if(alertSuccess != null){
               alertSuccess.$promise.then(alertSuccess.hide);
            }
            alertSuccess = $alert({title: alertMessage, placement: 'top-right', type: 'success', container: '#alerts-error-container', duration: 3});
            alertSuccess.$promise.then(alertSuccess.show);
        }
        var vm = this;
        vm.disableCat = true;
        vm.saveEdit = saveEdit;
        vm.article = {};
        vm.articleCategory = 0;
        vm.success_edit = '';
        
        GetCategory.query({}, function(answer){
            vm.categorys = answer[0];
            vm.disableCat = false;
        });
        ShowArticle.query({articleId: $routeParams.articleId}, function(answer){
            
            if(answer[0].user_id !== answer[1]){
                window.location.href = '/' + lang + '/articles';
            } else {
                vm.article = answer[0];
                vm.articleCategory = vm.article.category_id;
            }
        }); 
        
        function saveEdit(){
            EditArticle.query({title: vm.article.title, body: vm.article.body, category: vm.articleCategory, id: $routeParams.articleId}, function(answer){
                if(!answer[0]){
                    showErrorAlert(answer[1]);
                } else {
                    showSuccessAlert(vm.success_edit);
                }
            });
        }
    }
})();
