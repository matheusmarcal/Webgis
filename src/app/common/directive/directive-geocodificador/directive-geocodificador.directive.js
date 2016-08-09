(function () {
    'use strict';

    angular
        .module('directive.geocodificador', [])
        .directive('directiveGeocodificador', directiveGeocodificador);

    /** @ngInject */
    function directiveGeocodificador($http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                callback: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/common/directive/directive-geocodificador/directive-geocodificador.tpl.html',
            link: function (scope, element) {

                scope.crud = {};
                scope.command = {};
                scope.source = {};
                scope.interface = {};
                scope.interface.opened = false;

                scope.command.BuscarEnderecos = function (endereco) {
                    var params = {address: endereco, sensor: false};
                    return $http.get(
                        'http://maps.googleapis.com/maps/api/geocode/json',
                        {params: params}
                    ).then(function (response) {
                        scope.source.enderecos = response.data.results;
                    });
                };

                scope.command.EnderecoSelecionado = function (endereco) {
                    scope.callback(endereco);
                };


            }
        }
    }

})();
