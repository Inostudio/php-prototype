/**
 * Created by nikolay on 2/2/15.
 */

(function(){
    angular
        .module('contactApp')
        .service('SendContact', SendContact);

    SendContact.$inject = ['$http'];
    function SendContact($http) {
        var service = {
            send: send
        };

        return service;

        ////////////

        function send(data, success, error) {
            return $http({
                url: '/page/send-contact',
                method: 'POST',
                data: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }
    }
})();