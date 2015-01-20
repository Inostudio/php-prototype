/**
 * Created by user on 18.11.2014.
 */
(function() {
    'use strict';
    
    angular
            .module('signApp')
            .factory('SignIn', SignIn);
    
    SignIn.$inject = ['$http'];
    
    function SignIn($http) {
        return {
            signIn: sign
    };
    
    function sign(data, success, error) {
        $http({
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
    };
})();