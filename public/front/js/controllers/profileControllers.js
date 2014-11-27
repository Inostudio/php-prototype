/**
 * Created by user on 21.11.2014.
 */

var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

profileControllers.controller('ShowCtrl', ['$scope', '$location', 'Profile', function($scope, $location, Profile) {

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

profileControllers.controller('PhotoCtrl', ['$scope', '$modal', function($scope, $modal) {


    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });

    };
}]);

profileControllers.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'Profile', function ($scope, $modalInstance, Profile) {
    $scope.myImage='';
    $scope.myCroppedImage='';

    $scope.uploaded = false;

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
                $scope.uploaded = true;
            });
            var img = new Image;

            img.onload = function() {
                var ratio = img.height / img.width;

                $scope.$apply(function($scope){
                    var height = 0, width = 0, maxHeight = 330, maxWidth = 450;

                    if(img.height > maxHeight && img.width > maxWidth) {
                        var d = img.height / maxHeight;
                        height = maxHeight;
                        width = img.width / d;
                    }

                    $scope.ImageStyle = {
                        width: width + 'px',
                        height: height + 'px'
                    }
                });

            };

            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };



    $scope.ImageStyle = {
        width: '0px',
        height: '0px'
    }

    $scope.ok = function () {
        //$modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.init = false;
    $scope.Init = function() {
        if(!$scope.init) {
            $scope.init = true;
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }
    }

    $scope.upload = function() {
        var success = function(data) {
            if (data[0] === true) {
                console.log(data);//$scope.alert = { msg: data[1], type: 'success'};
            } else {
                console.log(data);//$scope.alert = { msg: data[1], type: 'danger'};
            }
        };

        var error = function(data) {
            console.log(data);//$scope.alert = { msg: 'Some problems', type: 'danger'};
        };

        Profile.uploadCropped($scope.myCroppedImage, success, error);
        Profile.uploadImage($scope.myImage, success, error);
    }
}]);