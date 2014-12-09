<div ng-show="createPage">
    <div class="">
        <div class="row">
            <div class="col-md-12">
                <div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <span data-toggle="collapse"><span class="glyphicon glyphicon-file">
                                </span>Create new static page</span>
                            </h4>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse in">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Title" required ng-model="page.title"/>
                                        </div>
                                        <div class="form-group">
                                            <textarea class="form-control" placeholder="Content" rows="5" required ng-model="page.body" style="height: 400px"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="well well-sm">
                                            <div class="input-group">
                                                <span class="input-group-addon"><% Request::root() %>/</span>
                                                <input type="text" class="form-control" placeholder="Custom url" ng-model="page.url"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2" style="float: right">
                                        <div class="well well-sm">
                                            <form class="form form-inline " role="form">
                                                <div class="form-group" style="width: 100%">
                                                    <select class="form-control" style="width: 100%" ng-model="page.status_id">
                                                        <option ng-repeat="status in statuses" value="{{status.id}}">{{status.title}}</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-success btn-sm" ng-click="save(page)">
            <span class="glyphicon glyphicon-floppy-disk"></span>Save</button>
        <button type="button" class="btn btn-default" style="float: right" ng-click="showAllPages()">Cancel</button>
    </div>
</div>

<div ng-show="showPage">
    <button type="button" class="btn btn-default" style="float: right" ng-click="showAllPages()">Back</button>
    <th><span ng-bind-html="page.title"></span></th>
    <th> <p ng-bind-html="page.body"></p></th>
    <% Request::root() %>/<th>{{page.url}}</th>
    <th><button disabled class="btn btn-default">{{statuses[page.status_id - 1].title}}</button></th>
</div>

<div ng-hide="createPage || showPage" class="col-md-12">
    <button type="button" class="btn btn-default" style="float: right" ng-click="createPageAction()">Create</button>
    <div class="span8">
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Short content</th>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="page in pages">
                    <th>{{page.id}}</th>
                    <th><span>{{page.title}}</span></th>
                    <th> <p>{{page.body}}</p></th>
                    <th>{{page.url}}</th>

                    <th><button disabled class="btn btn-default">{{statuses[page.status_id - 1].title}}</button></th>
                    <th ng-click="show(page.id)">Show</th>
                    <th ng-click="confirmDelete(page.id)">Delete</th>
                    <th ng-click="edit(page.id)">Edit</th>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title">Deleting!</h3>
    </div>
    <div class="modal-body">
        Are you sure that you want delete this page?
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="ok()">OK</button>
        <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
    </div>
</script>