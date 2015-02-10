<div class="col-xs-12 col-sm-13 col-md-7 col-lg-7 col-xs-offset-0 col-sm-offset-0 col-md-offset-2 col-lg-offset-2" >

    <div ng-hide="vm.found">
        <h3>{{vm.message}}</h3>

        <button type="button" class="btn btn-default" ng-click="vm.back()">Back</button>
    </div>

    <div ng-show="vm.found" class="panel panel-info" ng-init="vm.currentUserId = <% Auth::check() ? Auth::user()->id : 0 %>">
        <div class="panel-heading">
            <h3 class="panel-title">{{vm.user.name}}</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-2 col-lg-2 " align="center"> <img alt="User Pic" ng-src="{{vm.user.photo}}" class="img-rounded"> </div>

                <div class=" col-md-8 col-lg-8 col-md-offset-2 col-lg-offset-2">
                    <table class="table table-user-information">
                        <tbody>
                        <tr>
                            <td><% trans('front/profile/profile.first_name') %>:</td>
                            <td>{{vm.user.first_name}}</td>
                        </tr>
                        <tr>
                            <td><% trans('front/profile/profile.last_name') %>:</td>
                            <td>{{vm.user.last_name}}</td>
                        </tr>
                        <tr>
                            <td><% trans('front/profile/profile.phone') %></td>
                            <td>{{vm.user.phone}}
                            </td>
                        </tr>
                        <tr ng-hide="vm.user.groups === undefined || vm.user.groups.length === 0">
                            <td>Groups</td>
                            <td>
                                <span ng-repeat="group in vm.user.groups" class="btn btn-primary" style="margin: 5px">
                                    {{group.title}}
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
    <div class="col-sm-12" ng-hide="vm.user.articles === undefined || vm.user.articles.length === 0">
        <div class="panel panel-default row" style="margin-bottom: 0">
            <div class="panel-heading"><center class="headerTextSize"><span style="color: #009926"><% trans('front/profile/profile.title_articles') %>:<span></center></div>
        </div>
        <div class="articleContainer row" ng-repeat="article in vm.user.articles">
            <div class="articleContent col-sm-11" style="padding-right: 0">
                <div class="articleText page-header">
                    <p>{{article.title.length > 200 ? article.title.substr(0, 195) + '...' : article.title}}</p>
                </div>
                <div class="articleMetaInfo">
                    <p><span class="grenSpan"><%trans('/front/articles/index.category')%>:</span> {{article.category.title}}</p>
                    <p><span class="grenSpan"><%trans('/front/articles/index.author')%>:</span> {{vm.user.name}}</p>
                    <p><span class="grenSpan"><%trans('/front/articles/index.creation_date')%>:</span> {{article.created_at}}</p>
                </div>
            </div>
            <div class="articleAction col-sm-1">
                <center><p ng-class="{'btn-action-hidden' : article.user.id != vm.currentUserId}"><a class="fa fa-edit" href="#/articles/edit/{{article.id}}"></a></p>
                    <p><a class="fa fa-file-o" href="#/articles/{{article.id}}"></a></p>
                    <p ng-class="{'btn-action-hidden' : article.user.id != vm.currentUserId}"><a class="fa fa-close" ng-click="vm.removeArticle(article.id)"></a></p>
                </center>
            </div>
        </div>
    </div>
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