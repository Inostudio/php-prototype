<?php
    $user = Auth::user();
?>

<alert data-ng-show="(vm.alert !== undefined)" type="{{vm.alert.type}}" close="vm.closeAlert()">
    {{vm.alert.msg}}
</alert>

<div class="panel panel-info">
    <div class="panel-heading">
      <h3 class="panel-title">{{ vm.user.first_name + " " + vm.user.last_name }}</h3>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-4 col-lg-4" align="center">
            <img alt="User Pic" data-ng-init="vm.exists = '<% $user->existsPhoto() %>';vm.imageUrl = '<% $user->getPhoto() %>'; vm.imageCroppedUrl = '<% $user->getCroppedPhoto() %>'; vm.image = vm.imageCroppedUrl" src="{{vm.image}}" class="img-rounded" data-ng-click="vm.photo('lg')">
            <!--
            <button class="btn btn-default" data-ng-click="edit_thumbnail('lg')">Edit thumbnail</button>
            <button class="btn btn-default" data-ng-click="upload_new_photo('lg')">Upload a new photo</button>
            -->
        </div>
        <div class=" col-md-8 col-lg-8 ">
            <form name="form" novalidate>
              <table class="table table-user-information">
                <tbody>
                  <tr>
                    <td>First name:</td>
                    <td data-ng-init="vm.user.first_name = '<% $user->profile->first_name %>'">
                        <span data-ng-hide="vm.editing">{{vm.user.first_name}}</span>

                        <div class="form-group">
                            <div class="input-group" data-ng-class="{ 'has-error' : (form.first_name.$invalid) && vm.submitted }">
                                <input type="text" name="first_name" data-ng-model="vm.temp.first_name" data-ng-hide="!vm.editing" minlength="2" maxlength="32" data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block"
                                data-ng-show="(form.first_name.$error.required) && vm.submitted">
                                First name must be not empty
                            </span>

                            <span class="help-block" data-ng-show="(form.first_name.$error.minlength) && vm.submitted">
                                First name is too short.
                            </span>

                            <span class="help-block" data-ng-show="(form.first_name.$error.maxlength) && vm.submitted">
                                First name is too long.
                            </span>
                        </div>
                    </td>

                  </tr>

                  <tr data-ng-init="vm.user.last_name = '<% $user->profile->last_name %>'">
                    <td>Last name:</td>
                    <td>
                        <span data-ng-hide="vm.editing">{{vm.user.last_name}}</span>

                        <div class="form-group">
                            <div class="input-group" data-ng-class="{ 'has-error' : (form.last_name.$invalid) && vm.submitted }">
                                <input type="text" name="last_name" data-ng-model="vm.temp.last_name" data-ng-hide="!vm.editing" minlength="2" maxlength="32" data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block"
                                data-ng-show="(form.last_name.$error.required) && vm.submitted">
                                Last name must be not empty
                            </span>

                            <span class="help-block" data-ng-show="(form.last_name.$error.minlength) && vm.submitted">
                                Last name is too short.
                            </span>

                            <span class="help-block" data-ng-show="(form.last_name.$error.maxlength) && vm.submitted">
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
                  <tr data-ng-init="vm.user.phone = '<% $user->profile->phone %>'">
                    <td>Phone Number</td>
                    <td>
                        <span data-ng-hide="vm.editing">{{vm.user.phone}}</span>

                        <div class="form-group">
                            <div class="input-group" data-ng-class="{ 'has-error' : (form.phone.$invalid) && vm.submitted }">
                                <input type="text" name="phone"  data-ng-model="vm.temp.phone" data-ng-hide="!vm.editing" minlength="2" maxlength="32" data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block"
                                data-ng-show="(form.phone.$error.required) && vm.submitted">
                                Phone must be not empty
                            </span>

                            <span class="help-block" data-ng-show="(form.phone.$error.minlength) && vm.submitted">
                                Phone is too short.
                            </span>

                            <span class="help-block" data-ng-show="(form.phone.$error.maxlength) && vm.submitted">
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
            <a data-ng-hide="vm.editing" href="#/" data-original-title="Edit data" data-toggle="tooltip" type="button" class="btn btn-sm btn-warning" data-ng-click="vm.edit(vm.editing)"><i class="glyphicon glyphicon-edit"></i></a>
            <a data-ng-hide="!vm.editing" data-original-title="Apply edit" data-toggle="tooltip" type="button" class="btn btn-sm btn-success" data-ng-click="vm.apply(form.$valid)"><i class="glyphicon glyphicon-ok"></i></a>
            <a data-ng-hide="!vm.editing" href="#/" data-original-title="Cancel edit" data-toggle="tooltip" type="button" class="btn btn-sm btn-danger" data-ng-click="vm.cancel()"><i class="glyphicon glyphicon-remove"></i></a>
        </div>
    </div>
</div>


<style>
.cropArea {
    background: #E4E4E4;
    overflow: hidden;
    width: 0px;
    height: 0px;
}

div.class1 droplet {
   display: inline-block;
   z-index: 2;
   position: relative;
   border-radius: 2px;
   width: 100%;
   height: 100%;
   background-color: rgba(255, 255, 255, .1);
   margin-top: -5px;
   padding-top: 5px;
   transition: box-shadow 0.35s;
}

div.class1 droplet comment:after {
    content: "Drag Image...";
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: inline-block;
    z-index: -1;
    font-family: Lato, Arial, Tahoma, Helvetica, sans-serif;
    color: rgba(0, 0, 0, .45);
    text-decoration: none;
    font-weight: normal;
    font-size: 20px;
    line-height: 300px;
    text-align: center;
}

div.class1 droplet.event-dragover comment:after {
    content: "...And Drop!";
}

</style>

<script type="text/ng-template" id="editPhoto.html">
    <div style="display: inline-block; background: #efefef; width: 100%;" data-ng-style="">
        <div class="modal-header">
            <h3 class="modal-title">Choose a new thumbnail</h3>
        </div>
        <div class="modal-body" data-ng-style="vm.isActive('NewPhoto') ? {'padding': '0'} : {}" style="height: 600px;border: dashed 3px #c5cacd; margin: 15px; background: #fff;">
            <div data-ng-show="vm.isActive('ChangeThumbnail')">
                <section>
                    <div class="cropArea small" data-ng-style="ImageStyle" style="height: 600px; margin: 0 auto;">
                        <img-crop image="vm.myImage" data-ng-style="vm.ImageStyle" result-image="vm.myCroppedImage" result-image-format="image/jpeg" area-type="square"></img-crop>
                    </div>
                </section>
            </div>

            <div data-ng-show="vm.isActive('NewPhoto')" style="height: inherit;">
                <div class="class1" style="height: inherit; position: relative;">
                    <droplet data-ng-model="interface">

                        <div style="position: absolute; top: 240px; left: 300px;">
                            <div style="position:absolute; width: 270px; height: 66px;" class="uploadcare-dialog-big-button" data-ng-click="vm.choose()">
                                Choose a local file
                            </div>
                            <input style="border-radius: 100px;position:absolute;opacity: 0; width: 270px; height: 66px;" type="file" data-ng-model="vm.fileInput" id="fileInput" data-ng-click="vm.Init()"/>
                        </div>
                        <div>
                            <comment></comment>
                        </div>
                    </droplet>
                </div>


            </div>

            <div data-ng-show="vm.isActive('UploadPhoto')">
                <div class="cropArea small" data-ng-style="vm.NewPhotoImageStyle" style="height: 600px; margin: 0 auto;">
                    <img-crop image="vm.NewPhoto" result-image="vm.NewPhotoCroppedImage" result-image-format="image/jpeg" area-type="square"></img-crop>
                </div>
            </div>

        </div>
    </div>

    <div class="modal-footer" style="background: #fff3be; border-top: 1px solid #efe2a9" data-ng-hide="vm.new && vm.isActive('NewPhoto')">
        <div data-ng-show="vm.isActive('NewPhoto')">
            <button class="btn btn-primary" data-ng-click="vm.changeToThumbnail()">Choose a thumbnail</button>
        </div>

        <div data-ng-show="vm.isActive('ChangeThumbnail')">
            <div style="float: left">
                <button class="btn btn-primary" data-ng-click="vm.changeToSelectNewPhoto()">Upload a new photo</button>
            </div>

            <div style="float: right">
                <button class="btn btn-primary" data-ng-click="vm.upload(vm.myCroppedImage)">OK</button>
                <button class="btn btn-warning" data-ng-click="vm.cancel()">Cancel</button>
            </div>
        </div>
        <div data-ng-show="vm.isActive('UploadPhoto')">
            <button class="btn btn-primary" data-ng-click="vm.upload(vm.NewPhotoCroppedImage, vm.NewPhoto)" style="float: left">Upload</button>
            <button class="btn btn-warning" data-ng-click="vm.changeToSelectNewPhoto()" style="float: right">Cancel</button>
        </div>
    </div>
</script>