/**
 * Created by nikolay on 2/2/15.
 */

(function(){
    angular
        .module('searchApp')
        .controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = ['$scope', '$rootScope'];
    function IndexCtrl($scope, $rootScope) {
        var vm = this;
        vm.search = '';

        $rootScope.$watch('$rootScope.search', function(){
            console.log($rootScope);
        })
    };
})();
