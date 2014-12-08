<div id="alerts-container_perm"></div>

<h1 class="page-header">Permissions</h1>
<div class="table-responsive">
    <h3 class="sub-header">Add permission</h3>
    <form>
        <div class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Permission name" ng-model="permissionName" required>
            </div>
            <div class="input-group">
              <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Permission description" ng-model="permissionDescription">
            </div>
            <button type="submit" class="btn btn-default" ng-click="addPermission()">Добавить</button>
        </div>
    </form>
    <h3 class="sub-header">List of permissions</h3>
    <div ui-grid="gridOptions_perm" ui-grid-edit class="grid2"></div>
</div>