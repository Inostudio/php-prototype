@extends('front.layout')

@section('include')
    <link href="/front/vendors/angular-busy/angular-busy.min.css" rel="stylesheet">

    <script type="text/javascript" src="/front/js/signApp.module.js"></script>

    <script type="text/javascript" src="/front/vendors/angular-animate/angular-animate.min.js"></script>
    <script type="text/javascript" src="/front/vendors/angular-busy/angular-busy.min.js"></script>

    <script type="text/javascript" src="/front/js/controllers/sign.controllers.js"></script>
    <script type="text/javascript" src="/front/js/services/sign.services.js"></script>
@stop

@section('content')
<!-- Begin page content -->
<div class="container" data-ng-app="signApp">

    <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
        <div class="panel panel-info" >
            <div class="panel-heading">
                <div class="panel-title">Sign In</div>
                <div style="float:right; font-size: 80%; position: relative; top:-10px"><a href="#">Forgot password?</a></div>
            </div>     

            <div style="padding-top:30px" class="panel-body" data-ng-controller="SignInCtrl as vm">


                <form name="signForm" class="form-vertical" novalidate data-ng-submit="vm.submitForm(signForm.$valid)">
                    <div cg-busy="{promise:vm.myPromise,message:vm.message,backdrop:vm.backdrop,
                    delay:vm.delay,minDuration:vm.minDuration}">
                        <div>
                            <alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
                                {{vm.alert.msg}}
                            </alert>
                        </div>

                        <div class="form-group" data-ng-class="{ 'has-error' : (signForm.email.$invalid) && vm.submitted }">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="email" name="email" class="form-control" placeholder="Email" data-ng-model="vm.user.email"
                                    data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block" data-ng-show="(signForm.email.$error.required && vm.submitted)">
                                Email must be not empty
                            </span>

                            <span class="help-block" data-ng-show="(signForm.email.$invalid && !signForm.email.$error.required && vm.submitted)">
                                Email invalid
                            </span>
                        </div>
                    
                        <div class="form-group" data-ng-class="{ 'has-error' : (signForm.password.$invalid) && vm.submitted }">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input type="password" name="password" class="form-control" placeholder="Password" data-ng-model="vm.user.password"
                                    minlength="4" maxlength="32" data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block" data-ng-show="(signForm.password.$error.required) && vm.submitted">
                                Password must be not empty
                            </span>

                            <span class="help-block" data-ng-show="(signForm.password.$error.minlength) && vm.submitted">
                                Password is too short.
                            </span>

                            <span class="help-block" data-ng-show="(signForm.password.$error.maxlength) && submitted">
                                Password is too long.
                            </span>
                        </div>

                        <div class="form-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="remember" value="1" data-ng-model="vm.user.remember"> Remember me
                                </label>
                            </div>
                        </div>

                        <div class="form-group text-center">                        
                            <div class="col-sm-12 controls">
                                <button  type="submit" class="btn btn-success" data-ng-disabled="signForm.$invalid && vm.submitted"><i class="fa fa-sign-in"></i> Login</button>
                                <a href="/facebook" class="btn btn-primary"><i class="fa fa-facebook"></i> Login with Facebook</a>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12 control">
                                <div style="padding-top:25px; font-size:80%" >
                                    Don't have an account?
                                    <a href="<% action('front.signup') %>">Sign Up Here</a>
                                </div>
                            </div>
                        </div>

                        <div style="visibility: hidden">
                            Hidden! Don't delete!
                        </div>
                    </div>
                </form>     

            </div>                     
        </div>  
    </div>

</div>

@stop