<div id="alerts-container" ng-init="vm.success_remove = '<%trans('/front/articles/index.success_remove')%>'"></div>
<div class="row" >
    <div class="col-sm-3">
        <div>
            <div class="panel panel-default" style="margin-bottom: 5px">
              <div class="panel-heading"><center class="headerTextSize"><%trans('/front/articles/index.search_parameters')%></center></div>
              <div class="panel-body">
                  <form role="form">
                      <div class="form-group">
                          <center><label><%trans('/front/articles/index.search_phrase')%></label></center>
                          <input type="text" name="phrase" id="" class="form-control" ng-model="vm.searchPhrase"/>
                      </div>

                      <div class="form-group">
                          <center><label><%trans('/front/articles/index.category')%></label></center>                          
                          <select class="form-control" ng-model="vm.searchCategory">
                              <option>All</option>
                              <option ng-repeat="category in vm.categorys">{{category.title}}</option>
                          </select>
                      </div>
                      <button type="submit" class="btn btn-success" ng-click="vm.getSearchResults()"><%trans('/front/articles/index.search')%></button>
                      <button type="submit" class="btn btn-success" ng-click="vm.resetSearch()" style="margin-left: 40%"><%trans('/front/articles/index.reset')%></button>
                  </form>
              </div>
            </div>
            <a class="btn btn-success btn-block" href="#/articles/create"><%trans('/front/articles/index.add')%></a>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="panel panel-default row" style="margin-bottom: 0">
            <div class="panel-heading"><center class="headerTextSize"><%trans('/front/articles/index.search_in_category')%>: <span style="color: #009926">{{vm.searchCategoryTitle}}<span></center></div>
        </div>
        <div class="articleContainer row" ng-repeat="article in vm.articles">
            <div class="articleContent col-sm-11" style="padding-right: 0">
                <div class="articleText page-header">
                    <p>{{article.title.length > 200 ? article.title.substr(0, 195) + '...' : article.title}}</p>
                </div>
                <div class="articleMetaInfo">
                    <p><span class="grenSpan"><%trans('/front/articles/index.category')%>:</span> {{article.category.title}}</p>
                    <p><span class="grenSpan"><%trans('/front/articles/index.author')%>:</span> <a href="#/users/{{article.user.id}}">{{article.user.profile.first_name +  " " + article.user.profile.last_name}}</a></p>
                    <p><span class="grenSpan"><%trans('/front/articles/index.creation_date')%>:</span> {{article.created_at}}</p>
                </div>
            </div>
            <div class="articleAction col-sm-1">
                <center><p ng-class="{'btn-action-hidden' : article.user.id != vm.currentUserId}"><a class="fa fa-edit" href="#/articles/edit/{{article.id}}"></a></p>
                <p><a class="fa fa-file-o" href="#/articles/{{article.id}}"></a></p>
                <p ng-class="{'btn-action-hidden' : article.user.id != vm.currentUserId}"><a class="fa fa-close" ng-click="vm.removeArticle(article.id)" style="cursor: pointer"></a></p>
                </center>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div class="panel panel-default" style="margin-bottom: 5px">
          <div class="panel-heading"><center class="headerTextSize"><%trans('/front/articles/index.the_last_added')%></center></div>
          <div class="panel-body" style="padding: 0">
              <div class="newsContainer" ng-repeat="newArticle in vm.newArticles">
                  <div class="newContent">
                    <p class="newsText page-header">{{newArticle.title.length > 180 ? newArticle.title.substr(0, 175) + '...' : newArticle.title}}</p>
                  </div>
                  <div class="newArticleMetaInfo">
                      <p><span class="grenSpan"><%trans('/front/articles/index.creation_date')%>:</span> {{newArticle.created_at}}</p>
                      <p><span class="grenSpan"><%trans('/front/articles/index.category')%>:</span> {{newArticle.category.title}}</p>
                      <p style="text-align: right"><a href="#/articles/{{newArticle.id}}"><%trans('/front/articles/index.more_link')%>...</a></p>
                  </div>
              </div>
          </div>
        </div>
    </div>
    <button class="btn btn-primary btn-more" ng-class="{'btn-more-hidden' : !vm.showMoreBtn}" ng-click="vm.getMoreArticles()"><%trans('/front/articles/index.more_btn')%></button>
</div>

<script type="text/ng-template" id="ConfirmDelete.html">
    <div class="modal-header">
        <h3 class="modal-title"><%trans('/front/articles/index.deliting')%></h3>
    </div>
    <div class="modal-body">
        <%trans('/front/articles/index.deliting_text')%>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="$emit('okDeleteArticle')"><%trans('/front/articles/index.ok')%></button>
        <button class="btn btn-warning" ng-click="$emit('cancelDeleteArticle')"><%trans('/front/articles/index.cancel')%></button>
    </div>
</script>
