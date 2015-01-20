<div id="alerts-container_perm" ng-init="vm.add_permission_message = '<%trans("permissions.add_permission_message")%>';
     vm.remove_permission_message = '<%trans("permissions.remove_permission_message")%>';
     vm.edit_permission_message = '<%trans("permissions.edit_permission_message")%>';"></div>

<h1 class="page-header"><%trans('permissions.permissions')%></h1>
<div class="table-responsive">
    <h3 class="sub-header"><%trans('permissions.add_permission')%></h3>
    <form>
        <div class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="<%trans('permissions.permission_name')%>" ng-model="vm.permissionName" required>
            </div>
            <div class="input-group">
              <input type="text" class="form-control" id="exampleInputEmail2" placeholder="<%trans('permissions.permission_description')%>" ng-model="vm.permissionDescription">
            </div>
            <button type="submit" class="btn btn-default" ng-click="vm.addPermission()"><%trans('permissions.add')%></button>
        </div>
    </form>
    <h3 class="sub-header"><%trans('permissions.list_of_permissions')%></h3>
    <div ui-grid="vm.gridOptions_perm" ui-grid-edit class="grid2"></div>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans("permissions.deleting")%></h3>
    </div>
    <div class="modal-body">
        <%trans("permissions.deleting_text")%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeletePermission')"><%trans("permissions.ok")%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeletePermission')"><%trans("permissions.cancel")%></button>
    </div>
</script>