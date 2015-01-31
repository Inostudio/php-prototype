<h1 class="page-header"><%trans('admin/settings.sections')%></h1>
<div id="alerts-container" ng-init="vm.section_enable = '<%trans('admin/settings.section_enable')%>';
     vm.section_disable = '<%trans('admin/settings.section_disable')%>'"></div>
<div ng-repeat="section in vm.sections">
    <div>{{section.title}}</div>
    <ng-toggle ng-model="section.disable" ng-click="vm.toggleSection(section.id, !section.disable)"></ng-toggle> 
</div>