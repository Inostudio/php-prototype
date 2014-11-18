/**
 * Created by user on 18.11.2014.
 */

var signControllers = angular.module('signControllers', []);

signControllers.controller('SignCtrl', ['$scope', '$window', 'SignIn', function($scope, $window, SignIn) {
    $scope.alert = undefined;

    $scope.closeAlert = function() {
        $scope.alert = undefined;
    };

    $scope.submitted = false;

    $scope.submitForm = function (isValid) {
        $scope.submitted = true;
        if(isValid) {
            var success = function(data) {
                console.log(data);
                if(data[0] === true){
                    $window.location.href = '/adm/';
                } else {
                    $scope.alert = { msg: data[1], type: 'danger'};
                }
            };

            var error = function(data) {
                $scope.alert = { msg: 'Some problems.', type: 'danger'};
            };

            SignIn.signIn($scope.user, success, error);
        }
    }

}]);
