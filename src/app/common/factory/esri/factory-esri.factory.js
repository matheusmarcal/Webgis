(function () {
    'use strict';

    angular
        .module('esri.factory', [])
        .factory('EsriFactory', EsriFactory);

    /** @ngInject */
    function EsriFactory($q, $http, toastr, GlobalFactory) {

        var _factory = function (data) {
            angular.extend(this, data);
        };


        var _parameters = {};
        _parameters.serviceMap = GlobalFactory.url.arcgis.serviceMap;
        _parameters.serviceBaseMap = GlobalFactory.url.arcgis.serviceBaseMap;

        _factory.ObterDetalhesServico = function (service, params) {
            params.countServiceReady++;
            $http.get(GlobalFactory.url.ObterUrlJson(service.url)).then(function (response) {
                service.esri.properties = response.data;
                params.countServiceReady--;
            });
        };

        _factory.ObterLegendasServico = function (service, params) {
            params.countServiceReady++;
            $http.get(GlobalFactory.url.ObterUrlJson(service.url + '/Legend')).then(function (response) {
                service.esri.legends = response.data;
                params.countServiceReady--;
            });
        };

        _factory.ObterServico = function (url, params, serverUrl) {
            params.countServiceReady++;
            $http.get(GlobalFactory.url.ObterUrlJson(url)).then(function (response) {
                angular.element(response.data.services).each(function (iS, service) {
                    var _service = {};
                    _service.url = serverUrl ? (serverUrl + '/' + service.name + '/' + service.type) : (url + '/' + service.name + '/' + service.type);
                    _service.name = service.name;
                    _service.type = service.type;
                    if (service.type.toLowerCase() == 'mapserver' || service.type.toLowerCase() == 'featurelayer') {
                        _service.esri = {};
                        _factory.ObterLegendasServico(_service, params);
                        _factory.ObterDetalhesServico(_service, params);
                        params.services.push(_service);
                    }
                });
                params.countServiceReady--;
            }, function (erro) {
                toastr.error('Não foi possível se conectar ao servidor.', 'IBGE');
                params.countServiceReady--;
            });

        };

        _factory.ObterServicos = function (url) {
            var deferred = $q.defer();
            var _params = {};
            _params.services = [];
            _params.countServiceReady = 0;
            $http.get(GlobalFactory.url.ObterUrlJson(url)).then(function (response) {
                if (response.data.folders) {
                    angular.element(response.data.folders).each(function (iF, folder) {
                        _factory.ObterServico((url + '/' + folder), _params, url);
                    });
                }
                angular.element(response.data.services).each(function (iS, service) {
                    var _service = {};
                    _service.url = url + '/' + service.name + '/' + service.type;
                    _service.name = service.name;
                    _service.type = service.type;
                    if (service.type.toLowerCase() == 'mapserver' || service.type.toLowerCase() == 'featurelayer') {
                        _service.esri = {};
                        _factory.ObterLegendasServico(_service, _params);
                        _factory.ObterDetalhesServico(_service, _params);
                        _params.services.push(_service);
                    }
                });
            }, function (erro) {
                toastr.error('Não foi possível se conectar ao servidor.', 'IBGE');
                deferred.resolve([]);
            });
            var _readyVerifyer = setInterval(function () {
                if (_params.countServiceReady == 0) {
                    clearInterval(_readyVerifyer);
                    deferred.resolve(_params.services);
                }
            }, 3000);
            return deferred.promise;
        };

        _factory.ObterServicosMapa = function () {
            return _factory.ObterServicos(_parameters.serviceMap);
        };

        _factory.ObterServicosMapasBase = function () {

            var deferred = $q.defer();
            var _params = {};
            _params.services = [];
            _params.countServiceReady = 0;
            _factory.ObterServico(_parameters.serviceBaseMap, _params);

            var _readyVerifyer = setInterval(function () {
                if (_params.countServiceReady == 0) {
                    clearInterval(_readyVerifyer);
                    deferred.resolve(_params.services);
                }
            }, 3000);

            return deferred.promise;
        };


        return _factory;

    }

})();
