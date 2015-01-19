var adminControllers = angular.module('adminControllers', ['ui.grid', 'ui.grid.edit',
    'mgcrea.ngStrap.alert']);

adminControllers.directive('spanremove', function() {
    return {
        restrict: 'E',

        template: '<span style="cursor: pointer; padding-left: 40%" class="fa fa-close"></span>',
        replace: true,

        link: function($scope, element, attrs) {
            element.on('click', function(args) {
                var action = args['target']['attributes']['remove-action'].value;
                var removeId = args['target']['attributes']['remove-id'].value;
                $scope.$emit(action, removeId);
            });
        }
    };
});
adminControllers.directive('spanedit', function() {
    return {
        restrict: 'E',

        template: '<span class="fa fa-edit" style="cursor: pointer; padding-left: 40%"></span>',
        replace: true,

        link: function($scope, element, attrs) {
            element.on('click', function(args) {
                var action = args['target']['attributes']['edit-action'].value;
                var editId = args['target']['attributes']['edit-id'].value;
                $scope.$emit(action, editId);
            });
        }
    };
});
adminControllers.directive('spantoggle', function() {
    return {
        restrict: 'E',

        template: '<span style="cursor: pointer; padding-left: 40%" class="fa" ng-class="{\' fa-check\': row.entity.accept, \'fa-close \':!row.entity.accept}"></span>',
        replace: true,

        link: function($scope, element, attrs) {
            element.on('click', function(args) {
                var action = args['target']['attributes']['change-action'].value;
                var accept = Number(args['target']['attributes']['change-accept'].value);
                var id = Number(args['target']['attributes']['change-id'].value);
                $scope.$emit(action, id, accept);
            });
        }
    };
});


adminControllers.controller('AdminCtrl', ['$scope', function($scope) {
}]);
 
adminControllers.controller('GroupCtrl', ['$scope', 'Group', 'AddGroup', 'RemoveGroup', 'EditGroup', '$alert', '$modal', '$rootScope',  //+Директива
    function($scope, Group, AddGroup, RemoveGroup, EditGroup, $alert, $modal, $rootScope) {
        
    var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container'});
    var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
    
    var removeGroupId = null;
    $scope.modal = $modal({
        show: false,
        contentTemplate: 'ConfirmDelete.html'
    });
    //Удаление +++
    $scope.$on('EventForDropGroup', function (event, id) {
        alertError.hide();
        alertSuccess.hide();
        removeGroupId = Number(id);
        $scope.modal.show();
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
            cellTemplate: '<spanedit edit-action="EventForRedirectToGroupOptions" edit-id="{{row.entity.id}}"/>'},
          { name: 'remove', displayName: 'Remove' , width: '10%', enableCellEdit: false, enableFiltering: false, enableSorting: false, height: '15px',
            cellTemplate: '<spanremove remove-action="EventForDropGroup" remove-id="{{row.entity.id}}"/>' }
    ];
    
    $scope.msg = {};
    $scope.gridOptions.onRegisterApi = function(gridApi){
       gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
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
                                    alertSuccess = $alert({title: $scope.edit_group_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
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
                            alertSuccess = $alert({title: $scope.edit_group_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
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
              alertSuccess = $alert({title: $scope.add_group_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
            } else {
                alertError = $alert({title: answer.message, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
            }
        });
    };
    
    function removeGroup(id) {
        RemoveGroup.query({groupId: id}, function(answer){
            if(answer[0])
            {
                $scope.modal.hide();  
                var oldGroups = $scope.gridOptions.data;
                $scope.gridOptions.data = [];
                angular.forEach(oldGroups, function(group) {
                  if (group.id !== id) 
                      $scope.gridOptions.data.push(group);
                });
                alertSuccess = $alert({title: $scope.remove_group_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
            }
        });
    }
    
    $rootScope.$on('cancelDeleteGroup', function(){
        $scope.modal.hide();
    });
    
    $rootScope.$on('okDeleteGroup', function(){
        alertSuccess.hide();
        removeGroup(removeGroupId);
    });
  }]);
  
adminControllers.controller('PermissionCtrl', ['$scope', '$alert', 'Permission', 'AddPermission', 'RemovePermission', 'EditPermission', '$modal', '$rootScope',     //+Директива
    function($scope, $alert, Permission, AddPermission, RemovePermission, EditPermission, $modal, $rootScope) {
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container_perm'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_perm'});
        
        $scope.gridOptions_perm = { enableFiltering: true };
        $scope.gridOptions_perm.columnDefs = [
            { name: 'id', enableCellEdit: false, width: '2%', enableFiltering: false },
            { name: 'title', displayName: 'Title', width: '20%' },
            { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false },
            { name: 'remove', displayName: 'Remove' , width: '5%', enableCellEdit: false, enableFiltering: false, enableSorting: false,
              cellTemplate: '<spanremove remove-action="EventForDrop_perm" remove-id="{{row.entity.id}}"/>' }
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
                alertSuccess = $alert({title: $scope.add_permission_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
              } else {
                  alertError = $alert({title: answer.message, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
              }
          });
        };
        
        var removePermissionId = null;
        $scope.modal = $modal({
            show: false,
            contentTemplate: 'ConfirmDelete.html'
        });
        //Удаление
        $scope.$on('EventForDrop_perm', function (event, id) {
            alertError.hide();
            alertSuccess.hide();
            removePermissionId = Number(id);
            $scope.modal.show();
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
                                        alertSuccess = $alert({title: $scope.edit_permission_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
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
                                alertSuccess = $alert({title: $scope.edit_permission_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
                            }
                        });
                    }
                }
                $scope.$apply();
              });
        };
        
        function removePermission(id) {
            RemovePermission.query({permissionId: id}, function(answer){
                if(answer[0])
                {
                    $scope.modal.hide();
                    var oldPermissions = $scope.gridOptions_perm.data;
                    $scope.gridOptions_perm.data = [];
                    angular.forEach(oldPermissions, function(permission) {
                      if (permission.id !== id) 
                          $scope.gridOptions_perm.data.push(permission);
                    });
                    alertSuccess = $alert({title: $scope.remove_permission_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
                }
            });
        }
        
        $rootScope.$on('cancelDeletePermission', function(){
            $scope.modal.hide();
        });
        
        $rootScope.$on('okDeletePermission', function(){
            alertSuccess.hide();
            removePermission(removePermissionId);
        });
    }
]);

adminControllers.controller('GroupOptionsCtrl', ['$scope', '$routeParams', 'GroupOptions', '$alert', 'ChangePermissionsInGroup',    //+Директива
    function($scope, $routeParams, GroupOptions, $alert, ChangePermissionsInGroup) {
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_option'});
        
        $scope.gridOptions_groupOptions = { enableFiltering: true };
        $scope.gridOptions_groupOptions.columnDefs = [
            { name: 'id', displayName: 'Id', enableCellEdit: false, width: '5%', enableFiltering: false },
            { name: 'title', displayName: 'Title', width: '10%', enableCellEdit: false },
            { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false, enableCellEdit: false },
            { name: 'accept', displayName: 'Accept' , width: '5%', enableFiltering: false, enableCellEdit: false,
                cellTemplate: '<spantoggle change-action="EventChangeGroup" change-accept="{{row.entity.accept}}" change-id="{{row.entity.id}}"/>'}
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
                                alertSuccess = $alert({title: $scope.remove_perm_from_group, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option', duration: 3});
                            }
                            else {
                                permission.accept = 1;
                                alertSuccess = $alert({title: $scope.add_perm_to_group, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option', duration: 3});
                            }
                        }
                    });
                }
            });
            
        });    
}]);

adminControllers.controller('UsersCtrl', ['$scope', '$alert', 'User', 'AddUser', 'RemoveUser', 'EditUser', 'SearchUsers', '$modal', '$rootScope',   //+Директива
    function($scope, $alert, User, AddUser, RemoveUser, EditUser, SearchUsers, $modal, $rootScope) {
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container-for-users'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container-for-users'});
        
        $scope.unavailableNext = false;
        $scope.unavailablePrev = false;
        
        $scope.users_grid = {
            enableFiltering: false
        };
        
        $scope.users_grid.columnDefs = [
            { name: 'id', enableCellEdit: false, width: '8%'},
            { name: 'email', enableCellEdit: true, width: '15%'},
            { name: 'first_name', enableCellEdit: false, width: '10%'},
            { name: 'last_name', enableCellEdit: false, width: '10%'},
            { name: 'phone', enableCellEdit: false, width: '20%', enableSorting: false},
            { name: 'groups', displayName: 'Groups' , width: '8%', enableCellEdit: false,  enableSorting: false,
                cellTemplate: '<spanedit edit-action="EventForRedirectToUserOptions"  edit-id="{{row.entity.id}}"/>'},
            { name: 'remove', displayName: 'Remove' , width: '8%', enableCellEdit: false, enableFiltering: false, enableSorting: false,
                cellTemplate: '<spanremove remove-action="EventForDropUser" remove-id="{{row.entity.id}}"/>' }
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
                $scope.unavailableNext = true;
                $scope.unavailablePrev = true;
                if($scope.action === 0) {   //Обычный просмотр
                    $scope.currentPage++;
                    offset += limit;
                    getUsers(limit, offset, 'asc', 'id');
                } else if($scope.action === 1){     //Поиск
                    $scope.currentPage++;
                    offset += limit;
                    getFindUsers(searchText, limit, offset, 'asc', 'id');
                } else if($scope.action === 2){         //сортировка
                    $scope.currentPage++;
                    offset += limit; 
                    getUsers(limit, offset, $scope.direction, $scope.field);
                } else if ($scope.action === 3) {   //Сортировка с поиском
                    $scope.currentPage++;
                    offset += limit;
                    getFindUsers(searchText, limit, offset, $scope.dirFindSort, $scope.fieldFindSort);
                }
            }
        };
        
        $scope.prevPage = function(){
            
            if(($scope.currentPage - 1) >= 1) {
                $scope.unavailableNext = true;
                $scope.unavailablePrev = true;
                if($scope.action === 0)     //Обычный просмотр
                {
                    $scope.currentPage--;
                    offset -= limit;
                    getUsers(limit, offset, 'asc', 'id');
                } else if ($scope.action === 1){            //Поиск
                    $scope.currentPage--;
                    offset -= limit;
                    getFindUsers(searchText, limit, offset, 'asc', 'id');
                } else if($scope.action === 2) {            //сортировка
                    $scope.currentPage--;
                    offset -= limit;
                    console.log(offset, limit);
                    getUsers(limit, offset, $scope.direction, $scope.field); 
                } else if ($scope.action === 3) {   //Сортировка с поиском
                    $scope.currentPage--;
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
                    alertSuccess = $alert({title: $scope.add_user_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                    
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
        
        var userRemoveId = null;
        $scope.modal = $modal({
                show: false,
                contentTemplate: 'ConfirmDelete.html'
        });
        //Удаление +++
        $scope.$on('EventForDropUser', function (event, id) {
            alertError.hide();
            alertSuccess.hide();
            userRemoveId = Number(id);
            $scope.modal.show();
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
                                    alertSuccess = $alert({title: $scope.edit_user_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                                }
                            });
                        }
                    }
                }
            });
            
            //Сортировка
            gridApi.core.on.sortChanged($scope, function(arg1, arg2) {
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
                angular.forEach(res[0], function(user) {
                    user.first_name = user.profile.first_name;
                    user.last_name = user.profile.last_name;
                    user.phone = user.profile.phone;
                    arr.push(user);
                });
                $scope.users_grid.data = arr;

                $scope.countUsers = res[1];
                $scope.totalPage = Math.ceil(res[1] / limit);
                $scope.unavailableNext = false;
                $scope.unavailablePrev = false;
                checkNavigationButton();
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
                $scope.unavailableNext = false;
                $scope.unavailablePrev = false;
                checkNavigationButton();
            });
        };
        
        function checkNavigationButton() {
            if($scope.currentPage === 1) {
                $scope.unavailablePrev = true;
                
            }
            
            if ($scope.currentPage >= $scope.totalPage) {
                $scope.unavailableNext = true;
            }
        }
        
        function removeUser(id) {
            RemoveUser.query({userId: id}, function(answer){
                if(answer[0])
                {
                    $scope.modal.hide();
                    alertSuccess = $alert({title: $scope.remove_user_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                    var oldUsers = $scope.users_grid.data;

                    $scope.users_grid.data = [];
                    angular.forEach(oldUsers, function(user) {
                      if (user.id !== id) 
                          $scope.users_grid.data.push(user);
                    });
                    $scope.countUsers--;
                }
            });
        }
        
        $rootScope.$on('cancelDeleteUser', function(){
            $scope.modal.hide();
    });
    
        $rootScope.$on('okDeleteUser', function(){
            alertSuccess.hide();
            removeUser(userRemoveId);
        });
}]);

adminControllers.controller('UserOptionsCtrl', ['$scope', '$alert', '$routeParams', 'UserOptions', 'ChangeGroupByUser', //+Директивой
    function($scope, $alert, $routeParams, UserOptions, ChangeGroupByUser) {
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_option_for_users'});
        
        $scope.gridOptions_userOptions = { enableFiltering: true };
        $scope.gridOptions_userOptions.columnDefs = [
            { name: 'id', displayName: 'Id', enableCellEdit: false, width: '5%', enableFiltering: false },
            { name: 'title', displayName: 'Title', width: '10%', enableCellEdit: false },
            { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false, enableCellEdit: false },
            { name: 'accept', displayName: 'Accept' , width: '5%', enableFiltering: false, enableCellEdit: false,
                cellTemplate: '<spantoggle  change-action="EventChangeUser" change-accept="{{row.entity.accept}}" change-id="{{row.entity.id}}"/>'}
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
                                alertSuccess = $alert({title: $scope.remove_user_from_group, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option_for_users', duration: 3});
                            }
                            else {
                                group.accept = 1;
                                alertSuccess = $alert({title: $scope.add_user_to_group, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option_for_users', duration: 3});
                            }
                        }
                    });
                }
            });
        });
}]);

adminControllers.controller('ResourcesCtrl', ['$scope', 'AddResource', 'AllResource', 'DeleteResource', '$alert', '$modal', '$rootScope', function($scope, AddResource, AllResource, DeleteResource, $alert, $modal, $rootScope) {

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
            cellTemplate: '<div class="resourcePadding"><img ng-src="{{row.entity.url}}"></div>' },
        { name: 'action', displayName: 'Action' , width: '5%', enableCellEdit: false, enableFiltering: false, enableSorting: false, 
            cellTemplate: '<button class="btn" ng-click="$emit(\'EventForDropResource\', row.entity.id)" style="margin-left: 25%; margin-top: 20%">Delete</button>'}
    ];
    
    var removeResourceId = null;
    $scope.modal = $modal({
        show: false,
        contentTemplate: 'ConfirmDelete.html'
    });
    
    $scope.$on('EventForDropResource', function (event, id) {
        removeResourceId = id;
        $scope.modal.show();
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
                    $alert({title: $scope.add_resource_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});

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
            $scope.modal.hide();
            if(res[0] === true) {
                var index = 0;
                for(i = 0; i < $scope.resources.length; i++) {
                    if($scope.resources[i].id === id) {
                        index = i;
                        break;
                    }
                }
                $scope.resources.splice(index, 1);
                $alert({title: $scope.remove_resource_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
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

    $rootScope.$on('cancelDeleteResource', function(){
        $scope.modal.hide();
    });
    
    $rootScope.$on('okDeleteResource', function(){
        alertSuccess.hide();
        $scope.delete(removeResourceId);
    });
}]);    //Необходимость директивы?

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
            cellTemplate: '<p ng-class="{\'btn-success\': row.entity.status==\'Public\', \'btn-info\': row.entity.status==\'Private\', \n\
                \'btn-warning\': row.entity.status==\'Draw\'}" class="form-control btn" style="width: 50%; margin-left: 25%; margin-top: 10%">{{row.entity.status}}</p>'},
        { name: 'actions', displayName: 'Actions' , width: '5%', enableFiltering: false, enableCellEdit: false,
            cellTemplate: '<p ng-click="$emit(\'EventForEditPage\', row.entity.id)" class="actionCol" style="margin-left: 30%">Edit</p>\n\
                <p ng-click="$emit(\'EventForDropPage\', row.entity.id)" class="actionCol" style="margin-left: 25%">Delete</p>\n\
                <p ng-click="$emit(\'EventForShowPage\', row.entity.url)" class="actionCol" style="margin-left: 28%">Show</p>'
    }];
   
   //+++
   $scope.modal = $modal({
        show: false,
        contentTemplate: 'ConfirmDelete.html'
    });
    $scope.$on('EventForDropPage', function (event, id) {
        $scope.modal.show();
        $scope.del = id;
    });
    
    //+++
    $scope.$on('EventForEditPage', function (event, id) {
        $scope.page = GetPage.query({id: id}, function(res) {
            $rootScope.page = res;
            $rootScope.pageActions = $scope.edit_text;
            
            $scope.modalEditPage = $modal({
                show: true,
                contentTemplate: 'EditPage.html'
            });
            //console.log(res);
        });
    });
    
    $scope.$on('EventForShowPage', function(event, url){
        $window.open('http://' + $location.host() + ':' + $location.port() + '/' + lang + '/' + url);
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
            //console.log(arr);
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
                    alertSuccess = $alert({title: $scope.add_page_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_for_pages', duration: 3});
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
                alertSuccess = $alert({title: $scope.edit_page_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_for_pages', duration: 3});
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
        alertSuccess = $alert({title: $scope.remove_page_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_for_pages', duration: 3});
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
        $rootScope.pageActions = $scope.create_text;
        $scope.modalEditPage = $modal({
            show: true,
            contentTemplate: 'EditPage.html'
        });
    };
 }]);