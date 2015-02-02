<h1 class="page-header"><%trans('resources.resources')%></h1>
<div id="alerts-container" ng-init="vm.remove_resource_message = '<%trans("resources.remove_resource_message")%>';
     vm.add_resource_message = '<%trans("resources.add_resource_message")%>';
     vm.delete_btn = '<%trans("resources.delete")%>';"></div>
<div>
    <h3 class="sub-header"><%trans('resources.add_resources')%></h3>
    <form name="form" ng-submit="vm.add(vm.resource)">
        <div class="form-inline" novalidate>
            <div class="input-group">
                <input type="text" class="form-control" name="title" placeholder="<%trans('resources.title_resource')%>" ng-model="vm.resource.title" required />
            </div>
            <div class="input-group">
                <input type="file" id="fileInput" name="file"/>
            </div>
            <button type="submit" class="btn btn-default" ng-disabled="form.$invalid"><%trans('resources.add')%></button>
        </div>
    </form>
    <h3 class="sub-header"><%trans('resources.list_of_resource')%></h3>
</div>

<div ui-grid="vm.gridOptions_resourcesGrid" ui-grid-edit class="resourcesGrid"></div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans('resources.deleting')%></h3>
    </div>
    <div class="modal-body">
        <%trans('resources.deleting_text')%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteResource')"><%trans('resources.ok')%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteResource')"><%trans('resources.cancel')%></button>
    </div>
</script>