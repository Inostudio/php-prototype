<div>
    <div class="container">
        <h4 style="text-align: center;margin-bottom: 20px;">
            <% trans('front/search/search.text_result') %> "{{vm.search}}":
        </h4>

        <div class="well col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
            <div ng-if="vm.users.length === 0">
                <% trans('front/search/search.text_result_null') %>
            </div>
            <div data-ng-repeat="user in vm.users">

                <div class="row user-row">
                    <div class="col-xs-3 col-sm-2 col-md-1 col-lg-1">
                        <a href="#/users/{{user.id}}">
                            <img class="img-circle"
                                 ng-src="{{user.photo}}"
                                 alt="User Pic" style="width: 50px; height: 50px;">
                        </a>
                    </div>
                    <div class="col-xs-8 col-sm-9 col-md-10 col-lg-10">
                        <a href="#/users/{{user.id}}"><strong>{{user.profile.first_name + " " + user.profile.last_name}}</strong></a>
                    </div>
                    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 dropdown-user">
                        <i class="glyphicon text-muted" data-ng-click="vm.show(user.id)" data-ng-class="vm.shows[user.id] !== undefined ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'" style="margin: 0px;"></i>
                    </div>
                </div>
                <div class="panel panel-info" data-ng-show="vm.shows[user.id] !== undefined">
                    <div class="panel-heading" data-ng-show="user.profile.first_name + user.profile.first_name !== ''">
                        <h3 class="panel-title">{{user.profile.first_name + " " + user.profile.last_name}}</h3>
                    </div>
                    <div class="panel-body" >
                        <div class="row" >
                            <div class="col-md-2 col-lg-2 " align="center"> <img alt="User Pic" ng-src="{{user.photo}}" class="img-rounded"> </div>

                            <div class=" col-md-8 col-lg-8 col-md-offset-2 col-lg-offset-2">
                                <table class="table table-user-information">
                                    <tbody>
                                    <tr>
                                        <td>First name:</td>
                                        <td>{{user.profile.first_name}}</td>
                                    </tr>
                                    <tr>
                                        <td>Last name:</td>
                                        <td>{{user.profile.last_name}}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone Number</td>
                                        <td>{{user.profile.phone}}
                                        </td>
                                    </tr>
                                    <tr ng-hide="user.groups === undefined || user.groups.length === 0">
                                        <td>Groups</td>
                                        <td>
                                                    <span ng-repeat="group in user.groups" class="btn btn-primary" style="margin: 5px">
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
            </div>
        </div>
    </div>
    <button class="btn btn-primary" data-ng-click="vm.next()" data-ng-show="vm.download.count > vm.download.downloaded" style="margin-left: 45%;min-width: 75px;">More</button>
</div>