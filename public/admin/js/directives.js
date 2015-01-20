(function(){
    'use strict';
    
    angular
            .module('adminApp')
            .directive('spanremove', spanremove)
            .directive('spanedit', spanedit)
            .directive('spantoggle', spantoggle);
    
    spanremove.$inject = [];
    spanedit.$inject = [];
    spantoggle.$inject = [];
    
    function spanremove() {
        return {
            restrict: 'E',

            template: '<span style="cursor: pointer; padding-left: 40%" class="fa fa-close"></span>',
            replace: true,

            link: function($scope, element, attrs) {
                element.on('click', function(args) {
                    var action = args['target']['attributes']['remove-action'].value;
                    var removeId = args['target']['attributes']['remove-id'].value;
                    $scope.$emit(action, removeId);
                });
            }
        };
    };
    
    function spanedit() {
        return {
            restrict: 'E',

            template: '<span class="fa fa-edit" style="cursor: pointer; padding-left: 40%"></span>',
            replace: true,

            link: function($scope, element, attrs) {
                element.on('click', function(args) {
                    var action = args['target']['attributes']['edit-action'].value;
                    var editId = args['target']['attributes']['edit-id'].value;
                    $scope.$emit(action, editId);
                });
            }
        };
    };
    
    function spantoggle() {
        return {
            restrict: 'E',

            template: '<span style="cursor: pointer; padding-left: 40%" class="fa" ng-class="{\' fa-check\': row.entity.accept, \'fa-close \':!row.entity.accept}"></span>',
            replace: true,

            link: function($scope, element, attrs) {
                element.on('click', function(args) {
                    var action = args['target']['attributes']['change-action'].value;
                    var accept = Number(args['target']['attributes']['change-accept'].value);
                    var id = Number(args['target']['attributes']['change-id'].value);
                    $scope.$emit(action, id, accept);
                });
            }
        };
    };
})();


