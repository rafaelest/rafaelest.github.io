/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
 app.controller('listaPersonaCtrl', ['$scope', '$rootScope', 'dataFactory',

     function ($scope, $rootScope, dataFactory) {
        /**
         * Array que contiene los datos de la visualización
         * @type Array
         * @field
         */
        var contador = 1;
        $scope.data = {};
        $scope.data.lista = [];

        $scope.results = $rootScope.results;
        $scope.persona = $rootScope.persona;

        $scope.currentPage = 0;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;
        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            //se realiza el get solo si no hay datos
            if ($scope.data.lista.length == 0) {
                getAllContacts();
            }
        })();

        function getAllContacts() {
            dataFactory.getAllContacts().then(function (response) {
              $scope.data = response.data;
            }, function (error) {
              window.alert("No se pudieron obtener los contactos.");
            });
        };

        $scope.getContact = function (contact) {
            dataFactory.getContact(contact.id)
            .then(function (response) {
              $scope.persona = angular.copy(response.data);
              $rootScope.persona = $scope.persona;
              window.open("#agenda/"+contact.id+"/ver", '_self',false);
            }, function (error) {
                window.alert("No se pudo obtener el contacto");
          });
        };

        $scope.editar = function(contacto){
            $scope.persona = angular.copy(contacto);
            $rootScope.persona = $scope.persona;
            window.open("#agenda/"+contacto.id+"/editar", '_self',false);
  	      };

        $scope.update = function (contact) {
             dataFactory.update(contact)
              .then(function (response) {
                  getAllContacts();
                  window.alert("Contacto modificado exitosamente!");
                  window.open("#personas/",'_self',false);
              }, function (error) {
                  window.alert("No se pudo modificar el contacto");
              });
          };

        $scope.remove = function (contact) {
              var result = window.confirm("Desea eliminar el contacto?");
              if(result == true){
                console.log(contact.id);
                 dataFactory.remove(contact).then(function (response) {
                      getAllContacts();
                      window.alert("Contacto eliminado exitosamente!");
                      window.open("#personas/",'_self',false);
                  }, function (error) {
                      window.alert("No se pudo borrar el contacto");
                  });
              } else {return false;}
            };

        obtenerContactos = function(){
            var parametro = document.getElementById("parametro").value;
            var inicio;
            if($scope.currentPage == 0){
              inicio = $scope.currentPage;
            }else{
              inicio = $scope.currentPage + 2*(2*($scope.currentPage-1))-1;
            }

            var cant = $scope.numPerPage;
            dataFactory.searchContacts(inicio, cant, parametro)
               .then(function (response) {
             $scope.data = response.data;
             $scope.total = response.data.total;
           }, function (error) {
             window.alert("No se pudieron obtener los resultados.");
           });
        };

        $scope.buscarContactos = function(){
            obtenerContactos();
        };
}]);
