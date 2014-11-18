var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('AdminCtrl', ['$scope',
  function($scope) {
    $scope.info = 'info';
  }]);