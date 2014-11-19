/**
 * Created by user on 18.11.2014.
 */

var signServices = angular.module('signServices', []);

signServices.factory('SignIn', ['$http', function ($http) {
    return {
        signIn: function(data, success, error) {
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
}]);