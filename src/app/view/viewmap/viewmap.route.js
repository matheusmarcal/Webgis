(function () {
    'use strict';

    angular
        .module('viewmap')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.viewmap', {
                url: '/mapa',
                views: {
                    '@': {

                        templateUrl: 'app/view/viewmap/viewmap.tpl.html',
                        controller: 'ViewMapController',
                        controllerAs: 'vm',
                        resolve: {
                            esriServicosMapa: function (EsriFactory) {
                                return EsriFactory.ObterServicosMapa();
                            },
                            esriSericosMapaBase: function (EsriFactory) {
                                return EsriFactory.ObterServicosMapasBase();
                            },
                            geoEnderecoIP: function(GeoUtilsFactory){
                                return GeoUtilsFactory.ObterGeoEnderecoPorIP("");
                            }
                        }
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }

})();
