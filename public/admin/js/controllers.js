var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('AdminCtrl', ['$scope',
  function($scope) {
    $scope.info = 'info';
  }]);
  
adminControllers.controller('EntityCtrl', ['$scope', function($scope){

    $scope.myData = [
        {"title": "Title 1", "text": "Text 1"},
        {"title": "Title 2", "text": "Text 2"}
    ];

}]);