(function () {
    'use strict';

    angular
        .module('credencial.autenticacao.controller', [])
        .controller('CredencialAutenticacaoController', CredencialAutenticacaoController);

    /** @ngInject */
    function CredencialAutenticacaoController($state,CredencialFactory, toastr) {

        var vm = this;

        vm.crud = {};

        vm.crud.registro = {};
        vm.crud.autenticacao = {};

        vm.source = {};
        vm.source.opcoesAutenticacao = [];


        var _command = {};

        _command.ObterOpcoesAutenticacao = function () {

            vm.source.opcoesAutenticacao = [
                {descricao: 'Permanecer Logado', valor: true},
                {descricao: 'Não Permanecer Logado', valor: false}
            ];
            vm.crud.SempreAutenticado = vm.source.opcoesAutenticacao[0];

        };
        _command.ObterOpcoesAutenticacao();

        _command.MostrarLoadingLogin = function () {
            angular.element('.formulario-autenticacao-loading').css('top', '0%');
        };
        _command.EsconderLoadingLogin = function () {
            angular.element('.formulario-autenticacao-loading').css('top', '100%');
        };

        _command.MostrarRegistrar = function () {
            angular.element('#modal-registro').modal('show');
        };
        _command.EsconderRegistrar = function () {
            angular.element('.formulario-registro').css('top', '100%');
        };

        vm.command = {};
        vm.command.Autenticar = function () {
            /*CredencialFactory.Login(vm.crud.autenticacao).then(function (result) {
                toastr.success('Autenticado!', 'Autenticação');
                $state.go('app.home');
                _command.EsconderLoadingLogin();
            }, function (error) {

                _command.EsconderLoadingLogin();
            });*/
            //_command.MostrarLoadingLogin();

            CredencialFactory.SimulaLogin();
        };
        vm.command.Registrar = function () {
            _command.MostrarLoadingLogin();
            CredencialFactory.Register(vm.crud.registro).then(function (result) {
                _command.EsconderRegistrar();
                _command.EsconderLoadingLogin();
            }, function (error) {

                _command.EsconderLoadingLogin();
            });
        };
        vm.command.MostrarRegistrar = _command.MostrarRegistrar;

    }

})();
