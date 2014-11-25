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
        <td contentEditable="true" ng-model="contentTitle">{{group.title}}</td>
        <td contentEditable="true" ng-model="contentDescription">{{group.description}}</td>
        <td>
            <a class="fa fa-edit" ng-click="editGroup(group, contentTitle, contentDescription)" style="cursor: pointer;"></a>
            <a class="fa fa-remove" ng-click="removeGroup(group)" style="cursor: pointer;"></a>
        </td>
     </tr>
    </tbody>
  </table>
    <!--
    <%Auth::user()->groups[0]->title%>
    
    -->
    
    <!--<div ui-grid="gridOptions" ui-grid-edit class="grid"></div>-->
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
</div>

