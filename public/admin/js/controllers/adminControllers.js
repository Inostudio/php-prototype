var adminControllers = angular.module('adminControllers', ['ui.grid', 'ui.grid.edit','mgcrea.ngStrap',
    'mgcrea.ngStrap.alert']);


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
    $scope.$on('EventForRedirectToGroupOptions', function (event, id) {
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
          { name: 'permissions', displayName: 'Permissions' , width: '15%', enableFiltering: false,  enableSorting: false, enableCellEdit: false,//permissioms
            cellTemplate: '<span class="fa fa-edit" ng-click="$emit(\'EventForRedirectToGroupOptions\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>'},
          { name: 'remove', displayName: 'Remove' , width: '10%', enableCellEdit: false, enableFiltering: false, enableSorting: false,
              cellTemplate: '<span class="fa fa-close" ng-click="$emit(\'EventForDropGroup\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>' }
    ];
      //$scope.gridOptions.data = [];
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
                //console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
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
        
        //Получение
        GroupOptions.query({groupId: $routeParams.groupId}, function(answer){
            $scope.groupTitle = answer[0].title;
            $scope.groupDescription = answer[0].description;
            $scope.groupId = answer[0].id;
            
            //console.log(answer);
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
        
        //Изменение разрешений группы
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

adminControllers.controller('UsersCtrl', ['$scope', '$alert', 'User', 'AddUser', 'RemoveUser', 'EditUser',
    function($scope, $alert, User, AddUser, RemoveUser, EditUser) {
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container-for-users'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container-for-users'});
        
        $scope.unavailable = false;
        
        //$scope.users_grid = { enableFiltering: true };
        $scope.users_grid = {
            /*pagingPageSizes: [25, 50, 75],
            pagingPageSize: 25,*/
            enableFiltering: false
        };
        
        $scope.users_grid.columnDefs = [
            { name: 'id', enableCellEdit: false, width: '8%'},
            { name: 'email', enableCellEdit: true, width: '15%'},
            { name: 'firstName', enableCellEdit: false, width: '10%'},
            { name: 'lastName', enableCellEdit: false, width: '10%'},
            { name: 'phone', enableCellEdit: false, width: '20%', enableSorting: false},
            { name: 'groups', displayName: 'Groups' , width: '8%', enableCellEdit: false,  enableSorting: false,
                cellTemplate: '<span class="fa fa-edit" ng-click="$emit(\'EventForRedirectToUserOptions\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>'},
            { name: 'remove', displayName: 'Remove' , width: '8%', enableCellEdit: false, enableFiltering: false, enableSorting: false,
              cellTemplate: '<span class="fa fa-close" ng-click="$emit(\'EventForDropUser\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>' }
        ];
        //Получение
        $scope.currentPage = 1;
        var offset = 0;
        var limit =  5;
        User.queryInfo({lim: limit, off: offset}, function(res){
            var arr  = [];
            //console.log(res);
            angular.forEach(res[0], function(user) {
                arr.push(user);
            });
            $scope.users_grid.data = arr;

            $scope.countUsers = res[1];
            $scope.totalPage = Math.ceil(res[1] / limit);
        });
        
        $scope.nextPage = function(){
            if(($scope.currentPage + 1) <= $scope.totalPage) {
                $scope.currentPage++;
                $scope.unavailable = true;
                offset += limit;
                User.queryInfo({lim: limit, off: offset}, function(res){
                    var arr  = [];
                    angular.forEach(res[0], function(user) {
                        arr.push(user);
                    });
                    $scope.users_grid.data = arr;
                    $scope.unavailable = false;
                    //console.log(res);
                });
            }
            //console.log($scope.currentPage * limit);
            //console.log($scope.countUsers);
        };
        
        $scope.prevPage = function(){
            if(($scope.currentPage - 1) >= 1) {
                $scope.currentPage--;
                $scope.unavailable = true;
                offset -= limit;
                User.queryInfo({lim: limit, off: offset}, function(res){
                    var arr  = [];
                    angular.forEach(res[0], function(user) {
                        arr.push(user);
                    });
                    $scope.users_grid.data = arr;
                    $scope.unavailable = false;
                });
                $scope.totalPage = Math.ceil($scope.countUsers / limit);
            }
        };
        
        //Добавление
        $scope.addUser = function(){
            alertError.hide();
            alertSuccess.hide();
            
            if($scope.email === undefined){
                alertError = $alert({title: 'The email field is required.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                return;
            }
            
            if(($scope.userPassword === undefined) || ($scope.userPassword === "")){
                 alertError = $alert({title: 'The password field is required.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                 return;
            }
            if(($scope.userPassword.length < 4)){
                 alertError = $alert({title: 'Minimum password length of 4 characters.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                 return;
            }
            
            if(($scope.userPassword !== $scope.userConfirmPassword)){
                 alertError = $alert({title: 'Don\'t match confirm password.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                 return;
            }
            
            AddUser.query({email: $scope.email, password: $scope.userPassword}, function(answer){
                if(!answer[0]){
                    alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                } else {
                    alertSuccess = $alert({title: 'The user has been successfully added', placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                    
                    //.log($scope.currentPage * limit);
                    //console.log($scope.countUsers);
                    if(($scope.currentPage === $scope.totalPage) &&($scope.currentPage * limit > $scope.countUsers)){
                        var newUser = {
                            id: answer[2],
                            email: $scope.email
                        };
                        $scope.users_grid.data.push(newUser);
                    }
                    $scope.countUsers++;
                    $scope.totalPage = Math.ceil($scope.countUsers / limit);
                    
                    $scope.email = "";
                    $scope.userConfirmPassword = "";
                    $scope.userPassword = "";
                }
            });
        };
        
        //Удаление
        $scope.$on('EventForDropUser', function (event, id) {
            alertError.hide();
            alertSuccess.hide();

            RemoveUser.query({userId: id}, function(answer){
                if(answer[0])
                {
                    alertSuccess = $alert({title: 'User has been successfully removed', placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                    var oldUsers = $scope.users_grid.data;

                    $scope.users_grid.data = [];
                    angular.forEach(oldUsers, function(user) {
                      if (user.id !== id) 
                          $scope.users_grid.data.push(user);
                    });
                    $scope.countUsers--;
                }
            });
        });
        
        //Редактирование
        $scope.msg = {};
        $scope.users_grid.onRegisterApi = function(gridApi){
            gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
                alertError.hide();
                alertSuccess.hide();
                
                if(newValue.trim() === ''){
                    alertError = $alert({title: 'Field email is empty!', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                    angular.forEach($scope.users_grid.data, function(user) {
                        if (user.id === rowEntity.id) 
                            user.email = oldValue;
                    });
                } else {
                    var str = newValue;
                    var a = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
                    if(str.search(a) === -1){
                        alertError = $alert({title: 'Email is invalid!', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                    } else {
                        if(newValue.trim() !== oldValue)
                        {
                            EditUser.query({userId: rowEntity.id, email: newValue}, function(answer){
                                if(answer[0] === false){
                                    alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                                } else
                                {
                                    alertSuccess = $alert({title: 'User has been successfully edited', placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                                }
                            });
                        }
                    }
                }
            });
        };
        
        $scope.$on('EventForRedirectToUserOptions', function (event, id) {
            alertError.hide();
            alertSuccess.hide();
            window.location = '#/users/' + id;
        });
}]);

adminControllers.controller('UserOptionsCtrl', ['$scope', '$alert', '$routeParams', 'UserOptions', 'ChangeGroupByUser',
    function($scope, $alert, $routeParams, UserOptions, ChangeGroupByUser) {
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_option_for_users'});
        
        $scope.gridOptions_userOptions = { enableFiltering: true };
        $scope.gridOptions_userOptions.columnDefs = [
            { name: 'id', displayName: 'Id', enableCellEdit: false, width: '5%', enableFiltering: false },
            { name: 'title', displayName: 'Title', width: '10%', enableCellEdit: false },
            { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false, enableCellEdit: false },
            { name: 'accept', displayName: 'Accept' , width: '5%', enableFiltering: false, enableCellEdit: false,
                cellTemplate: '<span class="fa" ng-class="{\' fa-check\': row.entity.accept, \'fa-close \':!row.entity.accept}" ng-click="$emit(\'EventChangeUser\', row.entity.id, row.entity.accept)" style="cursor: pointer; padding-left: 40%;"></span>'}
        ];

        //Получение
        UserOptions.query({userId: $routeParams.userId}, function(answer){
            $scope.userEmail = answer[0].email;
            $scope.lastName = answer[0].lastName;
            $scope.firstName = answer[0].firstName;
            $scope.userId = answer[0].id;
            
            angular.forEach(answer[2][0], function(group) {
                group.accept = 0;
                angular.forEach(answer[1][0], function(user) {
                    if(group.id === user.group_id){
                        group.accept = 1;
                    }
                });
            });

            $scope.gridOptions_userOptions.data = answer[2][0];
            //console.log(answer);
        });
        
        //Изменение групп пользователя
        $scope.$on('EventChangeUser', function (event, id, accept) {
            alertSuccess.hide();
            ChangeGroupByUser.query({userId: $scope.userId, accept : accept, groupId: id}, function(answer){
                if(answer[0]){
                    angular.forEach($scope.gridOptions_userOptions.data, function(group) {    //Проверяем, существует ли право с таким именем
                        if(group.id === id){
                            if(accept){
                                group.accept = 0;
                                alertSuccess = $alert({title: 'User was successfully removed from the group', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option_for_users', duration: 3});
                            }
                            else {
                                group.accept = 1;
                                alertSuccess = $alert({title: 'The user has been successfully added to the group', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option_for_users', duration: 3});
                            }
                        }
                    });
                }
            });
        });
}]);

var pagesControllers = angular.module('pagesControllers', ['ui.bootstrap']);

pagesControllers.controller('PagesCtrl', ['$scope', '$modal', 'AddPage', 'Status', 'Pages', 'GetPage', 'DeletePage', 'SavePage', function($scope, $modal, AddPage, Status, Pages, GetPage, DeletePage, SavePage) {
    var Init = function() {
        $scope.createPage = false;
        $scope.showPage = false;

        $scope.statuses = Status.query();
        $scope.pages = Pages.query();
    }();

    //Work with front
    var showAllPages = function() {
        $scope.createPage = false;
        $scope.showPage = false;
    }

    var showOnePage = function() {
        showAllPages();
        $scope.showPage = true;
    }

    var showNewPage = function() {
        showAllPages();
        $scope.createPage = true;
    }
    //---------------

    $scope.save = function(page) {
        if(page.id === undefined) {
            AddPage.query({title: page.title, body: page.body, status: page.status_id, url: page.url}, function() {
                clearNewPage()
            });
        } else {
            SavePage.query({id: page.id, title: page.title, body: page.body, status: page.status_id, url: page.url}, function() {
                clearNewPage()
            });
        }

        $scope.pages = Pages.query(function(){
            $scope.createPage = false;
        });
    }

    $scope.show = function(id) {
        $scope.page = GetPage.query({id: id}, function() {
            showOnePage();
        });
    }

    $scope.edit = function(id) {
        $scope.page = GetPage.query({id: id}, function() {
            showNewPage();
        });
    }

    var deletePage = function (id) {
        DeletePage.query({id: id}, function(res) {
            index = 0;
            for(i = 0; i < $scope.pages.length; i++) {
                if($scope.pages[i].id == id) {
                    index = i;
                    break;
                }
            }
            $scope.pages.splice(index, 1);
        });
    }

    $scope.confirmDelete = function(id) {
        var modalInstance = $modal.open({
            templateUrl: 'ConfirmDelete.html',
            controller: 'ModalConfirmDeleteCtrl',
            size: 'sm'
        });

        modalInstance.result.then(function () {
            deletePage(id);
        });
    }

    $scope.createPageAction = function() {
        clearNewPage();
        showNewPage();
    }

    $scope.showAllPages = function() {
        showAllPages();
    }

    var clearNewPage = function() {
        $scope.page = {};
    }
}]);

pagesControllers.controller('ModalConfirmDeleteCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
}]);