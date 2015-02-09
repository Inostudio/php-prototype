@extends('front.layout')

@section('include')
    <link href="/vendor/angular-busy/angular-busy.min.css" rel="stylesheet">

    <script type="text/javascript" src="/front/js/contactApp.module.js"></script>
    <script type="text/javascript" src="/front/js/controllers/contact.controllers.js"></script>
    <script type="text/javascript" src="/front/js/services/contact.services.js"></script>

    <script type="text/javascript" src="/vendor/angular-animate/angular-animate.min.js"></script>
    <script type="text/javascript" src="/vendor/angular-busy/angular-busy.min.js"></script>
@stop

@section('content')

<div class="container" data-ng-app="contactApp">
    <div class="row" data-ng-controller="MainCtrl as vm">
        <div class="col-md-6 col-md-offset-3">
            <div>
                <alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
                    {{vm.alert.msg}}
                </alert>
            </div>
            <div class="well well-sm">
                <div cg-busy="{promise:vm.promise,message:vm.message,backdrop:vm.backdrop,
                                    delay:vm.delay,minDuration:vm.minDuration}">
                    <form name="contactForm" class="form-horizontal" novalidate data-ng-submit="vm.submitForm(contactForm.$valid)">
                        <fieldset>
                            <legend class="text-center"><% trans('front/pages/contact.title_contact') %></legend>

                            <!-- Name input-->
                            <div class="form-group" data-ng-class="{ 'has-error' : (contactForm.name.$invalid) && vm.submitted || vm.error.name}">
                                <label class="col-md-3 control-label" for="name"><% trans('front/pages/contact.name') %></label>
                                <div class="col-md-9">
                                    <input id="name" name="name" type="text"
                                           placeholder="<% trans('front/pages/contact.placeholder_name') %>"
                                           class="form-control" data-ng-model="vm.mail.name" required
                                           data-ng-change="vm.change('name')">

                                    <span class="help-block" data-ng-show="(contactForm.name.$error.required && vm.submitted)">
                                        <% trans('front/pages/contact.help_block_name_empty') %>
                                    </span>

                                    <span class="help-block" data-ng-show="(vm.error.name)">
                                        {{vm.error.name}}
                                    </span>
                                </div>

                            </div>

                            <!-- Email input-->
                            <div class="form-group" data-ng-class="{ 'has-error' : (contactForm.email.$invalid) && vm.submitted || vm.error.email }">
                                <label class="col-md-3 control-label" for="email"><% trans('front/pages/contact.email') %></label>
                                <div class="col-md-9">
                                    <input id="email" name="email" type="text"
                                           placeholder="<% trans('front/pages/contact.placeholder_email') %>"
                                           class="form-control" data-ng-model="vm.mail.email" required
                                           data-ng-change="vm.change('email')">

                                    <span class="help-block" data-ng-show="(contactForm.email.$error.required && vm.submitted)">
                                        <% trans('front/pages/contact.help_block_email_empty') %>
                                    </span>

                                    <span class="help-block" data-ng-show="(vm.error.email)">
                                        {{vm.error.email}}
                                    </span>
                                </div>


                            </div>

                            <!-- Message body -->
                            <div class="form-group" data-ng-class="{ 'has-error' : (contactForm.message.$invalid) && vm.submitted || vm.error.message}">
                                <label class="col-md-3 control-label" for="message"><% trans('front/pages/contact.message') %></label>
                                <div class="col-md-9">
                                    <textarea class="form-control" id="message" name="message"
                                              placeholder="<% trans('front/pages/contact.placeholder_message') %>"
                                              rows="5" data-ng-model="vm.mail.message" required
                                              data-ng-change="vm.change('message')"></textarea>

                                    <span class="help-block" data-ng-show="(contactForm.message.$error.required && vm.submitted)">
                                        <% trans('front/pages/contact.help_block_message_empty') %>
                                    </span>

                                    <span class="help-block" data-ng-show="(vm.error.message)">
                                        {{vm.error.message}}
                                    </span>
                                </div>
                            </div>

                            <!-- Form actions -->
                            <div class="form-group">
                                <div class="col-md-12 text-right">
                                    <button type="submit" class="btn btn-primary btn-lg"
                                            data-ng-disabled="contactForm.$invalid && vm.submitted">
                                        <% trans('front/pages/contact.button_submit') %>
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@stop

