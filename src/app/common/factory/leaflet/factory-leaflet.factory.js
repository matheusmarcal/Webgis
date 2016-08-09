(function () {
    'use strict';

    angular
        .module('leaflet.factory', [])
        .factory('LeafletFactory', LeafletFactory);

    /** @ngInject */
    function LeafletFactory() {

        var _factory = function (data) {
            angular.extend(this, data);
        };


        _factory.esri = {};
        _factory.esri.ConverterServicoMapaParaCamada = function (servicoMapa) {
            var camada = {};
            camada.name = servicoMapa.name.replace(/\//g, '_').replace(/-/g, '_').toUpperCase();
            camada.url = servicoMapa.url;
            camada.visible = false;
            camada.esri = {};
            camada.esri.legends = servicoMapa.esri.legends;
            camada.esri.properties = servicoMapa.esri.properties;
            camada.layerOptions = {
                layers: [],
                opacity: 0.9,
                attribution: "Copyright:© 2014 Esri, FAO, NOAA"
            };
            if (servicoMapa.type.toLowerCase() == 'mapserver') {
                camada.type = "agsDynamic";
            }
            if (servicoMapa.type.toLowerCase() == 'featurelayer') {
                camada.type = "agsFeature";
            }
            angular.element(servicoMapa.esri.properties.layers).each(function (iL, layer) {
                camada.visible = false;
                camada.layerOptions.layers.push(layer.id);
            });
            return camada;
        };
        _factory.esri.ConverterServicosMapaParaCamadas = function (servicosMapa) {
            var camadas = [];
            angular.element(servicosMapa).each(function (iO, servicoMapa) {
                var _overlay = _factory.esri.ConverterServicoMapaParaCamada(servicoMapa);
                camadas.push(_overlay);
            });
            return camadas;
        };

        return _factory;

    }

})();
