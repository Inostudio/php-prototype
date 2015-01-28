/**
 * Created by user on 21.11.2014.
 */

(function () {
    'use strict';

    angular
        .module('profileApp')
        .factory('Profile', Profile)
        .factory('PhotoResize', Photo);

    Profile.$inject = ['$http'];
    function Profile($http) {
        var service = {
            changeProfile: changeProfile,
            changePassword: changePassword,
            changeEmail: changeEmail,
            uploadCropped: uploadCropped,
            uploadImage: uploadImage
        }

        return service;

        ////////////

        function changeProfile(data, success, error) {
            $http({
                url: '/profile/change-profile',
                method: 'POST',
                data: JSON.stringify({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone: data.phone
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }

        function changePassword(data, success, error) {
            $http({
                url: '/profile/change-password',
                method: 'POST',
                data: JSON.stringify({
                    old_password: data.old_password,
                    new_password: data.new_password,
                    new_password_confirmation: data.password_confirm
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }

        function changeEmail(data, success, error) {
            $http({
                url: '/profile/change-email',
                method: 'POST',
                data: JSON.stringify({
                    old_email: data.old_email,
                    new_email: data.new_email,
                    password: data.password
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }

        function uploadCropped(data, success, error) {
            $http({
                url: '/profile/upload-cropped',
                method: 'POST',
                data: JSON.stringify({
                    croppedImage: data
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }

        function uploadImage(data, success, error) {
            $http({
                url: '/profile/upload-image',
                method: 'POST',
                data: JSON.stringify({
                    sourceImage: data
                }),
                headers: {'Content-Type': 'application/json'}
            })
                .success(success)
                .error(error);
        }
    }

    function Photo() {
        var service = {
            init: init,
            width: getWidth,
            height: getHeight
        }
        var width = 0,
            height = 0;

        return service;

        ////////////

        function init(maxWidth, maxHeight, currentW, currentH) {
            var ratio = currentH / currentW;

            if(currentH > maxHeight && currentW > maxWidth) {
                var d1 = currentH / maxHeight;
                var d2 = currentW / maxWidth;
                if(d1 > d2) {
                    height = maxHeight;
                    width = currentW / d1;
                } else {
                    width = maxWidth;
                    height = currentH / d2;
                }

            }
            else if (currentH > maxHeight && currentW < maxWidth) {
                width = currentW / ratio;
                height = maxHeight;
            }
            else if (currentH < maxHeight && currentW > maxWidth) {
                width = maxWidth;
                height = currentH / ratio;
            }
            else {
                height = currentH;
                width = currentW;
            }
        }

        function getWidth() {
            return width;
        }

        function getHeight() {
            return height;
        }
    }
})();