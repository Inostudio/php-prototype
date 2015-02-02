<?php
    $message = null;
    if (Auth::user()->facebook_user_id !== null)
        $message = 'You password default is \'password\'!';
?>

<div id="wrapper">

    <!-- Sidebar -->
    <div id="sidebar-wrapper" data-ng-controller="NavbarCtrl as vm">
        <ul class="sidebar-nav">
            <li class="sidebar-brand active" data-ng-class="{ 'active' : vm.isActive('/') || vm.isActive('/edit') }">
                <a href="#/profile">
                    <% trans('front/profile/navbar.profile') %>
                </a>
            </li>
            <li data-ng-class="{ 'active' : vm.isActive('/edit_password') }">
                <a href="#/edit_password/">
                    <% trans('front/profile/navbar.changePassword') %>
                </a>
            </li>
            <li data-ng-class="{ 'active' : vm.isActive('/change_email') }">
                <a href="#/change_email/">
                    <% trans('front/profile/navbar.changeEmail') %>
                </a>
            </li>
        </ul>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xs-offset-0 col-sm-offset-0 col-md-offset-0 col-lg-offset-0 toppad">
                    <alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
                        {{vm.alert.msg}}
                    </alert>

                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3 class="panel-title">Change password</h3>
                        </div>
                        <form name="passwordForm" class="form-vertical" novalidate data-ng-submit="vm.submitForm(passwordForm.$valid && vm.confirm())">
                            <div class="panel-body">

                                <div class="form-group">
                                    <div class="input-group" data-ng-class="{ 'has-error' : (passwordForm.oldPassword.$invalid) && vm.submitted }">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                        <input type="password"
                                               name="oldPassword"
                                               class="form-control"
                                               placeholder="<% $message !== null ?
                        trans('front/profile/change_password.placeholder_default_password') :
                        trans('front/profile/change_password.placeholder_new_password') %>"
                                               data-ng-model="vm.user.old_password"
                                               data-ng-change="vm.closeAlert()"
                                               required>
                                    </div>

                <span class="help-block" data-ng-show="(passwordForm.oldPassword.$error.required && vm.submitted)">
                    <% trans('front/profile/change_password.help_block_old_password_empty') %>
                </span>
                                </div>

                                <div class="form-group">
                                    <div class="input-group" data-ng-class="{ 'has-error' : (passwordForm.password.$invalid) && vm.submitted }">

                                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                        <input type="password"
                                               name="password"
                                               class="form-control"
                                               placeholder="<% trans('front/profile/change_password.placeholder_new_password') %>"
                                               data-ng-model="vm.user.new_password"
                                               minlength="4" maxlength="32" data-ng-change="vm.closeAlert()" required>
                                    </div>

                <span class="help-block"
                      data-ng-show="(passwordForm.password.$error.required) && vm.submitted">
                    <% trans('front/profile/change_password.help_block_new_password_empty') %>
                </span>

                <span class="help-block" data-ng-show="(passwordForm.password.$error.minlength) && vm.submitted">
                    <% trans('front/profile/change_password.help_block_new_password_short') %>
                </span>

                <span class="help-block" data-ng-show="(passwordForm.password.$error.maxlength) && vm.submitted">
                    <% trans('front/profile/change_password.help_block_new_password_long') %>
                </span>
                                </div>

                                <div class="form-group">
                                    <div class="input-group" data-ng-class="{ 'has-error' : !vm.confirm() && vm.submitted }">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                        <input type="password"
                                               name="password_confirm"
                                               class="form-control"
                                               placeholder="<% trans('front/profile/change_password.placeholder_new_password_confirm') %>"
                                               data-ng-model="vm.user.password_confirm"
                                               data-ng-change="vm.closeAlert()"
                                               maxlength="32">
                                    </div>

                <span class="help-block" data-ng-show="vm.submitted && !vm.confirm()">
                    <% trans('front/profile/change_password.help_block_new_password_confirm_wrong') %>
                </span>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div style="text-align: center">
                                    <button id="btn-signup" type="submit" class="btn btn-info"
                                            data-ng-disabled="passwordForm.$invalid && vm.submitted ||
                        !vm.confirm() && vm.submitted"><i class="fa fa-sign-in"></i> &nbsp <% trans('front/profile/change_password.button_change') %>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /#page-content-wrapper -->

</div>

