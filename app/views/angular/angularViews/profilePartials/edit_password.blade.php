<div class="panel-body">

    <form name="signForm" class="form-vertical" novalidate ng-submit="submitForm(signForm.$valid && confirm())">
        <div>
            <alert ng-show="(alert !== undefined)" type="{{alert.type}}" close="closeAlert()">
                {{alert.msg}}
            </aler>
        </div>

        <div class="form-group">
            <div class="input-group" ng-class="{ 'has-error' : (signForm.oldPassword.$invalid) && submitted }">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input type="password" name="oldPassword" class="form-control" placeholder="Old password"
                ng-model="user.old_password" ng-change="closeAlert()" required>
            </div>

            <span class="help-block" ng-show="(signForm.oldPassword.$error.required && submitted)">
                Old password must be not empty
            </span>

            <span class="help-block"
                ng-show="(signForm.oldPassword.$invalid && !signForm.oldPassword.$error.required && submitted)">
                Email invalid
            </span>
        </div>

        <div class="form-group">
            <div class="input-group" ng-class="{ 'has-error' : (signForm.password.$invalid) && submitted }">

                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input type="password" name="password" class="form-control" placeholder="New password" ng-model="user.new_password"
                    minlength="4" maxlength="32" ng-change="closeAlert()" required>
            </div>

            <span class="help-block"
                ng-show="(signForm.password.$error.required) && submitted">
                New password must be not empty
            </span>

            <span class="help-block" ng-show="(signForm.password.$error.minlength) && submitted">
                New password is too short.
            </span>

            <span class="help-block" ng-show="(signForm.password.$error.maxlength) && submitted">
                New password is too long.
            </span>
        </div>

        <div class="form-group">
            <div class="input-group" ng-class="{ 'has-error' : !confirm() && submitted }">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input type="password" name="password_confirm" class="form-control" placeholder="Confirm new password" ng-model="user.password_confirm" ng-change="closeAlert()">
            </div>

            <span class="help-block" ng-show="submitted && !confirm()">
                New password and password confirm don't match.
            </span>
        </div>

        <?php if(0){ ?>
        <div class="form-group">
            <label for="icode" class="col-md-4 control-label">Invitation Code</label>
            <div class="col-md-9">
                <input type="text" class="form-control" name="icode" placeholder="">
            </div>
        </div>
        <?php  } ?>

        <div class="form-group">
            <div class="col-md-offset-5 col-md-8">

                <button id="btn-signup" type="submit" class="btn btn-info"
                    ng-disabled="signForm.$invalid && submitted ||
                    !confirm() && submitted"><i class="fa fa-sign-in"></i> &nbsp Change
                </button>
            </div>
        </div>

    </form>
</div>