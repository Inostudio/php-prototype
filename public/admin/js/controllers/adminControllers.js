(function() {
    'use strict';
    
    angular
            .module('adminApp')
            .controller('activCtrl', activCtrl)    
            .controller('AdminCtrl', AdminCtrl)
            .controller('GroupCtrl', GroupCtrl)     
            .controller('PermissionCtrl', PermissionCtrl)   
            .controller('GroupOptionsCtrl', GroupOptionsCtrl)  
            .controller('UsersCtrl', UsersCtrl)     
            .controller('UserOptionsCtrl', UserOptionsCtrl)    
            .controller('ResourcesCtrl', ResourcesCtrl)
            .controller('PagesCtrl', PagesCtrl);
            

    AdminCtrl.$inject = ['$scope'];
    GroupCtrl.$inject = ['$scope', 'Group', 'AddGroup', 'RemoveGroup', 'EditGroup', '$alert', '$modal', '$rootScope'];
    PermissionCtrl.$inject = ['$scope', '$alert', 'Permission', 'AddPermission', 'RemovePermission', 'EditPermission', '$modal', '$rootScope'];
    GroupOptionsCtrl.$inject = ['$scope', '$routeParams', 'GroupOptions', '$alert', 'ChangePermissionsInGroup'];
    UsersCtrl.$inject = ['$scope', '$alert', 'User', 'AddUser', 'RemoveUser', 'EditUser', 'SearchUsers', '$modal', '$rootScope'];
    UserOptionsCtrl.$inject = ['$scope', '$alert', '$routeParams', 'UserOptions', 'ChangeGroupByUser'];
    ResourcesCtrl.$inject = ['$scope', 'AddResource', 'AllResource', 'DeleteResource', '$alert', '$modal', '$rootScope'];
    PagesCtrl.$inject = ['$scope', '$alert', '$modal', 'AddPage', 'Status', 'Pages', 'GetPage', 'DeletePage', 'SavePage', '$window', '$location', '$rootScope'];
    activCtrl.$inject = ['$scope', '$location', 'CheckLang'];
    
    function activCtrl($scope, $location, CheckLang) {
        var vm = this;
        vm.isActive = isActive;
        vm.checkLang = checkLang;
        
        function isActive(path){  
              return ((path === $location.path()) || (($location.path().indexOf('/groups/') === 0) && (path === '/groupsPermis'))
                      || (($location.path().indexOf('/users/') === 0) && (path === '/userGroups')));  
        };

        function checkLang(lang){
          CheckLang.query({language: lang}, function(answer){
              var oldLang =  window.location.pathname.substr(1, 2);
              window.location.href = document.location.href.replace('/' + oldLang +'/', '/' + lang +'/');
          });
        };
    }
    
    function AdminCtrl($scope) {
    };

    function GroupCtrl($scope, Group, AddGroup, RemoveGroup, EditGroup, $alert, $modal, $rootScope){
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
        
        var vm = this;
        vm.addGroup = addGroup;
        vm.groupName = '';
        vm.groupDescription = '';
        vm.modal = '';
        vm.gridOptions = '';
        vm.edit_group_message = '';
        vm.add_group_message = '';
        vm.remove_group_message = '';
        
        var removeGroupId = null;
        vm.modal = $modal({
            show: false,
            contentTemplate: 'ConfirmDelete.html'
        });
        //Удаление +++
        $scope.$on('EventForDropGroup', function (event, id) {
            alertError.hide();
            alertSuccess.hide();
            removeGroupId = Number(id);
            vm.modal.show();
        });

        //Redirect to permission
        $scope.$on('EventForRedirectToGroupOptions', function (event, id) {
            alertError.hide();
            alertSuccess.hide();

            window.location = '#/groups/' + id;
        });
        //Grid
        vm.gridOptions = { enableFiltering: true };
          vm.gridOptions.columnDefs = [
              { name: 'id', enableCellEdit: false, width: '5%', enableFiltering: false },
              { name: 'title', displayName: 'Title', width: '20%' },
              { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false },
              { name: 'permissions', displayName: 'Permissions' , width: '15%', enableFiltering: false,  enableSorting: false, enableCellEdit: false,//permissioms
                cellTemplate: '<spanedit edit-action="EventForRedirectToGroupOptions" edit-id="{{row.entity.id}}"/>'},
              { name: 'remove', displayName: 'Remove' , width: '10%', enableCellEdit: false, enableFiltering: false, enableSorting: false, height: '15px',
                cellTemplate: '<spanremove remove-action="EventForDropGroup" remove-id="{{row.entity.id}}"/>' }
        ];

        vm.gridOptions.onRegisterApi = function(gridApi){
           gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
                alertError.hide();
                alertSuccess.hide();

                //Редактирование-----///
                var oldGroup = '';

                var k = 0;
                var flag = 0;
                angular.forEach(vm.gridOptions.data, function(group) {  //Находим редактируемую группу и её положение

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
                    angular.forEach(vm.gridOptions.data, function(group) {  //Проверяем, существует ли группа с таким именем
                        if ((group.title === newValue.trim()) && (group.id !== rowEntity.id)) {
                            i++;
                            isExistsEdit = 1;
                        }   
                    });
                    if(isExistsEdit){
                        alertError = $alert({title: 'The title has already been taken.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                        vm.gridOptions.data[k].title = oldValue;
                    } else {
                        if(newValue.trim() === ''){
                            alertError = $alert({title: 'Field title is empty!', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                            vm.gridOptions.data[k].title = oldValue;
                        } else {
                            if(oldValue !== newValue)
                            {
                                EditGroup.query({groupId: rowEntity.id, title: newValue, groupDescription: oldGroup.description}, function(answer){
                                    if(answer[0] === false){
                                        alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                                    } else
                                    {
                                        alertSuccess = $alert({title: vm.edit_group_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
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
                                alertSuccess = $alert({title: vm.edit_group_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
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
          vm.gridOptions.data = res;
        });

        //Добавление    
        function addGroup(){
            var isExists = 0;
            alertError.hide();
            alertSuccess.hide();

            angular.forEach(vm.gridOptions.data, function(group) {
                if (group.title === vm.groupName){ 
                    alertError = $alert({title: 'The title has already been taken. ', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                    isExists = 1;
                }
            });
            if(isExists){
                return;
            }
            if((vm.groupName == null) || (vm.groupName.trim() === "")){
                alertError = $alert({title: 'The title field is required.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                return;
            }

            AddGroup.query({title: vm.groupName, groupDescription: vm.groupDescription}, function(answer){
                if(answer.res){    
                  vm.gridOptions.data.push({title: vm.groupName, description: vm.groupDescription, id: answer.id}); 
                  vm.groupName = "";
                  vm.groupDescription = "";
                  alertSuccess = $alert({title: vm.add_group_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                } else {
                    alertError = $alert({title: answer.message, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                }
            });
        };

        function removeGroup(id) {
            RemoveGroup.query({groupId: id}, function(answer){
                if(answer[0])
                {
                    vm.modal.hide();  
                    var oldGroups = vm.gridOptions.data;
                    vm.gridOptions.data = [];
                    angular.forEach(oldGroups, function(group) {
                      if (group.id !== id) 
                          vm.gridOptions.data.push(group);
                    });
                    alertSuccess = $alert({title: vm.remove_group_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                }
            });
        }

        $rootScope.$on('cancelDeleteGroup', function(){
            vm.modal.hide();
        });

        $rootScope.$on('okDeleteGroup', function(){
            alertSuccess.hide();
            removeGroup(removeGroupId);
        });
      };

    function PermissionCtrl($scope, $alert, Permission, AddPermission, RemovePermission, EditPermission, $modal, $rootScope) {
            var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container_perm'});
            var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_perm'});

            var vm = this;
            vm.addPermission = addPermission;
            vm.permissionName = '';
            vm.permissionDescription = '';
            vm.gridOptions_perm = '';
            vm.add_permission_message = '';
            vm.modal = '';
            vm.edit_permission_message = '';
            vm.remove_permission_message = '';
            
            vm.gridOptions_perm = { enableFiltering: true };
            vm.gridOptions_perm.columnDefs = [
                { name: 'id', enableCellEdit: false, width: '2%', enableFiltering: false },
                { name: 'title', displayName: 'Title', width: '20%' },
                { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false },
                { name: 'remove', displayName: 'Remove' , width: '5%', enableCellEdit: false, enableFiltering: false, enableSorting: false,
                  cellTemplate: '<spanremove remove-action="EventForDrop_perm" remove-id="{{row.entity.id}}"/>' }
            ];

            //Получение
            Permission.queryInfo(function(res){
              vm.gridOptions_perm.data = res;
            });

            //Добавление
            function addPermission(){
              var isExists = 0;
              alertError.hide();
              alertSuccess.hide();

              angular.forEach(vm.gridOptions_perm.data, function(permission) {
                  if (permission.title === vm.permissionName){ 
                      alertError = $alert({title: 'The title has already been taken. ', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                      isExists = 1;
                  }
              });
              if(isExists){
                  return;
              }

              if((vm.permissionName == null) || (vm.permissionName.trim() === "")){
                    alertError = $alert({title: 'The title field is required.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                    return;
              }

              AddPermission.query({title: vm.permissionName, permissionDescription: vm.permissionDescription}, function(answer){
                  if(answer.res){    
                    vm.gridOptions_perm.data.push({title: vm.permissionName, description: vm.permissionDescription, id: answer.id}); 
                    vm.permissionName = "";
                    vm.permissionDescription = "";
                    alertSuccess = $alert({title: vm.add_permission_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
                  } else {
                      alertError = $alert({title: answer.message, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                  }
              });
            };

            var removePermissionId = null;
            vm.modal = $modal({
                show: false,
                contentTemplate: 'ConfirmDelete.html'
            });
            //Удаление
            $scope.$on('EventForDrop_perm', function (event, id) {
                alertError.hide();
                alertSuccess.hide();
                removePermissionId = Number(id);
                vm.modal.show();
            });

            //Редактирование
            vm.gridOptions_perm.onRegisterApi = function(gridApi){
               gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
                    alertError.hide();
                    alertSuccess.hide();

                    //Редактирование-----///
                    var oldPermission = '';

                    var k = 0;
                    var flag = 0;
                    angular.forEach(vm.gridOptions_perm.data, function(permission) {    //Находим редактируемое право и его положение

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
                        angular.forEach(vm.gridOptions_perm.data, function(permission) {    //Проверяем, существует ли право с таким именем
                            if ((permission.title === newValue.trim()) && (permission.id !== rowEntity.id)) {
                                i++;
                                isExistsEdit = 1;
                            }   
                        });
                        if(isExistsEdit){
                            alertError = $alert({title: 'The title has already been taken.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                            vm.gridOptions_perm.data[k].title = oldValue;
                        } else {
                            if(newValue.trim() === ''){
                                alertError = $alert({title: 'Field title is empty!', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                                vm.gridOptions_perm.data[k].title = oldValue;
                            } else {
                                if(oldValue !== newValue)
                                {
                                    EditPermission.query({permissionId: rowEntity.id, title: newValue, permissionDescription: oldPermission.description}, function(answer){
                                        if(answer[0] === false){
                                            alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_perm'});
                                        } else
                                        {
                                            alertSuccess = $alert({title: vm.edit_permission_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
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
                                    alertSuccess = $alert({title: vm.edit_permission_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
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
                        vm.modal.hide();
                        var oldPermissions = vm.gridOptions_perm.data;
                        vm.gridOptions_perm.data = [];
                        angular.forEach(oldPermissions, function(permission) {
                          if (permission.id !== id) 
                              vm.gridOptions_perm.data.push(permission);
                        });
                        alertSuccess = $alert({title: vm.remove_permission_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_perm', duration: 3});
                    }
                });
            }

            $rootScope.$on('cancelDeletePermission', function(){
                vm.modal.hide();
            });

            $rootScope.$on('okDeletePermission', function(){
                alertSuccess.hide();
                removePermission(removePermissionId);
            });
        };

    function GroupOptionsCtrl($scope, $routeParams, GroupOptions, $alert, ChangePermissionsInGroup) {
            var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_option'});
            var vm = this;
            vm.groupTitle = '';
            vm.groupDescription = '';
            vm.groupId = 0;
            vm.gridOptions_groupOptions = '';
            vm.remove_perm_from_group = '';
            vm.add_perm_to_group = '';
            
            vm.gridOptions_groupOptions = { enableFiltering: true };
            vm.gridOptions_groupOptions.columnDefs = [
                { name: 'id', displayName: 'Id', enableCellEdit: false, width: '5%', enableFiltering: false },
                { name: 'title', displayName: 'Title', width: '10%', enableCellEdit: false },
                { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false, enableCellEdit: false },
                { name: 'accept', displayName: 'Accept' , width: '5%', enableFiltering: false, enableCellEdit: false,
                    cellTemplate: '<spantoggle change-action="EventChangeGroup" change-accept="{{row.entity.accept}}" change-id="{{row.entity.id}}"/>'}
            ];

            //Получение
            GroupOptions.query({groupId: $routeParams.groupId}, function(answer){
                vm.groupTitle = answer[0].title;
                vm.groupDescription = answer[0].description;
                vm.groupId = answer[0].id;

                angular.forEach(answer[2][0], function(permission) {
                    permission.accept = 0;
                    angular.forEach(answer[1][0][0].permissions, function(group) {
                        if(group.id === permission.id){
                            permission.accept = 1;
                            //isAccept = 1;
                        }
                    });
                });

                vm.gridOptions_groupOptions.data = answer[2][0];
            });

            //Изменение разрешений группы
            $scope.$on('EventChangeGroup', function (event, id, accept) {
                alertSuccess.hide();
                ChangePermissionsInGroup.query({groupId: vm.groupId, accept : accept, permId: id}, function(answer){
                    if(answer[0]){
                        angular.forEach(vm.gridOptions_groupOptions.data, function(permission) {    //Проверяем, существует ли право с таким именем
                            if(permission.id === id){
                                if(accept){
                                    permission.accept = 0;
                                    alertSuccess = $alert({title: vm.remove_perm_from_group, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option', duration: 3});
                                }
                                else {
                                    permission.accept = 1;
                                    alertSuccess = $alert({title: vm.add_perm_to_group, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option', duration: 3});
                                }
                            }
                        });
                    }
                });

            });    
    };

    function UsersCtrl($scope, $alert, User, AddUser, RemoveUser, EditUser, SearchUsers, $modal, $rootScope) {
            var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container-for-users'});
            var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container-for-users'});
            
            var vm = this;
            vm.unavailableNext = false;
            vm.unavailablePrev = false;
            vm.currentPage = 1;
            vm.action = 0;
            vm.totalPage = 0;
            vm.dirFindSort = '';
            vm.fieldFindSort = '';
            vm.direction = '';
            vm.field = '';
            vm.email = '';
            vm.userConfirmPassword = '';
            vm.userPassword = '';
            vm.nextPage = nextPage;
            vm.prevPage = prevPage;
            vm.addUser = addUser;
            vm.countUsers = 0;
            vm.searchText = '';
            vm.search = search;
            vm.reset = reset;
            vm.users_grid = '';
            vm.add_user_message = '';
            vm.modal = '';
            vm.edit_user_message = '';
            vm.remove_user_message = '';

            vm.users_grid = {
                enableFiltering: false
            };

            vm.users_grid.columnDefs = [
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
            
            var offset = 0;
            var limit =  9;
            
            var searchText = '';

            getUsers(limit, offset, 'asc', 'id');

            function nextPage(){
                if((vm.currentPage + 1) <= vm.totalPage) {
                    vm.unavailableNext = true;
                    vm.unavailablePrev = true;
                    if(vm.action === 0) {   //Обычный просмотр
                        vm.currentPage++;
                        offset += limit;
                        getUsers(limit, offset, 'asc', 'id');
                    } else if(vm.action === 1){     //Поиск
                        vm.currentPage++;
                        offset += limit;
                        getFindUsers(searchText, limit, offset, 'asc', 'id');
                    } else if(vm.action === 2){         //сортировка
                        vm.currentPage++;
                        offset += limit; 
                        getUsers(limit, offset, vm.direction, vm.field);
                    } else if (vm.action === 3) {   //Сортировка с поиском
                        vm.currentPage++;
                        offset += limit;
                        getFindUsers(searchText, limit, offset, vm.dirFindSort, vm.fieldFindSort);
                    }
                }
            };

            function prevPage(){

                if((vm.currentPage - 1) >= 1) {
                    vm.unavailableNext = true;
                    vm.unavailablePrev = true;
                    if(vm.action === 0)     //Обычный просмотр
                    {
                        vm.currentPage--;
                        offset -= limit;
                        getUsers(limit, offset, 'asc', 'id');
                    } else if (vm.action === 1){            //Поиск
                        vm.currentPage--;
                        offset -= limit;
                        getFindUsers(searchText, limit, offset, 'asc', 'id');
                    } else if(vm.action === 2) {            //сортировка
                        vm.currentPage--;
                        offset -= limit;
                        console.log(offset, limit);
                        getUsers(limit, offset, vm.direction, vm.field); 
                    } else if (vm.action === 3) {   //Сортировка с поиском
                        vm.currentPage--;
                        offset -= limit;
                        getFindUsers(searchText, limit, offset, vm.dirFindSort, vm.fieldFindSort);
                    }
                }
            };

            //Добавление +++
            function addUser(){
                alertError.hide();
                alertSuccess.hide();

                if(vm.email === undefined){
                    alertError = $alert({title: 'The email field is required.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                    return;
                }

                if((vm.userPassword === undefined) || (vm.userPassword === "")){
                     alertError = $alert({title: 'The password field is required.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                     return;
                }
                if((vm.userPassword.length < 4)){
                     alertError = $alert({title: 'Minimum password length of 4 characters.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                     return;
                }

                if((vm.userPassword !== vm.userConfirmPassword)){
                     alertError = $alert({title: 'Don\'t match confirm password.', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                     return;
                }

                AddUser.query({email: vm.email, password: vm.userPassword}, function(answer){
                    if(!answer[0]){
                        alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                    } else {
                        alertSuccess = $alert({title: vm.add_user_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                        if((vm.currentPage === vm.totalPage) &&(vm.currentPage * limit > vm.countUsers)){
                            console.log(vm.countUsers);
                            var newUser = {
                                id: answer[2],
                                email: vm.email
                            };
                            vm.users_grid.data.push(newUser);

                            vm.countUsers++;
                            console.log(vm.countUsers);
                            vm.totalPage = Math.ceil(vm.countUsers / limit);
                        } else {
                            vm.countUsers++;
                            vm.totalPage = Math.ceil(vm.countUsers / limit);

                            offset = limit * (vm.totalPage-1);
                            vm.currentPage = vm.totalPage;
                            getUsers(limit, offset, 'asc', 'id');              
                        }

                        vm.email = "";
                        vm.userConfirmPassword = "";
                        vm.userPassword = "";

                    }
                });
            };

            var userRemoveId = null;
            vm.modal = $modal({
                    show: false,
                    contentTemplate: 'ConfirmDelete.html'
            });
            //Удаление +++
            $scope.$on('EventForDropUser', function (event, id) {
                alertError.hide();
                alertSuccess.hide();
                userRemoveId = Number(id);
                vm.modal.show();
            });

            //Редактирование +++
            vm.users_grid.onRegisterApi = function(gridApi){
                //Редактирование
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
                    alertError.hide();
                    alertSuccess.hide();

                    if(newValue.trim() === ''){
                        alertError = $alert({title: 'Field email is empty!', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                        angular.forEach(vm.users_grid.data, function(user) {
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
                                        alertSuccess = $alert({title: vm.edit_user_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                                    }
                                });
                            }
                        }
                    }
                });

                //Сортировка
                gridApi.core.on.sortChanged($scope, function(arg1, arg2) {
                    if(arg2.length !== 0){
                        if((vm.action === 1) || (vm.action === 3)){    //Сортировка с поиском
                            vm.currentPage = 1;
                            vm.action = 3;
                            vm.dirFindSort = arg2[0].sort.direction;
                            vm.fieldFindSort = arg2[0].name;

                            offset = 0;
                            getFindUsers(searchText, limit, offset, vm.dirFindSort, vm.fieldFindSort);                      
                        } else {
                            vm.currentPage = 1;
                            vm.action = 2;
                            vm.field = arg2[0].name;
                            vm.direction = arg2[0].sort.direction;
                            offset = 0;
                            getUsers(limit, offset, vm.direction, vm.field);  
                        }
                    }
                });                       
            };

            $scope.$on('EventForRedirectToUserOptions', function (event, id) {
                alertError.hide();
                alertSuccess.hide();
                window.location = '#/users/' + id;
            });

             function search(){
                vm.action = 1;  //Установка действия
                offset = 0;
                searchText = vm.searchText;
                SearchUsers.query({text: searchText, lim: limit, off: offset, direction: 'asc', field: 'id'}, function(res){
                    var arr = [];
                    angular.forEach(res[0], function(user) {
                        user.first_name = user.profile.first_name;
                        user.last_name = user.profile.last_name;
                        user.phone = user.profile.phone;
                        arr.push(user);
                    });
                    vm.users_grid.data = arr;

                    vm.countUsers = res[1];
                    vm.totalPage = Math.ceil(res[1] / limit);
                });
                vm.currentPage = 1;
            };

            function reset(){
                vm.action = 0;  //Установка обычного просмотра
                vm.searchText = "";
                offset = 0;

                //Делаем запрос
                getUsers(limit, offset, 'asc', 'id');          
                vm.currentPage = 1;
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
                    vm.users_grid.data = arr;

                    vm.countUsers = res[1];
                    vm.totalPage = Math.ceil(res[1] / limit);
                    vm.unavailableNext = false;
                    vm.unavailablePrev = false;
                    checkNavigationButton();
                });
            };

            function getFindUsers(searchText, limit, offset, direction, field){
                SearchUsers.query({text: searchText, lim: limit, off: offset, direction: direction, field: field}, function(res){
                    var arr = [];
                    angular.forEach(res[0], function(user) {
                        user.first_name = user.profile.first_name;
                        user.last_name = user.profile.last_name;
                        user.phone = user.profile.phone;
                        arr.push(user);
                    });
                    vm.users_grid.data = arr;

                    vm.countUsers = res[1];
                    vm.totalPage = Math.ceil(res[1] / limit);
                    vm.unavailableNext = false;
                    vm.unavailablePrev = false;
                    checkNavigationButton();
                });
            };

            function checkNavigationButton() {
                if(vm.currentPage === 1) {
                    vm.unavailablePrev = true;

                }

                if (vm.currentPage >= vm.totalPage) {
                    vm.unavailableNext = true;
                }
            }

            function removeUser(id) {
                RemoveUser.query({userId: id}, function(answer){
                    if(answer[0])
                    {
                        vm.modal.hide();
                        alertSuccess = $alert({title: vm.remove_user_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                        var oldUsers = vm.users_grid.data;

                        vm.users_grid.data = [];
                        angular.forEach(oldUsers, function(user) {
                          if (user.id !== id) 
                              vm.users_grid.data.push(user);
                        });
                        vm.countUsers--;
                    }
                });
            }

            $rootScope.$on('cancelDeleteUser', function(){
                vm.modal.hide();
        });

            $rootScope.$on('okDeleteUser', function(){
                alertSuccess.hide();
                removeUser(userRemoveId);
            });
    };

    function UserOptionsCtrl($scope, $alert, $routeParams, UserOptions, ChangeGroupByUser) {
            var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_option_for_users'});
            var vm = this;
            vm.userEmail = '';
            vm.lastName = '';
            vm.firstName = '';
            vm.userId = 0;
            vm.gridOptions_userOptions = '';
            vm.remove_user_from_group = '';
            vm.add_user_to_group = '';

            vm.gridOptions_userOptions = { enableFiltering: true };
            vm.gridOptions_userOptions.columnDefs = [
                { name: 'id', displayName: 'Id', enableCellEdit: false, width: '5%', enableFiltering: false },
                { name: 'title', displayName: 'Title', width: '10%', enableCellEdit: false },
                { name: 'description', displayName: 'Description' , width: '30%', enableFiltering: false, enableCellEdit: false },
                { name: 'accept', displayName: 'Accept' , width: '5%', enableFiltering: false, enableCellEdit: false,
                    cellTemplate: '<spantoggle  change-action="EventChangeUser" change-accept="{{row.entity.accept}}" change-id="{{row.entity.id}}"/>'}
            ];

            //Получение групп, в которых состоит пользователь+++
            UserOptions.query({userId: $routeParams.userId}, function(answer){
                //console.log(answer);
                vm.userEmail = answer[0].email;
                vm.lastName = answer[0].profile.last_name;
                vm.firstName = answer[0].profile.first_name;
                vm.userId = answer[0].id;

                angular.forEach(answer[2][0], function(group) {
                    group.accept = 0;
                    angular.forEach(answer[1][0][0].groups, function(user) {
                        if(group.id === user.id){
                            group.accept = 1;
                        }
                    });
                });

                vm.gridOptions_userOptions.data = answer[2][0];
                //console.log(answer);
            });

            //Включение/исключение пользователя из группы+++
            $scope.$on('EventChangeUser', function (event, id, accept) {
                alertSuccess.hide();
                ChangeGroupByUser.query({userId: vm.userId, accept : accept, groupId: id}, function(answer){
                    //console.log(answer);
                    if(answer[0]){
                        angular.forEach(vm.gridOptions_userOptions.data, function(group) {    //Проверяем, существует ли право с таким именем
                            if(group.id === id){
                                if(accept){
                                    group.accept = 0;
                                    alertSuccess = $alert({title: vm.remove_user_from_group, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option_for_users', duration: 3});
                                }
                                else {
                                    group.accept = 1;
                                    alertSuccess = $alert({title: vm.add_user_to_group, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_option_for_users', duration: 3});
                                }
                            }
                        });
                    }
                });
            });
    };

    function ResourcesCtrl($scope, AddResource, AllResource, DeleteResource, $alert, $modal, $rootScope) {

        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
        
        var vm = this;
        vm.resource = '';
        vm.resources = '';
        vm.gridOptions_resourcesGrid = '';
        vm.modal = '';
        vm.add = add;
        vm.add_resource_message = '';
        vm.deleteResource = deleteResource;
        vm.remove_resource_message = '';
        
        vm.resource = {
            title: '',
            file: ''
        };

        vm.resources = [];



        function getAllResources() {
            vm.resources = AllResource.query(function(res){
                vm.gridOptions_resourcesGrid.data = res;
            });
        };
        getAllResources();

        vm.gridOptions_resourcesGrid = { enableFiltering: true, rowHeight: 110 };

        vm.gridOptions_resourcesGrid.columnDefs = [
            { name: 'title', displayName: 'Title', width: '2%', enableCellEdit: false },
            { name: 'url', displayName: 'Url' , width: '15%', enableFiltering: false, enableCellEdit: false, enableSorting: false },
            { name: 'view', displayName: 'View' , width: '15%', enableCellEdit: false, enableFiltering: false, enableSorting: false, 
                cellTemplate: '<div class="resourcePadding"><img ng-src="{{row.entity.url}}"></div>' },
            { name: 'action', displayName: 'Action' , width: '5%', enableCellEdit: false, enableFiltering: false, enableSorting: false, 
                cellTemplate: '<button class="btn" ng-click="$emit(\'EventForDropResource\', row.entity.id)" style="margin-left: 25%; margin-top: 20%">Delete</button>'}
        ];

        var removeResourceId = null;
        vm.modal = $modal({
            show: false,
            contentTemplate: 'ConfirmDelete.html'
        });

        $scope.$on('EventForDropResource', function (event, id) {
            removeResourceId = id;
            vm.modal.show();
        });

        function add(resource) {
            if(resource.file === '') {
                $alert({title: 'Please select a file', placement: 'top-right', type: 'danger', show: true, container: '#alerts-container', duration: 3});
            } else {
                AddResource.query({
                    title: resource.title,
                    file: resource.file
                }, function(res) {
                    if(res[0] === true) {
                        vm.resources.push(res[1]);
                        $alert({title: vm.add_resource_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});

                        vm.resource = {
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

        function deleteResource(id) {
            DeleteResource.query({id: id}, function (res) {
                vm.modal.hide();
                if(res[0] === true) {
                    var index = 0;
                    for(var i = 0; i < vm.resources.length; i++) {
                        if(vm.resources[i].id === id) {
                            index = i;
                            break;
                        }
                    }
                    vm.resources.splice(index, 1);
                    $alert({title: vm.remove_resource_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                } else {
                    $alert({title: res[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container', duration: 3});
                }
            });
        };

        var handleFileSelect=function(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                vm.resource.file = evt.target.result;
            };
            reader.readAsDataURL(file);
        };

        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

        $rootScope.$on('cancelDeleteResource', function(){
            vm.modal.hide();
        });

        $rootScope.$on('okDeleteResource', function(){
            alertSuccess.hide();
            vm.deleteResource(removeResourceId);
        });
    };  

    function PagesCtrl ($scope, $alert, $modal, AddPage, Status, Pages, GetPage, DeletePage, SavePage, $window, $location, $rootScope) {

        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_for_pages'});
        
        var vm = this;
        vm.gridOptions_pagesGrid = '';
        vm.modal = '';
        vm.delId = 0;
        vm.modalEditPage = '';
        vm.save = save;
        vm.edit_text = '';
        vm.add_page_message = '';
        vm.edit_page_message = '';
        vm.remove_page_message = '';
        vm.create_text = '';
        vm.createPage = createPage;

        vm.gridOptions_pagesGrid = { enableFiltering: true, rowHeight: 65 };

        vm.gridOptions_pagesGrid.columnDefs = [
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
       vm.modal = $modal({
            show: false,
            contentTemplate: 'ConfirmDelete.html'
        });
        $scope.$on('EventForDropPage', function (event, id) {
            vm.modal.show();
            vm.delId = id;
        });

        //+++
        $scope.$on('EventForEditPage', function (event, id) {
            $scope.page = GetPage.query({id: id}, function(res) {
                $rootScope.page = res;
                $rootScope.pageActions = vm.edit_text;

                vm.modalEditPage = $modal({
                    show: true,
                    contentTemplate: 'EditPage.html'
                });
            });
        });

        $scope.$on('EventForShowPage', function(event, url){
            $window.open('http://' + $location.host() + ':' + $location.port() + '/' + lang + '/' + url);
        });

        //+++    
        var arr = []; 
        var Init = function() {
            $scope.submitted = false;

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

                vm.gridOptions_pagesGrid.data = arr;
            });
        }();


        function save(page, valid) {
            alertSuccess.hide();
            if(valid)
            {
                vm.modalEditPage.hide();

                if(page.id === undefined) {
                    AddPage.query({title: page.title, body: page.body, status: page.status_id, url: page.url}, function(res) {
                        arr.push({id: res[0], title: page.title, body: page.body, status: $rootScope.statuses[page.status_id - 1].title, url: page.url});
                        alertSuccess = $alert({title: vm.add_page_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_for_pages', duration: 3});
                    });
                } else {
                    SavePage.query({id: page.id, title: page.title, body: page.body, status: page.status_id, url: page.url}, function() {
                        for(var i=0; i < arr.length; i++){
                            if(page.id === arr[i].id){
                                arr[i] = page;
                                arr[i].status = $rootScope.statuses[page.status_id - 1].title;
                            }
                        }
                    });
                    alertSuccess = $alert({title: vm.edit_page_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_for_pages', duration: 3});
                }
            }
        };

        //+++
        var deletePage = function (id) {
            DeletePage.query({id: id}, function(res) {
                var index = 0;
                for(var i = 0; i < arr.length; i++) {
                    if(arr[i].id === id) {
                        index = i;
                        break;
                    }
                }
                arr.splice(index, 1);
                vm.gridOptions_pagesGrid.data = arr;
            });
        };  

        $rootScope.$on('modal-ok', function(){
            alertSuccess.hide();
            deletePage(vm.delId);
            vm.modal.hide();
            alertSuccess = $alert({title: vm.remove_page_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container_for_pages', duration: 3});
        });

        $rootScope.$on('modal-cancel', function(){
            vm.modal.hide();
        });

        $rootScope.$on('edit-cancel', function(){
            vm.modalEditPage.hide();
        });

        $rootScope.$on('edit-ok', function(event, arg1, arg2){
            $rootScope.submitted = true;
            vm.save(arg1, arg2);
        });

        function createPage(){
            $rootScope.submitted = false;
            $rootScope.page = {};
            $rootScope.pageActions = vm.create_text;
            vm.modalEditPage = $modal({
                show: true,
                contentTemplate: 'EditPage.html'
            });
        };
     };
 })();