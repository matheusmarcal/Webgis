(function () {
    'use strict';

    angular
        .module('viewmap.factory', [])
        .factory('ViewMapFactory', ViewMapFactory);

    /** @ngInject */
    function ViewMapFactory($q, $http, toastr) {

        var _factory = function (data) {
            angular.extend(this, data);
        };


        return _factory;
    }

})();
