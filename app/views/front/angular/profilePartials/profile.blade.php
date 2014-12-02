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
        <div class="col-md-4 col-lg-4" align="center">
            <img alt="User Pic" ng-init="imageUrl = '<% $user->getPhoto() %>'; imageCroppedUrl = '<% $user->getCroppedPhoto() %>'" src="{{imageCroppedUrl}}" class="img-rounded" ng-click="photo('lg')">
            <!--
            <button class="btn btn-default" ng-click="edit_thumbnail('lg')">Edit thumbnail</button>
            <button class="btn btn-default" ng-click="upload_new_photo('lg')">Upload a new photo</button>
            -->
        </div>
        <div class=" col-md-8 col-lg-8 ">
            <form name="form" novalidate>
              <table class="table table-user-information">
                <tbody>
                  <tr>
                    <td>First name:</td>
                    <td ng-init="user.first_name = '<% $user->profile->first_name %>'">
                        <span ng-hide="editing">{{user.first_name}}</span>

                        <div class="form-group">
                            <div class="input-group" ng-class="{ 'has-error' : (form.first_name.$invalid) && submitted }">
                                <input type="text" name="first_name" ng-model="temp.first_name" ng-hide="!editing" minlength="2" maxlength="32" ng-change="closeAlert()" required>
                            </div>

                            <span class="help-block"
                                ng-show="(form.first_name.$error.required) && submitted">
                                First name must be not empty
                            </span>

                            <span class="help-block" ng-show="(form.first_name.$error.minlength) && submitted">
                                First name is too short.
                            </span>

                            <span class="help-block" ng-show="(form.first_name.$error.maxlength) && submitted">
                                First name is too long.
                            </span>
                        </div>
                    </td>

                  </tr>

                  <tr ng-init="user.last_name = '<% $user->profile->last_name %>'">
                    <td>Last name:</td>
                    <td>
                        <span ng-hide="editing">{{user.last_name}}</span>

                        <div class="form-group">
                            <div class="input-group" ng-class="{ 'has-error' : (form.last_name.$invalid) && submitted }">
                                <input type="text" name="last_name" ng-model="temp.last_name" ng-hide="!editing" minlength="2" maxlength="32" ng-change="closeAlert()" required>
                            </div>

                            <span class="help-block"
                                ng-show="(form.last_name.$error.required) && submitted">
                                Last name must be not empty
                            </span>

                            <span class="help-block" ng-show="(form.last_name.$error.minlength) && submitted">
                                Last name is too short.
                            </span>

                            <span class="help-block" ng-show="(form.last_name.$error.maxlength) && submitted">
                                Last name is too long.
                            </span>
                        </div>
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

                        <div class="form-group">
                            <div class="input-group" ng-class="{ 'has-error' : (form.phone.$invalid) && submitted }">
                                <input type="text" name="phone"  ng-model="temp.phone" ng-hide="!editing" minlength="2" maxlength="32" ng-change="closeAlert()" required>
                            </div>

                            <span class="help-block"
                                ng-show="(form.phone.$error.required) && submitted">
                                Phone must be not empty
                            </span>

                            <span class="help-block" ng-show="(form.phone.$error.minlength) && submitted">
                                Phone is too short.
                            </span>

                            <span class="help-block" ng-show="(form.phone.$error.maxlength) && submitted">
                                Phone is too long.
                            </span>
                        </div>
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
            <a ng-hide="!editing" data-original-title="Apply edit" data-toggle="tooltip" type="button" class="btn btn-sm btn-success" ng-click="apply(form.$valid)"><i class="glyphicon glyphicon-ok"></i></a>
            <a ng-hide="!editing" href="#/" data-original-title="Cancel edit" data-toggle="tooltip" type="button" class="btn btn-sm btn-danger" ng-click="cancel()"><i class="glyphicon glyphicon-remove"></i></a>
        </div>
    </div>
</div>


<style>
.cropArea {
    background: #E4E4E4;
    overflow: hidden;
    width: 500px;
    height: 350px;
}
</style>

<script type="text/ng-template" id="editPhoto.html">
    <div style="display: inline-block; background: #efefef; width: 100%;" ng-style="">
        <div class="modal-header">
            <h3 class="modal-title">Choose a new thumbnail</h3>
        </div>
        <div class="modal-body" style="height: 600px;border: dashed 3px #c5cacd; margin: 15px; background: #fff; ">
            <div ng-show="isActive('ChangeThumbnail')">
                <section>
                    <div class="cropArea small" ng-style="ImageStyle" style="height: 600px; margin: 0 auto;">
                        <img-crop image="myImage" result-image="myCroppedImage"></img-crop>
                    </div>
                </section>
            </div>

            <div ng-show="isActive('NewPhoto')">
                <div>
                    Select an image file:
                    <input type="file" ng-model="fileInput" id="fileInput" ng-click="Init()" />
                    <div class="uploadcare-dialog-big-button" ng-click="choose()">
                    Choose a local file
                    </div>
                </div>
            </div>

            <div ng-show="isActive('UploadPhoto')">
                <div class="cropArea small" ng-style="ImageStyle" style="height: 600px; margin: 0 auto;">
                    <img-crop image="myImage" result-image="myCroppedImage"></img-crop>
                </div>
            </div>

        </div>
    </div>

    <div class="modal-footer" style="background: #fff3be; border-top: 1px solid #efe2a9">
        <div ng-show="isActive('NewPhoto')">
            <button class="btn btn-primary" ng-click="changeToThumbnail()">Choose a thumbnail</button>
        </div>

        <div ng-show="isActive('ChangeThumbnail')">
            <div style="float: left">
                <button class="btn btn-primary" ng-click="changeToSelectNewPhoto()">Upload a new photo</button>
            </div>

            <div style="float: right">
                <button class="btn btn-primary" ng-click="upload('thumbnail')">OK</button>
                <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
            </div>
        </div>
        <div ng-show="isActive('UploadPhoto')">
            <button class="btn btn-primary" ng-click="upload()" style="float: left">Upload</button>
            <button class="btn btn-warning" ng-click="changeToSelectNewPhoto()" style="float: right">Cancel</button>
        </div>
    </div>
</script>