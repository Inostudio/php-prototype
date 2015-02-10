<div id="alerts-container" ng-init="vm.required_field = '<%trans("admin/languages.required_field")%>';
        vm.file_change = '<%trans("admin/languages.file_change")%>'"></div>

<h1 class="page-header"><%trans('admin/languages.languages')%></h1>
<div class="table-responsive" ng-hide="vm.hideLangFiles">
    <h3 class="sub-header"><%trans('admin/languages.list_of_languages_files')%></h3>
    <div ui-grid="vm.gridOptions_gridLanguagesFiles" ui-grid-edit class="gridLanguagesFiles"></div>
    <p><%trans('admin/languages.path')%>: {{vm.path}}</p>
</div>
<div class="table-responsive" ng-hide="!vm.hideLangFiles">
    <h3 class="sub-header"><%trans('admin/languages.file')%>: {{vm.editFile}}</h3>
    <div ui-grid="vm.gridOptions_gridLanguagesFile" ui-grid-edit class="fileEdit"></div>
    <button class="btn btn-primary" ng-click="vm.selectFile()" style="margin-top: 5px;"><%trans('admin/languages.select_file')%></button>
</div>