<div id="alerts-container"  ng-init="vm.remove_category_message = '<%trans("articles.remove_category_message")%>';
     vm.add_category_message = '<%trans("articles.add_category_message")%>';
     vm.field_name_required = '<%trans("articles.field_name_required")%>';
     vm.update_category_message = '<%trans("articles.update_category_message")%>';"></div>

<h1 class="page-header"><%trans('articles.categories_of_articles')%></h1>
<div class="table-responsive">
    <h3 class="sub-header"><%trans('articles.add_category')%></h3>
    <form name="createCat" novalidate>
        <div class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="<%trans('articles.category_name')%>" required="" ng-model="vm.categoryTitle">
            </div>
            <button type="submit" class="btn btn-default" ng-disabled="createCat.$invalid" ng-click="vm.addCategory()"><%trans('articles.add')%></button>
        </div>
    </form>
    <h3 class="sub-header"><%trans('articles.list_of_categories')%></h3>
    <div ui-grid="vm.gridOptions_categoriesOptions" ui-grid-edit class="gridCategories"></div> 
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans('articles.deliting')%></h3>
    </div>
    <div class="modal-body">
        <%trans('articles.deliting_text')%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteCategory')"><%trans('articles.ok')%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteCategory')"><%trans('articles.cancel')%></button>
    </div>
</script>