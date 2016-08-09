(function () {
    'use strict';

    angular
        .module('layout',
            [
                'layout.service',
                'layout-header.controller',
                'layout-left.service',
                'layout-left.controller',
                'layout-right.controller'
            ]
        );

})();
