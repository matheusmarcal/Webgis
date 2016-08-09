(function () {
    'use strict';

    angular.module('prototype.factory', [])
        .factory('PrototypeFactory', PrototypeFactory);

    /** @ngInject */
    function PrototypeFactory() {

        var _factory = function (data) {
            angular.extend(this, data);
        };

        _factory.Usuario = function () {

            return this;
        };

        /*_factory. =  function(){

         return this;
         };*/

        return _factory;
    }

})();
