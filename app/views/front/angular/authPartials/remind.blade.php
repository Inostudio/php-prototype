<?php
    $field = trans('front/common.field');
?>
<div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
    <div class="panel panel-info" >
        <div class="panel-heading">
            <div class="panel-title"><% trans('front/auth/remind.title_remind') %></div>
            <div style="float:right; font-size: 80%; position: relative; top:-10px"><a href="#/"><% trans('front/navbar.signin') %></a></div>
        </div>

        <div style="padding-top:30px" class="panel-body">

            <div cg-busy="{promise:vm.promise,message:vm.message,backdrop:vm.backdrop,
                                    delay:vm.delay,minDuration:vm.minDuration}">
                <form name="reminderForm" class="form-vertical" novalidate data-ng-submit="vm.submitForm(reminderForm.$valid)">
                    <div>
                        <alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
                            {{vm.alert.msg}}
                        </alert>
                    </div>

                    <div class="form-group" data-ng-class="{ 'has-error' : (reminderForm.email.$invalid) && vm.submitted }">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input type="email" name="email" class="form-control" placeholder="<% trans('front/auth/remind.placeholder_email') %>" data-ng-model="vm.user.email"
                                   data-ng-change="vm.closeAlert()" required>
                        </div>

                        <span class="help-block" data-ng-show="(reminderForm.email.$error.required && vm.submitted)">
                            <% trans('front/common.help_block_attr_empty', ['attr' => $field]) %>
                        </span>

                        <span class="help-block" data-ng-show="(reminderForm.email.$invalid && !reminderForm.email.$error.required && vm.submitted)">
                            <% trans('front/common.help_block_attr_no_valid', ['attr' => $field]) %>
                        </span>
                    </div>


                    <div class="form-group text-center">
                        <div class="col-sm-12 controls">
                            <button  type="submit" class="btn btn-success" data-ng-disabled="reminderForm.$invalid && vm.submitted"><i class="fa fa-sign-in"></i><% trans('front/auth/remind.button_send') %></button>
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