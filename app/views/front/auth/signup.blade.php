<?php
    $lang =  App::getLocale();
?>

@extends('front.layout')

@section('include')
    <link href="/vendor/angular-busy/angular-busy.min.css" rel="stylesheet">

    <script type="text/javascript" src="/front/js/signApp.module.js"></script>



    <script type="text/javascript" src="/vendor/angular-animate/angular-animate.min.js"></script>
    <script type="text/javascript" src="/vendor/angular-busy/angular-busy.min.js"></script>

    <script type="text/javascript" src="/front/js/controllers/sign.controllers.js"></script>
    <script type="text/javascript" src="/front/js/services/sign.services.js"></script>
@stop

@section('content')
<div class="container" data-ng-app="signApp">
    <div id="signupbox" style="margin-top:50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-info">
            <div class="panel-heading">
                <div class="panel-title"><% trans('front/auth/signup.title_singup') %></div>
                <div style="float:right; font-size: 85%; position: relative; top:-10px"><a id="signinlink" href="<?=action('front.signin', ['lang' => $lang])?>" ><% trans('front/auth/signup.title_singin') %></a></div>
            </div>
            <div class="panel-body" data-ng-controller="SignUpCtrl as vm">

                <div cg-busy="{promise:vm.promise,message:vm.message,backdrop:vm.backdrop,
                    delay:vm.delay,minDuration:vm.minDuration}">
                    <form name="signForm" class="form-vertical" novalidate data-ng-submit="vm.submitForm(signForm.$valid)">
                        <div>
                            <alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
                                {{vm.alert.msg}}
                            </alert>
                        </div>

                        <div class="form-group">
                            <div class="input-group" data-ng-class="{ 'has-error' : (signForm.email.$invalid) && vm.submitted || vm.error.email}">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="email" name="email" class="form-control"
                                       placeholder="<% trans('front/auth/signup.placeholder_email') %>"
                                data-ng-model="vm.user.email" data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block" data-ng-show="(signForm.email.$error.required && vm.submitted)">
                                <% trans('front/auth/signup.helper_email_empty') %>
                            </span>

                            <span class="help-block"
                                data-ng-show="(signForm.email.$invalid && !signForm.email.$error.required && vm.submitted)">
                                <% trans('front/auth/signup.helper_email_invalid') %>
                            </span>

                            <span class="help-block" data-ng-show="(vm.error.email)">
                                {{vm.error.email}}
                            </span>
                        </div>

                        <div class="form-group">
                            <div class="input-group" data-ng-class="{ 'has-error' : (signForm.password.$invalid) && vm.submitted || vm.error.password}">

                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input type="password" name="password" class="form-control"
                                       placeholder="<% trans('front/auth/signup.placeholder_password') %>"
                                       data-ng-model="vm.user.password"
                                    minlength="6" maxlength="32" data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block"
                                data-ng-show="(signForm.password.$error.required) && vm.submitted">
                                <% trans('front/auth/signup.helper_password_empty') %>
                            </span>

                            <span class="help-block" data-ng-show="(signForm.password.$error.minlength) && vm.submitted">
                                <% trans('front/auth/signup.helper_password_short') %>
                            </span>

                            <span class="help-block" data-ng-show="(signForm.password.$error.maxlength) && vm.submitted">
                                <% trans('front/auth/signup.helper_password_long') %>
                            </span>

                            <span class="help-block" data-ng-show="(vm.error.password)">
                                {{vm.error.password}}
                            </span>
                        </div>

                        <div class="form-group">
                            <div class="input-group" data-ng-class="{ 'has-error' : !vm.confirm() && vm.submitted || vm.error.password_confirm}">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input type="password" name="password_confirm" class="form-control"
                                       placeholder="<% trans('front/auth/signup.placeholder_password_confirm') %>"
                                       data-ng-model="vm.user.password_confirm" data-ng-change="vm.closeAlert()">
                            </div>

                            <span class="help-block" data-ng-show="vm.submitted && !vm.confirm()">
                                <% trans('front/auth/signup.helper_password_confirm_wrong') %>
                            </span>

                            <span class="help-block" data-ng-show="(vm.error.password_confirm)">
                                {{vm.error.password_confirm}}
                            </span>
                        </div>

                        <div class="form-group">
                            <div class="col-md-offset-4 col-md-8">

                                <button id="btn-signup" type="submit" class="btn btn-info"
                                    data-ng-disabled="signForm.$invalid && vm.submitted ||
                                    !vm.confirm() && vm.submitted"><i class="fa fa-sign-in"></i> &nbsp <% trans('front/auth/signup.button_signup') %>
                                </button>
                            </div>
                        </div>
                            
                    </form>
                </div> 
            </div>
        </div>

    </div>    


</div>
@stop