<div id="alerts-container_perm" ng-init="vm.add_permission_message = '<%trans("admin/permissions.add_permission_message")%>';
     vm.remove_permission_message = '<%trans("admin/permissions.remove_permission_message")%>';
     vm.edit_permission_message = '<%trans("admin/permissions.edit_permission_message")%>';
     vm.title_already_taken = '<%trans("admin/permissions.title_already_taken")%>';
     vm.title_empty = '<%trans("admin/permissions.title_empty")%>';"></div>

<h1 class="page-header"><%trans('admin/permissions.permissions')%></h1>
<div class="table-responsive">
    <h3 class="sub-header"><%trans('admin/permissions.add_permission')%></h3>
    <form name="form" novalidate>
        <div class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="<%trans('admin/permissions.permission_name')%>" ng-model="vm.permissionName" required  maxlength="32">
            </div>
            <div class="input-group">
              <input type="text" class="form-control" id="exampleInputEmail2" placeholder="<%trans('admin/permissions.permission_description')%>" ng-model="vm.permissionDescription"  maxlength="128">
            </div>
            <button type="submit" class="btn btn-default" ng-click="vm.addPermission()" ng-disabled="form.$invalid"><%trans('admin/permissions.add')%></button>
        </div>
    </form>
    <h3 class="sub-header"><%trans('admin/permissions.list_of_permissions')%></h3>
    <div ui-grid="vm.gridOptions_perm" ui-grid-edit class="grid2"></div>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans("admin/permissions.deleting")%></h3>
    </div>
    <div class="modal-body">
        <%trans("admin/permissions.deleting_text")%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeletePermission')"><%trans("admin/permissions.ok")%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeletePermission')"><%trans("admin/permissions.cancel")%></button>
    </div>
</script>