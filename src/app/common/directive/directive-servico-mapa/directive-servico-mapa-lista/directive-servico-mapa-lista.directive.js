(function () {
    'use strict';

    angular
        .module('directive.servico.mapa.lista', [])
        .directive('directiveServicoMapaLista', directiveServicoMapaLista);

    /** @ngInject */
    function directiveServicoMapaLista() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                source: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/directive-servico-mapa/directive-servico-mapa-lista/directive-servico-mapa-lista.tpl.html',
            link: function (scope, element) {

                scope.command = {};
                scope.interface = {};
                scope.interface.opened = false;


            }
        }
    }

})();
