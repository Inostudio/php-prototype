<?php
    $user = Auth::user();
    $field = trans('front/common.field');
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
        <div class="col-md-4 col-lg-4" align="center" style="position:relative; z-index: 100" data-ng-mouseover="vm.show = true;" data-ng-mouseleave="vm.show = false;">
            <img alt="User Pic" data-ng-init="vm.exists = '<% $user->existsPhoto() %>';vm.imageUrl = '<% $user->getPhoto() %>'; vm.imageCroppedUrl = '<% $user->getCroppedPhoto() %>'; vm.image = vm.imageCroppedUrl" ng-src="{{vm.image}}" class="img-rounded">
            <div ng-show="vm.show">
                <div data-ng-show="vm.exists" style="position: absolute; background: rgba(f,f,f,0.6); top: 0px; right: -12px; border-radius: 8px; width: 20px;">
                    <span data-ng-click="vm.deleteAvatar()"><i class="fa fa-times"></i></span>
                </div>

                <div style="position: absolute; background: rgba(0,0,0,0.6); bottom: 0px; border-radius: 8px; height: 30px; width: 99%">
                    <div data-ng-show="!vm.exists">
                        <a><span style="color: #ffffff" data-ng-click="vm.photo('lg')"><% trans('front/profile/profile.button_upload_image') %></span></a>
                    </div>
                    <div data-ng-show="vm.exists">
                        <a><span style="color: #ffffff" data-ng-click="vm.photo('lg')"><% trans('front/profile/profile.button_change_image') %></span></a>
                    </div>
                </div>
            </div>
        </div>
        <div class=" col-md-8 col-lg-8 ">
            <form name="form" novalidate>
              <table class="table table-user-information">
                <tbody>
                  <tr>
                    <td><% trans('front/profile/profile.first_name') %></td>
                    <td data-ng-init="vm.user.first_name = '<% $user->profile->first_name %>'" style="min-width: 125px;">
                        <span data-ng-hide="vm.editing">{{vm.user.first_name}}</span>

                        <div class="form-group">
                            <div class="input-group" data-ng-class="{ 'has-error' : (form.first_name.$invalid) && vm.submitted }">
                                <input type="text" name="first_name" data-ng-model="vm.temp.first_name" data-ng-hide="!vm.editing" minlength="2" maxlength="32" data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block"
                                data-ng-show="(form.first_name.$error.required) && vm.submitted">
                                <% trans('front/profile/profile.help_block_attr_empty',
                                    ['attr' => $field]) %>
                            </span>

                            <span class="help-block" data-ng-show="(form.first_name.$error.minlength) && vm.submitted">
                                <% trans('front/profile/profile.help_block_attr_short',
                                    ['attr' => $field]) %>
                            </span>

                            <span class="help-block" data-ng-show="(form.first_name.$error.maxlength) && vm.submitted">
                                <% trans('front/profile/profile.help_block_attr_long',
                                    ['attr' => $field]) %>
                            </span>
                        </div>
                    </td>

                  </tr>

                  <tr data-ng-init="vm.user.last_name = '<% $user->profile->last_name %>'">
                    <td><% trans('front/profile/profile.last_name') %></td>
                    <td>
                        <span data-ng-hide="vm.editing">{{vm.user.last_name}}</span>

                        <div class="form-group">
                            <div class="input-group" data-ng-class="{ 'has-error' : (form.last_name.$invalid) && vm.submitted }">
                                <input type="text" name="last_name" data-ng-model="vm.temp.last_name" data-ng-hide="!vm.editing" minlength="2" maxlength="32" data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block"
                                data-ng-show="(form.last_name.$error.required) && vm.submitted">
                                <% trans('front/profile/profile.help_block_attr_empty',
                                    ['attr' => $field]) %>
                            </span>

                            <span class="help-block" data-ng-show="(form.last_name.$error.minlength) && vm.submitted">
                                <% trans('front/profile/profile.help_block_attr_short',
                                    ['attr' => $field]) %>
                            </span>

                            <span class="help-block" data-ng-show="(form.last_name.$error.maxlength) && vm.submitted">
                                <% trans('front/profile/profile.help_block_attr_long',
                                    ['attr' => $field]) %>
                            </span>
                        </div>
                    </td>
                  </tr>
                  <tr data-ng-init="vm.user.phone = '<% $user->profile->phone %>'">
                    <td><% trans('front/profile/profile.phone') %></td>
                    <td>
                        <span data-ng-hide="vm.editing">{{vm.user.phone}}</span>

                        <div class="form-group">
                            <div class="input-group" data-ng-class="{ 'has-error' : (form.phone.$invalid) && vm.submitted }">
                                <input type="text" name="phone"  data-ng-model="vm.temp.phone" data-ng-hide="!vm.editing" minlength="2" maxlength="32" data-ng-change="vm.closeAlert()" required>
                            </div>

                            <span class="help-block"
                                data-ng-show="(form.phone.$error.required) && vm.submitted">
                                <% trans('front/profile/profile.help_block_attr_empty',
                                    ['attr' => $field]) %>
                            </span>

                            <span class="help-block" data-ng-show="(form.phone.$error.minlength) && vm.submitted">
                                <% trans('front/profile/profile.help_block_attr_short',
                                    ['attr' => $field]) %>
                            </span>

                            <span class="help-block" data-ng-show="(form.phone.$error.maxlength) && vm.submitted">
                                <% trans('front/profile/profile.help_block_attr_long',
                                    ['attr' => $field]) %>
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

<script type="text/ng-template" id="editPhoto.html">
    <div style="display: inline-block; background: #efefef; width: 100%;" data-ng-style="">
        <div class="modal-header">
            <h3 class="modal-title">
                <nobr data-ng-hide="vm.isActive('NewPhoto')"><% trans('front/profile/profile.title_choose_thumbnail') %></nobr>
                <nobr data-ng-show="vm.isActive('NewPhoto')"><% trans('front/profile/profile.title_upload_new_photo') %></nobr>
            </h3>
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
                <div class="dropClass" style="height: inherit; position: relative;">
                    <droplet data-ng-model="interface">

                        <div style="position: absolute; top: 240px; left: 300px;">
                            <div style="position:absolute; width: 270px; height: 66px;" class="uploadcare-dialog-big-button" data-ng-click="vm.choose()">
                                <% trans('front/profile/profile.button_choose_file') %>
                            </div>
                            <input style="border-radius: 100px;position:absolute;opacity: 0; width: 270px; height: 66px;" type="file" data-ng-model="vm.fileInput" id="fileInput" data-ng-click="vm.Init()" accept="image/jpeg"/>
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
            <button class="btn btn-primary" data-ng-click="vm.changeToThumbnail()">
                <% trans('front/profile/profile.button_choose_thumbnail') %>
            </button>
        </div>

        <div data-ng-show="vm.isActive('ChangeThumbnail')">
            <div style="float: left">
                <button class="btn btn-primary" data-ng-click="vm.changeToSelectNewPhoto()">
                    <% trans('front/profile/profile.button_upload_new') %>
                </button>
            </div>

            <div style="float: right">
                <button class="btn btn-primary" data-ng-click="vm.upload(vm.myCroppedImage)">
                    <% trans('front/profile/profile.button_save') %>
                </button>
                <button class="btn btn-warning" data-ng-click="vm.cancel()">
                    <% trans('front/profile/profile.button_cancel') %>
                </button>
            </div>
        </div>
        <div data-ng-show="vm.isActive('UploadPhoto')">
            <button class="btn btn-primary" data-ng-click="vm.upload(vm.NewPhotoCroppedImage, vm.NewPhoto)" style="float: left">
                <% trans('front/profile/profile.button_upload') %>
            </button>
            <button class="btn btn-warning" data-ng-click="vm.changeToSelectNewPhoto()" style="float: right">
                <% trans('front/profile/profile.button_back') %>
            </button>
        </div>
    </div>
</script>