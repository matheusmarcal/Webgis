(function () {
    'use strict';

    angular
        .module('layout-left.controller', [])
        .controller('LayoutLeftController', LayoutLeftController);

    /** @ngInject */
    function LayoutLeftController(LayoutLeftService, ViewMapService) {

        var vm = this;
        vm.source = {};
        vm.source.servicosMapa = ViewMapService.ObterArcgisOverlays();


    }
})();
