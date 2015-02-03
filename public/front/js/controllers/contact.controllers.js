/**
 * Created by nikolay on 2/2/15.
 */

(function(){
    angular
        .module('contactApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['SendContact'];
    function MainCtrl(SendContact) {
        var vm = this;

        vm.alert = undefined;
        vm.closeAlert = closeAlert;
        vm.submitForm = submitForm;
        vm.cleanForm = cleanForm;
        vm.confirm = confirm;
        vm.cleanErrors = cleanErrors;
        vm.change = close;
        vm.error = {};

        vm.delay = 0;
        vm.minDuration = 0;
        vm.message = 'Please Wait...';
        vm.backdrop = true;
        vm.promise = null;

        function submitForm(isValid) {
            vm.submitted = true;
            if(isValid) {
                var success = function(data) {
                    if (data[0] === true) {
                        vm.alert = { msg: data[1], type: 'success'};
                        vm.cleanForm();
                    } else {
                        vm.error.name = data[1]['name'] ? data[1]['name'][0] : undefined;
                        vm.error.email = data[1]['email'] ? data[1]['email'][0] : undefined;
                        vm.error.message = data[1]['message'] ? data[1]['message'][0] : undefined;
                        //vm.alert = { msg: data[1], type: 'danger'};
                    }
                };

                var error = function(data) {
                    vm.alert = { msg: 'Some problems', type: 'danger'};
                };

                vm.promise = SendContact.send(vm.mail, success, error);
            }
        }

        function cleanErrors(field) {
            vm.error[field] = undefined;
        }

        function closeAlert() {
            vm.alert = undefined;
        }

        function cleanForm() {
            vm.mail = {
                name: '',
                email: '',
                message: ''
            }

            vm.submitted = false;
        }
        vm.cleanForm();

        function close(field) {
            closeAlert();
            cleanErrors(field);
        }
    }
})();
