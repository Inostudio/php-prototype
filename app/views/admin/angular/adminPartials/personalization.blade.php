<h1 class="page-header"><%trans('admin/personalization.personalization')%></h1>
<h3 class="sub-header"><%trans('admin/personalization.change_colors')%></h3>
<div class="form-inline resonalizationMargin">
    <input type="text" ng-model="vm.colors.activeClass" class="form-control" ng-disabled="!vm.cookieEnable"/>
    <button class="btn btn-primary" colorpicker type="button" colorpicker-position="top" ng-model="vm.colors.activeClass" ng-disabled="!vm.cookieEnable"><%trans('admin/personalization.active')%></button>
    <button class="btn btn-primary" ng-disabled="!vm.cookieEnable" ng-click="vm.defaultActive()"><%trans('admin/personalization.default')%></button>
</div>
<div class="form-inline resonalizationMargin">
    <input type="text" ng-model="vm.colors.btnPrimary" class="form-control" ng-disabled="!vm.cookieEnable"/>
    <button class="btn btn-primary" colorpicker type="button" colorpicker-position="top" ng-model="vm.colors.btnPrimary" ng-disabled="!vm.cookieEnable"><%trans('admin/personalization.button')%></button>
    <button class="btn btn-primary" ng-disabled="!vm.cookieEnable" ng-click="vm.defaultBtnPrimary()"><%trans('admin/personalization.default')%></button>
</div>
<div class="form-inline resonalizationMargin">
    <input type="text" ng-model="vm.colors.navbarInverse" class="form-control" ng-disabled="!vm.cookieEnable"/>
    <button class="btn btn-primary" colorpicker type="button" colorpicker-position="top" ng-model="vm.colors.navbarInverse" ng-disabled="!vm.cookieEnable"><%trans('admin/personalization.navbar')%></button>
    <button class="btn btn-primary" ng-disabled="!vm.cookieEnable" ng-click="vm.defaultNavbarInverse()"><%trans('admin/personalization.default')%></button>
</div>
<div class="form-inline resonalizationMargin">
    <input type="text" ng-model="vm.colors.sidebar" class="form-control" ng-disabled="!vm.cookieEnable"/>
    <button class="btn btn-primary" colorpicker type="button" colorpicker-position="top" ng-model="vm.colors.sidebar" ng-disabled="!vm.cookieEnable"><%trans('admin/personalization.sidebar')%></button>
    <button class="btn btn-primary" ng-disabled="!vm.cookieEnable" ng-click="vm.defaultSidebar()"><%trans('admin/personalization.default')%></button>
</div>
<div class="form-inline resonalizationMargin">
    <input type="text" ng-model="vm.colors.a" class="form-control" ng-disabled="!vm.cookieEnable"/>
    <button class="btn btn-primary" colorpicker type="button" colorpicker-position="top" ng-model="vm.colors.a" ng-disabled="!vm.cookieEnable"><%trans('admin/personalization.links')%></button>
    <button class="btn btn-primary" ng-disabled="!vm.cookieEnable" ng-click="vm.defaultA()"><%trans('admin/personalization.default')%></button>
</div>
<div class="form-inline resonalizationMargin">
    <input type="text" ng-model="vm.colors.pageHeader" class="form-control" ng-disabled="!vm.cookieEnable"/>
    <button class="btn btn-primary" colorpicker type="button" colorpicker-position="top" ng-model="vm.colors.pageHeader" ng-disabled="!vm.cookieEnable"><%trans('admin/personalization.pageName')%></button>
    <button class="btn btn-primary" ng-disabled="!vm.cookieEnable" ng-click="vm.defaultPageHeader()"><%trans('admin/personalization.default')%></button>
</div>
<div class="form-inline resonalizationMargin">
    <input type="text" ng-model="vm.colors.subHeader" class="form-control" ng-disabled="!vm.cookieEnable"/>
    <button class="btn btn-primary" colorpicker type="button" colorpicker-position="top" ng-model="vm.colors.subHeader" ng-disabled="!vm.cookieEnable"><%trans('admin/personalization.pageName2')%></button>
    <button class="btn btn-primary" ng-disabled="!vm.cookieEnable" ng-click="vm.defaultSubHeader()"><%trans('admin/personalization.default')%></button>
</div>