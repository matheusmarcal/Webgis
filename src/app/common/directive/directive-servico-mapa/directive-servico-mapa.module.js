(function () {
    'use strict';

    angular
        .module('directive.servico.mapa',
            [
                'directive.servico.mapa.lista',
                'directive.servico.mapa.camada.lista',
                'directive.servico.mapa.camada.legenda.lista',
            ]
        );

})();
