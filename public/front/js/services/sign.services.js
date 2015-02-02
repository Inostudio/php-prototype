/**
 * Created by user on 20.11.2014.
 */

(function() {
   'use strict';

    angular
        .module('frontApp')
        .factory('Sign', Sign)
        .factory('Reminder', Reminder);

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
                url: '/auth/signin',
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
                url: '/auth/signup',
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

    Reminder.$inject = ['$http'];
    function Reminder($http) {
        var service = {
            remind: remind,
            reset : reset
        };

        return service;

        ////////////

        function remind(data, success, error) {
            return $http({
                url: '/password/remind',
                method: 'POST',
                data: JSON.stringify({
                    email: data.email
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }

        function reset(data, success, error) {
            return $http({
                url: '/password/reset',
                method: 'POST',
                data: JSON.stringify({
                    token: data.token,
                    password: data.password,
                    password_confirmation: data.password_confirmation
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }
    }
})();