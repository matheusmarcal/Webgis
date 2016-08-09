(function () {
    'use strict';

    angular
        .module('devit-webgis')
        .factory('AppInterceptor', AppInterceptor)
        .config(config);

    /** @ngInject */
    function AppInterceptor($q, $rootScope) {

        var toastr = $rootScope.toastr;
        var toastInterval = setInterval(function () {
            if (toastr) {
                clearInterval(toastInterval);
            }
            toastr = $rootScope.toastr;
        });
        return {
            request: function (res) {
                return res;
            },

            requestError: function (res) {
                return $q.reject(res);
            },

            response: function (res) {
                var _res = res;
                if(res.data) {
                    if (res.data.Data) {
                        _res = res.data.Data;
                    }
                    if (res.data.ShowToast) {
                        angular.element(res.data.Messages).each(function (iM, message) {
                            toastr.success(message, res.data.Title);
                        });
                    }
                }
                return _res;
            },

            responseError: function (res) {
                var _res = res;
                if(res.data) {
                    if (res.data.Data) {
                        _res = res.data.Data;
                    }
                    if (res.data.ShowToast) {
                        angular.element(res.data.Messages).each(function (iM, message) {
                            toastr.error(message, res.data.Title);
                        });
                    }
                    if (res.data.Error) {
                        console.error(res.data.Error.Message, res.data.Error.Message);
                    }
                }
                return $q.reject(_res);
            }
        }
    }

    /** @ngInject */
    function config($logProvider, $httpProvider, localStorageServiceProvider, toastrConfig) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = false;
        toastrConfig.progressBar = true;

        // Declare the Interceptor
        $httpProvider.interceptors.push('AppInterceptor');

        // Configure LocalStorageService
        localStorageServiceProvider
            .setPrefix('clinical_solution')
            .setStorageType('localStorage')
            .setNotify(true, true)
    }

})();
