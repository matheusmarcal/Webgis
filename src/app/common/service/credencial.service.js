(function () {
    'use strict';

    angular.module('credencial.service', [])
        .service('CredencialService', CredencialService);

    /** @ngInject */
    function CredencialService(localStorageService) {

        var _service = this;
        var _credencial = null;

        _service.Autorizar = function (username, token) {
            _credencial = {};
            _credencial.token = token;
            _credencial.username = username;
            localStorageService.set('credencial', _credencial);
        };

        _service.Desautorizar = function () {
            _credencial = null;
            localStorageService.set('credencial', null);
        };

        _service.EstaAutorizado = function () {
            return _credencial ? true : false;
        };

        _service.ObterLocalStorage = function () {
            _credencial = localStorageService.get('credencial');
        };


    }

})();
