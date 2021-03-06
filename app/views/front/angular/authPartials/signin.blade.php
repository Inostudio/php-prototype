<?php
    $lang =  App::getLocale();
?>
<div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
    <div class="panel panel-info" >
        <div class="panel-heading">
            <div class="panel-title"><% trans('front/auth/signin.title_singin') %></div>
            <div style="float:right; font-size: 80%; position: relative; top:-10px"><a href="#/remind_password"><% trans('front/auth/signin.text_remind') %></a></div>
        </div>

        <div style="padding-top:30px" class="panel-body">

            <div cg-busy="{promise:vm.promise,message:vm.message,backdrop:vm.backdrop,
                                    delay:vm.delay,minDuration:vm.minDuration}">
                <form name="signForm" class="form-vertical" novalidate data-ng-submit="vm.submitForm(signForm.$valid)">
                    <div>
                        <alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
                            {{vm.alert.msg}}
                        </alert>
                    </div>

                    <div class="form-group" data-ng-class="{ 'has-error' : (signForm.email.$invalid) && vm.submitted || vm.error.email }">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input type="email" name="email" class="form-control" placeholder="<% trans('front/auth/signin.placeholder_email') %>" data-ng-model="vm.user.email"
                                   data-ng-change="vm.closeAlert()" required>
                        </div>

                                <span class="help-block" data-ng-show="(signForm.email.$error.required && vm.submitted)">
                                    <% trans('front/auth/signin.helper_email_empty') %>
                                </span>

                                <span class="help-block" data-ng-show="(signForm.email.$invalid && !signForm.email.$error.required && vm.submitted)">
                                    <% trans('front/auth/signin.helper_email_invalid') %>
                                </span>

                                <span class="help-block" data-ng-show="(vm.error.email)">
                                    {{vm.error.email}}
                                </span>
                    </div>

                    <div class="form-group" data-ng-class="{ 'has-error' : (signForm.password.$invalid) && vm.submitted || vm.error.password }">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input type="password" name="password" class="form-control" placeholder="<% trans('front/auth/signin.placeholder_password') %>" data-ng-model="vm.user.password"
                                   minlength="6" maxlength="32" data-ng-change="vm.closeAlert()" required>
                        </div>

                                <span class="help-block" data-ng-show="(signForm.password.$error.required) && vm.submitted">
                                    <% trans('front/auth/signin.helper_password_empty') %>
                                </span>

                                <span class="help-block" data-ng-show="(signForm.password.$error.minlength) && vm.submitted">
                                    <% trans('front/auth/signin.helper_password_short') %>
                                </span>

                                <span class="help-block" data-ng-show="(signForm.password.$error.maxlength) && submitted">
                                    <% trans('front/auth/signin.helper_password_long') %>
                                </span>

                                <span class="help-block" data-ng-show="(vm.error.password)">
                                    {{vm.error.password}}
                                </span>
                    </div>

                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="remember" value="1" data-ng-model="vm.user.remember"> <% trans('front/auth/signin.button_remember') %>
                            </label>
                        </div>
                    </div>

                    <div class="form-group text-center">
                        <div class="col-sm-12 controls">
                            <button  type="submit" class="btn btn-success" data-ng-disabled="signForm.$invalid && vm.submitted"><i class="fa fa-sign-in"></i> <% trans('front/auth/signin.button_login') %></button>
                            <a href="/facebook" class="btn btn-primary"><i class="fa fa-facebook"></i> <% trans('front/auth/signin.button_login_facebook') %></a>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-12 control">
                            <div style="padding-top:25px; font-size:80%" >
                                <% trans('front/auth/signin.text_no_account') %>
                                <a href="<% action('front.signup', ['lang' => $lang]) %>"><% trans('front/auth/signin.text_sign_up') %></a>
                            </div>
                        </div>
                    </div>

                    <div style="visibility: hidden">
                        Hidden! Don't delete!
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>