angular.module('starter.services', [])

.service('MapService', function($q, $http, $cordovaGeolocation, $ionicPopup){
  var self = {
    // Se der erro, mostramos esse endereço como default
    'latitude': -23.562852,
    'longitude': -46.654433,
    'getCurrentPosition': function () {

      var d = $q.defer();

      // Primeiro vamos ter certeza de que o app foi
      // completamente carregado

      ionic.Platform.ready(function () {

        // Agora vamos pegar a localização atual do usuário

        $cordovaGeolocation
          .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
          .then(function (position) {
            // Se der certo, adicionamos os valores de posicionamento
            console.log('All right');
            console.log(self.latitude);
            console.log(self.longitude);
            self.latitude = position.coords.latitude;
            self.longitude = position.coords.longitude;

            d.resolve();

          }, function (err) {

            // Se der erro, mostramos uma mensagem ao usuário

            $ionicPopup.alert({
              title: 'Erro',
              template: err.message
            });

            d.reject(err);
          })
      });

      return d.promise;
    }
  };

  return self;
})