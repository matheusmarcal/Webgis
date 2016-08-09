(function () {
    'use strict';

    angular.module('layout-left.service', [])
        .service('LayoutLeftService', LayoutLeftService);

    /** @ngInject */
    function LayoutLeftService(ViewMapService) {

        var _service = this;
        _service.interface = {
            viewmap: {
                servicosMapa: true
            }
        };

        return _service;


    }


})();
