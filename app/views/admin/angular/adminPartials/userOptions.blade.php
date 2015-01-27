<div id="alerts-container_option_for_users" ng-init="vm.add_user_to_group = '<%trans("admin/users.add_user_to_group")%>';
     vm.remove_user_from_group = '<%trans("admin/users.remove_user_from_group")%>';
     vm.currentAdminId = '<%Auth::user()->id%>'"></div>

<h1 class="page-header" align='center'>{{vm.userEmail}}</h1>
<div class="table-responsive">
    <h3 class="sub-header" style="text-align: center;">{{vm.lastName}} {{vm.firstName}}</h3>
    <h3 class="sub-header"><%trans('admin/users.list_of_groups')%></h3>
    <div ui-grid="vm.gridOptions_userOptions" ui-grid-edit class="grid1"></div>
</div>
<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title">Deliting!</h3>
    </div>
    <div class="modal-body">
        Вы действительно хотите исключить себя из данной группы?
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteGroup')">Ok</button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteGroup')">Cancel</button>
    </div>
</script>