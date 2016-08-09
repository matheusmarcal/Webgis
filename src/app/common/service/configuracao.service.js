(function () {
    'use strict';

    angular.module('configuracao.service', [])
        .service('ConfiguracaoService', ConfiguracaoService);

    /** @ngInject */
    function ConfiguracaoService() {

        var _service = this;

        _service.LOCAL = 'http://localhost:10362/';
        _service.PROD = 'http://localhost:10362/';
        _service.CURRENT = _service.LOCAL;


    }


})();
