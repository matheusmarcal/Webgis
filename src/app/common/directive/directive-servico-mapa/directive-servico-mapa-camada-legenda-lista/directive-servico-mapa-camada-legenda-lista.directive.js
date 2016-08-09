(function () {
    'use strict';

    angular
        .module('directive.servico.mapa.camada.legenda.lista', [])
        .directive('directiveServicoMapaCamadaLegendaLista', directiveServicoMapaCamadaLegendaLista);

    /** @ngInject */
    function directiveServicoMapaCamadaLegendaLista() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                source: '=',
                camada: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/directive-servico-mapa/directive-servico-mapa-camada-legenda-lista/directive-servico-mapa-camada-legenda-lista.tpl.html',
            link: function (scope) {

                scope.command = {};
                scope.interface = {};
                scope.interface.opened = false;

            }
        }
    }

})();
