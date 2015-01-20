<?php
    if (Auth::user()->facebook_user_id !== null)
        $message = 'You password default is \'password\'!';
?>

<div class="panel-body">
    <form name="passwordForm" class="form-vertical" novalidate data-ng-submit="vm.submitForm(passwordForm.$valid && vm.confirm())">
        <div>
            <alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
                {{vm.alert.msg}}
            </alert>
        </div>

        <div class="form-group">
            <div class="input-group" data-ng-class="{ 'has-error' : (passwordForm.oldPassword.$invalid) && vm.submitted }">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input type="password"
                    name="oldPassword"
                    class="form-control"
                    placeholder="<% $message !== null ?
                        trans('front\profile\change_password.placeholder_default_password') :
                        trans('front\profile\change_password.placeholder_new_password') %>"
                    data-ng-model="vm.user.old_password"
                    data-ng-change="vm.closeAlert()"
                    required>
            </div>

            <span class="help-block" data-ng-show="(passwordForm.oldPassword.$error.required && vm.submitted)">
                <% trans('front\profile\change_password.help_block_old_password_empty') %>
            </span>
        </div>

        <div class="form-group">
            <div class="input-group" data-ng-class="{ 'has-error' : (passwordForm.password.$invalid) && vm.submitted }">

                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input type="password"
                    name="password"
                    class="form-control"
                    placeholder="<% trans('front\profile\change_password.placeholder_new_password') %>"
                    data-ng-model="vm.user.new_password"
                    minlength="4" maxlength="32" data-ng-change="vm.closeAlert()" required>
            </div>

            <span class="help-block"
                data-ng-show="(passwordForm.password.$error.required) && vm.submitted">
                <% trans('front\profile\change_password.help_block_new_password_empty') %>
            </span>

            <span class="help-block" data-ng-show="(passwordForm.password.$error.minlength) && vm.submitted">
                <% trans('front\profile\change_password.help_block_new_password_short') %>
            </span>

            <span class="help-block" data-ng-show="(passwordForm.password.$error.maxlength) && vm.submitted">
                <% trans('front\profile\change_password.help_block_new_password_long') %>
            </span>
        </div>

        <div class="form-group">
            <div class="input-group" data-ng-class="{ 'has-error' : !vm.confirm() && vm.submitted }">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input type="password"
                 name="password_confirm"
                 class="form-control"
                 placeholder="<% trans('front\profile\change_password.placeholder_new_password_confirm') %>"
                 data-ng-model="vm.user.password_confirm"
                 data-ng-change="vm.closeAlert()"
                 maxlength="32">
            </div>

            <span class="help-block" data-ng-show="vm.submitted && !vm.confirm()">
                <% trans('front\profile\change_password.help_block_new_password_confirm_wrong') %>
            </span>
        </div>

        <div class="form-group">
            <div class="col-md-offset-5 col-md-8">

                <button id="btn-signup" type="submit" class="btn btn-info"
                    data-ng-disabled="passwordForm.$invalid && vm.submitted ||
                    !vm.confirm() && vm.submitted"><i class="fa fa-sign-in"></i> &nbsp <% trans('front\profile\change_password.button_change') %>
                </button>
            </div>
        </div>

    </form>
</div>