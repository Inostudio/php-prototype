/**
 * Created by user on 21.11.2014.
 */

var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

profileControllers.controller('ShowCtrl', ['$scope', '$location', 'Profile', function($scope, $location, Profile) {

    $scope.alert = undefined;
    $scope.closeAlert = function() {
        $scope.alert = undefined;
    };

    $scope.editing = false;
    $scope.edit = function() {
        $scope.temp = {
            first_name: $scope.user.first_name,
            last_name: $scope.user.last_name,
            phone: $scope.user.phone
        };

        $scope.editing = true;
    };

    $scope.cancel = function() {
        $scope.editing = false;
    };

    $scope.apply = function(){
        var success = function(data) {
            $scope.user = {
                first_name: $scope.temp.first_name,
                last_name: $scope.temp.last_name,
                phone: $scope.temp.phone
            }
            $scope.editing = false;
        };

        var error = function(data) {
            $scope.alert = { msg: 'Some problems.', type: 'danger'};
        };

        Profile.changeProfile($scope.temp, success, error);
    };
}]);

profileControllers.controller('EditCtrl', ['$scope', 'Profile', function($scope, Profile) {
    $scope.alert = undefined;

    $scope.closeAlert = function() {
        $scope.alert = undefined;
    };



    $scope.submitForm = function (isValid) {
        $scope.submitted = true;
        if(isValid) {
            var success = function(data) {
                if (data[0] == true) {
                    $scope.alert = { msg: data[1], type: 'success'};
                    $scope.cleareForm();
                } else {
                    $scope.alert = { msg: data[1], type: 'danger'};
                }
            };

            var error = function(data) {
                $scope.alert = { msg: 'Some problems with connection', type: 'danger'};
            };

            Profile.changePassword($scope.user, success, error);
        }
    }



    $scope.cleareForm = function() {
        $scope.user = {
            old_password: '',
            new_password: '',
            password_confirm: ''
        }

        $scope.submitted = false;
    };
    $scope.cleareForm();

    $scope.confirm = function(){
        return ($scope.user.new_password === $scope.user.password_confirm);
    };
}]);

profileControllers.controller('PhotoCtrl', ['$scope', function($scope) {
}]);