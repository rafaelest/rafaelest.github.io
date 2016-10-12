/*
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios.
 * Abarca las operaciones que pueden ser realizads sobre el recurso Persona.
 */
app.service('personaService', ['$http', function ($http) {
      var baseUrl = 'https://desa03.konecta.com.py/pwf/rest/agenda';

      this.getAllContacts = function () {
          return $http.get(baseUrl);
      };

      this.getContact = function (id) {
          return $http.get(baseUrl + '/' + id);
      };

      this.searchContacts = function (inicio, cantidad, parametro) {
          return $http.get(baseUrl + "?inicio="+ inicio
                                   + "&cantidad=" + cantidad
                                   + '&filtro=' + parametro);
      };

      this.update = function (contacto) {
          return $http.put(baseUrl + '/' + contacto.id, contacto);
      };

      this.deleteContact = function (contacto) {
          return $http.delete(baseUrl + '/' + contacto.id);
      };

      this.add = function (contacto) {
          return $http.post(baseUrl, contacto);
      };

}]);
