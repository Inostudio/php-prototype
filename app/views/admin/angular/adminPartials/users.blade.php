<div id="alerts-container-for-users" ng-init="vm.add_user_message = '<%trans("users.add_user_message")%>'; 
     vm.edit_user_message = '<%trans("users.edit_user_message")%>';
     vm.remove_user_message = '<%trans("users.remove_user_message")%>';"></div>

<h1 class="page-header"><%trans('users.users')%></h1>
<div class="table-responsive">
    <h3 class="sub-header"><%trans('users.add_user')%></h3>
    <form name="form">
        <div class="form-inline" novalidate>
            <div class="input-group">
                <input type="email" class="form-control" name="email" id="exampleInputEmail2" placeholder="<%trans('users.email')%>" ng-model="vm.email" required>
            </div>
            <div class="input-group">
                <input type="password" class="form-control" id="exampleInputEmail2" placeholder="<%trans('users.password')%>" ng-model="vm.userPassword">
            </div>
            <div class="input-group">
                <input type="password" class="form-control" id="exampleInputEmail2" placeholder="<%trans('users.confirm_password')%>" ng-model="vm.userConfirmPassword">
            </div>
            <button type="submit" class="btn btn-default" ng-click="vm.addUser()" ng-disabled="form.email.$invalid"><%trans('users.add')%></button>
        </div>
    </form>
    <h3 class="sub-header"><%trans('users.list_of_users')%></h3>
    <div>
        <div class="form-inline">
            <form name="form2" novalidate>
                <input type="text" class="form-control" placeholder="<%trans('users.search')%>" ng-model="vm.searchText" required>
                <button class="btn btn-primary" ng-click="vm.search()" ng-disabled="form2.$invalid"><%trans('users.search')%></button>
                <button class="btn btn-primary" ng-click="vm.reset()"><%trans('users.reset')%></button>
            </form>
        </div>
        <span style="float: right"><%trans('users.page')%>: {{vm.currentPage}}/{{vm.totalPage}}</span><br>
    </div>
    <div ui-grid="vm.users_grid" ui-grid-edit></div>
    <div style="margin-top: 5px;">
        <button type="button" class="btn btn-success" ng-click="vm.prevPage()" ng-disabled="vm.unavailablePrev"><%trans('users.previous_page')%></button>
        <button type="button" class="btn btn-success" ng-click="vm.nextPage()" ng-disabled="vm.unavailableNext"><%trans('users.next_page')%></button>
    </div>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans('users.deleting')%></h3>
    </div>
    <div class="modal-body">
        <%trans('users.deleting_text')%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteUser')"><%trans('users.ok')%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteUser')"><%trans('users.cancel')%></button>
    </div>
</script>