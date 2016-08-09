(function () {
    'use strict';

    angular.module('credencial.factory', [])
        .factory('CredencialFactory', CredencialFactory);

    /** @ngInject */
    function CredencialFactory(API, $http, $state, CredencialService) {

        var _factory = function (data) {
            angular.extend(this, data);
        };

        _factory.Login = function (model) {
            var data = "grant_type=password&username=" + model.UserName + "&password=" + model.Password;
            return $http.post(API.URL + '/token', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function (response) {
                CredencialService.Autorizar(model.UserName, response.access_token);
                return response.access_token;
            }).error(function (error) {
                return error;
            });
        };

        _factory.SimulaLogin = function () {
            CredencialService.Autorizar("Administrador", "teste12313123");
            $state.go('app.home');
        };

        _factory.LogOut = function () {
            CredencialService.Desautorizar();
        };

        _factory.Register = function (model) {
            return $http.post(API.URL + '/Account/Register', model).then(function (response) {
                return response.data;
            });
        };

        return _factory;
    }

})();
