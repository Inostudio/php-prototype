/**
 * Created by user on 21.11.2014.
 */

var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

profileControllers.controller('ShowCtrl', ['$scope', function($scope) {
}]);

profileControllers.controller('EditCtrl', ['$scope', function($scope) {
}]);

profileControllers.controller('PhotoCtrl', ['$scope', function($scope) {
}]);