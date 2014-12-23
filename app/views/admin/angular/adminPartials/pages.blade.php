<div id="alerts-container_for_pages"></div>

<button class="btn btn-primary" style="margin-bottom: 5px;" ng-click="createPage()">Create page</button>
<script type="text/ng-template" id="EditPage.html">
    <div>
        <div class="">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel-group">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <span data-toggle="collapse"><span class="glyphicon glyphicon-file">
                                    </span>{{pageActions}}</span>
                                </h4>
                            </div>
                            <form name="pageForm">
                                <div id="collapseOne" class="panel-collapse collapse in">
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group" ng-class="{ 'has-error' : pageForm.title.$invalid && submitted}">
                                                    <input type="text" class="form-control" placeholder="Title" name="title" required ng-model="page.title" ng-trim="true"/>
                                                </div>
                                                <div class="form-group" ng-class="{ 'has-error' : pageForm.body.$invalid && submitted}">
                                                    <textarea class="form-control" placeholder="Content" rows="5" required ng-model="page.body" ng-trim="true" name="body" style="height: 400px"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6" style="width: 70%">
                                                <div class="well well-sm">
                                                    <div class="input-group" ng-class="{ 'has-error' : pageForm.url.$invalid && submitted}">
                                                        <span class="input-group-addon"><% Request::root() %>/</span>
                                                        <input type="text" class="form-control" placeholder="Custom url" name="url" ng-model="page.url" required ng-pattern="/^\w+$/" ng-trim="true"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2" style="float: right; width: 30%">
                                                <div class="well well-sm">
                                                    <div class="input-group" style="width: 100%" ng-class="{ 'has-error' : pageForm.status.$invalid && submitted}">
                                                        <select class="form-control" ng-model="page.status_id" name="status" required>
                                                            <option ng-repeat="status in statuses" value="{{status.id}}">{{status.title}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-success btn-sm" ng-click="$emit('edit-ok', page, pageForm.$valid)" ng-disabled="pageForm.$invalid && submitted">
                <span class="glyphicon glyphicon-floppy-disk"></span>Save</button>
            <button type="button" class="btn btn-default" style="float: right" ng-click="$emit('edit-cancel')" >Cancel</button>
        </div>
    </div>
</script>

<div ui-grid="gridOptions_pagesGrid" ui-grid-edit class="pagesGrid"></div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title">Deleting!</h3>
    </div>
    <div class="modal-body">
        Are you sure that you want delete this page?
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('modal-ok')">OK</button>
        <button class="btn btn-warning" ng-click="$emit('modal-cancel')">Cancel</button>
    </div>
</script>