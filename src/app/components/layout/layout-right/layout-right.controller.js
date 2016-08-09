(function () {
    'use strict';

    angular
        .module('layout-right.controller', [])
        .controller('LayoutRightController', LayoutRightController);

    /** @ngInject */
    function LayoutRightController($state, CredencialFactory,LayoutService) {

        var vm = this;
        vm.source = {};

        vm.command = {};
        vm.command.LogOut = function () {
            CredencialFactory.LogOut();
            LayoutService.HideAll();
            $state.go('credencial.autenticacao');
        }


    }
})();
