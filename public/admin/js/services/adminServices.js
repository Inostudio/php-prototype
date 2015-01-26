(function(){

    'use strict';

    angular
        .module('adminApp')
        .factory('Group', Group)
        .factory('AddGroup', AddGroup)
        .factory('RemoveGroup', RemoveGroup)
        .factory('EditGroup', EditGroup)
        .factory('Permission', Permission)
        .factory('AddPermission', AddPermission)
        .factory('RemovePermission', RemovePermission)
        .factory('EditPermission', EditPermission)
        .factory('GroupOptions', GroupOptions)
        .factory('ChangePermissionsInGroup', ChangePermissionsInGroup)
        .factory('User', User)
        .factory('AddUser', AddUser)
        .factory('RemoveUser', RemoveUser)
        .factory('EditUser', EditUser)
        .factory('UserOptions', UserOptions)
        .factory('ChangeGroupByUser', ChangeGroupByUser)
        .factory('SearchUsers', SearchUsers)
        .factory('Pages', Pages)
        .factory('AddPage', AddPage)
        .factory('Status', Status)
        .factory('GetPage', GetPage)
        .factory('DeletePage', DeletePage)
        .factory('SavePage', SavePage)
        .factory('AddResource', AddResource)
        .factory('AllResource', AllResource)
        .factory('DeleteResource', DeleteResource)
        .factory('CheckLang', CheckLang)
        .factory('GetCategoryOfArticle', GetCategoryOfArticle)
        .factory('RemoveCategoryOfArticle', RemoveCategoryOfArticle)
        .factory('AddCategoryOfArticle', AddCategoryOfArticle)
        .factory('EditCategoryOfArticle', EditCategoryOfArticle)
        .factory('GetArticles', GetArticles)
        .factory('EditArticle', EditArticle)
        .factory('SearchArticles', SearchArticles)
        .factory('RemoveArticle', RemoveArticle);
    
    Group.$inject = ['$resource'];
    AddGroup.$inject = ['$resource'];
    RemoveGroup.$inject = ['$resource'];
    EditGroup.$inject = ['$resource'];
    Permission.$inject = ['$resource'];
    AddPermission.$inject = ['$resource'];
    RemovePermission.$inject = ['$resource'];
    EditPermission.$inject = ['$resource'];
    GroupOptions.$inject = ['$resource'];
    ChangePermissionsInGroup.$inject = ['$resource'];
    User.$inject = ['$resource'];
    AddUser.$inject = ['$resource'];
    RemoveUser.$inject = ['$resource'];
    EditUser.$inject = ['$resource'];
    UserOptions.$inject = ['$resource'];
    ChangeGroupByUser.$inject = ['$resource'];
    SearchUsers.$inject = ['$resource'];
    Pages.$inject = ['$resource'];
    AddPage.$inject = ['$resource'];
    Status.$inject = ['$resource'];
    GetPage.$inject = ['$resource'];
    DeletePage.$inject = ['$resource'];
    SavePage.$inject = ['$resource'];
    AddResource.$inject = ['$resource'];
    AllResource.$inject = ['$resource'];
    DeleteResource.$inject = ['$resource'];
    CheckLang.$inject = ['$resource'];
    GetCategoryOfArticle.$inject = ['$resource'];
    RemoveCategoryOfArticle.$inject = ['$resource'];
    AddCategoryOfArticle.$inject = ['$resource'];
    EditCategoryOfArticle.$inject = ['$resource'];
    GetArticles.$inject = ['$resource'];
    EditArticle.$inject = ['$resource'];
    SearchArticles.$inject = ['$resource'];
    RemoveArticle.$inject = ['$resource'];
    
    function Group($resource){
        return $resource('/' + lang +  '/adm/group/show', {}, {
          queryInfo: {method:'POST', params:{}, isArray:true}
        });
    };

    function AddGroup($resource, $title, $groupDescription){
        return $resource('/' + lang +  '/adm/group/add', {}, {
            query: {method:'POST', params:{gN:$title, gD: $groupDescription}, isArray:false}
        });
    };

    function RemoveGroup($resource, $groupId){
        return $resource('/' + lang +  '/adm/group/remove', {}, {
          query: {method:'POST', params:{id: $groupId}, isArray:true}
        });
    };

    function EditGroup($resource, $groupId, $title, $groupDescription){
        return $resource('/' + lang +  '/adm/group/edit', {}, {
          query: {method:'POST', params:{id: $groupId, gN:$title, gD: $groupDescription}, isArray:true}
        });
    };

    function Permission($resource){
        return $resource('/' + lang +  '/adm/permission/show', {}, {
          queryInfo: {method:'POST', params:{}, isArray:true}
        });
    };

    function AddPermission($resource, $title, $permissionDescription){
        return $resource('/' + lang +  '/adm/permission/add', {}, {
            query: {method:'POST', params:{gN:$title, gD: $permissionDescription}, isArray:false}
        });
    };

    function RemovePermission($resource, $permissionId){
        return $resource('/' + lang +  '/adm/permission/remove', {}, {
          query: {method:'POST', params:{id: $permissionId}, isArray:true}
        });
    };

    function EditPermission($resource, $permissionId, $title, $permissionDescription){
        return $resource('/' + lang +  '/adm/permission/edit', {}, {
          query: {method:'POST', params:{id: $permissionId, gN:$title, gD: $permissionDescription}, isArray:true}
        });
    };

    function GroupOptions($resource, $groupId){
        return $resource('/' + lang +  '/adm/permission/group-options', {}, {
          query: {method:'POST', params:{gId: $groupId}, isArray:true}
        });
    };

    function ChangePermissionsInGroup($resource, $groupId, $accept, $permId){
        return $resource('/' + lang +  '/adm/permission/change-permissions-in-group', {}, {
          query: {method:'POST', params:{gId: $groupId, accept: $accept, permId: $permId}, isArray:true}
        });
    };

    function User($resource, $lim, $off, $direction, $field){
        return $resource('/' + lang +  '/adm/user/show', {}, {
          queryInfo: {method:'POST', params:{lim: $lim, off: $off, direction: $direction, field: $field}, isArray:true}
        });
    };

    function AddUser($resource, $email, $password){
        return $resource('/' + lang +  '/adm/user/add', {}, {
          query: {method:'POST', params:{email: $email, password: $password}, isArray:true}
        });
    };

    function RemoveUser($resource, $userId){
        return $resource('/' + lang +  '/adm/user/remove', {}, {
          query: {method:'POST', params:{id: $userId}, isArray:true}
        });
    };

    function EditUser ($resource, $email, $userId){
        return $resource('/' + lang +  '/adm/user/edit', {}, {
          query: {method:'POST', params:{email: $email, userId: $userId}, isArray:true}
        });
    };

    function UserOptions($resource, $userId){
        return $resource('/' + lang +  '/adm/user/options', {}, {
          query: {method:'POST', params:{uId: $userId}, isArray:true}
        });
    };

    function ChangeGroupByUser($resource, $userId, $accept, $groupId){
        return $resource('/' + lang +  '/adm/user/change-group-by-user', {}, {
          query: {method:'POST', params:{uId: $userId, accept: $accept, gId: $groupId}, isArray:true}
        });
    };

    function SearchUsers($resource, $text, $lim, $off, $direction, $field){
            return $resource('/' + lang +  '/adm/user/search', {}, {
                query: {method:'POST', params:{sText: $text, lim: $lim, off: $off, direction: $direction, field: $field}, isArray:true}
            });
        };

    function Pages($resource) {
        return $resource('/' + lang +  '/adm/page/show', {}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };

    function AddPage($resource, $title, $body, $status, $url) {
        return $resource('/' + lang +  '/adm/page/add', {}, {
            query: {method:'POST', params:{
                title: $title,
                body: $body,
                status_id: $status,
                url: $url
            }, isArray:true}
        });
    };

    function Status($resource) {
        return $resource('/' + lang +  '/adm/page/all-statuses', {}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };

    function GetPage($resource, $id) {
        return $resource('/' + lang +  '/adm/page/get', {}, {
            query: {method:'POST', params:{
                id: $id
            }, isArray:false}
        });
    };

    function DeletePage($resource, $id) {
        return $resource('/' + lang +  '/adm/page/delete', {}, {
            query: {method:'POST', params:{
                id: $id
            }, isArray:true}
        });
    };

    function SavePage($resource, $id, $title, $body, $status, $url) {
        return $resource('/' + lang +  '/adm/page/save', {}, {
            query: {method:'POST', params:{
                id: $id,
                title: $title,
                body: $body,
                status_id: $status,
                url: $url
            }, isArray:true}
        });
    };

    function AddResource($resource, $title, $file){
        return $resource('/' + lang +  '/adm/resource/add', {}, {
            query: {method:'POST', params:{
                title: $title,
                file: $file
            }, isArray:true}
        });
    };

    function AllResource($resource){
        return $resource('/' + lang +  '/adm/resource/show', {}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };

    function DeleteResource($resource, $id){
        return $resource('/' + lang +  '/adm/resource/delete', {}, {
            query: {method:'POST', params:{
                id: $id
            }, isArray:true}
        });
    };

    function CheckLang($resource, $language){
        return $resource('/' + lang +  '/checklang', {}, {
            query: {method:'POST', params:{language: $language}, isArray:false}
        });
    };
    
    function GetCategoryOfArticle($resource){
        return $resource('/' + lang +  '/adm/article/category', {}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    };
    
    function RemoveCategoryOfArticle($resource, $categoryId){
        return $resource('/' + lang +  '/adm/article/remove-category', {categoryId: $categoryId}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function AddCategoryOfArticle($resource, $title){
        return $resource('/' + lang +  '/adm/article/add-category', {title: $title}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function EditCategoryOfArticle($resource, $title, $id){
        return $resource('/' + lang +  '/adm/article/edit-category', {title: $title, id: $id}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function GetArticles($resource, $categoryId, $lim, $off, $dir, $fiel){
        return $resource('/' + lang +  '/adm/article/articles', {categoryId: $categoryId, lim: $lim, off: $off, dir: $dir, fiel: $fiel}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    };
    
    function EditArticle($resource, $id, $title, $field){
        return $resource('/' + lang +  '/adm/article/edit-article', {id: $id, title: $title, field: $field}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function SearchArticles($resource, $categoryId, $lim, $off, $dir, $fiel, $phrase, $src){
        return $resource('/' + lang +  '/adm/article/search-articles', {categoryId: $categoryId, lim: $lim, off: $off, dir: $dir, fiel: $fiel, phrase: $phrase, src: $src}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    };
    
    function RemoveArticle($resource, $id){
        return $resource('/' + lang +  '/adm/article/remove-article', {id: $id}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
})();