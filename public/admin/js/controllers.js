var adminControllers = angular.module('adminControllers', ['ui.grid', 'ui.grid.edit']);


adminControllers.controller('AdminCtrl', ['$scope',
  function($scope) {
      
 }]);
 
adminControllers.controller('GroupCtrl', ['$scope', 'Group', 'AddGroup', 'RemoveGroup', 'EditGroup', '$alert', '$http',
    function($scope, Group, AddGroup, RemoveGroup, EditGroup, $alert) {
        
    var alertError = $alert({title: '', placement: 'top-right', type: 'info', show: false, container: '#alerts-container'});
    var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
    
    //Удаление
    $scope.$on('EventForDrop', function (event, id) {
        alertError.hide();
        alertSuccess.hide();
        
        RemoveGroup.query({groupId: id}, function(answer){
            if(answer[0])
            {
                alertSuccess = $alert({title: 'Group has been successfully removed', placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                var oldGroups = $scope.gridOptions.data;
                $scope.gridOptions.data = [];
                angular.forEach(oldGroups, function(group) {
                  if (group.id !== id) 
                      $scope.gridOptions.data.push(group);
                });
            }
        });
    });
    //Grid
    $scope.gridOptions = { enableFiltering: true };
      $scope.gridOptions.columnDefs = [
          { name: 'id', enableCellEdit: false, width: '10%', enableFiltering: false },
          { name: 'title', displayName: 'Title', width: '20%' },
          { name: 'description', displayName: 'Description' , width: '10%', enableFiltering: false },
          { name: 'remove', displayName: 'Remove' , width: '5%', enableCellEdit: false, enableFiltering: false,
              cellTemplate: '<span class="fa fa-close" ng-click="$emit(\'EventForDrop\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>' }
    ];
      //$scope.gridOptions.data = [];1
    $scope.msg = {};
    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
       $scope.gridApi = gridApi;
       gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
            alertError.hide();
            alertSuccess.hide();
            
            //Редактирование-----///
            var oldGroup = '';
            
            var k = 0;
            var flag = 0;
            angular.forEach($scope.gridOptions.data, function(group) {
                
                if ((group.id === rowEntity.id)) {
                    oldGroup = group;
                    flag = 1;
                    return false;
                }  
                if(!flag)
                    k++;
            });

            var isExistsEdit = 0;
            if(colDef.name === 'title'){
                var i = 0;  
                angular.forEach($scope.gridOptions.data, function(group) {
                    if ((group.title === newValue.trim()) && (group.id !== rowEntity.id)) {
                        i++;
                        isExistsEdit = 1;
                    }   
                });
                if(isExistsEdit){
                    alertError = $alert({title: 'The title has already been taken.', placement: 'top-right', type: 'info', show: true, container: '#alerts-container'});
                    $scope.gridOptions.data[k].title = oldValue;
                } else {
                    if(newValue.trim() === ''){
                        alertError = $alert({title: 'Field title is empty!', placement: 'top-right', type: 'info', show: true, container: '#alerts-container'});
                        $scope.gridOptions.data[k].title = oldValue;
                    } else {
                        if(oldValue != newValue)
                        {
                            EditGroup.query({groupId: rowEntity.id, title: newValue, groupDescription: oldGroup.description}, function(answer){
                                if(answer[0] === false){
                                    alertError = $alert({title: answer[1], placement: 'top-right', type: 'info', show: true, container: '#alerts-container'});
                                } else
                                {
                                    alertSuccess = $alert({title: 'Group has been successfully edited', placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                                }
                            });
                        }
                    }
                }
                
            } else {
                if((newValue !== null) && (newValue.trim() !== oldValue)) {
                    EditGroup.query({groupId: rowEntity.id, title: oldGroup.title, groupDescription: newValue}, function(answer){
                        if(answer[0] === false){
                            alertError = $alert({title: answer[1], placement: 'top-right', type: 'info', show: true, container: '#alerts-container'});
                        } else
                        {
                            alertSuccess = $alert({title: 'Group has been successfully edited', placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                        }
                    });
                }
            }


            $scope.$apply();
          });
    };
      ///
    
    /*Grid ---------------End*/

    $scope.groups = Group.queryInfo(function(res){
      $scope.gridOptions.data = res;
    });
      
    $scope.addGroup = function(){
        var isExists = 0;
        alertError.hide();
        alertSuccess.hide();
        
        angular.forEach($scope.gridOptions.data, function(group) {
            if (group.title === $scope.groupName){ 
                alertError = $alert({title: 'The title has already been taken. ', placement: 'top-right', type: 'info', show: true, container: '#alerts-container'});
                isExists = 1;
            }
        });
        if(isExists){
            return;
        }
        
        AddGroup.query({title: $scope.groupName, groupDescription: $scope.groupDescription}, function(answer){
            if(answer.res){    
              $scope.gridOptions.data.push({title: $scope.groupName, description: $scope.groupDescription, id: answer.id}); 
              $scope.groupName = "";
              $scope.groupDescription = "";
              alertSuccess = $alert({title: 'Group has been successfully added', placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
            } else {
                alertError = $alert({title: answer.message, placement: 'top-right', type: 'info', show: true, container: '#alerts-container'});
            }
        });
    };
    
  }]);