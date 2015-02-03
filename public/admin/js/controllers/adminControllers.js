(function() {
    'use strict';
    
    angular
            .module('adminApp')
            .controller('activCtrl', activCtrl)    
            .controller('DashboardCtrl', DashboardCtrl)
            .controller('GroupCtrl', GroupCtrl)     
            .controller('PermissionCtrl', PermissionCtrl)   
            .controller('GroupOptionsCtrl', GroupOptionsCtrl)  
            .controller('UsersCtrl', UsersCtrl)     
            .controller('UserOptionsCtrl', UserOptionsCtrl)    
            .controller('ResourcesCtrl', ResourcesCtrl)
            .controller('PagesCtrl', PagesCtrl)
            .controller('CategoriesOfArticlesCtrl', CategoriesOfArticlesCtrl)
            .controller('ArticleCategoryCtrl', ArticleCategoryCtrl)
            .controller('LanguagesCtrl', LanguagesCtrl)
            .controller('SettingsCtrl', SettingsCtrl);
            

    DashboardCtrl.$inject = ['GetStatistics'];
    GroupCtrl.$inject = ['$scope', 'Group', 'AddGroup', 'RemoveGroup', 'EditGroup', '$alert', '$modal', '$rootScope'];
    PermissionCtrl.$inject = ['$scope', '$alert', 'Permission', 'AddPermission', 'RemovePermission', 'EditPermission', '$modal', '$rootScope'];
    GroupOptionsCtrl.$inject = ['$scope', '$routeParams', 'GroupOptions', '$alert', 'ChangePermissionsInGroup'];
    UsersCtrl.$inject = ['$scope', '$alert', 'User', 'AddUser', 'RemoveUser', 'EditUser', 'SearchUsers', '$modal', '$rootScope', 'GetUserBans', 'RemoveBan', 'AddBan'];
    UserOptionsCtrl.$inject = ['$scope', '$alert', '$routeParams', 'UserOptions', 'ChangeGroupByUser', '$modal', '$rootScope'];
    ResourcesCtrl.$inject = ['$scope', 'AddResource', 'AllResource', 'DeleteResource', '$alert', '$modal', '$rootScope', 'EditResource', 'GetSearchResources'];
    PagesCtrl.$inject = ['$scope', '$alert', '$modal', 'AddPage', 'Status', 'Pages', 'GetPage', 'DeletePage', 'SavePage', '$window', '$location', '$rootScope'];
    activCtrl.$inject = ['$scope', '$location', 'CheckLang'];
    CategoriesOfArticlesCtrl.$inject = ['GetCategoryOfArticle', '$alert', '$scope', '$modal', '$rootScope', 'RemoveCategoryOfArticle', 'AddCategoryOfArticle', 'EditCategoryOfArticle'];
    ArticleCategoryCtrl.$inject = ['GetArticles', '$routeParams', '$scope', '$alert', '$window', '$location', '$modal', '$rootScope', 'EditArticle', 'SearchArticles', 'RemoveArticle'];
    LanguagesCtrl.$inject = ['GetLanguageFiles', '$rootScope', '$scope', '$alert', 'EditLanguageFile'];
    SettingsCtrl.$inject = ['GetSections', 'ChangeSection', '$alert', '$scope'];
    
    function activCtrl($scope, $location, CheckLang) {
        var vm = this;
        vm.isActive = isActive;
        vm.checkLang = checkLang;
        
        function isActive(path){  
              return ((path === $location.path()) || (($location.path().indexOf('/groups/') === 0) && (path === '/groupsPermis'))
                      || (($location.path().indexOf('/users/') === 0) && (path === '/userGroups'))
                      || (($location.path().indexOf('/categories_of_articles/') === 0) && (path === '/articleCategory')));  
        };

        function checkLang(lang){
          CheckLang.query({language: lang}, function(answer){
              var oldLang =  window.location.pathname.substr(1, 2);
              window.location.href = document.location.href.replace('/' + oldLang +'/', '/' + lang +'/');
          });
        };
    }
    
    function DashboardCtrl(GetStatistics) {
        var vm = this;
        vm.chartType = 'bar';
        vm.chartType2 = 'pie';
        vm.data1 = {};
        vm.data2 = {};
        vm.users_in_groups = '';
        vm.articles_in_categories = '';
        vm.config2 = {
            labels: false,
            title : (lang == 'en' ? 'Users in groups' : 'Пользователи в группах'),
            legend : {
                    display: true,
                    position:'right'
            }
	};
        vm.config1 = {
            labels: false,
            title : (lang == 'en' ? 'Articles in categories' : 'Статьи в категориях'),
            legend : {
                    display: true,
                    position:'right'
            }
	};
        
        GetStatistics.query({}, function(answer){
            
            var groups = [];
            var countUsers = [];
            angular.forEach(answer[0], function(groupOfUsers){
                groups.push(groupOfUsers.title);
                var obj = {
                    x: groupOfUsers.title,
                    y: [groupOfUsers.countUsers]
                };
                countUsers.push(obj);
            });
            vm.data2.series = groups;
            vm.data2.data = countUsers;
            var categories = [];
            var articlesCount = [];
            angular.forEach(answer[1], function(categoryOfArticles){
                categories.push(categoryOfArticles.title);
                articlesCount.push(categoryOfArticles.countArticles);
            });
            vm.data1.series = categories;
            var arr = [{
                    y: articlesCount
            }];
            vm.data1.data = arr;
        });
    };

    function GroupCtrl($scope, Group, AddGroup, RemoveGroup, EditGroup, $alert, $modal, $rootScope){
        var alertError;
        var alertSuccess;
        function showErrorAlert(alertMessage){
            if(alertError != null){
                alertError.$promise.then(alertError.hide);
            }
            if(alertSuccess != null){
                alertSuccess.$promise.then(alertSuccess.hide);
            }
            alertError = $alert({title: alertMessage, placement: 'top-right', type: 'danger', container: '#alerts-container'});
            alertError.$promise.then(alertError.show);
        }
        function showSuccessAlert(alertMessage){
            if(alertError != null){
                alertError.$promise.then(alertError.hide);
            }
            if(alertSuccess != null){
               alertSuccess.$promise.then(alertSuccess.hide);
            }
            alertSuccess = $alert({title: alertMessage, placement: 'top-right', type: 'success', container: '#alerts-container', duration: 3});
            alertSuccess.$promise.then(alertSuccess.show);
        }
        
        var vm = this;
        vm.addGroup = addGroup;
        vm.groupName = '';
        vm.groupDescription = '';
        vm.modal = '';
        vm.gridOptions = '';
        vm.edit_group_message = '';
        vm.add_group_message = '';
        vm.remove_group_message = '';
        vm.idAdminsGroup = 0;
        vm.title_already_taken = '';
        vm.title_empty = '';

        var removeGroupId = null;
        vm.modal = $modal({
            show: false,
            contentTemplate: 'ConfirmDelete.html'
        });
        //Удаление +++
        $scope.$on('EventForDropGroup', function (event, id) {
            removeGroupId = Number(id);
            if(id != vm.idAdminsGroup){
                vm.modal.show();
            }
        });

        //Redirect to permission
        $scope.$on('EventForRedirectToGroupOptions', function (event, id) {
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
              cellTemplate: '<spanremove remove-action="EventForDropGroup" remove-id="{{row.entity.id}}" ng-hide/>' }
        ];

        vm.gridOptions.onRegisterApi = function(gridApi){
           gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
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
                        showErrorAlert(vm.title_already_taken);
                        vm.gridOptions.data[k].title = oldValue;
                    } else {
                        if(newValue.trim() === ''){
                            showErrorAlert(vm.title_empty);
                            vm.gridOptions.data[k].title = oldValue;
                        } else {
                            if(oldValue !== newValue)
                            {
                                EditGroup.query({groupId: rowEntity.id, title: newValue, groupDescription: oldGroup.description}, function(answer){
                                    if(answer[0] === false){
                                        showErrorAlert(answer[1]);
                                    } else
                                    {
                                        showSuccessAlert(vm.edit_group_message);
                                    }
                                });
                            }
                        }
                    }

                } else {
                    if((newValue !== null) && (newValue.trim() != oldValue)) {
                        EditGroup.query({groupId: rowEntity.id, title: oldGroup.title, groupDescription: newValue}, function(answer){
                            if(answer[0] === false){
                                showErrorAlert(answer[1]);
                            } else
                            {
                                showSuccessAlert(vm.edit_group_message);
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
            angular.forEach(res, function(elem){
                if(elem.isAdmin){
                    vm.idAdminsGroup = elem.id;
                }
            });
            vm.gridOptions.data = res;
        });

        //Добавление
        function addGroup(){
            var isExists = 0;
            angular.forEach(vm.gridOptions.data, function(group) {
                if (group.title === vm.groupName){
                    showErrorAlert(vm.title_already_taken);
                    isExists = 1;
                }
            });
            if(isExists){
                return;
            }
            if((vm.groupName == null) || (vm.groupName.trim() === "")){
                showErrorAlert(vm.title_empty);
                return;
            }

            AddGroup.query({title: vm.groupName, groupDescription: vm.groupDescription}, function(answer){
                if(answer.res){
                  vm.gridOptions.data.push({title: vm.groupName, description: vm.groupDescription, id: answer.id});
                  vm.groupName = "";
                  vm.groupDescription = "";
                    showSuccessAlert(vm.add_group_message);
                } else {
                    showErrorAlert(answer.message);
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
                    showSuccessAlert(vm.remove_group_message);
                }
            });
        }

        $rootScope.$on('cancelDeleteGroup', function(){
            vm.modal.hide();
        });

        $rootScope.$on('okDeleteGroup', function(){
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
            var alertSuccess;
            
            function showSuccessAlert(alertMessage){
                if(alertSuccess != null){
                    alertSuccess.$promise.then(alertSuccess.hide);
                }
                alertSuccess = $alert({title: alertMessage, placement: 'top-right', type: 'success', container: '#alerts-container_option', duration: 3});
                alertSuccess.$promise.then(alertSuccess.show);
            }
            
            var vm = this;
            vm.groupTitle = '';
            vm.groupDescription = '';
            vm.groupId = 0;
            vm.gridOptions_groupOptions = '';
            vm.remove_perm_from_group = '';
            vm.add_perm_to_group = '';
            
            vm.gridOptions_groupOptions = { enableFiltering: true };
            vm.gridOptions_groupOptions.columnDefs = [
                { name: 'id', displayName: 'Id', enableCellEdit: false, width: '10%', enableFiltering: false },
                { name: 'title', displayName: 'Title', width: '30%', enableCellEdit: false },
                { name: 'description', displayName: 'Description' , width: '45%', enableFiltering: false, enableCellEdit: false },
                { name: 'accept', displayName: 'Accept' , width: '15%', enableFiltering: false, enableCellEdit: false,
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
                ChangePermissionsInGroup.query({groupId: vm.groupId, accept : accept, permId: id}, function(answer){
                    if(answer[0]){
                        angular.forEach(vm.gridOptions_groupOptions.data, function(permission) {    //Проверяем, существует ли право с таким именем
                            if(permission.id == id){
                                if(accept){
                                    permission.accept = 0;
                                    showSuccessAlert(vm.remove_perm_from_group);
                                }
                                else {
                                    permission.accept = 1;
                                    showSuccessAlert(vm.add_perm_to_group);
                                }
                            }
                        });
                    }
                });

            });    
    };

    function UsersCtrl($scope, $alert, User, AddUser, RemoveUser, EditUser, SearchUsers, $modal, $rootScope, GetUserBans, RemoveBan, AddBan) {
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
            vm.direction = 'asc';
            vm.field = 'id';
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
            vm.myId = 0;
            vm.invalid_email_message = '';
            vm.userBan = null;
            vm.modalBan = {};
            vm.hideCurrentBan = true;
            vm.ban = {};
            vm.confirmDeleteBan = true;
            vm.acceptRemoveBan = acceptRemoveBan;
            vm.banDate = "";
            vm.banTime = "";
            vm.banReason = "";
            vm.banUserId = 0;
            vm.errorDate = false;
            vm.successfully_blocked_message = '';
            
            vm.users_grid = {
                enableFiltering: false
            };
            
            vm.users_grid.columnDefs = [
                { name: 'id', enableCellEdit: false, width: '8%'},
                { name: 'email', enableCellEdit: true, width: '15%'},
                { name: 'first_name', enableCellEdit: false, width: '10%'},
                { name: 'last_name', enableCellEdit: false, width: '10%'},
                { name: 'phone', enableCellEdit: false, width: '15%', enableSorting: false},
                { name: 'ban', enableCellEdit: false, width: '5%', enableSorting: false,
                    cellTemplate: '<span class="fa fa-ban" style="margin-left: 40%; cursor: pointer" ng-click="$emit(\'changeBan\', row.entity.id, row.entity.email)"></span>'},
                { name: 'groups', displayName: 'Groups' , width: '8%', enableCellEdit: false,  enableSorting: false,
                    cellTemplate: '<spanedit edit-action="EventForRedirectToUserOptions"  edit-id="{{row.entity.id}}"/>'},
                { name: 'remove', displayName: 'Remove' , width: '8%', enableCellEdit: false, enableFiltering: false, enableSorting: false,
                    cellTemplate: '<spanremove remove-action="EventForDropUser" remove-id="{{row.entity.id}}"/>' }
            ];
            
            var offset = 0;
            var limit =  9;
            
            var searchText = '';

            getUsers(limit, offset, 'asc', 'id');
            
            function nextPage(){
                if((vm.currentPage + 1) <= vm.totalPage) {
                    vm.unavailableNext = true;
                    vm.unavailablePrev = true;
                    offset += limit;
                    vm.currentPage++;
                    if(vm.action === 0) {   //Обычный просмотр
                        getUsers(limit, offset, 'asc', 'id');
                    } else if(vm.action === 1){     //Поиск
                        getFindUsers(searchText, limit, offset, 'asc', 'id');
                    } else if(vm.action === 2){         //сортировка
                        getUsers(limit, offset, vm.direction, vm.field);
                    } else if (vm.action === 3) {   //Сортировка с поиском
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
                            var newUser = {
                                id: answer[2],
                                email: vm.email
                            };
                            vm.users_grid.data.push(newUser);

                            vm.countUsers++;
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
                if(id != vm.myId)
                {
                    userRemoveId = Number(id);
                    vm.modal.show();
                }
            });

            //Редактирование +++
            vm.users_grid.onRegisterApi = function(gridApi){
                //Редактирование
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
                    alertError.hide();
                    alertSuccess.hide();

                    if(newValue.trim() === ''){
                        alertError = $alert({title: vm.invalid_email_message, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                        angular.forEach(vm.users_grid.data, function(user) {
                            if (user.id === rowEntity.id) 
                                user.email = oldValue;
                        });
                    } else {
                        var str = newValue;
                        var a = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
                        if(str.search(a) === -1){
                            alertError = $alert({title: vm.invalid_email_message, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                            angular.forEach(vm.users_grid.data, function(user) {
                                if (user.id === rowEntity.id) 
                                    user.email = oldValue;
                            }); 
                        } else {
                            if(newValue.trim() !== oldValue)
                            {
                                EditUser.query({userId: rowEntity.id, email: newValue}, function(answer){
                                    if(answer[0] === false){
                                        alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container-for-users'});
                                        angular.forEach(vm.users_grid.data, function(user) {
                                            if (user.id === rowEntity.id) 
                                                user.email = oldValue;
                                        }); 
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
                            vm.field = vm.fieldFindSort;
                            vm.direction = vm.dirFindSort;
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
                RemoveUser.query({userId: id, field: vm.field, direction: vm.direction, action: vm.action, off: (offset + limit - 1), text: vm.searchText}, function(answer){
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
                    vm.totalPage = Math.ceil(vm.countUsers / limit);
                    checkNavigationButton();
                    if(answer[1][0].length != 0){
                        if((vm.action == 1) || (vm.action == 3)) {
                            vm.users_grid.data.push(answer[1][0][0]);
                        } else {
                            vm.users_grid.data.push(answer[1][0]);
                        }
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
            
            vm.modalBan = $modal({
                show: false,
                contentTemplate: 'Ban.html',
                scope: $scope
            });
            
            $rootScope.$on('changeBan', function(args, id, user){
                if(id != vm.myId)
                {
                    vm.userBan = user;
                    vm.banUserId = id;
                    vm.hideCurrentBan = true;
                    vm.confirmDeleteBan = true;
                    vm.ban = {};
                    GetUserBans.query({userId: id}, function(answer){
                        if(answer[0]){  //Уже забанен
                            vm.hideCurrentBan = false;
                            vm.ban = answer[0];
                        }
                        vm.modalBan.show();
                    });
                }
            });
            
            $rootScope.$on('cancelBan', function(){
                vm.modalBan.hide();
            });
            
            $rootScope.$on('okBan', function(){
                var oldValueDate = new Date(vm.banDate);
                var oldValueTime = new Date(vm.banTime);
                vm.banDate.setHours(vm.banDate.getHours() + vm.banTime.toString().slice(16, 18));
                vm.banDate.setMinutes(vm.banDate.getMinutes() + vm.banTime.toString().slice(19, 21));
                var currentDate = new Date();
                if(vm.banDate.getTime() <= currentDate.getTime()){   //Ошибка
                    vm.errorDate = true;
                } else{ //Всё норм
                    AddBan.query({userId: vm.banUserId, endDate: vm.banDate, reason: vm.banReason}, function(answer){
                        vm.banDate = '';
                        vm.banTime = '';
                        vm.banReason = '';
                        vm.modalBan.hide();
                        alertSuccess = $alert({title: vm.successfully_blocked_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container-for-users', duration: 3});
                    });
                    vm.errorDate = false;
                }
                vm.banDate = oldValueDate;
                vm.banTime = oldValueTime;
            }); 
            
            $rootScope.$on('showConfirmDeleteBan', function(){
                vm.confirmDeleteBan = false;
            }); 
            
            function acceptRemoveBan(id){
                RemoveBan.query({id: id}, function(answer){
                    vm.confirmDeleteBan = true;
                    vm.hideCurrentBan = false;
                    vm.hideCurrentBan = true;
                });
            }
    };

    function UserOptionsCtrl($scope, $alert, $routeParams, UserOptions, ChangeGroupByUser, $modal, $rootScope) {
            var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container_option_for_users'});
            var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container_option_for_users'});
            var vm = this;
            var deleteSelfFromAdmin = false;
            vm.userEmail = '';
            vm.lastName = '';
            vm.firstName = '';
            vm.userId = 0;
            vm.gridOptions_userOptions = '';
            vm.remove_user_from_group = '';
            vm.add_user_to_group = '';
            vm.currentAdminId = 0;
            vm.modal = $modal({
                show: false,
                contentTemplate: 'ConfirmDelete.html'
            });
            vm.selfAccept = 0;
            vm.grSelfId = 0;

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
                alertError.hide();
                if((id == 1) && (vm.currentAdminId == $routeParams.userId) && (!deleteSelfFromAdmin)){
                   vm.modal.show(); 
                   vm.selfAccept = accept;
                   vm.grSelfId = id;
                   return;
                };
                ChangeGroupByUser.query({userId: vm.userId, accept : accept, groupId: id}, function(answer){
                    console.log(answer);
                    if(answer[0]){
                        angular.forEach(vm.gridOptions_userOptions.data, function(group) {    //Проверяем, существует ли право с таким именем
                            if(group.id == id){
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
                        if(deleteSelfFromAdmin){
                            window.location.href = '/';
                        }
                    } else {
                        alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container_option_for_users'});
                    }
                });
                
            });
            $rootScope.$on('cancelDeleteGroup', function(){
                vm.modal.hide();
            });
            $rootScope.$on('okDeleteGroup', function(){
                vm.modal.hide();
                deleteSelfFromAdmin = true;
                $scope.$emit('EventChangeUser', vm.grSelfId, vm.selfAccept); 
            });
    };

    function ResourcesCtrl($scope, AddResource, AllResource, DeleteResource, $alert, $modal, $rootScope, EditResource, GetSearchResources) {
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
        
        var vm = this;
        vm.gridOptions_resourcesGrid = [];
        vm.modal = {};
        vm.add = add;
        vm.add_resource_message = '';
        vm.deleteResource = deleteResource;
        vm.remove_resource_message = '';
        vm.direction = 'asc';
        vm.totalPage = 0;
        vm.currentPage = 1;
        vm.limit = 5;
        vm.offset = 0;
        vm.unavailablePrev = false;
        vm.unavailableNext = false;
        vm.prevPage = prevPage;
        vm.nextPage = nextPage;
        vm.action = 0;
        vm.search = search;
        vm.countResources = 0;
        vm.reset = reset;
        vm.empty_field = '';
        vm.success_changed_message = '';
        vm.select_file = '';
        vm.copy_url = '';
        vm.searchText2 = '';
        vm.src2 = '';
        /*
         * action - режим навигации
         * 0 - обыная навигация или навигация с упорядочиванием
         * 1 - поиск или поиск с упорядочиванием
         */
        
        vm.resource = {
            title: '',
            file: ''
        };

        vm.resources = [];

        getResources();

        vm.gridOptions_resourcesGrid = { enableFiltering: false, rowHeight: 110 };

        vm.gridOptions_resourcesGrid.columnDefs = [
            { name: 'id', visible: false},
            { name: 'title', displayName: 'Title', width: '20%', enableCellEdit: true, enableSorting: true },
            { name: 'url', displayName: 'Url' , width: '30%', enableCellEdit: false, enableSorting: false,
                cellTemplate: '<div style="position: relative"><p>{{row.entity.url.length > 50 ? row.entity.url.substr(0, 45) + "..." : row.entity.url}}</p>\n\
                    <a clip-copy="row.entity.url" ng-click="$emit(\'EventForCopyUrl\')" class="fa fa-files-o" style="margin-left: 90%; position: absolute; \n\
                    margin-top: -6%"></a></div>'
            },
            { name: 'view', displayName: 'View' , width: '15%', enableCellEdit: false, enableSorting: false, 
                cellTemplate: '<div class="resourcePadding"><img ng-src="{{row.entity.url}}"></div>' },
            { name: 'action', displayName: 'Remove' , width: '1%', enableCellEdit: false, enableSorting: false, 
                cellTemplate: '<span class="fa fa-close" style="cursor: pointer; margin: 40%" ng-click="$emit(\'EventForDropResource\', row.entity.id)" style="margin-left: 25%; margin-top: 15%"></span>'}
        ];

        var removeResourceId = null;
        vm.modal = $modal({
            show: false,
            contentTemplate: 'ConfirmDelete.html'
        });
        
        $scope.$on('EventForCopyUrl', function (event) {
            alertSuccess.hide();
            alertError.hide();
            $alert({title: vm.copy_url, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
        });
        
        $scope.$on('EventForDropResource', function (event, id) {
            removeResourceId = id;
            vm.modal.show();
        });

        function add(resource) {
            alertSuccess.hide();
            alertError.hide();
            if(resource.file === '') {
                $alert({title: vm.select_file, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container', duration: 3});
            } else {
                AddResource.query({title: resource.title, file: resource.file}, function(answer) {
                    if(answer[0]) {
                        $alert({title: vm.add_resource_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                        vm.resource = {
                            title: '',
                            file: ''
                        };
                        angular.element(document.querySelector('#fileInput')).val(null);
                        vm.countResources++;
                        if((vm.currentPage < vm.totalPage) && (vm.limit * vm.totalPage >= vm.countResources)){
                            vm.offset = vm.limit * vm.totalPage - vm.limit;
                            vm.currentPage = vm.totalPage;
                            if(!vm.action) {    //Обычная навигация
                                getResources();
                            } else {    //С поиском
                                getSearchResources();
                            }
                            console.log('1-й');
                        } else if(((vm.currentPage < vm.totalPage) || (vm.currentPage == vm.totalPage)) && (vm.limit * vm.totalPage < vm.countResources)){
                            vm.offset = vm.limit * vm.totalPage;
                            vm.currentPage = vm.totalPage + 1;
                            if(!vm.action) {    //Обычная навигация
                                getResources();
                            } else {    //С поиском
                                getSearchResources();
                            }
                            console.log('2-й');
                        }
                        else {
                            vm.gridOptions_resourcesGrid.data.push(answer[1]);
                            console.log('3-й');
                        }
                    } else {
                        $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container', duration: 3});
                    }
                });
            }
        };

        function deleteResource(id) {
            DeleteResource.query({id: id, direction: vm.direction, offset: vm.offset, action: vm.action, limit: vm.limit, phrase: vm.searchText, src: vm.src}, function (answer) {
                vm.modal.hide();
                if(answer[0]) {
                    vm.countResources = answer[0][2][1];
                    var arr = [];
                    angular.forEach(vm.gridOptions_resourcesGrid.data, function(elem){
                        if(elem.id != id){
                            arr.push(elem);
                        }
                    });
                    if(answer[0][2][0][0] != undefined){
                        arr.push(answer[0][2][0][0]);
                    }
                    vm.gridOptions_resourcesGrid.data = [];
                    vm.gridOptions_resourcesGrid.data = arr;
                    checkNavBtnAndCountTotalPage();
                    $alert({title: vm.remove_resource_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                } else {
                    $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container', duration: 3});
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
        
        function getResources(){
            vm.resources = AllResource.query({limit: vm.limit, offset: vm.offset, direction: vm.direction}, function(answer){
                vm.gridOptions_resourcesGrid.data = [];
                angular.forEach(answer[0], function(resource){
                    vm.gridOptions_resourcesGrid.data.push(resource);
                });
                vm.countResources = answer[1];
                checkNavBtnAndCountTotalPage();
            });
        }
        
        function checkNavBtnAndCountTotalPage(){
            vm.totalPage = Math.ceil(vm.countResources/vm.limit);
            vm.unavailablePrev = false;
            vm.unavailableNext = false;
            if(vm.currentPage == 1){
                vm.unavailablePrev = true;
            }
            
            if(vm.currentPage == vm.totalPage){
                vm.unavailableNext = true;
            }
        }
        
        function prevPage(){
            vm.unavailablePrev = true;
            vm.unavailableNext = true;
            vm.offset -= vm.limit;
            vm.currentPage--;
            if(!vm.action){
                getResources();
            } else {
                getSearchResources();
            }
        }
        
        function nextPage(){
            vm.unavailablePrev = true;
            vm.unavailableNext = true;
            vm.offset += vm.limit;
            vm.currentPage++;
            if(!vm.action){
                getResources();
            } else {
                getSearchResources();
            }
        }
        
        
        vm.gridOptions_resourcesGrid.onRegisterApi = function(gridApi){
            //Редактирование
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
                alertError.hide();
                alertSuccess.hide();
                if(newValue.trim() != oldValue.trim()){
                    if(newValue.trim() === ''){
                        alertError = $alert({title: vm.empty_field, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                        angular.forEach(vm.gridOptions_resourcesGrid.data, function(resource) {
                            if (resource.id === rowEntity.id) 
                                resource.title = oldValue;
                        });
                    } else {
                        EditResource.query({id: rowEntity.id, title: newValue}, function(answer){
                            if(answer[0]){
                                alertSuccess = $alert({title: vm.success_changed_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                            } else {
                                alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                                angular.forEach(vm.gridOptions_resourcesGrid.data, function(resource) {
                                    if (resource.id === rowEntity.id) 
                                        resource.title = oldValue;
                                });
                            }
                        });
                    }
                }
            });

            //Сортировка
            gridApi.core.on.sortChanged($scope, function(arg1, arg2) {
                if(arg2.length !== 0){
                    vm.unavailablePrev = true;
                    vm.unavailableNext = true;
                    vm.direction = arg2[0].sort.direction;;
                    vm.currentPage = 1;
                    vm.offset = 0;
                    if(!vm.action){    //Обычная сортировка
                        getResources();                    
                    } else {    //Сортировка с поиском
                        getSearchResources();
                    }
                }
            });                       
        };
        
        function search(){
            vm.direction = 'asc';
            vm.offset = 0;
            vm.unavailablePrev = true;
            vm.unavailableNext = true;
            vm.currentPage = 1;
            vm.action = 1;
            vm.searchText2 = vm.searchText;
            vm.src2 = vm.src;
            getSearchResources();
        }
        
        function getSearchResources(){
            GetSearchResources.query({phrase: vm.searchText2, src: vm.src2, direction: vm.direction, limit: vm.limit, offset: vm.offset}, function(answer){
                vm.gridOptions_resourcesGrid.data = [];
                angular.forEach(answer[0], function(resource){
                    vm.gridOptions_resourcesGrid.data.push(resource);
                });
                vm.countResources = answer[1];
                checkNavBtnAndCountTotalPage();
            });
        }
        
        function reset(){
            vm.action = 0;
            vm.currentPage = 1;
            vm.offset = 0;
            vm.direction = 'asc';
            vm.unavailablePrev = true;
            vm.unavailableNext = true;
            getResources();
        }
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
            { name: 'body', displayName: 'Short content' , width: '33%', enableFiltering: false, enableCellEdit: false },
            { name: 'url', displayName: 'Url' , width: '5%', enableCellEdit: false},
            { name: 'status', displayName: 'Status' , width: '5%', enableFiltering: false, enableCellEdit: false,
                cellTemplate: '<p ng-class="{\'btn-success\': row.entity.status==\'Public\', \'btn-info\': row.entity.status==\'Private\', \n\
                    \'btn-warning\': row.entity.status==\'Draw\'}" class="form-control btn" style="width: 50%; margin-left: 25%; margin-top: 10%">{{row.entity.status}}</p>'},
            { name: 'actions', displayName: 'Actions' , width: '2%', enableFiltering: false, enableCellEdit: false,
                cellTemplate: '<p ng-click="$emit(\'EventForEditPage\', row.entity.id)" class="actionCol fa fa-edit"></p><br/>\n\
                    <p ng-click="$emit(\'EventForDropPage\', row.entity.id)" class="actionCol fa fa-close"></p><br/>\n\
                    <p ng-click="$emit(\'EventForShowPage\', row.entity.url)" class="actionCol fa fa-file-o"></p>'
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
                    if(arr[i].id == id) {
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
     
    function CategoriesOfArticlesCtrl(GetCategoryOfArticle, $alert, $scope, $modal, $rootScope, RemoveCategoryOfArticle, AddCategoryOfArticle, EditCategoryOfArticle){
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
        var vm = this;  
        vm.gridOptionsOfCategories = {};
        vm.categoryTitle = '';
        vm.removeCategoryId = 0;
        vm.addCategory = addCategory;
        vm.remove_category_message = '';
        vm.add_category_message = '';
        vm.field_name_required = '';
        vm.update_category_message = '';
        vm.defaultCategoryId = 0;
         
        vm.gridOptions_categoriesOptions = { enableFiltering: true, enableSorting: true, enableCellEdit: true};
        vm.gridOptions_categoriesOptions.columnDefs = [
            { name: 'id', displayName: 'Id', width: '10%', enableCellEdit: false,  enableSorting: false, enableFiltering: false },
            { name: 'title', displayName: 'Title', width: '50%', enableCellEdit: true,  enableSorting: true, enableFiltering: true},
            { name: 'articles', displayName: 'Articles' , width: '20%', enableCellEdit: false,  enableSorting: false, enableFiltering: false,
                    cellTemplate: '<spanedit edit-action="EventForRedirectToArticleOfCategory"  edit-id="{{row.entity.id}}"/>'},
            { name: 'remove', displayName: 'Remove' , width: '20%', enableCellEdit: false,  enableSorting: false, enableFiltering: false,
                cellTemplate: '<spanremove remove-action="EventForDropCategory" remove-id="{{row.entity.id}}"/>'}
        ];
        
        GetCategoryOfArticle.query({}, function(answer){
            var arr = [];
            angular.forEach(answer[0], function(category) {
                arr.push(category);
            });
            vm.gridOptions_categoriesOptions.data = arr;
        });
        
        vm.modal = $modal({
            show: false,
            contentTemplate: 'ConfirmDelete.html'
        });
        
        //Удаление 
        $scope.$on('EventForDropCategory', function (event, id) {
            if(id != vm.defaultCategoryId){
                alertError.hide();
                alertSuccess.hide();
                vm.removeCategoryId = Number(id);
                vm.modal.show();
            }
        });
        
        $rootScope.$on('cancelDeleteCategory', function(){
            vm.modal.hide();
        });

        $rootScope.$on('okDeleteCategory', function(){
           alertSuccess.hide();
           removeCategory(vm.removeCategoryId);
        });
        
        function removeCategory(removeId){
            RemoveCategoryOfArticle.query({categoryId: removeId}, function(answer){
                vm.modal.hide();
                alertSuccess = $alert({title: vm.remove_category_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                var i = 0;
                angular.forEach(vm.gridOptions_categoriesOptions.data, function(category) {
                    if(category.id == removeId){
                        vm.gridOptions_categoriesOptions.data.splice(i, 1);
                    }
                  i++;
                });
            });
        }
        
        function addCategory(){
            alertError.hide();
            alertSuccess.hide();
            AddCategoryOfArticle.query({title: vm.categoryTitle}, function(answer){
                if(!answer[0]){
                    alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                } else {      
                    alertSuccess = $alert({title: vm.add_category_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                    var newCategory = {
                        id: answer[3],
                        title: vm.categoryTitle
                    };
                    vm.gridOptions_categoriesOptions.data.push(newCategory); 
                    vm.categoryTitle = '';
                }
                
            });
        }
        
        //Редактирование
        vm.gridOptions_categoriesOptions.onRegisterApi = function(gridApi){

            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
                alertError.hide();
                alertSuccess.hide();
                if(newValue.trim() !== oldValue.trim()){
                    if(newValue.trim() === ''){
                        alertError = $alert({title: vm.field_name_required, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                        angular.forEach(vm.gridOptions_categoriesOptions.data, function(category) {
                            if (category.id === rowEntity.id) 
                                category.title = oldValue;
                        });
                    } else{
                        EditCategoryOfArticle.query({title: newValue, id: rowEntity.id}, function(answer){
                            if(!answer[0]){
                                alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                                angular.forEach(vm.gridOptions_categoriesOptions.data, function(category) {
                                    if (category.id === rowEntity.id) 
                                        category.title = oldValue;
                                });
                            } else{
                                alertSuccess = $alert({title: vm.update_category_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                            }
                        });
                    }
                }
            });                      
        };
        
        $scope.$on('EventForRedirectToArticleOfCategory', function (event, id) {
            alertError.hide();
            alertSuccess.hide();
            window.location = '#/categories_of_articles/' + id;
        });
     }
     
    function ArticleCategoryCtrl(GetArticles, $routeParams, $scope, $alert, $window, $location, $modal, $rootScope, EditArticle, SearchArticles, RemoveArticle){
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
        var vm = this;
        vm.limit = 9;
        vm.offset = 0;
        vm.direction = 'asc';
        vm.field = 'id';
        vm.categoryTitle = '';
        vm.unavailablePrev = true;
        vm.unavailableNext = true;
        vm.searchPhrase = '';
        vm.removeArticleId = 0;
        vm.countArticles = 0;
        vm.currentPage = 1;
        vm.totalPage = 0;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;
        /*action - навигация по страницам при поиске, сортировке, при обычной навигации
         * 0 - обычная навигация или с сортировкой
         * 1 - поиск и поиск с сортировкой
         */
        vm.action = 0;
        vm.search = search;
        vm.src = '';
        vm.searchPhrase2 = '';
        vm.src2 = '';
        vm.reset = reset;
        vm.article_removed_message = '';
        vm.article_change_message = '';
        vm.required_field = '';
        
        vm.modal = $modal({
            show: false,
            contentTemplate: 'ConfirmDelete.html'
        });
        
        vm.gridOptions_articleOfCategoryOptions = { enableSorting: true, enableCellEdit: true};
        vm.gridOptions_articleOfCategoryOptions.columnDefs = [
            { name: 'id', displayName: 'Id', width: '5%', enableCellEdit: false,  enableSorting: true},
            { name: 'category', displayName: 'Category', width: '15%', enableCellEdit: true,  enableSorting: false, visible: ($routeParams.categoryId === undefined) },
            { name: 'title', displayName: 'Title', width: '20%', enableCellEdit: true,  enableSorting: true},
            { name: 'link', displayName: 'Link', width: '5%', enableCellEdit: true,  enableSorting: false,
                cellTemplate: '<spanedit edit-action="EventForRedirectToShowArticle"  edit-id="{{row.entity.id}}"/>'},
            { name: 'user_email', displayName: 'Email of the author', width: '20%', enableCellEdit: false,  enableSorting: false},
            { name: 'remove', displayName: 'Remove' , width: '5%', enableCellEdit: false,  enableSorting: false,
                cellTemplate: '<spanremove remove-action="EventForDropArticle" remove-id="{{row.entity.id}}"/>'}
        ];
        getArticles();
        
        $scope.$on('EventForRedirectToShowArticle', function (event, id) {
            alertError.hide();
            alertSuccess.hide();
            $window.open('http://' + $location.host() + ':' + $location.port() + '/' + lang + '/articles#/' + id);
        });
        
        //Удаление 
        $scope.$on('EventForDropArticle', function (event, id) {
            alertError.hide();
            alertSuccess.hide();
            vm.removeArticleId = Number(id);
            vm.modal.show();
        });
        
        $rootScope.$on('cancelDeleteArticle', function(){
            vm.modal.hide();
        });

        $rootScope.$on('okDeleteArticle', function(){
           alertSuccess.hide();
           vm.modal.hide();
           removeArticle(vm.removeArticleId);
        });
        
        function removeArticle(removeId){
            RemoveArticle.query({id: removeId, direction: vm.direction, offset: vm.offset, action: vm.action, limit: vm.limit, phrase: vm.searchPhrase2, src: vm.src2, category: $routeParams.categoryId, field: vm.field}, function(answer){
                var arr = [];
                angular.forEach(vm.gridOptions_articleOfCategoryOptions.data, function(article){
                    if(article.id != removeId)
                        arr.push(article);
                });
                vm.gridOptions_articleOfCategoryOptions.data = arr;
                if(answer[0][0].length != 0){
                    if($routeParams.categoryId == undefined){
                        answer[0][0][0].category = answer[0][0][0].category.title;
                    }
                    answer[0][0][0].user_email = answer[0][0][0].user == null ? 'deleted' : answer[0][0][0].user.email;
                    vm.gridOptions_articleOfCategoryOptions.data.push(answer[0][0][0]);
                }
                vm.countArticles = answer[0][1];
                alertSuccess = $alert({title: vm.article_removed_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                checkNavBtnAndCheckCountPage();
            });
        }
        
        function checkNavBtnAndCheckCountPage(){
            vm.unavailablePrev = false;
            vm.unavailableNext = false;
            vm.totalPage = Math.ceil(vm.countArticles / vm.limit);
            if(vm.currentPage == 1){
                vm.unavailablePrev = true;
            }
            
            if(vm.currentPage == vm.totalPage){
                vm.unavailableNext = true;
            }
        }
        
        function getArticles(){
            GetArticles.query({categoryId: $routeParams.categoryId, lim: vm.limit, off: vm.offset, dir: vm.direction, fiel: vm.field}, function(answer){
                if(answer[2] != undefined){
                    vm.categoryTitle = answer[2].title;
                }
                
                vm.gridOptions_articleOfCategoryOptions.data = [];
                angular.forEach(answer[0], function(article) {
                    if($routeParams.categoryId === undefined){
                        article.category = article.category.title;
                        article.user_email = article.user == null ? 'deleted' : article.user.email;
                    } else {
                        article.user_email = article.user == null ? 'deleted' : article.user.email;
                    }
                    vm.gridOptions_articleOfCategoryOptions.data.push(article);
                });
                vm.countArticles = answer[1];
                checkNavBtnAndCheckCountPage();
            });
        }
        
        //Редактирование и сортировка
        vm.gridOptions_articleOfCategoryOptions.onRegisterApi = function(gridApi){

            //Редактирование
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
                alertError.hide();
                alertSuccess.hide();
                if(newValue.trim() !== oldValue.trim()){
                    if(newValue.trim() === '') {
                        alertError = $alert({title: vm.required_field, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                        angular.forEach(vm.gridOptions_articleOfCategoryOptions.data, function(article) {
                            if (article.id === rowEntity.id){
                                if(colDef.name === 'category'){
                                    article.category = oldValue;
                                } else {
                                    article.title = oldValue;
                                }
                            } 
                        });
                    } else {
                        EditArticle.query({id: rowEntity.id, title: newValue, field:  colDef.name}, function(answer){
                            console.log();
                            if(!answer[0]){
                                alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                                angular.forEach(vm.gridOptions_articleOfCategoryOptions.data, function(article) {
                                if (article.id === rowEntity.id){
                                        if(colDef.name === 'category'){
                                            article.category = oldValue;
                                        } else {
                                            article.title = oldValue;
                                        }
                                    } 
                                });
                            } else {
                                alertSuccess = $alert({title: vm.article_change_message, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                            }
                            
                        });
                    }
                }
            });   
            
            //Сортировка
            gridApi.core.on.sortChanged($scope, function(arg1, arg2) {
                if(arg2.length !== 0){
                    vm.unavailablePrev = true;
                    vm.unavailableNext = true;
                    vm.currentPage = 1;
                    vm.direction = arg2[0].sort.direction;
                    vm.field = arg2[0].name;
                    vm.offset = 0;
                    
                    //Сортировка с поиском
                    if(!vm.action){     //Обычная сортировка
                        getArticles();
                    } else if(vm.action === 1){ //С поиском
                        searchArticles();
                    }
                }
            });
        };
        
        
        function nextPage(){
            vm.unavailablePrev = true;
            vm.unavailableNext = true;
            vm.offset += vm.limit;
            vm.currentPage++;
            if(!vm.action){     //Обыная навигация и сортировка
                getArticles();
            } else if (vm.action === 1){    //Поиск
                searchArticles();
            }
        }
        
        function prevPage(){
            vm.unavailablePrev = true;
            vm.unavailableNext = true;
            vm.offset -= vm.limit;
            vm.currentPage--;
            if(!vm.action){     //Обыная навигация и сортировка
                getArticles();
            } else if (vm.action === 1) {   //Поиск
                searchArticles();
            }
        }
        
        function search(){
            vm.direction = 'asc';
            vm.field = 'id';
            vm.offset = 0;
            vm.unavailablePrev = true;
            vm.unavailableNext = true;
            vm.currentPage = 1;
            vm.searchPhrase2 = vm.searchPhrase;
            vm.src2 = vm.src;
            vm.action = 1;
            searchArticles();
        }
        
        function searchArticles(){
            SearchArticles.query({categoryId: $routeParams.categoryId, lim: vm.limit, off: vm.offset, dir: vm.direction, fiel: vm.field, phrase: vm.searchPhrase2, src: vm.src2}, function(answer){
                vm.gridOptions_articleOfCategoryOptions.data = [];
                angular.forEach(answer[0], function(article) {
                    if($routeParams.categoryId === undefined){
                        article.category = article.category.title;
                        article.user_email = article.user == null ? 'deleted' : article.user.email;
                    } else {
                        article.user_email = article.user == null ? 'deleted' : article.user.email;
                    }
                    vm.gridOptions_articleOfCategoryOptions.data.push(article);
                });
                vm.countArticles = answer[1];
                checkNavBtnAndCheckCountPage();
            });
        }
        
        function reset(){
            vm.action = 0;
            vm.currentPage = 1;
            vm.offset = 0;
            vm.direction = 'asc';
            vm.field = 'id';
            vm.searchPhrase = '';
            vm.unavailablePrev = true;
            vm.unavailableNext = true;
            getArticles();
        }
    }
    
    function LanguagesCtrl(GetLanguageFiles, $rootScope, $scope, $alert, EditLanguageFile){
        var alertError = $alert({title: '', placement: 'top-right', type: 'danger', show: false, container: '#alerts-container'});
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
        var vm = this;
        vm.path = '/';
        vm.isFile = -1;
        vm.hideLangFiles = false;
        vm.editFile = '';
        vm.selectFile = selectFile;
        vm.required_field = '';
        vm.file_change = '';
        
        vm.gridOptions_gridLanguagesFiles = { enableSorting: false, enableCellEdit: false};
        vm.gridOptions_gridLanguagesFiles.columnDefs = [
            { name: 'folder', displayName: 'Folder',
                cellTemplate: '<p ng-click="$emit(\'selectContent\', row.entity.folder)" style="cursor: pointer">{{row.entity.folder}}</p>'}
        ];
        
        vm.gridOptions_gridLanguagesFile = { enableSorting: false, enableCellEdit: true};
        vm.gridOptions_gridLanguagesFile.columnDefs = [
            {name: 'key', displayName: 'Key', width: '24%', enableCellEdit: false},
            {name: 'english', displayName: 'English'},
            {name: 'russian', displayName: 'Russian'}
        ];
        
        getContent(vm.path);
        $rootScope.$on('selectContent', function(args, content){  
            if(content == '...'){ 
                var position = 0;
                for(var i = 0; i<vm.path.length; i++){
                    if(vm.path[i] == '/'){
                        position = i;
                    }
                }
                vm.path = vm.path.slice(0, position);
            } else {
                if(content.search('.php') == -1)
                {
                    if(vm.path == '/'){
                        vm.path += content;
                    }else{
                        vm.path += '/' + content;
                    }
                } else{
                    vm.editFile = content;
                    vm.hideLangFiles = true;
                }
            }
            if(vm.path == ''){
                vm.path = '/';
            }
            vm.isFile = content.search('.php');
            if(vm.isFile == -1 ){
               getContent(vm.path); 
            } else {
                getContent(vm.path + '/' + content);
            }
        });
        
        function getContent(path){
            GetLanguageFiles.query({path: path}, function(answer){
                if(vm.isFile == -1)
                {
                    if(vm.path != '\\'){
                        vm.gridOptions_gridLanguagesFiles.data = [{folder: '...'}];
                    }
                    angular.forEach(answer[0], function(content){
                        vm.gridOptions_gridLanguagesFiles.data.push({folder: content});
                    });
                }
                else{
                    var arr = [];
                    angular.forEach(answer[1][0], function(value, key1){
                        var obj = {
                          key: key1,
                          english: value
                        };
                        arr.push(obj);
                    });
                    var i = 0;
                    angular.forEach(answer[1][1], function(value){
                        arr[i].russian = value;
                        i++;
                    });
                    vm.gridOptions_gridLanguagesFile.data = arr;
                }
            });
        }
        
        function selectFile(){
            vm.hideLangFiles = false;
            vm.gridOptions_gridLanguagesFile.data = [];
        }
        
        vm.gridOptions_gridLanguagesFile.onRegisterApi = function(gridApi){
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
                alertError.hide();
                alertSuccess.hide();
                if(newValue.trim() !== oldValue.trim()){
                    if(newValue.trim() === '') {
                        alertError = $alert({title: vm.required_field, placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                        angular.forEach(vm.gridOptions_gridLanguagesFile.data, function(phrase) {
                            if (phrase.key === rowEntity.key){
                                if(colDef.name === 'english'){
                                    phrase.english = oldValue;
                                } else {
                                    phrase.russian = oldValue;
                                }
                            } 
                        });
                    } else {
                        EditLanguageFile.query({path: vm.path, file: vm.editFile, language: colDef.name.slice(0, 2), key: rowEntity.key, value: newValue}, function(answer){
                            if(!answer[0]){
                                alertError = $alert({title: answer[1], placement: 'top-right', type: 'danger', show: true, container: '#alerts-container'});
                            } else {
                                alertSuccess = $alert({title: vm.file_change, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                            }
                        });
                    }
                }
            });   
        };
    };
    
    function SettingsCtrl(GetSections, ChangeSection, $alert, $scope){
        var alertSuccess = $alert({title: '', placement: 'top-right', type: 'success', show: false, container: '#alerts-container'});
        var vm = this;
        vm.sections = [];
        vm.toggleSection = toggleSection;
        vm.section_disable = '';
        vm.section_enable = '';
        
        GetSections.query({}, function(answer){
           angular.forEach(answer[0], function(elem){
               var item = {id: elem.id, title: elem.title};
               if(elem.disable){
                   item.disable = 0;
               } else {
                   item.disable = 1;
               }
               vm.sections.push(item);
               
           });
        });
        
        function toggleSection($id, $disable){
            alertSuccess.hide();
            ChangeSection.query({id: $id, disable: $disable}, function(answer){
                if($disable){
                    alertSuccess = $alert({title: vm.section_disable, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                } else {
                    alertSuccess = $alert({title: vm.section_enable, placement: 'top-right', type: 'success', show: true, container: '#alerts-container', duration: 3});
                }
            });
        }
    }
 })();