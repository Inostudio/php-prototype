<div id="alerts-container-for-users" ng-init="vm.add_user_message = '<%trans("admin/users.add_user_message")%>';
     vm.edit_user_message = '<%trans("admin/users.edit_user_message")%>';
     vm.remove_user_message = '<%trans("admin/users.remove_user_message")%>';
     vm.myId='<%Auth::user()->id%>';
     vm.invalid_email_message='<%trans("admin/users.invalid_email_message")%>';
     vm.successfully_blocked_message='<%trans("admin/users.successfully_blocked_message")%>';
     vm.passwordError='<%trans("admin/users.passwordError")%>'"></div>

<h1 class="page-header"><%trans('admin/users.users')%></h1>
<div class="table-responsive">
    <h3 class="sub-header"><%trans('admin/users.add_user')%></h3>
    <form name="nameForm">
        <div class="form-inline" novalidate>
            <div class="input-group">
                <input type="email" class="form-control" name="email" id="exampleInputEmail2" placeholder="<%trans('admin/users.email')%>" ng-model="vm.email" required>
            </div>
            <div class="input-group">
                <input type="password" class="form-control" id="exampleInputEmail2" placeholder="<%trans('admin/users.password')%>" ng-model="vm.userPassword" required minlength="6">
            </div>
            <div class="input-group">
                <input type="password" class="form-control" id="exampleInputEmail2" placeholder="<%trans('admin/users.confirm_password')%>" ng-model="vm.userConfirmPassword" required minlength="6">
            </div>
            <button type="submit" class="btn btn-default" ng-click="vm.addUser()" ng-disabled="nameForm.$invalid" ><%trans('admin/users.add')%></button>
        </div>
    </form>
    <h3 class="sub-header"><%trans('admin/users.list_of_users')%></h3>
    <div>
        <div class="form-inline">
            <form name="form2" novalidate>
                <input type="text" class="form-control" placeholder="<%trans('admin/users.search')%>" ng-model="vm.searchText" required>
                <button class="btn btn-primary" ng-click="vm.search()" ng-disabled="form2.$invalid"><%trans('admin/users.search')%></button>
                <button class="btn btn-primary" ng-click="vm.reset()"><%trans('admin/users.reset')%></button>
            </form>
        </div>
        <span style="float: right"><%trans('admin/users.page')%>: {{vm.currentPage}}/{{vm.totalPage}}</span><br>
    </div>
    <div ui-grid="vm.users_grid" ui-grid-edit></div>
    <div style="margin-top: 5px;">
        <button type="button" class="btn btn-success" ng-click="vm.prevPage()" ng-disabled="vm.unavailablePrev"><%trans('admin/users.previous_page')%></button>
        <button type="button" class="btn btn-success" ng-click="vm.nextPage()" ng-disabled="vm.unavailableNext"><%trans('admin/users.next_page')%></button>
        <span style="float: right"><%trans('admin/users.users2')%>: {{vm.countUsers}}</span>
    </div>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans('admin/users.deleting')%></h3>
    </div>
    <div class="modal-body">
        <%trans('admin/users.deleting_text')%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteUser')"><%trans('admin/users.ok')%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteUser')"><%trans('admin/users.cancel')%></button>
    </div>
</script>

<script type="text/ng-template" id="Ban.html">
    <center><h1 class="page-header"><%trans('admin/users.bans')%></h1></center> 
    <form name="formBan" novalidate>
        <div class="modal-body" style="padding-top: 0">
            <div>
                <b><%trans('admin/users.user')%>:</b> {{vm.userBan}}
                <p ng-hide="vm.hideCurrentBan" style="margin-bottom: 0"><i><%trans('admin/users.banned_with')%> {{vm.ban.begin}} <%trans('admin/users.to')%> {{vm.ban.end}}</i>    <span class="fa fa-close" style="cursor: pointer" ng-click="$emit('showConfirmDeleteBan')"></span>
                            <button class="btn btn-primary" ng-hide="vm.confirmDeleteBan" ng-click="vm.acceptRemoveBan(vm.ban.id)"><%trans('admin/users.delete')%></button>  <button class="btn btn-primary" ng-hide="vm.confirmDeleteBan" ng-click="vm.confirmDeleteBan=true"><%trans('admin/users.cancel')%></button></p>  
                <p ng-hide="vm.hideCurrentBan"><i><%trans('admin/users.reason')%>: {{vm.ban.reason}}</i></p>
            </div>
            <center><h3 class="modal-title"><%trans('admin/users.ban')%></h3></center>              
            <!---->
            <div class="form-group form-inline">
                <p><i><%trans('admin/users.lock_up_to')%></i></p>
                <label class="control-label"><i class="fa fa-calendar"></i> <%trans('admin/users.date')%></label><label class="control-label" style="margin-left: 17%;"><i class="fa fa-clock-o"></i> <%trans('admin/users.time')%></label><br>
                <div class="form-group">
                  <input ng-change="vm.errorDate = false;" ng-class="{'error-border' : vm.errorDate}" type="text" size="10" class="form-control ng-pristine ng-valid ng-touched" ng-model="vm.banDate" placeholder="<%trans('admin/users.date')%>" bs-datepicker="" ng-disabled="!vm.hideCurrentBan" required>
                </div>
                <div class="form-group">
                    <input ng-change="vm.errorDate = false;" ng-class="{'error-border' : vm.errorDate}" type="text" class="form-control" size="8" ng-model="vm.banTime" name="time" bs-timepicker placeholder="<%trans('admin/users.time')%>"
                        data-time-format="HH:mm" data-length="1" data-minute-step="1" data-arrow-behavior="picker" ng-disabled="!vm.hideCurrentBan" required>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="<%trans('admin/users.reason')%>" class="form-control" ng-disabled="!vm.hideCurrentBan" ng-model="vm.banReason" required>
                </div>
            </div>
            
            <!---->
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" ng-click="$emit('okBan')" ng-disabled="formBan.$invalid || vm.errorDate"><%trans('admin/users.ok')%></button>
            <button class="btn btn-warning" ng-click="$emit('cancelBan')"><%trans('admin/users.cancel')%></button>
        </div>
    </form>
</script>