/**
 * Created by user on 18.11.2014.
 */
(function() {
    'use strict';
    
    angular
        .module('signApp')
        .controller('SignCtrl', SignCtrl);

    SignCtrl.$inject = ['$window', 'SignIn'];
    
    function SignCtrl($window, SignIn){
        var vm = this;
        
        vm.alert = undefined;
        vm.closeAlert = closeAlert;
        vm.submitForm = submitForm;
        

        vm.submitted = false;

        function submitForm(isValid) {
            vm.submitted = true;
            if(isValid) {
                var success = function(data) {
                    if(data[0] === true){
                        $window.location.href = '/adm/';
                    } else {
                        vm.alert = { msg: data[1], type: 'danger'};
                    }
                };

                var error = function(data) {
                    vm.alert = { msg: 'Some problems.', type: 'danger'};
                };

                SignIn.signIn(vm.user, success, error);
            }
        };
        
        function closeAlert() {
            vm.alert = undefined;
        };
    };
})();


