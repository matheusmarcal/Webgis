(function () {
    'use strict';

    angular
        .module('directive.servico.mapa.camada.lista', [])
        .directive('directiveServicoMapaCamadaLista', directiveServicoMapaCamadaLista);

    /** @ngInject */
    function directiveServicoMapaCamadaLista() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                source: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/directive-servico-mapa/directive-servico-mapa-camada-lista/directive-servico-mapa-camada-lista.tpl.html',
            link: function (scope, element) {

                scope.command = {};
                scope.interface = {};
                scope.interface.opened = false;

                scope.command.DefinirVisibilidade = function (source, camada) {

                    if (camada.visible) {
                        source.layerOptions.layers.push(camada.id);
                    }
                    else if (!camada.visible) {
                        source.layerOptions.layers.splice(source.layerOptions.layers.indexOf(camada.id), 1);
                    }

                    angular.extend(source.layerOptions, {
                        layers: source.layerOptions.layers
                    });

                    console.log(source, camada);

                }

            }
        }
    }

})();
