<!DOCTYPE html>
<html lang="en" ng-app="signApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../../favicon.ico">
        <link href="/admin/css/adminSignInStyle.css" rel="stylesheet">

        <title>Signin</title>

        <!-- Bootstrap core CSS -->

        <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="/vendor/angular-busy/angular-busy.min.css" rel="stylesheet">
        

        <!-- Custom styles for this template -->

        <script src="/vendor/angular/angular.min.js"></script>
        <script src="/vendor/ui-bootstrap/ui-bootstrap-tpls-0.11.2.js"></script>

        <script type="text/javascript" src="/vendor/angular-animate/angular-animate.min.js"></script>
        <script type="text/javascript" src="/vendor/angular-busy/angular-busy.min.js"></script>

        <script src="/admin/js/signApp.js"></script>
        <script src="/admin/js/controllers/signControllers.js"></script>
        <script src="/admin/js/services/signServices.js"></script>
    </head>

    <body>

        <div class="container" ng-controller="SignCtrl as vm">

            <div class="form-signin" cg-busy="{promise:vm.promise,message:vm.message,backdrop:vm.backdrop,
                                                delay:vm.delay,minDuration:vm.minDuration}">
                <form name="signForm" ng-submit="vm.submitForm(signForm.$valid)" novalidate>
                    <div>
                        <h2 class="form-signin-heading">Please sign in</h2>
                    </div>

                    <div>
                        @if (Session::get('message'))
                            <div ng-init="vm.alert = { msg: '<% Session::pull('message') %>', type: danger }">
                            </div>
                        @endif
                        <alert ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">{{vm.alert.msg}}</alert>

                    </div>

                    <div class="form-group" ng-class="{ 'has-error' : (signForm.email.$invalid) && vm.submitted }">
                        <input type="email" class="form-control" placeholder="Email address" name="email"
                        ng-model="vm.user.email" required autofocus ng-required="true" ng-change="vm.closeAlert()">

                        <span class="help-block" ng-show="(signForm.email.$error.required) && vm.submitted">
                            Email must be not empty
                        </span>

                        <span class="help-block" ng-show="(signForm.email.$invalid && !signForm.email.$error.required) && vm.submitted">
                            Email invalid
                        </span>
                    </div>

                    <div class="form-group" ng-class="{ 'has-error' : (signForm.password.$invalid) && vm.submitted }">
                        <input type="password" class="form-control" placeholder="Password" name="password" required  ng-model="vm.user.password" minlength="4" maxlength="32" ng-required="true" ng-change="vm.closeAlert()">
                        <span class="help-block" ng-show="(signForm.password.$error.required) && vm.submitted">
                            Password must be not empty
                        </span>

                        <span class="help-block" ng-show="(signForm.password.$error.minlength) && vm.submitted">
                            Password is too short.
                        </span>
                        
                        <span class="help-block" ng-show="(signForm.password.$error.maxlength) && vm.submitted">
                            Password is too long.
                        </span>
                    </div>

                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="remember" value="1" ng-model="vm.user.remember"> Remember me
                        </label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit" ng-disabled="signForm.$invalid && vm.submitted">Sign in</button>
                </form>

            </div>

        </div> <!-- /container -->

    </body>
</html>
