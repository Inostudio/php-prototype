/**
 * Created by user on 21.11.2014.
 */

(function() {
    'use strict';

    angular
        .module('profileApp')
        .controller('NavbarCtrl', NavbarCtrl)
        .controller('ShowCtrl', ShowCtrl)
        .controller('EditPasswordCtrl', EditPasswordCtrl)
        .controller('EditEmailCtrl', EditEmailCtrl)
        .controller('EditPhotoCtrl', EditPhotoCtrl);


    NavbarCtrl.$inject = ['$location'];
    function NavbarCtrl($location){
        var vm = this;

        vm.isActive = isActive;

        ////////////

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
    }

    ShowCtrl.$inject = ['$location', 'Profile', '$modal'];
    function ShowCtrl($location, Profile, $modal) {
        var vm = this;

        vm.alert = undefined;
        vm.editing = false;
        vm.submitted = false;
        vm.exists = true;
        vm.closeAlert = closeAlert;
        vm.edit = edit;
        vm.cancel = cancel;
        vm.apply = apply;
        vm.photo = photo;
        vm.deleteAvatar = deleteAvatar;

        ////////////

        function closeAlert() {
            vm.alert = undefined;
        }

        function edit() {
            vm.temp = {
                first_name: vm.user.first_name,
                last_name: vm.user.last_name,
                phone: vm.user.phone
            };

            vm.editing = true;
        }

        function cancel() {
            vm.editing = false;
            vm.submitted = false;
        }

        function apply(isValid){
            vm.submitted = true;
            if(isValid) {
                var success = function(data) {
                    if(data[0] === true) {
                        vm.user = {
                            first_name: vm.temp.first_name,
                            last_name: vm.temp.last_name,
                            phone: vm.temp.phone
                        }

                        vm.editing = false;

                        vm.alert = { msg: data[1], type: 'success'};
                    } else {
                        vm.alert = { msg: data[1], type: 'danger'};
                    }
                };

                var error = function(data) {
                    vm.alert = { msg: 'Some problems', type: 'danger'};
                };

                Profile.changeProfile(vm.temp, success, error);
            }
        };

        function photo(size) {
            var modalInstance = $modal.open({
                templateUrl: 'editPhoto.html',
                controller: 'EditPhotoCtrl',
                controllerAs: 'vm',
                size: size,
                resolve: {
                    imageUrl: function() {
                        return vm.imageUrl;
                    },
                    exists: function () {
                        return vm.exists;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                vm.image = data.Image;
                vm.exists = true;
                vm.alert = { msg: data.msg, type: 'success'};
            });

        };

        function deleteAvatar() {
            //add confirm
            Profile.deleteImage({}, function(data) {
                vm.exists = false;
                vm.image = data[1];
                if(data[0]) {
                    vm.alert = { msg: data[2], type: 'success'};
                } else {
                    vm.alert = { msg: data[2], type: 'danger'};
                }
                console.log(data);
            });
        }
    }

    EditPasswordCtrl.$inject = ['Profile'];
    function EditPasswordCtrl(Profile) {
        var vm = this;

        vm.alert = undefined;
        vm.closeAlert = closeAlert;
        vm.submitForm = submitForm;
        vm.cleanForm = cleanForm;
        vm.confirm = confirm;

        vm.error = {};
        ////////////

        function closeAlert() {
            vm.alert = undefined;
            vm.error = {};
        }

        function submitForm(isValid) {
            vm.submitted = true;
            if(isValid) {
                var success = function(data) {
                    if (data[0] === true) {
                        vm.alert = { msg: data[1], type: 'success'};
                        vm.cleanForm();
                    } else {
                        vm.error.old_password = data[1]['old_password'] ? data[1]['old_password'][0] : undefined;
                        vm.error.new_password = data[1]['new_password'] ? data[1]['new_password'][0] : undefined;
                        vm.error.new_password_confirmation = data[1]['new_password_confirmation'] ? data[1]['new_password_confirmation'][0] : undefined;
                        vm.alert = data[1]['error'] ? { msg: data[1]['error'], type: 'danger'} : undefined;
                    }
                };

                var error = function(data) {
                    vm.alert = { msg: 'Some problems', type: 'danger'};
                };

                Profile.changePassword(vm.user, success, error);
            }
        }

        function cleanForm() {
            vm.user = {
                old_password: '',
                new_password: '',
                password_confirm: ''
            }

            vm.submitted = false;
        }
        vm.cleanForm();


        function confirm(){
            return (vm.user.new_password === vm.user.password_confirm);
        }
    }

    EditEmailCtrl.$inject = ['Profile'];
    function EditEmailCtrl(Profile) {
        var vm = this;

        vm.alert = undefined;
        vm.closeAlert = closeAlert;
        vm.submitForm = submitForm;
        vm.cleanForm = cleanForm;
        vm.confirm = confirm;
        vm.cleanErrors = cleanErrors;
        vm.change = close;

        vm.error = {};

        ////////////

        function closeAlert() {
            vm.alert = undefined;
        }

        function submitForm(isValid) {
            vm.submitted = true;
            if(isValid) {
                var success = function(data) {
                    console.log(data[1]['old_email']);
                    if (data[0] === true) {
                        vm.alert = { msg: data[1], type: 'success'};
                        vm.cleanForm();
                    } else {
                        vm.error.old_email = data[1]['old_email'] ? data[1]['old_email'][0] : undefined;
                        vm.error.new_email = data[1]['new_email'] ? data[1]['new_email'][0] : undefined;
                        vm.error.password = data[1]['password'] ? data[1]['password'][0] : undefined;
                        //vm.alert = { msg: data[1], type: 'danger'};
                    }
                };

                var error = function(data) {
                    vm.alert = { msg: 'Some problems', type: 'danger'};
                };

                Profile.changeEmail(vm.user, success, error);
            }
        }

        function cleanErrors(field) {
            vm.error[field] = undefined;
        }


        function cleanForm() {
            vm.user = {
                old_email: '',
                new_email: '',
                password: ''
            }

            vm.submitted = false;
        }
        vm.cleanForm();

        function confirm(){
            return (vm.user.new_password === vm.user.password_confirm);
        }

        function close(field) {
            closeAlert();
            cleanErrors(field);
        }

    }

    EditPhotoCtrl.$inject = ['$scope', '$modalInstance', 'Profile', 'imageUrl', 'exists', 'PhotoResize'];
    function EditPhotoCtrl($scope, $modalInstance, Profile, imageUrl, exists, PhotoResize) {
        var vm = this;

        vm.initInterface = false;
        vm.select = 'ChangeThumbnail';
        vm.myImage = "";
        vm.myCroppedImage = "";
        vm.NewPhoto = "";
        vm.NewPhotoCroppedImage = "";
        vm.init = false;

        //organization of transitions
        vm.changeToUploadNewPhoto = changeToUploadNewPhoto;
        vm.changeToSelectNewPhoto = changeToSelectNewPhoto;
        vm.changeToThumbnail = changeToThumbnail;
        vm.Init = Init;
        vm.isActive = isActive;
        vm.cancel = cancel;
        vm.upload = upload;

        $scope.$on('$dropletReady', dropletReady);
        vm.onDragLeave = dragLeave;
        $scope.$watch('interface.getFiles(interface.FILE_TYPES.VALID)', watchFiles, true);

        ////////////

        function addImage(file) {
            if(file.size/1024/1024 > 5) {
                console.log("The big size of image");
            } else if(file.type !== "image/jpeg") {
                console.log("The file must be extension only 'image/jpeg'");
            } else {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var img = new Image;

                    img.onload = function() {
                        $scope.$apply(function(){
                            PhotoResize.init(832, 564, img.width, img.height);

                            vm.NewPhotoImageStyle = {
                                width: PhotoResize.width() + 'px',
                                height: PhotoResize.height() + 'px'
                            }

                            vm.NewPhoto = evt.target.result;

                            vm.changeToUploadNewPhoto();
                        });

                    };

                    img.src = reader.result;
                };
                reader.readAsDataURL(file);
            }
        }

        function dropletReady() {
            $scope.interface.allowedExtensions(['jpg']);
            $scope.initInterface = true;
        }

        function dragLeave(e){
            if (e.dragItem)
                alert("Item: " + e.dragItem.text + " is dragged at position: { x: " + e.mousePos.x + ", y: " + e.mousePos.y + " }");
        }

        function watchFiles() {
            if($scope.initInterface) {
                var models = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);
                var lenght = models.length;
                if(lenght !==0) {
                    vm.NewPhoto = '';
                    addImage($scope.interface.getFiles($scope.interface.FILE_TYPES.VALID)[lenght-1].file);
                    for(var i = models.length - 1; i >= 0; i --) {
                        models[i].deleteFile();
                    }
                }
            }
        }

        function changeToUploadNewPhoto() {
            vm.select = 'UploadPhoto';
        }

        function changeToSelectNewPhoto() {
            vm.select = 'NewPhoto';

            //clear canvas when change view
            vm.NewPhoto = '';
        }

        function changeToThumbnail() {
            vm.select = 'ChangeThumbnail';
        }

        function isActive(value) {
            return value == vm.select;
        }

        function Init() {
            if(!vm.init) {
                vm.init = true;
                angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
            }
        }

        function handleFileSelect(evt) {
            addImage(evt.currentTarget.files[0]);

            //clear input value
            angular.element(document.querySelector('#fileInput')).val(null);
        }

        if(exists) {
            var img = new Image;
            img.onload = function() {
                vm.myImage= this.src;

                $scope.$apply(function($scope){
                    PhotoResize.init(832, 564, img.width, img.height);

                    $scope.ImageStyle = {
                        width: PhotoResize.width() + 'px',
                        height: PhotoResize.height() + 'px'
                    }
                });

            };
            img.src = imageUrl;
        } else {
            vm.select = 'NewPhoto';
            vm.new = true;
        }

        function cancel() {
            $modalInstance.dismiss();
        }

        function upload(CroppedImage, FullImage) {

            var message = "";

            var successUploadCropped = function(data) {
                if (data[0] === true) {
                    //Profile.uploadCropped(CroppedImage, success, error);
                } else {
                    //console.log(data);//vm.alert = { msg: data[1], type: 'danger'};
                }
                $modalInstance.close({
                    Image: CroppedImage,
                    msg: FullImage !== undefined ? message : data[1]});
            };

            var successUploadImage = function(data) {

                if (data[0] === true) {
                    message = data[1];
                    Profile.uploadCropped(CroppedImage, successUploadCropped, error);
                } else {
                    //console.log(data);//vm.alert = { msg: data[1], type: 'danger'};
                }

                /*$modalInstance.close({
                    Image: CroppedImage,
                    msg: data[1]});*/
            };

            var error = function(data) {
                console.log(data);//vm.alert = { msg: 'Some problems', type: 'danger'};
            };

            if(FullImage !== undefined) {
                Profile.uploadImage(FullImage, successUploadImage, error);
            } else {
                Profile.uploadCropped(CroppedImage, successUploadCropped, error);
            }

        }
    }
})();
