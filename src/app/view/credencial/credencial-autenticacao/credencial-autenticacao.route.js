(function () {
    'use strict';

    angular
        .module('credencial.autenticacao')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('credencial.autenticacao', {
                url: '/autenticacao',
                views: {
                    '@': {
                        templateUrl: 'app/view/credencial/credencial-autenticacao/credencial-autenticacao.tpl.html',
                        controller: 'CredencialAutenticacaoController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();
