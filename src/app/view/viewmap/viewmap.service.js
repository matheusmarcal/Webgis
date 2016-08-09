(function () {
    'use strict';

    angular.module('viewmap.service', [])
        .service('ViewMapService', ViewMapService);

    /** @ngInject */
    function ViewMapService() {

        var _service = this;

        var _sourceArcgisOverlays = [];
        _service.AdicionarOverlayers = function (vetor) {
            angular.element(vetor).each(function (iO, overlay) {
                _sourceArcgisOverlays.push(overlay);
            });
        };

        _service.ObterArcgisOverlays = function () {
            return _sourceArcgisOverlays;
        }

    }


})();
