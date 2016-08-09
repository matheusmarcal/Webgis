(function () {
    'use strict';

    angular
        .module('geo-utils.factory', [])
        .factory('GeoUtilsFactory', GeoUtilsFactory);

    /** @ngInject */
    function GeoUtilsFactory($q, $http, toastr, GlobalFactory) {

        var _factory = function (data) {
            angular.extend(this, data);
        };

        _factory.ObterGeoEnderecoPorIP = function (ip) {
            var deferred = $q.defer();
            var url = "http://freegeoip.net/json/" + ip;
            $http.get("http://freegeoip.net/json/" + ip).then(function (res) {
                deferred.resolve(res.data);
            });
            return deferred.promise;
        };

        return _factory;

    }

})();
