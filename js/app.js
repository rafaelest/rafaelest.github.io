/**
 * Enrutador de la aplicación
 */
var app = angular.module('pwfAngular', ['ngRoute','ui.bootstrap']);

// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/personas', {
            templateUrl: 'views/lista-persona-partial.html',
            controller: 'listaPersonaCtrl'
        })

        .when('/agenda/:id/ver', {
            templateUrl: 'views/consulta.html',
            controller: 'listaPersonaCtrl',
            method: 'view'
        })

          .when('/agenda/:id/editar', {
            templateUrl: 'views/edit-form.html',
            controller: 'listaPersonaCtrl',
            method: 'editar'
        })

        .when('/', {
            templateUrl: 'views/formulario-persona-partial.html',
            controller: 'formularioPersonaCtrl'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('dataFactory', ['$http', function($http) {
    var  baseUrl = 'https://desa03.konecta.com.py/pwf/rest/agenda';
    var dataFactory = {};
    dataFactory.getAllContacts = function () {
        return $http.get(baseUrl);
    };

    dataFactory.getContact = function (id) {
        return $http.get(baseUrl + '/' + id);
    };

    dataFactory.update = function (contacto) {
        return $http.put(baseUrl + '/' + contacto.id, contacto);
    };

    dataFactory.remove = function (contacto) {
          return $http.delete(baseUrl + '/' + contacto.id);
      };

    dataFactory.searchContacts = function (inicio, cantidad, parametro) {
        return $http.get(baseUrl + "?inicio="+ inicio
                                 + "&cantidad=" + cantidad
                                 + "&filtro=" + parametro);
    };

    dataFactory.add = function (contacto) {
        return $http.post(baseUrl, contacto);
    };

    return dataFactory;
}]);
