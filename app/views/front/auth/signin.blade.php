@extends('front.layout')

@section('include')
    <script type="text/javascript" src="/front/js/signApp.js"></script>
    <script type="text/javascript" src="/front/js/controllers/signControllers.js"></script>
    <script type="text/javascript" src="/front/js/services/signServices.js"></script>
@stop

@section('content')
<!-- Begin page content -->
<div class="container" ng-app="signApp">

    <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
        <div class="panel panel-info" >
            <div class="panel-heading">
                <div class="panel-title">Sign In</div>
                <div style="float:right; font-size: 80%; position: relative; top:-10px"><a href="#">Forgot password?</a></div>
            </div>     

            <div style="padding-top:30px" class="panel-body" ng-controller="SignInCtrl">

                
                <form name="signForm" class="form-vertical" novalidate ng-submit="submitForm(signForm.$valid)">

                    <div>
                        <alert ng-show="(alert !== undefined)" type="{{alert.type}}" close="closeAlert()">
                            {{alert.msg}}
                        </alert>
                    </div>

                    <div class="form-group" ng-class="{ 'has-error' : (signForm.email.$invalid) && submitted }">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input type="email" name="email" class="form-control" placeholder="Email" ng-model="user.email"
                                ng-change="closeAlert()" required>
                        </div>

                        <span class="help-block" ng-show="(signForm.email.$error.required && submitted)">
                            Email must be not empty
                        </span>

                        <span class="help-block" ng-show="(signForm.email.$invalid && !signForm.email.$error.required && submitted)">
                            Email invalid
                        </span>
                    </div>
                
                    <div class="form-group" ng-class="{ 'has-error' : (signForm.password.$invalid) && submitted }">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input type="password" name="password" class="form-control" placeholder="Password" ng-model="user.password" 
                                minlength="4" maxlength="32" ng-change="closeAlert()" required>
                        </div>

                        <span class="help-block" ng-show="(signForm.password.$error.required) && submitted">
                            Password must be not empty
                        </span>

                        <span class="help-block" ng-show="(signForm.password.$error.minlength) && submitted">
                            Password is too short.
                        </span>

                        <span class="help-block" ng-show="(signForm.password.$error.maxlength) && submitted">
                            Password is too long.
                        </span>
                    </div>

                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="remember" value="1" ng-model="user.remember"> Remember me
                            </label>
                        </div>
                    </div>

                    <div style="margin-top:10px" class="form-group text-center">                        
                        <div class="col-sm-12 controls">
                            <button  type="submit" class="btn btn-success" ng-disabled="signForm.$invalid && submitted"><i class="fa fa-sign-in"></i> Login</button>
                            <a href="#" class="btn btn-primary"><i class="fa fa-facebook"></i> Login with Facebook</a>
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
                </form>     

            </div>                     
        </div>  
    </div>

</div>
@stop