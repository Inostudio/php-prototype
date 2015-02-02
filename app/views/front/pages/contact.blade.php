@extends('front.layout')

@section('include')
    <link href="/vendor/angular-busy/angular-busy.min.css" rel="stylesheet">

    <script type="text/javascript" src="/front/js/contactApp.module.js"></script>
    <script type="text/javascript" src="/front/js/controllers/contact.controller.js"></script>
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
                            <legend class="text-center">Contact us</legend>

                            <!-- Name input-->
                            <div class="form-group" data-ng-class="{ 'has-error' : (contactForm.name.$invalid) && vm.submitted || vm.error.name}">
                                <label class="col-md-3 control-label" for="name">Name</label>
                                <div class="col-md-9">
                                    <input id="name" name="name" type="text" placeholder="Your name" class="form-control" data-ng-model="vm.mail.name" required
                                           data-ng-change="vm.change('name')">

                                    <span class="help-block" data-ng-show="(contactForm.name.$error.required && vm.submitted)">
                                        Name must be not empty
                                    </span>

                                    <span class="help-block" data-ng-show="(vm.error.name)">
                                        {{vm.error.name}}
                                    </span>
                                </div>

                            </div>

                            <!-- Email input-->
                            <div class="form-group" data-ng-class="{ 'has-error' : (contactForm.email.$invalid) && vm.submitted || vm.error.email }">
                                <label class="col-md-3 control-label" for="email">Your E-mail</label>
                                <div class="col-md-9">
                                    <input id="email" name="email" type="text" placeholder="Your email" class="form-control" data-ng-model="vm.mail.email" required
                                           data-ng-change="vm.change('email')">

                                    <span class="help-block" data-ng-show="(contactForm.email.$error.required && vm.submitted)">
                                        Email must be not empty
                                    </span>

                                    <span class="help-block" data-ng-show="(vm.error.email)">
                                        {{vm.error.email}}
                                    </span>
                                </div>


                            </div>

                            <!-- Message body -->
                            <div class="form-group" data-ng-class="{ 'has-error' : (contactForm.message.$invalid) && vm.submitted || vm.error.message}">
                                <label class="col-md-3 control-label" for="message">Your message</label>
                                <div class="col-md-9">
                                    <textarea class="form-control" id="message" name="message" placeholder="Please enter your message here..." rows="5" data-ng-model="vm.mail.message" required
                                              data-ng-change="vm.change('message')"></textarea>

                                    <span class="help-block" data-ng-show="(contactForm.message.$error.required && vm.submitted)">
                                        Message must be not empty
                                    </span>

                                    <span class="help-block" data-ng-show="(vm.error.message)">
                                        {{vm.error.message}}
                                    </span>
                                </div>
                            </div>

                            <!-- Form actions -->
                            <div class="form-group">
                                <div class="col-md-12 text-right">
                                    <button type="submit" class="btn btn-primary btn-lg">Submit</button>
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

