<div id="alerts-container_option_for_users" ng-init="vm.add_user_to_group = '<%trans("users.add_user_to_group")%>';
     vm.remove_user_from_group = '<%trans("users.remove_user_from_group")%>'"></div>

<h1 class="page-header" align='center'>{{vm.userEmail}}</h1>
<div class="table-responsive">
    <h3 class="sub-header" style="text-align: center;">{{vm.lastName}} {{vm.firstName}}</h3>
    <h3 class="sub-header"><%trans('users.list_of_groups')%></h3>
    <div ui-grid="vm.gridOptions_userOptions" ui-grid-edit class="grid1"></div>
</div>
