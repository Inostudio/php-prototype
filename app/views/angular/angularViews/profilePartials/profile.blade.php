<?php
    $user = Auth::user();
?>

<alert ng-show="(alert !== undefined)" type="{{alert.type}}" close="closeAlert()">
    {{alert.msg}}
</alert>

<div class="panel panel-info">
    <div class="panel-heading">
      <h3 class="panel-title">{{ user.first_name + " " + user.last_name }}</h3>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=100" class="img-circle"> </div>
        <div class=" col-md-9 col-lg-9 ">
            <form>
              <table class="table table-user-information">
                <tbody>
                  <tr>
                    <td>First name:</td>
                    <td ng-init="user.first_name = '<% $user->profile->first_name %>'">
                        <span ng-hide="editing">{{user.first_name}}</span>
                        <input ng-model="temp.first_name" ng-hide="!editing">
                    </td>

                  </tr>

                  <tr ng-init="user.last_name = '<% $user->profile->last_name %>'">
                    <td>Last name:</td>
                    <td>
                        <span ng-hide="editing">{{user.last_name}}</span>
                        <input ng-model="temp.last_name" ng-hide="!editing">
                    </td>
                  </tr>

                  <tr>
                    <td>Email</td>
                    <td>
                        <a href="mailto:info@support.com"><% $user->email %></a>
                    </td>
                  </tr>
                  <tr ng-init="user.phone = '<% $user->profile->phone %>'">
                    <td>Phone Number</td>
                    <td>
                        <span ng-hide="editing">{{user.phone}}</span>
                        <input ng-model="temp.phone" ng-hide="!editing">
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
        </div>
      </div>
    </div>
    <div class="panel-footer">
        <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
        <div class="pull-right">
            <a ng-hide="editing" href="#/" data-original-title="Edit data" data-toggle="tooltip" type="button" class="btn btn-sm btn-warning" ng-click="edit(editing)"><i class="glyphicon glyphicon-edit"></i></a>
            <a ng-hide="!editing" data-original-title="Apply edit" data-toggle="tooltip" type="button" class="btn btn-sm btn-success" ng-click="apply()"><i class="glyphicon glyphicon-ok"></i></a>
            <a ng-hide="!editing" href="#/" data-original-title="Cancel edit" data-toggle="tooltip" type="button" class="btn btn-sm btn-danger" ng-click="cancel()"><i class="glyphicon glyphicon-remove"></i></a>
        </div>
    </div>
</div>