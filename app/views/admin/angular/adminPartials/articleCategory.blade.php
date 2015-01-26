<div id="alerts-container" ng-init="vm.article_removed_message = '<%trans("articleCategory.article_removed_message")%>';
     vm.article_change_message = '<%trans("articleCategory.article_change_message")%>';
     vm.required_field = '<%trans("articleCategory.required_field")%>'"></div>

<h1 class="page-header" align='center'>{{vm.categoryTitle == '' ? '<%trans("articleCategory.all_categories")%>' : vm.categoryTitle}}</h1>
<div class="table-responsive">
    <h3 class="sub-header"><%trans('articleCategory.list_of_articles')%></h3>
    <div style="margin-bottom: 5px;">
        <div class="form-inline">
            <form name="searchForm" novalidate>
                <input type="text" class="form-control" placeholder="<%trans('articleCategory.phrase')%>" required ng-model="vm.searchPhrase">
                <select class="form-control" ng-model="vm.src" required="">
                    <option value="1"><%trans('articleCategory.title')%></option>
                    <option value="2"><%trans('articleCategory.author')%></option>
                </select>
                <button class="btn btn-primary" ng-disabled="searchForm.$invalid" ng-click="vm.search()"><%trans('articleCategory.search')%></button>
                <button class="btn btn-primary" ng-click="vm.reset()"><%trans('articleCategory.reset')%></button>
            </form>
        </div>
        <span style="float: right"><%trans('articleCategory.page')%>: {{vm.currentPage}}/{{vm.totalPage}}</span><br>
    </div>
    <div ui-grid="vm.gridOptions_articleOfCategoryOptions" ui-grid-edit></div>
    <div style="margin-top: 5px;">
        <button type="button" class="btn btn-success" ng-disabled="vm.unavailablePrev" ng-click="vm.prevPage()"><%trans('articleCategory.previous')%></button>
        <button type="button" class="btn btn-success" ng-disabled="vm.unavailableNext" ng-click="vm.nextPage()"><%trans('articleCategory.next')%></button>
    </div>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans('articleCategory.deliting')%></h3>
    </div>
    <div class="modal-body">
        <%trans('articleCategory.deliting_text')%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteArticle')"><%trans('articleCategory.ok')%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteArticle')"><%trans('articleCategory.cancel')%></button>
    </div>
</script>
