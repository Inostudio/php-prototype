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
        .factory('RemoveArticle', RemoveArticle)
        .factory('GetStatistics', GetStatistics)
        .factory('GetLanguageFiles', GetLanguageFiles)
        .factory('EditLanguageFile', EditLanguageFile)
        .factory('EditResource', EditResource)
        .factory('GetSearchResources', GetSearchResources)
        .factory('GetSections', GetSections)
        .factory('ChangeSection', ChangeSection)
        .factory('GetUserBans', GetUserBans)
        .factory('RemoveBan', RemoveBan)
        .factory('AddBan', AddBan)
        .factory('TableTranslate', TableTranslate);
    
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
    GetLanguageFiles.$inject = ['$resource'];
    EditLanguageFile.$inject = ['$resource'];
    EditResource.$inject = ['$resource'];
    GetSearchResources.$inject = ['$resource'];
    GetSections.$inject = ['$resource'];
    ChangeSection.$inject = ['$resource'];
    GetUserBans.$inject = ['$resource'];
    RemoveBan.$inject = ['$resource'];
    AddBan.$inject = ['$resource'];
    TableTranslate.$inject = ['$resource'];
    
    function Group($resource){
        return $resource('/adm/group/show', {}, {
          queryInfo: {method:'POST', params:{}, isArray:true}
        });
    };

    function AddGroup($resource, $title, $groupDescription){
        return $resource('/adm/group/add', {}, {
            query: {method:'POST', params:{gN:$title, gD: $groupDescription}, isArray:false}
        });
    };

    function RemoveGroup($resource, $groupId){
        return $resource('/adm/group/remove', {}, {
          query: {method:'POST', params:{id: $groupId}, isArray:true}
        });
    };

    function EditGroup($resource, $groupId, $title, $groupDescription){
        return $resource('/adm/group/edit', {}, {
          query: {method:'POST', params:{id: $groupId, gN:$title, gD: $groupDescription}, isArray:true}
        });
    };

    function Permission($resource){
        return $resource('/adm/permission/show', {}, {
          queryInfo: {method:'POST', params:{}, isArray:true}
        });
    };

    function AddPermission($resource, $title, $permissionDescription){
        return $resource('/adm/permission/add', {}, {
            query: {method:'POST', params:{gN:$title, gD: $permissionDescription}, isArray:false}
        });
    };

    function RemovePermission($resource, $permissionId){
        return $resource('/adm/permission/remove', {}, {
          query: {method:'POST', params:{id: $permissionId}, isArray:true}
        });
    };

    function EditPermission($resource, $permissionId, $title, $permissionDescription){
        return $resource('/adm/permission/edit', {}, {
          query: {method:'POST', params:{id: $permissionId, gN:$title, gD: $permissionDescription}, isArray:true}
        });
    };

    function GroupOptions($resource, $groupId){
        return $resource('/adm/permission/group-options', {}, {
          query: {method:'POST', params:{gId: $groupId}, isArray:true}
        });
    };

    function ChangePermissionsInGroup($resource, $groupId, $accept, $permId){
        return $resource('/adm/permission/change-permissions-in-group', {}, {
          query: {method:'POST', params:{gId: $groupId, accept: $accept, permId: $permId}, isArray:true}
        });
    };

    function User($resource, $lim, $off, $direction, $field){
        return $resource('/adm/user/show', {}, {
          queryInfo: {method:'POST', params:{lim: $lim, off: $off, direction: $direction, field: $field}, isArray:true}
        });
    };

    function AddUser($resource, $email, $password){
        return $resource('/adm/user/add', {}, {
          query: {method:'POST', params:{email: $email, password: $password}, isArray:true}
        });
    };

    function RemoveUser($resource, $userId, $field, $direction, $action, $off, $text){
        return $resource('/adm/user/remove', {}, {
          query: {method:'POST', params:{id: $userId, field: $field, direction: $direction, action: $action, off: $off, text: $text}, isArray:true}
        });
    };

    function EditUser ($resource, $email, $userId){
        return $resource('/adm/user/edit', {}, {
          query: {method:'POST', params:{email: $email, userId: $userId}, isArray:true}
        });
    };

    function UserOptions($resource, $userId){
        return $resource('/adm/user/options', {}, {
          query: {method:'POST', params:{uId: $userId}, isArray:true}
        });
    };

    function ChangeGroupByUser($resource, $userId, $accept, $groupId){
        return $resource('/adm/user/change-group-by-user', {}, {
          query: {method:'POST', params:{uId: $userId, accept: $accept, gId: $groupId}, isArray:true}
        });
    };

    function SearchUsers($resource, $text, $lim, $off, $direction, $field){
            return $resource('/adm/user/search', {}, {
                query: {method:'POST', params:{sText: $text, lim: $lim, off: $off, direction: $direction, field: $field}, isArray:true}
            });
        };

    function Pages($resource) {
        return $resource('/adm/page/show', {}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };

    function AddPage($resource, $title, $body, $status, $url) {
        return $resource('/adm/page/add', {}, {
            query: {method:'POST', params:{
                title: $title,
                body: $body,
                status_id: $status,
                url: $url
            }, isArray:true}
        });
    };

    function Status($resource) {
        return $resource('/adm/page/all-statuses', {}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };

    function GetPage($resource, $id) {
        return $resource('/adm/page/get', {}, {
            query: {method:'POST', params:{
                id: $id
            }, isArray:false}
        });
    };

    function DeletePage($resource, $id) {
        return $resource('/adm/page/delete', {}, {
            query: {method:'POST', params:{
                id: $id
            }, isArray:true}
        });
    };

    function SavePage($resource, $id, $title, $body, $status, $url) {
        return $resource('/adm/page/save', {}, {
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
        return $resource('/adm/resource/add', {}, {
            query: {method:'POST', params:{
                title: $title,
                file: $file
            }, isArray:true}
        });
    };

    function AllResource($resource, $limit, $offset, $direction){
        return $resource('/adm/resource/show', {limit: $limit, offset: $offset, direction: $direction}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };

    function DeleteResource($resource, $id, $direction, $offset, $action, $limit, $phrase, $src){
        return $resource('/adm/resource/delete', {}, {
            query: {method:'POST', params:{
                id: $id,
                direction: $direction, 
                offset: $offset, 
                action: $action,
                limit: $limit,
                phrase: $phrase,
                src: $src
            }, isArray:true}
        });
    };

    function CheckLang($resource, $language){
        return $resource('/checklang', {}, {
            query: {method:'POST', params:{language: $language}, isArray:false}
        });
    };
    
    function GetCategoryOfArticle($resource){
        return $resource('/adm/article/category', {}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    };
    
    function RemoveCategoryOfArticle($resource, $categoryId){
        return $resource('/adm/article/remove-category', {categoryId: $categoryId}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function AddCategoryOfArticle($resource, $title){
        return $resource('/adm/article/add-category', {title: $title}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function EditCategoryOfArticle($resource, $title, $id){
        return $resource('/adm/article/edit-category', {title: $title, id: $id}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function GetArticles($resource, $categoryId, $lim, $off, $dir, $fiel){
        return $resource('/adm/article/articles', {categoryId: $categoryId, lim: $lim, off: $off, dir: $dir, fiel: $fiel}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    };
    
    function EditArticle($resource, $id, $title, $field){
        return $resource('/adm/article/edit-article', {id: $id, title: $title, field: $field}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function SearchArticles($resource, $categoryId, $lim, $off, $dir, $fiel, $phrase, $src){
        return $resource('/adm/article/search-articles', {categoryId: $categoryId, lim: $lim, off: $off, dir: $dir, fiel: $fiel, phrase: $phrase, src: $src}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    };

    function RemoveArticle($resource, $id, $direction, $offset, $action, $limit, $phrase, $src, $category, $field){
        return $resource('/adm/article/remove-article', {id: $id, direction: $direction, offset: $offset, action: $action, limit: $limit, phrase: $phrase, src: $src, category: $category, field: $field}, {
            query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function GetStatistics($resource){
        return $resource('/adm/dashboard/statistics', {}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    };
    
    function GetLanguageFiles($resource, $path){
        return $resource('/' + lang + '/adm/language/language-files', {path: $path}, {
            query: {method:'GET', params: {}, isArray:true}
        });
    };
    
    function EditLanguageFile($resource, $path, $file, $language, $key, $value){
        return $resource('/' + lang + '/adm/language/edit-language-file', {path: $path, file: $file, language: $language, key: $key, value: $value}, {
            query: {method:'POST', params: {}, isArray:true}
        });
    };
    
    function EditResource($resource, $id, $title){
        return $resource('/' + lang + '/adm/resource/edit-resource', {id: $id, title: $title}, {
            query: {method:'POST', params: {}, isArray:true}
        });
    };
    
    function GetSearchResources($resource, $phrase, $src, $direction, $limit, $offset){
        return $resource('/' + lang + '/adm/resource/search-resources', {phrase: $phrase, src: $src, direction: $direction, limit: $limit, offset: $offset}, {
            query: {method:'GET', params: {}, isArray:true}
        });
    };
    
    function GetSections($resource){
        return $resource('/' + lang + '/adm/setting/sections', {}, {
            query: {method:'GET', params: {}, isArray:true}
        });
    };
    
    function ChangeSection($resource, $id, $disable){
        return $resource('/' + lang + '/adm/setting/change-section', {id: $id, disable: $disable}, {
            query: {method:'POST', params: {}, isArray:true}
        });
    };
    
    function GetUserBans($resource, $userId){
        return $resource('/' + lang +  '/adm/user/bans', {}, {
          query: {method:'POST', params:{id: $userId}, isArray:true}
        });
    };
    
    function RemoveBan($resource, $id){
        return $resource('/' + lang +  '/adm/user/remove-ban', {}, {
          query: {method:'POST', params:{id: $id}, isArray:true}
        });
    };
    
    function AddBan($resource, $userId, $endDate, $reason){
        return $resource('/' + lang +  '/adm/user/add-ban', {userId: $userId, endDate: $endDate, reason: $reason}, {
          query: {method:'POST', params:{}, isArray:true}
        });
    };
    
    function TableTranslate($resource, $phrase){
        return $resource('/' + lang + '/adm/language/table-translate', {phrase: $phrase}, {
            query: {method:'POST', params: {}, isArray:true}
        });
    };
})();