<div id="alerts-error-container" ng-init="vm.success_edit = '<%trans('/front/articles/edit.success_edit')%>'"></div>
<div class="container">
    <div class="row">        
        <div class="col-sm-5">
            <h3><%trans('/front/articles/edit.edit_article')%></h3>
            <form name="createAct" novalidate>
                <div class="row">
                    <div class="col-sm-10">
                        <%trans('/front/articles/edit.title')%>: <input type="text" class="form-control" required="" ng-model="vm.article.title">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10">
                        <%trans('/front/articles/edit.category')%>: 
                        <select class="form-control" ng-model="vm.articleCategory" ng-disabled="vm.disableCat" required>
                            <option ng-repeat="category in vm.categorys" value="{{category.id}}">{{category.title}}</option>
                        </select>
                    </div>
                </div>
                <%trans('/front/articles/edit.description')%>: <textarea class="form-control" required="" rows="8" ng-model="vm.article.body"></textarea>
                <button class="btn btn-success" ng-disabled="createAct.$invalid" style="margin-top: 5px;" ng-click="vm.saveEdit()"><%trans('/front/articles/edit.save')%></button>
                <button class="btn btn-success" data-ng-click="vm.back();" style="margin-top: 5px;"><%trans('/front/articles/edit.back')%></button>
            </form>


        </div>
    </div>
</div>