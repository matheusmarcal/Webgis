(function () {
    'use strict';

    angular
        .module('devit-webgis')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                views: {
                    'layoutHeader': {
                        templateUrl: 'app/components/layout/layout-header/layout-header.tpl.html',
                        controller: 'LayoutHeaderController',
                        controllerAs: 'vm'
                    },
                    'layoutLeft': {
                        templateUrl: 'app/components/layout/layout-left/layout-left.tpl.html',
                        controller: 'LayoutLeftController',
                        controllerAs: 'vm'
                    },
                    'layoutRight': {
                        templateUrl: 'app/components/layout/layout-right/layout-right.tpl.html',
                        controller: 'LayoutRightController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.home', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'app/view/main/main.tpl.html',
                        controller: 'MainController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }

})();
