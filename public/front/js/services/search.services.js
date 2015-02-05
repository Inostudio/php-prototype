/**
 * Created by nikolay on 2/5/15.
 */

(function(){
    'use strict';
    angular
        .module('searchApp')
        .factory('Search', Search)
        .factory('ShowUser', ShowUser);

    Search.$inject = ['$http'];
    function Search($http) {
        var service = {
            searchUsers: searchUsers
        }

        return service;

        ////////////

        function searchUsers(data, success, error) {
            $http({
                url: '/search/users',
                method: 'POST',
                data: JSON.stringify({
                    offer: data.offer,
                    offset: data.offset,
                    limit: data.limit
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }

    }

    function ShowUser($http){
        var service = {
            getUser: getUser
        };

        return service;

        ////////////

        function getUser(data, success, error) {
            return $http({
                url: '/profile/user',
                method: 'POST',
                data: JSON.stringify({
                    id: data.id
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }
    }
})();
