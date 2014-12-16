/**
 * Created by user on 21.11.2014.
 */

var profileControllers = angular.module('profileControllers', ['ngDroplet'],  function() {});//.config(['flowFactoryProvider', function (flowFactoryProvider, $scope) {
//flowFactoryProvider.factory = fustyFlowFactory;
//    flowFactoryProvider.on('catchAll', function (event) {
//        console.log(event);
//    });
    /*flowFactoryProvider.on('catchAll', function (event) {
        //console.log('catchAll', arguments);
    });*/
//}]);;

//$scope.$addFile('flow::filesSubmitted', function (file) {
//products.save($scope.product)
    /*.$promise.then(function(result) {
        $scope.product = result;
        if ($scope.product.id) {
            $flow.opts.target = apiUrl + '/products/' + $scope.product.id + '/images';
            $flow.upload();
        }
    });*/
//});

profileControllers.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

profileControllers.controller('ShowCtrl', ['$scope', '$location', 'Profile', '$modal', function($scope, $location, Profile, $modal) {

    $scope.alert = undefined;
    $scope.closeAlert = function() {
        $scope.alert = undefined;
    };

    $scope.editing = false;
    $scope.edit = function() {
        $scope.temp = {
            first_name: $scope.user.first_name,
            last_name: $scope.user.last_name,
            phone: $scope.user.phone
        };

        $scope.editing = true;
    };

    $scope.cancel = function() {
        $scope.editing = false;
        $scope.submitted = false;
    };

    $scope.submitted = false;

    $scope.apply = function(isValid){
        $scope.submitted = true;
        if(isValid) {
            var success = function(data) {
                if(data[0] === true) {
                    $scope.user = {
                        first_name: $scope.temp.first_name,
                        last_name: $scope.temp.last_name,
                        phone: $scope.temp.phone
                    }

                    $scope.editing = false;

                    $scope.alert = { msg: data[1], type: 'success'};
                } else {
                    $scope.alert = { msg: data[1], type: 'danger'};
                }
            };

            var error = function(data) {
                $scope.alert = { msg: 'Some problems', type: 'danger'};
            };

            Profile.changeProfile($scope.temp, success, error);
        }
    };

    $scope.photo = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'editPhoto.html',
            controller: 'EditPhotoCtrl',
            size: size,
            resolve: {
                imageUrl: function() {
                    return $scope.imageUrl;
                },
                exists: function () {
                    return $scope.exists;
                }
            }
        });

        modalInstance.result.then(function (Image) {
            $scope.image = Image;
            $scope.exists = true;
            $scope.alert = { msg: 'The thumbnail successfully changed ', type: 'success'};
        });

    };
}]);

profileControllers.controller('EditCtrl', ['$scope', 'Profile', function($scope, Profile) {
    $scope.alert = undefined;

    $scope.closeAlert = function() {
        $scope.alert = undefined;
    };

    $scope.submitForm = function (isValid) {
        $scope.submitted = true;
        if(isValid) {
            var success = function(data) {
                if (data[0] === true) {
                    $scope.alert = { msg: data[1], type: 'success'};
                    $scope.cleareForm();
                } else {
                    $scope.alert = { msg: data[1], type: 'danger'};
                }
            };

            var error = function(data) {
                $scope.alert = { msg: 'Some problems', type: 'danger'};
            };

            Profile.changePassword($scope.user, success, error);
        }
    }

    $scope.cleareForm = function() {
        $scope.user = {
            old_password: '',
            new_password: '',
            password_confirm: ''
        }

        $scope.submitted = false;
    };
    $scope.cleareForm();

    $scope.confirm = function(){
        return ($scope.user.new_password === $scope.user.password_confirm);
    };
}]);

profileControllers.controller('EditPhotoCtrl', ['$scope', '$modalInstance', 'Profile', 'imageUrl', 'exists', function ($scope, $modalInstance, Profile, imageUrl, exists) {

    $scope.initInterface = false;

    var addImage = function(file) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){

            });
            var img = new Image;

            img.onload = function() {
                var ratio = img.height / img.width;

                $scope.$apply(function($scope){
                    var height = 0, width = 0, maxHeight = 564, maxWidth = 832;

                    if(img.height > maxHeight && img.width > maxWidth) {
                        var d1 = img.height / maxHeight;
                        var d2 = img.width / maxWidth;
                        if(d1 > d2) {
                            height = maxHeight;
                            width = img.width / d1;
                        } else {
                            width = maxWidth;
                            height = img.height / d2;
                        }

                    }
                    else if (img.height > maxHeight && img.width < maxWidth) {
                        width = img.width / ratio;
                        height = maxHeight;
                    }
                    else if (img.height < maxHeight && img.width > maxWidth) {
                        width = maxWidth;
                        height = img.height / ratio;
                    }
                    else {
                        height = img.height;
                        width = img.width;
                    }

                    $scope.NewPhotoImageStyle = {
                        width: width + 'px',
                        height: height + 'px'
                    }


                    $scope.NewPhoto = evt.target.result;

                    $scope.changeToUploadNewPhoto();
                });

            };

            img.src = reader.result;
        };
        reader.readAsDataURL(file);

    }

    $scope.$on('$dropletReady', function whenDropletReady() {

        $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif', 'svg', 'torrent']);
        $scope.initInterface = true;
    });

    $scope.$on('$dropletFileAdded', function whenDropletReady() {
        /*console.log($scope.interface.getFiles($scope.interface.FILE_TYPES.VALID));
        console.log($scope.interface);
        var lenght = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID).length;
        if(lenght !==0) {
            addImage($scope.interface.getFiles($scope.interface.FILE_TYPES.VALID)[lenght-1].file);
        }*/
    });


    /*$scope.$on('$dropletSuccess', function whenDropletReady() {
        console.log('success');
        console.log($scope.interface.getFiles($scope.interface.FILE_TYPES.VALID));
        console.log($scope.interface);
        var lenght = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID).length;
        if(lenght !==0) {
            addImage($scope.interface.getFiles($scope.interface.FILE_TYPES.VALID)[lenght-1].file);
        }
    });*/

    $scope.onDragLeave = function(e){
        console.log('log');
        if (e.dragItem)
            alert("Item: " + e.dragItem.text + " is dragged at position: { x: " + e.mousePos.x + ", y: " + e.mousePos.y + " }");
    }

    $scope.$watch('interface.getFiles(interface.FILE_TYPES.VALID)', function() {
        console.log('watch');
        if($scope.initInterface) {
            var models = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);
            var lenght = models.length;
            if(lenght !==0) {
                $scope.NewPhoto = '';
                addImage($scope.interface.getFiles($scope.interface.FILE_TYPES.VALID)[lenght-1].file);
                for(var i = models.length - 1; i >= 0; i --) {
                    models[i].deleteFile();
                }
            }
        }

    }, true);

    //$scope.pic = "";
    //organization of transitions
    $scope.select = 'ChangeThumbnail';

    $scope.changeToUploadNewPhoto = function() {
        $scope.select = 'UploadPhoto';
    }

    $scope.changeToSelectNewPhoto = function() {
        $scope.select = 'NewPhoto';

        //clear canvas when change view
        $scope.NewPhoto = '';
    }

    $scope.changeToThumbnail = function() {
        $scope.select = 'ChangeThumbnail';
    }

    $scope.isActive = function(value) {
        return value == $scope.select;
    };

    $scope.myImage = "";
    $scope.myCroppedImage = "";

    $scope.NewPhoto = "";
    $scope.NewPhotoCroppedImage = "";


    $scope.init = false;
    $scope.Init = function() {
        if(!$scope.init) {
            $scope.init = true;
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }
    }



    var handleFileSelect=function(evt) {
        addImage(evt.currentTarget.files[0]);

        //clear input value
        angular.element(document.querySelector('#fileInput')).val(null);
    };


    if(exists) {
        var img = new Image;
        img.onload = function() {
            $scope.myImage= this.src;
            var ratio = img.height / img.width;

            $scope.$apply(function($scope){
                var height = 0, width = 0, maxHeight = 564, maxWidth = 832;

                if(img.height > maxHeight && img.width > maxWidth) {
                    var d = img.height / maxHeight;
                    height = maxHeight;
                    width = img.width / d;
                }
                else if (img.height > maxHeight && img.width < maxWidth) {
                    width = img.width / ratio;
                    height = maxHeight;
                }
                else if (img.height < maxHeight && img.width > maxWidth) {
                    width = maxWidth;
                    height = img.height / ratio;
                }
                else {
                    height = img.height;
                    width = img.width;
                }

                $scope.ImageStyle = {
                    width: width + 'px',
                    height: height + 'px'
                }
            });

        };
        img.src = imageUrl;
    } else {
        $scope.select = 'NewPhoto';
        $scope.new = true;
    }


    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    //Upload data
    $scope.upload = function(CroppedImage, FullImage) {

        var success = function(data) {
            if (data[0] === true) {
                //console.log(data);//$scope.alert = { msg: data[1], type: 'success'};
            } else {
                //console.log(data);//$scope.alert = { msg: data[1], type: 'danger'};
            }
            $modalInstance.close(CroppedImage);
        };

        var error = function(data) {
            console.log(data);//$scope.alert = { msg: 'Some problems', type: 'danger'};
        };

        if(FullImage !== undefined) {
            Profile.uploadImage(FullImage, success, error);
        }
        Profile.uploadCropped(CroppedImage, success, error);
    }


}]);

