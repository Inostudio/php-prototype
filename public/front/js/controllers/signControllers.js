/**
 * Created by user on 20.11.2014.
 */

var signControllers = angular.module('signControllers', []);

signControllers.controller('SignInCtrl', ['$scope', '$window', 'Sign', function($scope, $window, Sign) {
    $scope.alert = undefined;

    $scope.closeAlert = function() {
        $scope.alert = undefined;
    };

    $scope.submitted = false;

    $scope.submitForm = function (isValid) {
        $scope.submitted = true;
        if(isValid) {
            var success = function(data) {
                if(data[0] === true){
                    $window.location.href = '/';
                } else {
                    $scope.alert = { msg: data[1], type: 'danger'};
                }
            };

            var error = function(data) {
                $scope.alert = { msg: 'Some problems.', type: 'danger'};
            };

            Sign.signIn($scope.user, success, error);
        }
    }

}]);

signControllers.controller('SignUpCtrl', ['$scope', '$window', 'Sign', function($scope, $window, Sign) {

	$scope.user = {
		email: '',
		password: '',
		password_confirm: ''
	}

    $scope.alert = undefined;

    $scope.submitted = false;

    $scope.closeAlert = function() {
        $scope.alert = undefined;
    };

    $scope.submitForm = function (isValid) {
        $scope.submitted = true;

        if(isValid && $scope.confirm()) {
            var success = function(data) {
            	console.log(data);
                if(data[0] === true){
                    $window.location.href = '/';
                } else {
                    $scope.alert = { msg: data[1], type: 'danger'};
                }
            };

            var error = function(data) {
                $scope.alert = { msg: 'Some problems.', type: 'danger'};
            };

            Sign.signUp($scope.user, success, error);
        }
    }

    $scope.confirm = function(){
    	return ($scope.user.password === $scope.user.password_confirm);
    };

}]);