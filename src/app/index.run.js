(function () {
    'use strict';

    angular
        .module('devit-webgis')
        .run(RouteManager)
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, CredencialService, LayoutService, toastr) {
        CredencialService.ObterLocalStorage();
        LayoutService.Iniciar();
        $rootScope.toastr = toastr;
    }

    /** @ngInject */
    function RouteManager($state, $rootScope, CredencialService, LayoutService) {

        var _allLoaded = false;

        setInterval(function () {
            if (!CredencialService.EstaAutorizado() && $state.current.name) {
                $state.go('credencial.autenticacao');
            }
        }, 60000);

        var _intervalTudoPronto = setInterval(function () {
            if (LayoutService.estaPronto()) {
                _allLoaded = true;
                clearInterval(_intervalTudoPronto);
            }
        }, 300);

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            LayoutService.loader.show();
            if (!CredencialService.EstaAutorizado() && toState.name && toState.name != 'credencial.autenticacao') {
                event.preventDefault();
                $state.go('credencial.autenticacao');
            }
            if (!_allLoaded) {
                event.preventDefault();
                var intervalAllLoaded = setInterval(function () {
                    if (_allLoaded) {
                        $state.go(toState.name);
                        clearInterval(intervalAllLoaded);
                    }
                },300);
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            LayoutService.loader.hide();
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.error(error);
        });

    }


})();
