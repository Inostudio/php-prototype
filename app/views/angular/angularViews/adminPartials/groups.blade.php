<h1 class="page-header">Groups</h1>
<div class="table-responsive">
    <h3 class="sub-header">Add group</h3>
        <div class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Group name" ng-model="groupName">
            </div>
            <div class="input-group">
              <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Group description" ng-model="groupDescription">
            </div>
            <button type="submit" class="btn btn-default" ng-click="addGroup()">Добавить</button>
        </div>
    <h3 class="sub-header">List of groups</h3>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
     <tr ng-repeat="group in groups">
        <td>{{group.id}}</td>
        <td contentEditable="true" ng-model="group.newTitle">{{group.title}}</td>
        <td contentEditable="true" ng-model="group.newDescritpion">{{group.descritpion}}</td>
        <td>
            <a class="fa fa-edit" ng-click="editGroup(group)" style="cursor: pointer;"></a>
            <a class="fa fa-remove" ng-click="removeGroup(group)" style="cursor: pointer;"></a>
        </td>
     </tr>
    </tbody>
  </table>
    
</div>

