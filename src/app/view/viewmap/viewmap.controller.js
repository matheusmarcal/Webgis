(function () {
    'use strict';

    angular
        .module('viewmap.controller', [])
        .controller('ViewMapController', ViewMapController);

    /** @ngInject */
    function ViewMapController($scope, LeafletFactory, ViewMapService, DesenhoService, esriServicosMapa, esriSericosMapaBase, geoEnderecoIP, leafletData, leafletDrawEvents) {
        var vm = this;
        vm.source = {};
        vm.command = {};

        vm.mapDrawItens = new L.FeatureGroup();

        vm.mapEvents = {};
        vm.mapCenter = {zoom: 9, lat: geoEnderecoIP.latitude, lng: geoEnderecoIP.longitude};
        vm.mapMarkers = {
            geolocalizador: {
                lat: geoEnderecoIP.latitude,
                lng: geoEnderecoIP.longitude,
                focus: true,
                message: "Geolocalizador",
                draggable: false
            }
        };
        vm.mapPaths = {};

        vm.mapControls = {};
        vm.ConfigurarMiniMapa = function () {
            leafletData.getMap().then(function () {
                angular.extend(vm.mapControls, {
                    minimap: {
                        type: 'minimap',
                        layer: {
                            name: 'OpenStreetMap',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            type: 'xyz'
                        },
                        toggleDisplay: true
                    }
                });

            });
        };
        vm.ConfigurarMiniMapa();

        /*Configuracao Overlays e Baselayers*/
        vm.mapLayers = {overlays: {}, baselayers: {}};
        vm.sourceArcgisLayers = {overlays: [], baselayers: []};

        vm.BuscarOverlays = function () {
            vm.sourceArcgisLayers.overlays = LeafletFactory.esri.ConverterServicosMapaParaCamadas(esriServicosMapa);
            vm.sourceArcgisLayers.overlays.splice(25, vm.sourceArcgisLayers.overlays.length);
            ViewMapService.AdicionarOverlayers(vm.sourceArcgisLayers.overlays);
            angular.element(vm.sourceArcgisLayers.overlays).each(function (iO, overlay) {
                vm.mapLayers.overlays[overlay.name] = overlay;
            });
        };
        vm.BuscarOverlays();

        vm.BuscarBaseLayers = function () {
            vm.sourceArcgisLayers.baselayers = LeafletFactory.esri.ConverterServicosMapaParaCamadas(esriSericosMapaBase);
            vm.mapLayers.baselayers.xyz = {
                name: 'OPEN_STREET_MAPS (XYZ)',
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz',
                visible: true
            };
            angular.element(vm.sourceArcgisLayers.baselayers).each(function (iO, overlay) {
                vm.mapLayers.baselayers[overlay.name] = overlay;
            });
        };
        vm.BuscarBaseLayers();
        /*Fim Configuracao Overlays e Baselayers*/

        vm.ConfigurarEventos = function () {
            $scope.$on('leafletDirectiveMap.click', function (event, args) {
                var latlng = args.leafletEvent.latlng;
                if (vm.viewInterface.abrirStreetView) {
                    var urlStreetView = 'http://maps.google.com/maps?layer=c&cbll=' + latlng.lat + ',' + latlng.lng + '&cbp=12,0,,0,5';
                    var win = window.open(urlStreetView, '_blank');
                    win.focus();
                }
            });
        };
        vm.ConfigurarEventos();
        vm.CallbackQuandoSelecionarLocal = function (local) {
            var southWeast = [local.geometry.bounds.southwest.lat, local.geometry.bounds.southwest.lng];
            var northEast = [local.geometry.bounds.northeast.lat, local.geometry.bounds.northeast.lng];
            vm.mapMarkers.geolocalizador.lat = local.geometry.location.lat;
            vm.mapMarkers.geolocalizador.lng = local.geometry.location.lng;
            leafletData.getMap().then(function (map) {
                map.fitBounds([southWeast, northEast], {padding: [50, 50]});
            });
        };

        vm.viewInterface = {
            desenho: false,
            zoomEmGeometria: false
        };
        vm.ObterViewInterfaceAtiva = function () {
            var ativos = [];
            for (var key in vm.viewInterface) {
                if (vm.viewInterface[key]) {
                    ativos.push(key);
                }
            }
            return ativos;
        };

        vm.AlternarDesenho = function () {
            if ((vm.ObterViewInterfaceAtiva().indexOf('desenho') != -1 && vm.ObterViewInterfaceAtiva().length == 1) || vm.ObterViewInterfaceAtiva().length == 0) {
                vm.viewInterface.desenho = !vm.viewInterface.desenho;
                if (vm.viewInterface.desenho) {
                    angular.element('.leaflet-draw.leaflet-control').fadeIn(200);
                } else {
                    angular.element('.leaflet-draw.leaflet-control').fadeOut(200);
                }
            }
        };
        var createdCallBackDesenho = function (leafletEvent, leafletObject) {
            if (vm.viewInterface.desenho) {
                vm.mapDrawItens.addLayer(leafletEvent.layer);
            }
        };

        vm.AlternarZoomEmGeometria = function () {
            if ((vm.ObterViewInterfaceAtiva().indexOf('zoomEmGeometria') != -1 && vm.ObterViewInterfaceAtiva().length == 1) || vm.ObterViewInterfaceAtiva().length == 0) {
                vm.viewInterface.zoomEmGeometria = !vm.viewInterface.zoomEmGeometria;
                if (vm.viewInterface.zoomEmGeometria) {
                    angular.element('.leaflet-draw.leaflet-control').fadeIn(200);

                    //angular.element('.leaflet-draw-draw-polygon').fadeOut(100);
                    angular.element('.leaflet-draw-draw-polyline').fadeOut(100);
                    angular.element('.leaflet-draw-draw-circle').fadeOut(100);
                    angular.element('.leaflet-draw-edit-edit').fadeOut(100);
                    angular.element('.leaflet-draw-edit-remove').fadeOut(100);
                } else {
                    angular.element('.leaflet-draw.leaflet-control').fadeOut(200);

                    //angular.element('.leaflet-draw-draw-polygon').fadeIn(100);
                    angular.element('.leaflet-draw-draw-polyline').fadeIn(100);
                    angular.element('.leaflet-draw-draw-circle').fadeIn(100);
                    angular.element('.leaflet-draw-edit-edit').fadeIn(100);
                    angular.element('.leaflet-draw-edit-remove').fadeIn(100);
                }
            }
        };
        var createdCallBackZoomEmGeometria = function (leafletEvent, leafletObject) {
            if (vm.viewInterface.zoomEmGeometria) {
                leafletData.getMap().then(function (map) {
                    map.fitBounds(leafletEvent.layer.getLatLngs(), {padding: [10, 10]});
                });
            }
        };

        vm.mapDrawOptions = {};
        vm.ConfigurarDesenho = function () {
            DesenhoService.AddCreatedCallback(createdCallBackDesenho);
            DesenhoService.AddCreatedCallback(createdCallBackZoomEmGeometria);
            vm.mapDrawOptions = DesenhoService.ObterConfiguracao($scope,vm.mapDrawItens);
        };
        vm.ConfigurarDesenho();

        vm.AlternarAbrirStreetView = function () {
            if ((vm.ObterViewInterfaceAtiva().indexOf('abrirStreetView') != -1 && vm.ObterViewInterfaceAtiva().length == 1) || vm.ObterViewInterfaceAtiva().length == 0) {
                vm.viewInterface.abrirStreetView = !vm.viewInterface.abrirStreetView;
            }
        }
    }
})();
