<div id="signupbox" style="margin-top:50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
    <div class="panel panel-info">
        <div class="panel-heading">
            <div class="panel-title">Sign Up</div>
            <div style="float:right; font-size: 85%; position: relative; top:-10px"><a id="signinlink" href="#/sign_in" >Sign In</a></div>
        </div>
        <div class="panel-body">

            <div cg-busy="{promise:vm.promise,message:vm.message,backdrop:vm.backdrop,
                delay:vm.delay,minDuration:vm.minDuration}">
                <form name="signForm" class="form-vertical" novalidate data-ng-submit="vm.submitForm(signForm.$valid)">
                    <div>
                        <alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
                            {{vm.alert.msg}}
                        </alert>
                    </div>

                    <div class="form-group">
                        <div class="input-group" data-ng-class="{ 'has-error' : (signForm.email.$invalid) && vm.submitted }">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input type="email" name="email" class="form-control" placeholder="Email"
                            data-ng-model="vm.user.email" data-ng-change="vm.closeAlert()" required>
                        </div>

                        <span class="help-block" data-ng-show="(signForm.email.$error.required && vm.submitted)">
                            Email must be not empty
                        </span>

                        <span class="help-block"
                            data-ng-show="(signForm.email.$invalid && !signForm.email.$error.required && vm.submitted)">
                            Email invalid
                        </span>
                    </div>

                    <div class="form-group">
                        <div class="input-group" data-ng-class="{ 'has-error' : (signForm.password.$invalid) && vm.submitted }">

                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input type="password" name="password" class="form-control" placeholder="Password" data-ng-model="vm.user.password"
                                minlength="4" maxlength="32" data-ng-change="vm.closeAlert()" required>
                        </div>

                        <span class="help-block"
                            data-ng-show="(signForm.password.$error.required) && vm.submitted">
                            Password must be not empty
                        </span>

                        <span class="help-block" data-ng-show="(signForm.password.$error.minlength) && vm.submitted">
                            Password is too short.
                        </span>

                        <span class="help-block" data-ng-show="(signForm.password.$error.maxlength) && vm.submitted">
                            Password is too long.
                        </span>
                    </div>

                    <div class="form-group">
                        <div class="input-group" data-ng-class="{ 'has-error' : !vm.confirm() && vm.submitted }">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input type="password" name="password_confirm" class="form-control" placeholder="Confirm password" data-ng-model="vm.user.password_confirm" data-ng-change="vm.closeAlert()">
                        </div>

                        <span class="help-block" data-ng-show="vm.submitted && !vm.confirm()">
                            Password and password confirm don't match.
                        </span>
                    </div>

                    <div class="form-group">
                        <div class="col-md-offset-4 col-md-8">

                            <button id="btn-signup" type="submit" class="btn btn-info"
                                data-ng-disabled="signForm.$invalid && vm.submitted ||
                                !vm.confirm() && vm.submitted"><i class="fa fa-sign-in"></i> &nbsp Sign Up
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>

</div>