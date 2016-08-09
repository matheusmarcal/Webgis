(function () {
    'use strict';

    angular
        .module('layout-header.controller', [])
        .controller('LayoutHeaderController', LayoutHeaderController);

    /** @ngInject */
    function LayoutHeaderController(LayoutService) {

        var vm = this;

        vm.menu = {};

        vm.menu.leftToggle = function(){
            LayoutService.left.toggle();
        };

        vm.menu.rightToggle = function(){
            LayoutService.right.toggle();
        };


    }
})();
