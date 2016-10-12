/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */

app.controller('formularioPersonaCtrl', ['$scope', 'personaService', 'dataFactory',
    function ($scope, personaService, dataFactory) {
        /**
         * Array que contiene los datos de la lista
         * @type Array
         * @field
         */

         $scope.persona = {};

         function getAllContacts() {
             dataFactory.getAllContacts().then(function (response) {
               $scope.data = response.data;
             }, function (error) {
               window.alert("No se pudieron obtener la lista de contactos");
             });
         }

        /**
         * Se encarga de agregar datos a la lista
         * @function
         */

        $scope.agregar = function () {
          var contact = angular.copy($scope.persona);
    	    var regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

          if (!$scope.persona.nombre){
            alert('No puede dejar el campo nombre vacio!');
            return false;
          }
          else if (!$scope.persona.apellido){
            alert('No puede dejar el campo persona vacio!');
            return false;
          }
          else if (!$scope.persona.telefono){
            alert('No puede dejar el campo telefono vacio!');
            return false;
          }
          else if (!$scope.persona.direccion){
            alert('No puede dejar el campo direccion vacio!');
            return false;
          }
    	    else if (regExp.test($scope.persona.email) == false)
    	    {
            alert('Email invalido!');
            return false;
    	    } else {
            dataFactory.add(contact)
                .then(function (response) {
                    getAllContacts();
                    window.alert("Contacto guardado guardardo exitosamente!");
                }, function(error) {
                    window.alert("No se pudo guardar el contacto!");
                });
            window.open("#personas/",'_self',false);
    	   }
       }
    }
 ]);
