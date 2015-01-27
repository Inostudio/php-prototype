<div id="alerts-container" ng-init="vm.edit_group_message = '<%trans("admin/groups.edit_group_message")%>';
     vm.remove_group_message = '<%trans("admin/groups.remove_group_message")%>';
     vm.add_group_message = '<%trans("admin/groups.add_group_message")%>'"></div>

<h1 class="page-header"><%trans('admin/groups.groups')%></h1>
<div class="table-responsive">
    <h3 class="sub-header"><%trans('admin/groups.add_group')%></h3>
    <form>
        <div class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="<%trans('admin/groups.group_name')%>" ng-model="vm.groupName" required>
            </div>
            <div class="input-group">
              <input type="text" class="form-control" id="exampleInputEmail2" placeholder="<%trans('admin/groups.group_description')%>" ng-model="vm.groupDescription">
            </div>
            <button type="submit" class="btn btn-default" ng-click="vm.addGroup()"><%trans('admin/groups.add')%></button>
        </div>
    </form>
    <h3 class="sub-header"><%trans('admin/groups.list_of_groups')%></h3>
    <div ui-grid="vm.gridOptions" ui-grid-edit class="grid"></div> 
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans("admin/groups.deleting")%></h3>
    </div>
    <div class="modal-body">
        <%trans("admin/groups.deleting_text")%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteGroup')"><%trans("admin/groups.ok")%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteGroup')"><%trans("admin/groups.cancel")%></button>
    </div>
</script>

