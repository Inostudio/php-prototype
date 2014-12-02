var adminControllers = angular.module('adminControllers', ['ui.grid', 'ui.grid.edit']);


adminControllers.controller('AdminCtrl', ['$scope',
  function($scope) {
      
 }]);
 
adminControllers.controller('GroupCtrl', ['$scope', 'Group', 'AddGroup', 'RemoveGroup', 'EditGroup', '$alert',
    function($scope, Group, AddGroup, RemoveGroup, EditGroup, $alert) {
        
    var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container'});
    var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
    
    //Удаление
    $scope.$on('EventForDropGroup', function (event, id) {
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
    
    //Redirect to permission
    $scope.$on('EventForRedirectToCroupOptions', function (event, id) {
        alertError.hide();
        alertSuccess.hide();
        
        window.location = '#/groups/' + id;
    });
    //Grid
    $scope.gridOptions = { enableFiltering: true };
      $scope.gridOptions.columnDefs = [
          { name: 'id', enableCellEdit: false, width: '5%', enableFiltering: false },
          { name: 'title', displayName: 'Title', width: '20%' },
          { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false },
          { name: 'permissioms', displayName: 'Permissions' , width: '15%', enableFiltering: false,  enableSorting: false, 
            cellTemplate: '<span class="fa fa-edit" ng-click="$emit(\'EventForRedirectToCroupOptions\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>'},
          { name: 'remove', displayName: 'Remove' , width: '10%', enableCellEdit: false, enableFiltering: false, enableSorting: false,
              cellTemplate: '<span class="fa fa-close" ng-click="$emit(\'EventForDropGroup\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>' }
    ];
      //$scope.gridOptions.data = [];1
    $scope.msg = {};
    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
       //$scope.gridApi = gridApi;
       gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            //console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
            alertError.hide();
            alertSuccess.hide();
            
            //Редактирование-----///
            var oldGroup = '';
            
            var k = 0;
            var flag = 0;
            angular.forEach($scope.gridOptions.data, function(group) {  //Находим редактируемую группу и её положение
                
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
                angular.forEach($scope.gridOptions.data, function(group) {  //Проверяем, существует ли группа с таким именем
                    if ((group.title === newValue.trim()) && (group.id !== rowEntity.id)) {
                        i++;
                        isExistsEdit = 1;
                    }   
                });
                if(isExistsEdit){
                    alertError = $alert({title: 'The title has already been taken.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                    $scope.gridOptions.data[k].title = oldValue;
                } else {
                    if(newValue.trim() === ''){
                        alertError = $alert({title: 'Field title is empty!', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                        $scope.gridOptions.data[k].title = oldValue;
                    } else {
                        if(oldValue !== newValue)
                        {
                            EditGroup.query({groupId: rowEntity.id, title: newValue, groupDescription: oldGroup.description}, function(answer){
                                if(answer[0] === false){
                                    alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                                } else
                                {
                                    alertSuccess = $alert({title: 'Group has been successfully edited', placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                                }
                            });
                        }
                    }
                }
                
            } else {
                if((newValue !== null) && (newValue.trim() != oldValue)) {
                    EditGroup.query({groupId: rowEntity.id, title: oldGroup.title, groupDescription: newValue}, function(answer){
                        if(answer[0] === false){
                            alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
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
    
    //Получение
    Group.queryInfo(function(res){
      $scope.gridOptions.data = res;
    });
    
    //Добавление    
    $scope.addGroup = function(){
        var isExists = 0;
        alertError.hide();
        alertSuccess.hide();
        
        angular.forEach($scope.gridOptions.data, function(group) {
            if (group.title === $scope.groupName){ 
                alertError = $alert({title: 'The title has already been taken. ', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                isExists = 1;
            }
        });
        if(isExists){
            return;
        }
        if(($scope.groupName == null) || ($scope.groupName.trim() === "")){
            alertError = $alert({title: 'The title field is required.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
            return;
        }
        
        AddGroup.query({title: $scope.groupName, groupDescription: $scope.groupDescription}, function(answer){
            if(answer.res){    
              $scope.gridOptions.data.push({title: $scope.groupName, description: $scope.groupDescription, id: answer.id}); 
              $scope.groupName = "";
              $scope.groupDescription = "";
              alertSuccess = $alert({title: 'Group has been successfully added', placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
            } else {
                alertError = $alert({title: answer.message, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
            }
        });
    };
    
  }]);
  
adminControllers.controller('PermissionCtrl', ['$scope', '$alert', 'Permission', 'AddPermission', 'RemovePermission', 'EditPermission',
    function($scope, $alert, Permission, AddPermission, RemovePermission, EditPermission) {
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container_perm'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_perm'});
        
        $scope.gridOptions_perm = { enableFiltering: true };
        $scope.gridOptions_perm.columnDefs = [
            { name: 'id', enableCellEdit: false, width: '2%', enableFiltering: false },
            { name: 'title', displayName: 'Title', width: '20%' },
            { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false },
            { name: 'remove', displayName: 'Remove' , width: '5%', enableCellEdit: false, enableFiltering: false, enableSorting: false,
              cellTemplate: '<span class="fa fa-close" ng-click="$emit(\'EventForDrop_perm\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>' }
        ];
      
        //Получение
        Permission.queryInfo(function(res){
          $scope.gridOptions_perm.data = res;
          //console.log(res);
        });
      
        //Добавление
        $scope.addPermission = function(){
          var isExists = 0;
          alertError.hide();
          alertSuccess.hide();

          angular.forEach($scope.gridOptions_perm.data, function(permission) {
              if (permission.title === $scope.permissionName){ 
                  alertError = $alert({title: 'The title has already been taken. ', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                  isExists = 1;
              }
          });
          if(isExists){
              return;
          }
          
          if(($scope.permissionName == null) || ($scope.permissionName.trim() === "")){
                alertError = $alert({title: 'The title field is required.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                return;
          }

          AddPermission.query({title: $scope.permissionName, permissionDescription: $scope.permissionDescription}, function(answer){
              if(answer.res){    
                $scope.gridOptions_perm.data.push({title: $scope.permissionName, description: $scope.permissionDescription, id: answer.id}); 
                $scope.permissionName = "";
                $scope.permissionDescription = "";
                alertSuccess = $alert({title: 'Permission has been successfully added', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
              } else {
                  alertError = $alert({title: answer.message, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
              }
          });
        };
        
        //Удаление
        $scope.$on('EventForDrop_perm', function (event, id) {
            alertError.hide();
            alertSuccess.hide();

            RemovePermission.query({permissionId: id}, function(answer){
                if(answer[0])
                {
                    alertSuccess = $alert({title: 'Permission has been successfully removed', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
                    var oldPermissions = $scope.gridOptions_perm.data;
                    $scope.gridOptions_perm.data = [];
                    angular.forEach(oldPermissions, function(permission) {
                      if (permission.id !== id) 
                          $scope.gridOptions_perm.data.push(permission);
                    });
                }
            });
        });
        
        //Редактирование
        $scope.msg = {};
        $scope.gridOptions_perm.onRegisterApi = function(gridApi){
            //set gridApi on scope
           //$scope.gridApi = gridApi;
           gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
                console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
                alertError.hide();
                alertSuccess.hide();

                //Редактирование-----///
                var oldPermission = '';

                var k = 0;
                var flag = 0;
                angular.forEach($scope.gridOptions_perm.data, function(permission) {    //Находим редактируемое право и его положение

                    if ((permission.id === rowEntity.id)) {
                        oldPermission = permission;
                        flag = 1;
                        return false;
                    }  
                    if(!flag)
                        k++;
                });

                var isExistsEdit = 0;
                if(colDef.name === 'title'){
                    var i = 0;  
                    angular.forEach($scope.gridOptions_perm.data, function(permission) {    //Проверяем, существует ли право с таким именем
                        if ((permission.title === newValue.trim()) && (permission.id !== rowEntity.id)) {
                            i++;
                            isExistsEdit = 1;
                        }   
                    });
                    if(isExistsEdit){
                        alertError = $alert({title: 'The title has already been taken.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                        $scope.gridOptions_perm.data[k].title = oldValue;
                    } else {
                        if(newValue.trim() === ''){
                            alertError = $alert({title: 'Field title is empty!', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                            $scope.gridOptions_perm.data[k].title = oldValue;
                        } else {
                            if(oldValue !== newValue)
                            {
                                //alert("Title");
                                EditPermission.query({permissionId: rowEntity.id, title: newValue, permissionDescription: oldPermission.description}, function(answer){
                                    if(answer[0] === false){
                                        alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                                    } else
                                    {
                                        alertSuccess = $alert({title: 'Permission has been successfully edited', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
                                    }
                                });
                            }
                        }
                    }

                } else {
                    if((newValue !== null) && (newValue.trim() != oldValue)) {
                        //alert("Description");
                        EditPermission.query({permissionId: rowEntity.id, title: oldPermission.title, permissionDescription: newValue}, function(answer){
                            if(answer[0] === false){
                                alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                            } else
                            {
                                alertSuccess = $alert({title: 'Permission has been successfully edited', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
                            }
                        });
                    }
                }
                $scope.$apply();
              });
        };
    }
]);

adminControllers.controller('GroupOptionsCtrl', ['$scope', '$routeParams', 'GroupOptions', '$alert', 'ChangePermissionsInGroup',
    function($scope, $routeParams, GroupOptions, $alert, ChangePermissionsInGroup) {
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_option'});
        
        $scope.gridOptions_groupOptions = { enableFiltering: true };
        $scope.gridOptions_groupOptions.columnDefs = [
            { name: 'id', displayName: 'Id', enableCellEdit: false, width: '5%', enableFiltering: false },
            { name: 'title', displayName: 'Title', width: '10%', enableCellEdit: false },
            { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false, enableCellEdit: false },
            { name: 'accept', displayName: 'Accept' , width: '5%', enableFiltering: false, enableCellEdit: false,
                cellTemplate: '<span class="fa" ng-class="{\' fa-check\': row.entity.accept, \'fa-close \':!row.entity.accept}" ng-click="$emit(\'EventChangeGroup\', row.entity.id, row.entity.accept)" style="cursor: pointer; padding-left: 40%;"></span>'}
        ];
        
        //cellTemplate: '<span ng-click="$emit(\'EventChangeGroup\', row.entity.id)" style="cursor: pointer; padding-left: 40%;">{{row.entity.accept}}</span>'
        GroupOptions.query({groupId: $routeParams.groupId}, function(answer){
            $scope.groupTitle = answer[0].title;
            $scope.groupDescription = answer[0].description;
            $scope.groupId = answer[0].id;
            
            angular.forEach(answer[2][0], function(permission) {
                permission.accept = 0;
                angular.forEach(answer[1][0], function(group) {
                    if(group.permission_id === permission.id){
                        permission.accept = 1;
                        isAccept = 1;
                    }
                });
            });
            
            $scope.gridOptions_groupOptions.data = answer[2][0];
            
        });
        
        
        
        $scope.$on('EventChangeGroup', function (event, id, accept) {
            alertSuccess.hide();
            ChangePermissionsInGroup.query({groupId: $scope.groupId, accept : accept, permId: id}, function(answer){
                if(answer[0]){
                    angular.forEach($scope.gridOptions_groupOptions.data, function(permission) {    //Проверяем, существует ли право с таким именем
                        if(permission.id === id){
                            if(accept){
                                permission.accept = 0;
                                alertSuccess = $alert({title: 'Right has been successfully removed', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option', duration: 3});
                            }
                            else {
                                permission.accept = 1;
                                alertSuccess = $alert({title: 'Right has been successfully accepted', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option', duration: 3});
                            }
                        }
                    });
                }
            });
            
        });   
        
}]);