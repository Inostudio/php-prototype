<style>
    .form-control{
        margin-bottom: 5px;
    }
    .loader{
        width: 70px;
        height: 70px;
        visibility: visible;
    }
    .loader-hidden{
        visibility: hidden;
    }
</style>
<div id="alerts-error-container"></div>
<div class="container">
    <div class="row">        
        <div class="col-sm-5">
            <h3><%trans('/front/articles/create.new_article')%></h3>
            <form name="createAct" novalidate>
                <div class="row">
                    <div class="col-sm-10">
                    <%trans('/front/articles/create.title')%>: <input type="text" class="form-control" ng-model="vm.articleTitle" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10">
                        <%trans('/front/articles/create.category')%>: 
                        <select class="form-control" ng-model="vm.articleCategory" ng-disabled="vm.disableCat" required>
                            <option ng-repeat="category in vm.categorys" value="{{category.id}}">{{category.title}}</option>
                        </select>
                    </div>
                </div>
                <%trans('/front/articles/create.description')%>: <textarea class="form-control" ng-model="vm.articleBody" required="" rows="8"></textarea>
                <button class="btn btn-success" ng-click="vm.saveArticle()" style="margin-top: 5px;" ng-disabled="createAct.$invalid"><%trans('/front/articles/create.save')%></button>
                <button class="btn btn-success" data-ng-click="vm.back();" style="margin-top: 5px;">Back</button>
            </form>
        </div>
    </div>
</div>
<!--
<img src="/front/img/loader.gif" class="loader" ng-class="{'loader-hidden' : !vm.disableCat}">{{vm.disableCat}}-->