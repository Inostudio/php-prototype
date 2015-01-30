<style>
    .searchResults{
        width: 700px;
        border: 1px solid #D2CFC7;
        border-radius: 5px;
        margin-left: 25%;
    }

    .categorys{
        float: left;
    }

    .searchHeader{
        height: 30px;
        background-color: #A4A4A4;
    }
    .articleContainer{
        height: 120px;
        border: 1px solid #D2CFC7;
        margin-bottom: 2px;
    }
    .btn-more{
        margin-left: 45%;
        width: 80px;
        margin-top: 5px;
    }
    .btn-more-hidden{
        display: none;
    }
    .btn-action-hidden{
        visibility: hidden;
    }
    .modal-backdrop{
        z-index: 3000;
    }
    .modal{
        z-index: 10000;
    }
    .newsContainer{
        height: 180px;
        border: 1px solid #DDDDDD;
        padding: 5px;
        margin-bottom: 2px;
    }
    .newsText{
        text-align: justify;
        font-size: 13px;
        margin: 0;
    }
    .newsText a{
        text-decoration: none;
    }
    .newContent{
        height: 100px;
    }
    .newArticleMetaInfo{
        padding-top: 10px;
        height: 80px;
    }
    a:hover{
        text-decoration: none;
    }
    .newArticleMetaInfo p{
        margin-bottom: 2px;
        font-size: 13px;
    }
    .articleText{
        text-align: justify;
        height: 60px;
        font-size: 13px;
        margin: 0;
        line-height: 16px;
    }
    .articleMetaInfo{
        height: 60px;
    }
    .grenSpan{
        color: #009926;
    }
    .articleMetaInfo p{
        margin: 0;
        font-size: 13px;
    }
    .headerTextSize{
        font-size: 18px;
    }
    .articleAction{
        padding: 0;
        vertical-align: middle;
        padding-top: 3%
    }
</style>
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
                            <td>First name:</td>
                            <td>{{vm.user.first_name}}</td>
                        </tr>
                        <tr>
                            <td>Last name:</td>
                            <td>{{vm.user.last_name}}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{{vm.user.email}}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{{vm.user.phone}}
                            </td>
                        </tr>
                        <tr ng-hide="vm.user.groups === undefined">
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
    <div ng-show="vm.found" class="col-sm-12" ng-hide="vm.user.articles === undefined">
        <div class="panel panel-default row" style="margin-bottom: 0">
            <div class="panel-heading"><center class="headerTextSize"><span style="color: #009926">{{vm.user.last_name}}'s articles:<span></center></div>
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
                <center><p ng-class="{'btn-action-hidden' : article.user.id != vm.currentUserId}"><a class="fa fa-edit" href="#/edit/{{article.id}}"></a></p>
                    <p><a class="fa fa-file-o" href="#/{{article.id}}"></a></p>
                    <p ng-class="{'btn-action-hidden' : article.user.id != vm.currentUserId}"><a class="fa fa-close" ng-click="vm.removeArticle(article.id)"></a></p>
                </center>
            </div>
        </div>
    </div>
</div>