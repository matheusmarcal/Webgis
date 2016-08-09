(function() {
  'use strict';

  angular
    .module('credencial')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('credencial', {
        url: '/credencial'
      });
  }

})();
