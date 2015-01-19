<div id="alerts-container_option" ng-init="add_perm_to_group = '<%trans("groups.add_perm_to_group")%>';
     remove_perm_from_group = '<%trans("groups.remove_perm_from_group")%>'"></div>

<h1 class="page-header" align='center'>{{groupTitle}}</h1>
<div class="table-responsive">
    <h3 class="sub-header">{{groupDescription}}</h3>
    
    <h3 class="sub-header"><%trans('groups.list_of_permissions')%></h3>
    <div ui-grid="gridOptions_groupOptions" ui-grid-edit class="grid1"></div>
</div>
