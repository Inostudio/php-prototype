var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('AdminCtrl', ['$scope',
  function($scope) {
  }]);
  
  adminControllers.controller('GroupCtrl', ['$scope', 'Group', 'AddGroup', 'RemoveGroup',
  function($scope, Group, AddGroup, RemoveGroup) {
      
      $scope.groups = Group.queryInfo(function(res){
          angular.forEach(res, function(elem) {
            elem.newTitle = elem.title;
            elem.newDescritpion = elem.description;
        }); 
      });
  
      
          
      $scope.addGroup = function(){
          
          AddGroup.query({title: $scope.groupName, groupDescription: $scope.groupDescription}, function(answer){
              if(answer.res){    
                $scope.groups.push({title: $scope.groupName, description: $scope.groupDescription, id: answer.id}); 
                $scope.groupName = "";
                $scope.groupDescription = "";
              }
          });
      };
      
      $scope.removeGroup = function(group){
          RemoveGroup.query({groupId: group.id}, function(answer){
              group.id = 0;
              
              var oldGroups = $scope.groups;
              $scope.groups = [];
              angular.forEach(oldGroups, function(group) {
                if (group.id != 0) $scope.groups.push(group);
              });
              
              
          });
      };
      
      $scope.editGroup = function(group){
          //if(group.title != "")
      };
      
  }]);
  
 
    adminControllers.directive('contenteditable', function() {
      return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
          // вид -> модель
          elm.bind('blur', function() {
            scope.$apply(function() {
              ctrl.$setViewValue(elm.html());
              //console.log(ctrl);
            });
          });

          // модель -> вид
          ctrl.$render = function(value) {
            elm.html(value);
          };

          // загрузка начального значения из DOM
          ctrl.$setViewValue(elm.html());
        }
      };
    });