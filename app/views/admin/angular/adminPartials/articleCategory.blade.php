<div id="alerts-container"
     ng-init="vm.article_removed_message = '<%trans("admin/articleCategory.article_removed_message")%>';
     vm.article_change_message = '<%trans("admin/articleCategory.article_change_message")%>';
     vm.required_field = '<%trans("admin/articleCategory.required_field")%>'" xmlns="http://www.w3.org/1999/html"></div>

<h1 class="page-header" align='center'>{{vm.categoryTitle == '' ? '<%trans("admin/articleCategory.all_categories")%>' : ('<%trans("admin/articleCategory.category")%>: ' + vm.categoryTitle)}}</h1>
<div class="table-responsive">
    <h3 class="sub-header"><%trans('admin/articleCategory.list_of_articles')%></h3>
    <div style="margin-bottom: 5px;">
        <div class="form-inline">
            <form name="searchForm" novalidate>
                <input type="text" class="form-control" placeholder="<%trans('admin/articleCategory.phrase')%>" required ng-model="vm.searchPhrase">
                <select class="form-control" ng-model="vm.src" required="">
                    <option value="1"><%trans('admin/articleCategory.title')%></option>
                    <option value="2"><%trans('admin/articleCategory.author')%></option>
                </select>
                <button class="btn btn-primary" ng-disabled="searchForm.$invalid" ng-click="vm.search()"><%trans('admin/articleCategory.search')%></button>
                <button class="btn btn-primary" ng-click="vm.reset()"><%trans('admin/articleCategory.reset')%></button>
            </form>
        </div>
        <span style="float: right"><%trans('admin/articleCategory.page')%>: {{vm.currentPage}}/{{vm.totalPage}}</span><br>
    </div>
    <div ui-grid="vm.gridOptions_articleOfCategoryOptions" ui-grid-edit class="articlesTable"></div>
    <div style="margin-top: 5px;">
        <button type="button" class="btn btn-success" ng-disabled="vm.unavailablePrev" ng-click="vm.prevPage()"><%trans('admin/articleCategory.previous')%></button>
        <button type="button" class="btn btn-success" ng-disabled="vm.unavailableNext" ng-click="vm.nextPage()"><%trans('admin/articleCategory.next')%></button>
        <span style="float: right"><%trans('admin/articleCategory.articles2')%>: {{vm.countArticles}}</span>
    </div>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans('admin/articleCategory.deliting')%></h3>
    </div>
    <div class="modal-body">
        <%trans('admin/articleCategory.deliting_text')%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteArticle')"><%trans('admin/articleCategory.ok')%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteArticle')"><%trans('admin/articleCategory.cancel')%></button>
    </div>
</script>
