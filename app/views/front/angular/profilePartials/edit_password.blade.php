<?php
    if (Auth::user()->facebook_user_id !== null)
        $message = 'You password default is \'password\'!';
?>

<div class="panel-body">
    <form name="passwordForm" class="form-vertical" novalidate data-ng-submit="vm.submitForm(passwordForm.$valid && vm.confirm())">
        <div>
            <alert data-ng-show="(vm.alert !== undefined)" type="{{alert.type}}" close="vm.closeAlert()">
                {{vm.alert.msg}}
            </alert>
        </div>

        <div class="form-group">
            <div class="input-group" data-ng-class="{ 'has-error' : (passwordForm.oldPassword.$invalid) && vm.submitted }">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input type="password" name="oldPassword" class="form-control" placeholder="<% $message !== null ? $message : 'Old password' %>"
                data-ng-model="vm.user.old_password" data-ng-change="vm.closeAlert()" required>
            </div>

            <span class="help-block" data-ng-show="(passwordForm.oldPassword.$error.required && vm.submitted)">
                Old password must be not empty
            </span>

            <span class="help-block"
                data-ng-show="(passwordForm.oldPassword.$invalid && !passwordForm.oldPassword.$error.required && vm.submitted)">
                Email invalid
            </span>
        </div>

        <div class="form-group">
            <div class="input-group" data-ng-class="{ 'has-error' : (passwordForm.password.$invalid) && vm.submitted }">

                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input type="password" name="password" class="form-control" placeholder="New password" data-ng-model="vm.user.new_password"
                    minlength="4" maxlength="32" data-ng-change="vm.closeAlert()" required>
            </div>

            <span class="help-block"
                data-ng-show="(passwordForm.password.$error.required) && vm.submitted">
                New password must be not empty
            </span>

            <span class="help-block" data-ng-show="(passwordForm.password.$error.minlength) && vm.submitted">
                New password is too short.
            </span>

            <span class="help-block" data-ng-show="(passwordForm.password.$error.maxlength) && vm.submitted">
                New password is too long.
            </span>
        </div>

        <div class="form-group">
            <div class="input-group" data-ng-class="{ 'has-error' : !vm.confirm() && vm.submitted }">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input type="password" name="password_confirm" class="form-control" placeholder="Confirm new password" data-ng-model="vm.user.password_confirm" data-ng-change="vm.closeAlert()">
            </div>

            <span class="help-block" data-ng-show="vm.submitted && !vm.confirm()">
                New password and password confirm don't match.
            </span>
        </div>

        <?php if(0){ ?>
        <div class="form-group">
            <label for="icode" class="col-md-4 control-label">Invitation Code</label>
            <div class="col-md-9">
                <input type="text" class="form-control" name="icode" placeholder="">
            </div>
        </div>
        <?php  } ?>

        <div class="form-group">
            <div class="col-md-offset-5 col-md-8">

                <button id="btn-signup" type="submit" class="btn btn-info"
                    data-ng-disabled="passwordForm.$invalid && vm.submitted ||
                    !vm.confirm() && vm.submitted"><i class="fa fa-sign-in"></i> &nbsp Change
                </button>
            </div>
        </div>

    </form>
</div>