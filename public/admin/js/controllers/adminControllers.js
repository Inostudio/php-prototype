var adminControllers = angular.module('adminControllers', ['ui.grid', 'ui.grid.edit',
    'mgcrea.ngStrap.alert']);


adminControllers.controller('AdminCtrl', ['$scope', function($scope) {
      
}]);
 
adminControllers.controller('GroupCtrl', ['$scope', 'Group', 'AddGroup', 'RemoveGroup', 'EditGroup', '$alert',
    function($scope, Group, AddGroup, RemoveGroup, EditGroup, $alert) {
        
    var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container'});
    var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
    
    //Удаление +++
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
    
    //Получение +++
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
            
            angular.forEach(answer[2][0], function(permission) {
                permission.accept = 0;
                angular.forEach(answer[1][0][0].permissions, function(group) {
                    if(group.id === permission.id){
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

adminControllers.controller('UsersCtrl', ['$scope', '$alert', 'User', 'AddUser', 'RemoveUser', 'EditUser', 'SearchUsers',
    function($scope, $alert, User, AddUser, RemoveUser, EditUser, SearchUsers) {
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container-for-users'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container-for-users'});
        
        $scope.unavailable = false;
        
        $scope.users_grid = {
            /*pagingPageSizes: [25, 50, 75],
            pagingPageSize: 25,*/
            enableFiltering: false
        };
        
        $scope.users_grid.columnDefs = [
            { name: 'id', enableCellEdit: false, width: '8%'},
            { name: 'email', enableCellEdit: true, width: '15%'},
            { name: 'first_name', enableCellEdit: false, width: '10%'},
            { name: 'last_name', enableCellEdit: false, width: '10%'},
            { name: 'phone', enableCellEdit: false, width: '20%', enableSorting: false},
            { name: 'groups', displayName: 'Groups' , width: '8%', enableCellEdit: false,  enableSorting: false,
                cellTemplate: '<span class="fa fa-edit" ng-click="$emit(\'EventForRedirectToUserOptions\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>'},
            { name: 'remove', displayName: 'Remove' , width: '8%', enableCellEdit: false, enableFiltering: false, enableSorting: false,
              cellTemplate: '<span class="fa fa-close" ng-click="$emit(\'EventForDropUser\', row.entity.id)" style="cursor: pointer; padding-left: 40%;"></span>' }
        ];
        
        //Получение +++
        $scope.currentPage = 1;
        var offset = 0;
        var limit =  9;
        $scope.action = 0;
        var searchText = '';
        
        getUsers(limit, offset, 'asc', 'id');
       
        $scope.nextPage = function(){
            if(($scope.currentPage + 1) <= $scope.totalPage) {
                //console.log($scope.action);
                if($scope.action === 0) {   //Обычный просмотр
                    $scope.currentPage++;
                    $scope.unavailable = true;
                    offset += limit;
                    getUsers(limit, offset, 'asc', 'id');
                } else if($scope.action === 1){     //Поиск
                    $scope.currentPage++;
                    $scope.unavailable = true;
                    offset += limit;
                    getFindUsers(searchText, limit, offset, 'asc', 'id');
                } else if($scope.action === 2){         //сортировка
                    $scope.currentPage++;
                    $scope.unavailable = true;
                    offset += limit; 
                    getUsers(limit, offset, $scope.direction, $scope.field);
                } else if ($scope.action === 3) {   //Сортировка с поиском
                    $scope.currentPage++;
                    $scope.unavailable = true;
                    offset += limit;
                    getFindUsers(searchText, limit, offset, $scope.dirFindSort, $scope.fieldFindSort);
                }
            }
        };
        
        $scope.prevPage = function(){
            
            if(($scope.currentPage - 1) >= 1) {
                if($scope.action === 0)     //Обычный просмотр
                {
                    $scope.currentPage--;
                    $scope.unavailable = true;
                    offset -= limit;
                    getUsers(limit, offset, 'asc', 'id');
                } else if ($scope.action === 1){            //Поиск
                    $scope.currentPage--;
                    $scope.unavailable = true;
                    offset -= limit;
                    getFindUsers(searchText, limit, offset, 'asc', 'id');
                } else if($scope.action === 2) {            //сортировка
                    $scope.currentPage--;
                    $scope.unavailable = true;
                    offset -= limit;
                    console.log(offset, limit);
                    getUsers(limit, offset, $scope.direction, $scope.field); 
                } else if ($scope.action === 3) {   //Сортировка с поиском
                    $scope.currentPage--;
                    $scope.unavailable = true;
                    offset -= limit;
                    getFindUsers(searchText, limit, offset, $scope.dirFindSort, $scope.fieldFindSort);
                }
            }
        };
        
        //Добавление +++
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
                         
                        $scope.countUsers++;
                        $scope.totalPage = Math.ceil($scope.countUsers / limit);
                        //console.log('$scope.totalPage: ' + $scope.totalPage);
                    } else {
                        $scope.countUsers++;
                        $scope.totalPage = Math.ceil($scope.countUsers / limit);
                        
                        offset = limit * ($scope.totalPage-1);
                        $scope.currentPage = $scope.totalPage;
                        getUsers(limit, offset, 'asc', 'id');              
                    }
                    
                    $scope.email = "";
                    $scope.userConfirmPassword = "";
                    $scope.userPassword = "";
                    
                }
            });
        };
        
        
        //Удаление +++
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
        
        //Редактирование +++
        $scope.msg = {};
        $scope.users_grid.onRegisterApi = function(gridApi){
            //Редактирование
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
            
            //Сортировка
            gridApi.core.on.sortChanged($scope, function(arg1, arg2) {
                console.log($scope.action);
                if(arg2.length !== 0){
                    if(($scope.action === 1) || ($scope.action === 3)){    //Сортировка с поиском
                        $scope.currentPage = 1;
                        $scope.action = 3;
                        $scope.dirFindSort = arg2[0].sort.direction;
                        $scope.fieldFindSort = arg2[0].name;
                        
                        offset = 0;
                        getFindUsers(searchText, limit, offset, $scope.dirFindSort, $scope.fieldFindSort);                      
                    } else {
                        $scope.currentPage = 1;
                        $scope.action = 2;
                        $scope.field = arg2[0].name;
                        $scope.direction = arg2[0].sort.direction;
                        offset = 0;
                        getUsers(limit, offset, $scope.direction, $scope.field);  
                    }
                }
            });                       
        };
    
        $scope.$on('EventForRedirectToUserOptions', function (event, id) {
            alertError.hide();
            alertSuccess.hide();
            window.location = '#/users/' + id;
        });
        
        $scope.search = function(){
            $scope.action = 1;  //Установка действия
            offset = 0;
            searchText = $scope.searchText;
            SearchUsers.query({text: searchText, lim: limit, off: offset, direction: 'asc', field: 'id'}, function(res){
                arr = [];
                angular.forEach(res[0], function(user) {
                    user.first_name = user.profile.first_name;
                    user.last_name = user.profile.last_name;
                    user.phone = user.profile.phone;
                    arr.push(user);
                });
                $scope.users_grid.data = arr;

                $scope.countUsers = res[1];
                $scope.totalPage = Math.ceil(res[1] / limit);
            });
            $scope.currentPage = 1;
        };
        
        $scope.reset = function(){
            $scope.action = 0;  //Установка обычного просмотра
            $scope.searchText = "";
            offset = 0;
            
            //Делаем запрос
            getUsers(limit, offset, 'asc', 'id');          
            $scope.currentPage = 1;
        };
        
        //Запрос пользователей(Просто запрос, сортировка)
        function getUsers(limit, offset, direction, field){
            User.queryInfo({lim: limit, off: offset, direction: direction, field: field}, function(res){
                var arr  = [];
                //console.log(res);
                                
                angular.forEach(res[0], function(user) {
                    user.first_name = user.profile.first_name;
                    user.last_name = user.profile.last_name;
                    user.phone = user.profile.phone;
                    arr.push(user);
                });
                $scope.users_grid.data = arr;

                $scope.countUsers = res[1];
                $scope.totalPage = Math.ceil(res[1] / limit);
                $scope.unavailable = false;
            });
        };
        
        function getFindUsers(searchText, limit, offset, direction, field){
            SearchUsers.query({text: searchText, lim: limit, off: offset, direction: direction, field: field}, function(res){
                arr = [];
                angular.forEach(res[0], function(user) {
                    user.first_name = user.profile.first_name;
                    user.last_name = user.profile.last_name;
                    user.phone = user.profile.phone;
                    arr.push(user);
                });
                $scope.users_grid.data = arr;

                $scope.countUsers = res[1];
                $scope.totalPage = Math.ceil(res[1] / limit);
                $scope.unavailable = false;
            });
        };
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

        //Получение групп, в которых состоит пользователь+++
        UserOptions.query({userId: $routeParams.userId}, function(answer){
            //console.log(answer);
            $scope.userEmail = answer[0].email;
            $scope.lastName = answer[0].profile.last_name;
            $scope.firstName = answer[0].profile.first_name;
            $scope.userId = answer[0].id;
            
            angular.forEach(answer[2][0], function(group) {
                group.accept = 0;
                angular.forEach(answer[1][0][0].groups, function(user) {
                    if(group.id === user.id){
                        group.accept = 1;
                    }
                });
            });

            $scope.gridOptions_userOptions.data = answer[2][0];
            //console.log(answer);
        });
        
        //Включение/исключение пользователя из группы+++
        $scope.$on('EventChangeUser', function (event, id, accept) {
            alertSuccess.hide();
            ChangeGroupByUser.query({userId: $scope.userId, accept : accept, groupId: id}, function(answer){
                //console.log(answer);
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

adminControllers.controller('ResourcesCtrl', ['$scope', 'AddResource', 'AllResource', 'DeleteResource', '$alert', function($scope, AddResource, AllResource, DeleteResource, $alert) {

    var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container'});
    var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});

    $scope.resource = {
        title: '',
        file: ''
    };

    $scope.resources = [];
    
    

    function getAllResources() {
        $scope.resources = AllResource.query(function(res){
            //console.log(res);
            $scope.gridOptions_resourcesGrid.data = res;
        });
    };
    getAllResources();

    $scope.gridOptions_resourcesGrid = { enableFiltering: true, rowHeight: 110 };
    
    $scope.gridOptions_resourcesGrid.columnDefs = [
        { name: 'title', displayName: 'Title', width: '2%', enableCellEdit: false },
        { name: 'url', displayName: 'Url' , width: '15%', enableFiltering: false, enableCellEdit: false, enableSorting: false },
        { name: 'view', displayName: 'View' , width: '15%', enableCellEdit: false, enableFiltering: false, enableSorting: false, 
            cellTemplate: '<img ng-src="{{row.entity.url}}" style="max-height: 150px; max-width: 150px; margin-left: 25%">' },
        { name: 'action', displayName: 'Action' , width: '5%', enableCellEdit: false, enableFiltering: false, enableSorting: false, 
            cellTemplate: '<button class="btn" ng-click="$emit(\'EventForDropResource\', row.entity.id)" style="margin-left: 25%; margin-top: 20%">Delete</button>'}
    ];
    
    $scope.$on('EventForDropResource', function (event, id) {
        $scope.delete(id);
    });
    
    $scope.add = function(resource) {
        if(resource.file === '') {
            $alert({title: 'Please select a file', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container', duration: 3});
        } else {
            AddResource.query({
                title: resource.title,
                file: resource.file
            }, function(res) {
                console.log(res);
                if(res[0] === true) {
                    console.log(res[1]);
                    $scope.resources.push(res[1]);
                    $alert({title: 'The resource has been successfully added', placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});

                    $scope.resource = {
                        title: '',
                        file: ''
                    };
                    angular.element(document.querySelector('#fileInput')).val(null);
                } else {
                    $alert({title: res[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container', duration: 3});
                }
            });
        }
    };

    $scope.delete = function(id) {
        DeleteResource.query({id: id}, function (res) {
            console.log(res);
            if(res[0] === true) {
                var index = 0;
                for(i = 0; i < $scope.resources.length; i++) {
                    if($scope.resources[i].id === id) {
                        index = i;
                        break;
                    }
                }
                $scope.resources.splice(index, 1);
                $alert({title: 'The resource has been successfully deleted', placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
            } else {
                $alert({title: res[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container', duration: 3});
            }
        });
    };

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.resource.file = evt.target.result;
        };
        reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);


}]);

var pagesControllers = angular.module('pagesControllers', ['mgcrea.ngStrap', 'ui.grid', 'ui.grid.edit']);

pagesControllers.controller('PagesCtrl', ['$scope', '$alert', '$modal', 'AddPage', 'Status', 'Pages',
    'GetPage', 'DeletePage', 'SavePage', '$window', '$location', '$rootScope', function($scope, $alert, $modal, AddPage, Status, Pages, GetPage, DeletePage, SavePage, $window, $location, $rootScope) {
     
    var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_for_pages'});
     
    $scope.gridOptions_pagesGrid = { enableFiltering: true, rowHeight: 65 };
    
    $scope.gridOptions_pagesGrid.columnDefs = [
        { name: 'title', displayName: 'Title', width: '10%', enableCellEdit: false },
        { name: 'body', displayName: 'Short content' , width: '30%', enableFiltering: false, enableCellEdit: false },
        { name: 'url', displayName: 'Url' , width: '5%', enableCellEdit: false},
        { name: 'status', displayName: 'Status' , width: '5%', enableFiltering: false, enableCellEdit: false,
            cellTemplate: '<p class="form-control" style="width: 50%; margin-left: 25%; margin-top: 10%">{{row.entity.status}}</p>'},
        { name: 'actions', displayName: 'Actions' , width: '5%', enableFiltering: false, enableCellEdit: false,
            cellTemplate: '<p ng-click="$emit(\'EventForEditPage\', row.entity.id)" class="actionCol" style="margin-left: 30%">Edit</p>\n\
                <p ng-click="$emit(\'EventForDropPage\', row.entity.id)" class="actionCol" style="margin-left: 25%">Delete</p>\n\
                <p ng-click="$emit(\'EventForShowPage\', row.entity.url)" class="actionCol" style="margin-left: 28%">Show</p>'
    }];
   
   //+++
    $scope.$on('EventForDropPage', function (event, id) {
        $scope.modal = $modal({
            show: true,
            contentTemplate: 'ConfirmDelete.html'
        });
        $scope.del = id;
    });
    
    //+++
    $scope.$on('EventForEditPage', function (event, id) {
        $scope.page = GetPage.query({id: id}, function(res) {
            $rootScope.page = res;
            $rootScope.pageActions = 'Edit static page';
            
            $scope.modalEditPage = $modal({
                show: true,
                contentTemplate: 'EditPage.html'
            });
            //console.log(res);
        });
    });
    
    $scope.$on('EventForShowPage', function(event, url){
        $window.open('http://' + $location.host() + ':' + $location.port() + '/' + url);
    });
    
    //+++    
    var arr = []; 
    var Init = function() {
        $scope.submitted = false;
        $scope.urlRule = /^\w+$/;

        $scope.createPage = false;
        $scope.showPage = false;

        arr = [];
        Pages.query(function(res){
            $rootScope.statuses = res[1];
            angular.forEach(res[0], function(page) {
                arr.push({
                    'title': page.title, 
                    'body': page.body, 
                    'url': page.url, 
                    'status': res[1][page.status_id - 1].title,
                    'id': page.id
                });
            });
            
            $scope.gridOptions_pagesGrid.data = arr;
            //console.log(res);
        });
    }();
    

    $scope.save = function(page, valid) {
        alertSuccess.hide();
        if(valid)
        {
            $scope.modalEditPage.hide();

            if(page.id === undefined) {
                AddPage.query({title: page.title, body: page.body, status: page.status_id, url: page.url}, function(res) {
                    arr.push({id: res[0], title: page.title, body: page.body, status: $rootScope.statuses[page.status_id - 1].title, url: page.url});
                    alertSuccess = $alert({title: 'Page has been added successfully', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_for_pages', duration: 3});
                });
            } else {
                SavePage.query({id: page.id, title: page.title, body: page.body, status: page.status_id, url: page.url}, function() {
                    for(i=0; i < arr.length; i++){
                        if(page.id === arr[i].id){
                            arr[i] = page;
                            arr[i].status = $rootScope.statuses[page.status_id - 1].title;
                        }
                    }
                });
                alertSuccess = $alert({title: 'The page has been successfully edited', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_for_pages', duration: 3});
            }
        }
    };
    
    //+++
    var deletePage = function (id) {
        DeletePage.query({id: id}, function(res) {
            index = 0;
            for(i = 0; i < arr.length; i++) {
                if(arr[i].id === id) {
                    index = i;
                    break;
                }
            }
            arr.splice(index, 1);
            $scope.gridOptions_pagesGrid.data = arr;
        });
    };  
   
    $rootScope.$on('modal-ok', function(){
        alertSuccess.hide();
        deletePage($scope.del);
        $scope.modal.hide();
        alertSuccess = $alert({title: 'The page has been successfully removed', placement: 'top-right', type: 'success', show: true, container: '#alerts-container_for_pages', duration: 3});
    });
    
    $rootScope.$on('modal-cancel', function(){
        $scope.modal.hide();
    });
    
    $rootScope.$on('edit-cancel', function(){
        $scope.modalEditPage.hide();
    });
    
    $rootScope.$on('edit-ok', function(event, arg1, arg2){
        $rootScope.submitted = true;
        $scope.save(arg1, arg2);
    });
    
    $scope.createPage = function(){
        $rootScope.submitted = false;
        $rootScope.page = {};
        $rootScope.pageActions = 'Create new static page';
        $scope.modalEditPage = $modal({
            show: true,
            contentTemplate: 'EditPage.html'
        });
    };
 }]);
