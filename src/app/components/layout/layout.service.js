(function () {
    'use strict';

    angular.module('layout.service', [])
        .service('LayoutService', LayoutService);

    /** @ngInject */
    function LayoutService() {

        var _service = this;

        var _layoutLeft = {element: null};
        var _layoutRight = {element: null};
        var _layoutLoader = {element: null};

        _service.Iniciar = function () {
            var _intervalInicializacao = setInterval(function () {
                if (_layoutLeft.element && _layoutRight.element) {
                    clearInterval(_intervalInicializacao);
                }
                else {
                    if ($('#layout-left').size() > 0) {
                        _layoutLeft.element = $('#layout-left');
                    }
                    if ($('#layout-right').size() > 0) {
                        _layoutRight.element = $('#layout-right');
                    }
                    if ($('#layout-loader').size() > 0) {
                        _layoutLoader.element = $('#layout-loader');
                    }
                }
            }, 500);
        };

        _service.estaProntoLeft = function () {
            return _layoutLeft.element ? true : false;
        };

        _service.estaProntoLoader = function () {
            return _layoutLeft.element ? true : false;
        };

        _service.estaProntoRight = function () {
            return _layoutRight.element ? true : false;
        };

        _service.estaPronto = function () {
            if (_service.estaProntoRight() && _service.estaProntoLeft() && _service.estaProntoLoader()) {
                return true;
            }
            else {
                return false;
            }
        };

        _service.left = {
            hide: function () {
                _layoutLeft.element.removeClass('active');
            },
            show: function () {
                _layoutLeft.element.addClass('active');
            },
            toggle: function () {
                _layoutLeft.element.toggleClass('active');
            }
        };

        _service.right = {
            hide: function () {
                _layoutRight.element.removeClass('active');
            },
            show: function () {
                _layoutRight.element.addClass('active');
            },
            toggle: function () {
                _layoutRight.element.toggleClass('active');
            }
        };

        _service.loader = {
            hide: function () {
                TryHide();
            },
            show: function () {
                TryShow();
            },
        };

        _service.HideAll = function () {
            _service.left.hide();
            _service.right.hide();
        };


        var TryHide = function () {
            if (_layoutLoader.element) {
                _layoutLoader.element.fadeOut(300);
            }
            else {
                setTimeout(function () {
                    TryHide();
                }, 300);
            }
        };

        var TryShow = function () {
            if (_layoutLoader.element) {
                _layoutLoader.element.fadeIn(300);
            }
            else {
                setTimeout(function () {
                    TryShow();
                }, 300);
            }
        };


    }


})();
