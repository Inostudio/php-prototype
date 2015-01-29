<style>
    .cropArea {
      background: #E4E4E4;
      overflow: hidden;
      width:500px;
      height:350px;
    }
</style>
<div id="alerts-container"></div>
<h1 class="page-header"><%trans('admin/resources.resources')%></h1>
<div id="alerts-container" ng-init="vm.remove_resource_message = '<%trans("admin/resources.remove_resource_message")%>';
     vm.add_resource_message = '<%trans("admin/resources.add_resource_message")%>';
     vm.delete_btn = '<%trans("admin/resources.delete")%>';
     vm.empty_field = '<%trans("admin/resources.empty_field")%>';
     vm.success_changed_message = '<%trans("admin/resources.success_changed_message")%>';
     vm.select_file = '<%trans("admin/resources.select_file")%>';
     vm.copy_url = '<%trans("admin/resources.copy_url")%>'"></div>
<div>
    <h3 class="sub-header"><%trans('admin/resources.add_resources')%></h3>
    <form name="form" ng-submit="vm.add(vm.resource)">
        <div class="form-inline" novalidate>
            <div class="input-group">
                <input type="text" class="form-control" name="title" placeholder="<%trans('admin/resources.title_resource')%>" ng-model="vm.resource.title" required />
            </div>
            <div class="input-group">
                <input type="file" id="fileInput" name="file"/>
            </div>
            <button type="submit" class="btn btn-default" ng-disabled="form.$invalid"><%trans('admin/resources.add')%></button>
        </div>
    </form>
    
    <h3 class="sub-header"><%trans('admin/resources.list_of_resource')%></h3>
    <div>
        <div class="form-inline">
            <form name="form2" novalidate>
                <input type="text" class="form-control" placeholder="Search phrase" ng-model="vm.searchText" required>
                <select class="form-control" ng-model="vm.src" required="">
                    <option value="1">Title</option>
                    <option value="2">Url</option>
                </select>
                <button class="btn btn-primary" ng-click="vm.search()" ng-disabled="form2.$invalid">Search</button>
                <button class="btn btn-primary" ng-click="vm.reset()">Reset</button>
            </form>
        </div>
        <span style="float: right"><%trans('admin/users.page')%>: {{vm.currentPage}}/{{vm.totalPage}}</span><br>
    </div>
</div>

<div ui-grid="vm.gridOptions_resourcesGrid" ui-grid-edit class="resourcesGrid"></div>
<div style="margin-top: 5px;">
    <button type="button" class="btn btn-success" ng-click="vm.prevPage()" ng-disabled="vm.unavailablePrev">Previous</button>
    <button type="button" class="btn btn-success" ng-click="vm.nextPage()" ng-disabled="vm.unavailableNext">Next</button>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans('admin/resources.deleting')%></h3>
    </div>
    <div class="modal-body">
        <%trans('admin/resources.deleting_text')%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteResource')"><%trans('admin/resources.ok')%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteResource')"><%trans('admin/resources.cancel')%></button>
    </div>
</script>