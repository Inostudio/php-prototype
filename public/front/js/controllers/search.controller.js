/**
 * Created by nikolay on 2/2/15.
 */

(function(){
    angular
        .module('searchApp')
        .controller('IndexCtrl', IndexCtrl)
        .controller('ShowUserCtrl', ShowUserCtrl);

    IndexCtrl.$inject = ['Search', '$rootScope'];
    function IndexCtrl(Search, $rootScope) {
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

    ShowUserCtrl.$injcet = ['ShowUser', '$routeParams'];
    function ShowUserCtrl(ShowUser, $routeParams) {
        var vm = this;
        vm.user = {
        };
        vm.currentUserId = 0;
        vm.found = true;
        vm.message = '';
        vm.back = back;

        function getUser(id) {
            function success(data) {
                if(data[0] != 0) {
                    vm.user.photo = data[1];
                    if (data[0].groups.length !== 0) {
                        vm.user.groups = data[0].groups;
                    }
                    if (data[0].articles.length !== 0) {
                        vm.user.articles = data[0].articles;
                    }
                    vm.user.articles = data[0].articles;
                    vm.user.first_name = data[0].profile.first_name;
                    vm.user.last_name = data[0].profile.last_name;
                    vm.user.phone = data[0].profile.phone;
                    vm.user.email = data[0].email;
                    vm.user.name = vm.user.first_name + " " + vm.user.last_name;
                } else {
                    vm.found = false;
                    vm.message = data[1];
                }
            }

            function error(data) {

            }
            ShowUser.getUser({id: id}, success, error);
        };

        getUser($routeParams.userId);

        function back() {
            window.history.back();
        }
    }
})();
