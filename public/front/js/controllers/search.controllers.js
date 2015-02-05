/**
 * Created by nikolay on 2/2/15.
 */

(function(){
    angular
        .module('searchApp')
        .controller('UsersCtrl', UsersCtrl)
        .controller('IndexCtrl', IndexCtrl);

    UsersCtrl.$inject = ['Search', '$rootScope'];
    function UsersCtrl(Search, $rootScope) {
        console.log($rootScope.where);
        var vm = this;
        vm.search = $rootScope.search;
        vm.show = show;
        vm.users = [];
        vm.shows = [];
        vm.next = next;
        vm.download = {
            count: 0,
            downloaded: 0,
            limit: 10
        }

        next();

        //////////////

        function show(id) {
            if(vm.shows[id] === true) {
                vm.shows[id] = undefined;
            } else {
                vm.shows[id] = true;
            }
        }

        function next() {
            Search.searchUsers({offer: vm.search, offset: vm.download.downloaded, limit: vm.download.limit}, function(data) {
                vm.users = vm.users.concat(data[0]);
                vm.download.count = data[1];
                vm.download.downloaded += data[0].length;
            })
        }


    }

    IndexCtrl.$inject = ['$rootScope'];
    function IndexCtrl($rootScope) {
        if($rootScope.where === "users") {
            window.location.href = '#/users';
        } else if($rootScope.where === "articles") {
            window.location.href = '#/articles';
        }
    }
})();
