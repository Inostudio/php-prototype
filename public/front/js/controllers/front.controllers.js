/**
 * Created by nikolay on 2/2/15.
 */

(function(){
    angular
        .module('frontApp')
        .controller('MainCtrl', MainCtrl)
        .controller('HomeCtrl', HomeCtrl);

    MainCtrl.$inject = [];
    function MainCtrl() {
        var vm = this;
        vm.title = 'Hi, friend from MainCtrl!';
    }

    HomeCtrl.$inject = [];
    function HomeCtrl() {
        var vm = this;
        vm.title = 'Hi, friend from HomeCtrl!';
    }
})();
