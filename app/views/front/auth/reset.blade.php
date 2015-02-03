@extends('front.layout')

@section('include')
    <link href="/vendor/angular-busy/angular-busy.min.css" rel="stylesheet">

    <script type="text/javascript" src="/front/js/signApp.module.js"></script>

    <script type="text/javascript" src="/vendor/angular-animate/angular-animate.min.js"></script>
    <script type="text/javascript" src="/vendor/angular-busy/angular-busy.min.js"></script>

    <script type="text/javascript" src="/front/js/controllers/sign.controllers.js"></script>
    <script type="text/javascript" src="/front/js/services/sign.services.js"></script>
    <script type="text/javascript" src="/front/js/routes/sign.routes.js"></script>
    <script type="text/javascript" src="/front/js/routes/sign.routes.js"></script>
@stop

@section('content')

    <div class="container" data-ng-app="signApp">
        <div id="signupbox" style="margin-top:50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="panel-title"><% trans('front/auth/remind.title_reset_password') %></div>
                </div>
                <div class="panel-body" data-ng-controller="ResetCtrl as vm">

                    <div cg-busy="{promise:vm.promise,message:vm.message,backdrop:vm.backdrop,
                    delay:vm.delay,minDuration:vm.minDuration}">
                        <form name="signForm" class="form-vertical" novalidate data-ng-submit="vm.submitForm(signForm.$valid)">
                            <div>
                                <alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
                                    {{vm.alert.msg}}
                                </alert>
                            </div>

                            <input type="hidden" name="token" data-ng-model="vm.user.token" ng-init="vm.user.token = '<% $token %>'">
                            <div class="form-group">
                                <div class="input-group" data-ng-class="{ 'has-error' : (signForm.password.$invalid) && vm.submitted }">

                                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                    <input type="password" name="password" class="form-control"
                                           placeholder="<% trans('front/auth/remind.placeholder_password') %>"
                                           data-ng-model="vm.user.password"
                                           minlength="6" maxlength="32" data-ng-change="vm.closeAlert()" required>
                                </div>

                            <span class="help-block"
                                  data-ng-show="(signForm.password.$error.required) && vm.submitted">
                                <% trans('front/auth/remind.helper_password_empty') %>
                            </span>

                            <span class="help-block" data-ng-show="(signForm.password.$error.minlength) && vm.submitted">
                                <% trans('front/auth/remind.helper_password_short') %>
                            </span>

                            <span class="help-block" data-ng-show="(signForm.password.$error.maxlength) && vm.submitted">
                                <% trans('front/auth/remind.helper_password_long') %>
                            </span>
                            </div>

                            <div class="form-group">
                                <div class="input-group" data-ng-class="{ 'has-error' : !vm.confirm() && vm.submitted }">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                    <input type="password" name="password_confirmation" class="form-control"
                                           placeholder="<% trans('front/auth/remind.placeholder_password_confirm') %>"
                                           data-ng-model="vm.user.password_confirmation" data-ng-change="vm.closeAlert()">
                                </div>

                                <span class="help-block" data-ng-show="vm.submitted && !vm.confirm()">
                                    <% trans('front/auth/remind.helper_password_confirm_wrong') %>
                                </span>
                            </div>

                            <div class="form-group">
                                <div class="col-md-offset-4 col-md-8">

                                    <button id="btn-signup" type="submit" class="btn btn-info"
                                            data-ng-disabled="signForm.$invalid && vm.submitted ||
                                    !vm.confirm() && vm.submitted"><i class="fa fa-sign-in"></i> &nbsp <% trans('front/auth/remind.title_reset_password') %>
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