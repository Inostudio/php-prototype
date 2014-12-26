<div id="alerts-container"></div>

<h1 class="page-header">Groups</h1>
<div class="table-responsive">
    <h3 class="sub-header">Add group</h3>
    <form>
        <div class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Group name" ng-model="groupName" required>
            </div>
            <div class="input-group">
              <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Group description" ng-model="groupDescription">
            </div>
            <button type="submit" class="btn btn-default" ng-click="addGroup()">Добавить</button>
        </div>
    </form>
    <h3 class="sub-header">List of groups</h3>
    <div ui-grid="gridOptions" ui-grid-edit class="grid"></div> 
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title">Deleting!</h3>
    </div>
    <div class="modal-body">
        Are you sure that you want delete this group?
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteGroup')">OK</button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteGroup')">Cancel</button>
    </div>
</script>

