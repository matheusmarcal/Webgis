(function () {
    'use strict';

    angular
        .module('devit-webgis',
            [
                /*ANGULAR MODULES*/
                'ngAnimate',
                'ngCookies',
                'ngTouch',
                'ngSanitize',
                'ngMessages',
                'ngAria',

                /*THYRD PARTIE MODULES*/
                'ui.router',
                'ui.bootstrap',
                'ui.select',
                'ui-leaflet',
                'ui.checkbox',

                'wt.responsive',
                'LocalStorageModule',
                'toastr',

                /*APPLICATION MODULES*/
                'common',
                'components',
                'view'

            ]
        );

})();
