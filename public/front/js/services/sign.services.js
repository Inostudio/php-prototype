/**
 * Created by user on 20.11.2014.
 */

(function() {
   'use strict';

    angular
        .module('signApp')
        .factory('Sign', Sign);

    Sign.$inject = ['$http'];

    function Sign($http) {
        var service = {
            signIn: signIn,
            signUp: signUp
        };

        return service;

        ////////////

        function signIn(data, success, error) {
            return $http({
                url: '',
                method: 'POST',
                data: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    remember: data.remember
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }

        function signUp(data, success, error) {
            return $http({
                url: '',
                method: 'POST',
                data: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirm
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }

    }
})();