(function () {
    'use strict';

    angular.module('desenho.service', [])
        .service('DesenhoService', DesenhoService);

    /** @ngInject */
    function DesenhoService(leafletDrawEvents) {

        var service = this;
        var drawOptions = null;
        service.callbacks = {
            created: [],
            edited: [],
            deleted: []
        };

        service.ObterConfiguracao = function ($scope,featureGroup) {
            drawOptions = {};
            drawOptions.position = "bottomleft";
            drawOptions.draw = service.ObterConfiguracaoDesenho();
            drawOptions.edit = service.ObterConfiguracaoEdicaoDesenho(featureGroup);
            service.ConfigurarEventos(service.ObterHandle(), $scope);
            L.drawLocal = service.ObterConfiguracaoFerramentaPortugues();
            return drawOptions;
        };

        service.ObterConfiguracaoFerramentaPortugues = function () {
            var _configuracao = {};
            _configuracao.draw = {};
            _configuracao.draw.toolbar = {
                actions: {title: "Cancelar desenho", text: "Cancelar"},
                finish: {title: "Finalizar desenho", text: "Finalizar"},
                undo: {title: "Remover ultimo ponto desenhado", text: "Deletar último ponto"},
                buttons: {
                    polyline: "Desenhar uma Linha!",
                    polygon: "Desenhar um Poligono!",
                    rectangle: "Desenhar um Retângulo!",
                    circle: "Desenhar um Circulo!",
                    marker: "Desenhar um Marcador!"
                }
            };
            _configuracao.draw.handlers = {
                circle: {
                    tooltip: {
                        start: "Clique e Arraste para desenhar um circulo."
                    },
                    radius: "Raio"
                },
                marker: {
                    tooltip: {
                        start: "Clique no mapa para colocar um marcador."
                    }
                },
                polygon: {
                    tooltip: {
                        start: "Clique para começar a desenhar um shape.",
                        cont: "Clique para continaur desenhando um shape.",
                        end: "Clique no primeiro ponto para finalizar desenho do shape."
                    }
                },
                polyline: {
                    error: "<strong>Erro:</strong> Beiras de shapes não podem se cruzar!",
                    tooltip: {
                        start: "Clique para começar a desenhar uma linha.",
                        cont: "Clique para continuar a desenhar uma linha.",
                        end: "Clique no último ponto para finalizar o desenho da linha."
                    }
                },
                rectangle: {
                    tooltip: {
                        start: "Clique e arraste para desenhar o retângulo."
                    }
                },
                simpleshape: {
                    tooltip: {
                        end: "Solte o mouse para finalizar o desenho."
                    }
                }
            };
            _configuracao.edit = {}
            _configuracao.edit.toolbar = {}
            _configuracao.edit.toolbar.actions = {
                save: {
                    title: "Salvar alterações.",
                    text: "Salvar"
                }
                ,
                cancel: {
                    title: "Cancelar edição, descartar todas as alterações.",
                    text: "Cancelar"
                }
            };
            _configuracao.edit.toolbar.buttons = {
                edit: "Editar desenho.",
                editDisabled: "Não há desenhos para editar.",
                remove: "Remover desenho.",
                removeDisabled: "Não há desenhos para remover."
            };
            _configuracao.edit.handlers = {};
            _configuracao.edit.handlers.edit = {
                tooltip: {
                    text: "Alças de arrasto, ou marcador para editar feições.",
                    subtext: "Clique em Cancelar para desfazer alterações."
                }
            };
            _configuracao.edit.handlers.remove = {
                tooltip: {
                    text: "Clique em uma feição para remover"
                }
            };
            return _configuracao;
        }

        service.ConfigurarEventos = function (handle, $scope) {
            var drawEvents = leafletDrawEvents.getAvailableEvents();
            drawEvents.forEach(function (eventName) {
                $scope.$on('leafletDirectiveDraw.' + eventName, function (e, payload) {
                    //{leafletEvent, leafletObject, model, modelName} = payload
                    var leafletEvent, leafletObject, model, modelName; //destructuring not supported by chrome yet :(
                    leafletEvent = payload.leafletEvent, leafletObject = payload.leafletObject, model = payload.model,
                        modelName = payload.modelName;
                    handle[eventName.replace('draw:', '')](e, leafletEvent, leafletObject, model, modelName);
                });
            });
        };

        service.ObterHandle = function () {
            var handle = {};
            handle.created = function (e, leafletEvent, leafletObject, model, modelName) {
                angular.element(service.callbacks.created).each(function (iA, action) {
                    if (action) {
                        action(leafletEvent, leafletObject);
                    }
                });
            };
            handle.edited = function (arg) {
            };
            handle.deleted = function (arg) {
            };
            handle.drawstart = function (arg) {
            };
            handle.drawstop = function (arg) {
            };
            handle.editstart = function (arg) {
            };
            handle.editstop = function (arg) {
            };
            handle.deletestart = function (arg) {
            };
            handle.deletestop = function (arg) {
            };
            return handle;
        };

        service.ObterConfiguracaoDesenho = function () {
            var _draw = {
                polyline: {
                    metric: false
                },
                polygon: {
                    metric: false,
                    showArea: true,
                    drawError: {
                        color: '#b00b00',
                        timeout: 1000
                    },
                    shapeOptions: {
                        color: 'blue'
                    }
                },
                circle: {
                    showArea: true,
                    metric: false,
                    shapeOptions: {
                        color: '#662d91'
                    }
                },
                marker: true
            };
            return _draw;
        };

        service.ObterConfiguracaoEdicaoDesenho = function (featureGroup) {
            var _drawEdit = {
                featureGroup: featureGroup,
                remove: true
            };
            return _drawEdit;
        };

        service.AddCreatedCallback = function (action) {
            service.callbacks.created.push(action);
        };

        service.AddRemovedCallback = function (action) {

        };

        service.AddEditedCallback = function (action) {

        };

        service.AddDrawStartCallback = function (action) {

        };

        service.AddDrawStopCallback = function (action) {

        };

    }

})
();
