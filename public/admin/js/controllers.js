var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('AdminCtrl', ['$scope',
  function($scope) {
  }]);
  
  adminControllers.controller('GroupCtrl', ['$scope', 'Group', 'AddGroup', 'RemoveGroup', 'EditGroup', '$alert', '$http',
  function($scope, Group, AddGroup, RemoveGroup, EditGroup, $alert, $http) {
      var alertError = $alert({title: '', placement: 'top', type: 'info', show: false, container: '#alerts-container'});
      
      //Grid
      $scope.gridOptions = {  };
        $scope.gridOptions.columnDefs = [
            { name: 'id', enableCellEdit: false, width: '10%' },
            { name: 'title', displayName: 'Title', width: '20%' },
            { name: 'description', displayName: 'Description' , width: '10%' },
      ];
      $scope.gridOptions.data = [];
      
        $scope.msg = {};

        $scope.gridOptions.onRegisterApi = function(gridApi){
          //set gridApi on scope
          $scope.gridApi = gridApi;
          gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
            $scope.$apply();
          });
        };
      ///
      
      $scope.groups = Group.queryInfo(function(res){
        $scope.gridOptions.data = res;
      });
          
      $scope.addGroup = function(){
          alertError.hide();
          AddGroup.query({title: $scope.groupName, groupDescription: $scope.groupDescription}, function(answer){
              if(answer.res){    
                $scope.groups.push({title: $scope.groupName, description: $scope.groupDescription, id: answer.id}); 
                $scope.groupName = "";
                $scope.groupDescription = "";
              } else {
                  //alert(answer.message);
                  alertError = $alert({title: answer.message, placement: 'top', type: 'info', show: true, container: '#alerts-container'});
              }
          });
      };
      
      $scope.removeGroup = function(group){
          RemoveGroup.query({groupId: group.id}, function(answer){
              group.id = 0;
              
              var oldGroups = $scope.groups;
              $scope.groups = [];
              angular.forEach(oldGroups, function(group) {
                if (group.id != 0) 
                    $scope.groups.push(group);
              });
              
              
          });
      };
      
      $scope.editGroup = function(group, contentTitle, contentDescription){
          alertError.hide();
          if(contentTitle == "{{group.title}}")
          {
              contentTitle = group.title;
          }
          
          if(contentDescription == "{{group.description}}")
          {
              contentDescription = group.description;
          }
            EditGroup.query({groupId: group.id, title: contentTitle, groupDescription: contentDescription}, function(answer){
                if(answer[0] == false){
                    $scope.groups = answer[2];
                    //alert(answer[1]);
                    alertError = $alert({title: answer[1], placement: 'top', type: 'info', show: true, container: '#alerts-container'});
                }
                //console.log(answer);
          });
        
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
//          console.log(scope);
//          console.log(elm);
//          console.log(attrs);
//          console.log(ctrl);
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
 
