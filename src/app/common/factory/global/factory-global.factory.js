(function () {
    'use strict';

    angular
        .module('global.factory', [])
        .factory('GlobalFactory', GlobalFactory);

    /** @ngInject */
    function GlobalFactory() {

        var _factory = function (data) {
            angular.extend(this, data);
        };


        var url = {};
        url.esri = {
            arcgisOnlineService: 'http://services.arcgisonline.com/arcgis/rest/services',
            ibgeService: 'http://mapasinterativos.ibge.gov.br/arcgis/rest/services',
            openGeoService: 'https://geo.rug.nl/arcgis/rest/services'
        };

        _factory.url = {};
        _factory.jsonSuffix = '?f=pjson';

        _factory.url.arcgis = {};
        _factory.url.arcgis.serviceMap = (url.esri.openGeoService);
        _factory.url.arcgis.serviceBaseMap = (url.esri.arcgisOnlineService);

        _factory.url.ObterUrlJson = function (url) {
            return (url + _factory.jsonSuffix);
        };


        return _factory;

    }

})();
