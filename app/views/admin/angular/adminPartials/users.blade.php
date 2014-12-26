<div id="alerts-container-for-users"></div>

<h1 class="page-header">Users</h1>
<div class="table-responsive">
    <h3 class="sub-header">Add user</h3>
    <form name="form">
        <div class="form-inline" novalidate>
            <div class="input-group">
                <input type="email" class="form-control" name="email" id="exampleInputEmail2" placeholder="Email" ng-model="email" required>
            </div>
            <div class="input-group">
                <input type="password" class="form-control" id="exampleInputEmail2" placeholder="Password" ng-model="userPassword">
            </div>
            <div class="input-group">
                <input type="password" class="form-control" id="exampleInputEmail2" placeholder="Confirm password" ng-model="userConfirmPassword">
            </div>
            <button type="submit" class="btn btn-default" ng-click="addUser()" ng-disabled="form.email.$invalid">Добавить</button>
        </div>
    </form>
    <h3 class="sub-header">List of users</h3>
    <div>
        <div class="form-inline">
            <form name="form2" novalidate>
                <input type="text" class="form-control" placeholder="Search" ng-model="searchText" required>
                <button class="btn btn-primary" ng-click="search()" ng-disabled="form2.$invalid">Search</button>
                <button class="btn btn-primary" ng-click="reset()">Reset/First</button>
            </form>
        </div>
        <span style="float: right">Page: {{currentPage}}/{{totalPage}}</span><br>
    </div>
    <div ui-grid="users_grid" ui-grid-edit></div>
    <div style="margin-top: 5px;">
        <button type="button" class="btn btn-success" ng-click="prevPage()" ng-disabled="unavailablePrev">Previous page</button>
        <button type="button" class="btn btn-success" ng-click="nextPage()" ng-disabled="unavailableNext">Next page</button>
    </div>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title">Deleting!</h3>
    </div>
    <div class="modal-body">
        Are you sure you want to delete this user?
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteUser')">OK</button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteUser')">Cancel</button>
    </div>
</script>