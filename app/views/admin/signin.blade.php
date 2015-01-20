<!DOCTYPE html>
<html lang="en" ng-app="signApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../../favicon.ico">

        <title>Signin</title>

        <!-- Bootstrap core CSS -->

        <link href="/admin/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <style type="text/css">
            body {
                padding-top: 40px;
                padding-bottom: 40px;
                background-color: #eee;
            }

            .form-signin {
                max-width: 330px;
                padding: 15px;
                margin: 0 auto;
            }
            .form-signin .form-signin-heading,
            .form-signin .checkbox {
                margin-bottom: 10px;
            }
            .form-signin .checkbox {
                font-weight: normal;
            }
            .form-signin .form-control {
                position: relative;
                height: auto;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 10px;
                font-size: 16px;
            }
            .form-signin .form-control:focus {
                z-index: 2;
            }
            .form-signin input[type="email"] {
                margin-bottom: -1px;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
            }
            .form-signin input[type="password"] {
                margin-bottom: 10px;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }        

        </style>

        <script src="/admin/vendors/angular/angular.min.js"></script>
        <script src="/admin/vendors/ui-bootstrap/ui-bootstrap-tpls-0.11.2.js"></script>
        <script src="/admin/js/signApp.js"></script>
        <script src="/admin/js/controllers/signControllers.js"></script>
        <script src="/admin/js/services/signServices.js"></script>

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>

        <div class="container" ng-controller="SignCtrl as vm">


            <form class="form-signin" name="signForm" ng-submit="vm.submitForm(signForm.$valid)" novalidate>
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

        </div> <!-- /container -->

    </body>
</html>
