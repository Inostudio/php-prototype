/**
 * Created by user on 21.11.2014.
 */

var profileServices = angular.module('profileServices', []);

profileServices.factory('Profile', ['$http', function($http) {
    return {
        changeProfile: function(data, success, error) {
            $http({
                url: '/profile/change-profile',
                method: 'POST',
                data: JSON.stringify({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone: data.phone
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        },
        changePassword: function(data, success, error) {
            $http({
                url: '/profile/change-password',
                method: 'POST',
                data: JSON.stringify({
                    old_password: data.old_password,
                    new_password: data.new_password,
                    password_confirm: data.password_confirm
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }
    };
}]);