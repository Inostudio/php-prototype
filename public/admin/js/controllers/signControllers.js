/**
 * Created by user on 18.11.2014.
 */

var signControllers = angular.module('signControllers', []);

signControllers.controller('SignCtrl', ['$scope', '$location', 'SignIn', function($scope, $location, SignIn) {
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
                    //redirect to dashboard
                    //$location.path('/adm');
                    //window.location.reload();
                } else {
                    $scope.alert = { msg: 'Bad login or password.', type: 'danger'};
                }
            };

            var error = function(data) {

            };

            SignIn.signIn($scope.user, success, error);
        }
    }

}]);
