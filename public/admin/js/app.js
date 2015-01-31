(function(){
    'use strict';

    angular.module('adminApp', [
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngImgCrop',
        'ui.grid', 
        'ui.grid.edit',
        'mgcrea.ngStrap',
        'ngResource',
        'angular-loading-bar',
        'angularCharts',
        'ngClipboard',
        'ngToggle'
    ]);
    
    angular
        .module('adminApp')
        .config(['ngClipProvider', function(ngClipProvider){
            ngClipProvider.setPath("/admin/vendors/angular/ZeroClipboard.swf");
    }]);
})();