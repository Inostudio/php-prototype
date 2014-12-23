<style>
    .cropArea {
      background: #E4E4E4;
      overflow: hidden;
      width:500px;
      height:350px;
    }
</style>

<h1 class="page-header">Resources</h1>
<div id="alerts-container"></div>
<div>
    <h3 class="sub-header">Add resource</h3>
    <form name="form" ng-submit="add(resource)">
        <div class="form-inline" novalidate>
            <div class="input-group">
                <input type="text" class="form-control" name="title" placeholder="Title" ng-model="resource.title" required />
            </div>
            <div class="input-group">
                <input type="file" id="fileInput" name="file"/>
            </div>
            <button type="submit" class="btn btn-default" ng-disabled="form.$invalid">Добавить</button>
        </div>
    </form>
    <h3 class="sub-header">List of resources</h3>
</div>

<div ui-grid="gridOptions_resourcesGrid" ui-grid-edit class="resourcesGrid"></div>