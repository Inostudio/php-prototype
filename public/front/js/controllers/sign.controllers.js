/**
 * Created by user on 20.11.2014.
 */
(function() {
    'use strict';

    angular
        .module('signApp')
        .controller('SignInCtrl', SignInCtrl)
        .controller('SignUpCtrl', SignUpCtrl);

    SignInCtrl.$inject = ['$window', 'Sign'];

    function SignInCtrl ($window, Sign) {
        var vm = this;

        vm.alert = undefined;
        vm.submitted = false;
        vm.closeAlert = closeAlert;
        vm.submitForm = submitForm;

        vm.delay = 0;
        vm.minDuration = 0;
        vm.message = 'Please Wait...';
        vm.backdrop = true;
        vm.promise = null;
        //vm.templateUrl = '';

        ////////////

        function closeAlert() {
            vm.alert = undefined;
        }

        function submitForm(isValid) {
            vm.submitted = true;
            if(isValid) {
                var success = function(data) {
                    if(data[0] === true){
                        $window.location.href = '/';
                    } else {
                        vm.alert = { msg: data[1], type: 'danger'};
                    }
                };

                var error = function(data) {
                    vm.alert = { msg: 'Some problems.', type: 'danger'};
                };

                vm.promise = Sign.signIn(vm.user, success, error);
            }
        }

    }

    SignUpCtrl.$inject = ['$window', 'Sign'];

    function SignUpCtrl($window, Sign) {
        var vm = this;

        vm.user = {
            email: '',
            password: '',
            password_confirm: ''
        };
        vm.alert = undefined;
        vm.submitted = false;
        vm.closeAlert = closeAlert;
        vm.submitForm = submitForm;
        vm.confirm = confirm;

        vm.delay = 0;
        vm.minDuration = 0;
        vm.message = 'Please Wait...';
        vm.backdrop = true;
        vm.promise = null;
        //vm.templateUrl = '';

        ////////////

        function closeAlert() {
            vm.alert = undefined;
        }

        function submitForm(isValid) {
            vm.submitted = true;

            if(isValid && vm.confirm()) {
                var success = function(data) {
                    console.log(data);
                    if(data[0] === true){
                        $window.location.href = '/';
                    } else {
                        vm.alert = { msg: data[1], type: 'danger'};
                    }
                };

                var error = function(data) {
                    vm.alert = { msg: 'Some problems.', type: 'danger'};
                };

                vm.promise = Sign.signUp(vm.user, success, error);
            }
        }

        function confirm(){
            return (vm.user.password === vm.user.password_confirm);
        }
    }
})();