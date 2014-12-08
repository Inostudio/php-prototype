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
        <span>Page: {{currentPage}}</span><br>
        <span>Total page: {{totalPage}}</span><br>
    </div>
    <div ui-grid="users_grid" ui-grid-edit></div>
    <div style="margin-top: 5px;">
        <button type="button" class="btn btn-success" ng-click="prevPage()" ng-disabled="unavailable">Previous page</button>
        <button type="button" class="btn btn-success" ng-click="nextPage()" ng-disabled="unavailable">Next page</button>
    </div>
</div>


