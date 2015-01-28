<?php

?>

<alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
    {{vm.alert.msg}}
</alert>

<div class="panel panel-info">
    <div class="panel-heading">
        <h3 class="panel-title"><% trans('front/profile/change_email.title') %></h3>
    </div>
    <form name="emailForm" novalidate data-ng-submit="vm.submitForm(emailForm.$valid && vm.confirm())">
        <div class="panel-body">
            <div class="form-group">
                <div class="input-group" data-ng-class="{ 'has-error' : (emailForm.old_email.$invalid) && vm.submitted  || vm.error.old_email}">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                    <input type="email"
                           name="old_email"
                           class="form-control"
                           placeholder="<% trans('front/profile/change_email.placeholder_old_email') %>"
                           data-ng-model="vm.user.old_email"
                           data-ng-change="vm.change('old_email')"
                           required>
                </div>

                <span class="help-block" data-ng-show="(emailForm.old_email.$error.required && vm.submitted)">
                    <% trans('front/profile/change_email.help_block_old_email_empty') %>
                </span>
                <span class="help-block"
                      data-ng-show="(emailForm.old_email.$invalid) && vm.submitted">
                    <% trans('front/profile/change_email.help_block_email_invalid') %>
                </span>
                <span class="help-block" data-ng-show="(vm.error.old_email)">
                    {{vm.error.old_email}}
                </span>
            </div>

            <div class="form-group">
                <div class="input-group" data-ng-class="{ 'has-error' : (emailForm.new_email.$invalid) && vm.submitted || vm.error.new_email}">

                    <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                    <input type="email"
                           name="new_email"
                           class="form-control"
                           placeholder="<% trans('front/profile/change_email.placeholder_new_email') %>"
                           data-ng-model="vm.user.new_email"
                           maxlength="32" data-ng-change="vm.change('new_email')" required>
                </div>

                <span class="help-block"
                      data-ng-show="(emailForm.new_email.$error.required) && vm.submitted">
                    <% trans('front/profile/change_email.help_block_new_email_empty') %>
                </span>
                <span class="help-block"
                      data-ng-show="(emailForm.new_email.$invalid) && vm.submitted">
                    <% trans('front/profile/change_email.help_block_email_invalid') %>
                </span>
                <span class="help-block" data-ng-show="(vm.error.new_email)">
                    {{vm.error.new_email}}
                </span>
            </div>

            <div class="form-group">
                <div class="input-group" data-ng-class="{ 'has-error' : emailForm.password.$invalid && vm.submitted || vm.error.password}">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                    <input type="password"
                           name="password"
                           class="form-control"
                           placeholder="<% trans('front/profile/change_email.placeholder_password') %>"
                           data-ng-model="vm.user.password"
                           data-ng-change="vm.change('password')"
                           minlength="4" maxlength="32" required>
                </div>

                <span class="help-block"
                      data-ng-show="(emailForm.password.$error.required) && vm.submitted">
                    <% trans('front/profile/change_email.help_block_password_empty') %>
                </span>
                <span class="help-block" data-ng-show="(emailForm.password.$error.minlength) && vm.submitted">
                    <% trans('front/profile/change_email.help_block_password_short') %>
                </span>

                <span class="help-block" data-ng-show="(emailForm.password.$error.maxlength) && vm.submitted">
                    <% trans('front/profile/change_email.help_block_password_long') %>
                </span>
                <span class="help-block" data-ng-show="(vm.error.password)">
                    {{vm.error.password}}
                </span>
            </div>
        </div>
        <div class="panel-footer">
            <div style="text-align: center">
                <button id="btn-signup" type="submit" class="btn btn-info"
                    data-ng-disabled="emailForm.$invalid && vm.submitted"><i class="fa fa-sign-in"></i> &nbsp <% trans('front/profile/change_email.title') %>
                </button>
            </div>
        </div>
    </form>
</div>