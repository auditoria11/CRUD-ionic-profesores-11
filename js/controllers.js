angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, ConexionServ, $filter, $ionicPopup) {

  $scope.chats = ConexionServ.query('SELECT rowid, id, nombres, Sexo, fecha_nac, pazysalvo FROM profesores').then(function(result){
   $scope.chats = result;

});
  $scope.remove = function(profesor) {
   ConexionServ.query('DELETE FROM profesores WHERE rowid=?', [profesor.rowid]).then(function(result){

    console.log(result)

    $scope.chats = $filter('filter')($scope.chats , {rowid: '!' + profesor.rowid})
   $ionicPopup.show({template: 'Profesor eliminado', title:'Eliminado', buttons:[
          {
            text: '<b>Aceptar</b>',
            type: 'button-positive' ,
 
          }]

         });

      });
   };

  })

.controller('ChatDetailCtrl', function($scope, $state,  ConexionServ, $stateParams, $ionicPopup ) {
     ConexionServ.query('SELECT * FROM profesores WHERE rowid=?' , [$stateParams.profesor_rowid]).then(function(result, text){
        if(result.lenght >0) {
       $scope.alumno = result[0];

      }else{
      $scope.no_hay = true;
   }
     }, function(res){
      console.log("No se pudo traer el Profesor",res);

     
      })

      $scope.actualizarProfesor = function(nombres, Sexo, fecha_nac, pazysalvo){
         datos = [nombres, Sexo, fecha_nac, pazysalvo, $stateParams.profesor_rowid];
         consulta = 'UPDATE profesores SET nombres=?, Sexo=?, fecha_nac=?, pazysalvo=? WHERE rowid=?';

         console.log(datos);


         

         ConexionServ.query(consulta, datos).then(function(result, txt){
          $ionicPopup.show({template: 'Guardado', title:'Guardado', buttons:[
          {
            text: '<b>Aceptar</b>',
            type: 'button-positive' ,

          }]

         });

            $state.go('tab.chats');
  

         }, function(res){
          console.log("no se pudo traer el Profesor", res);
         })

      }

        
})


.controller('ProfesorNuevoCtrl', function($scope, ConexionServ, $ionicPopup, $state ) {
  $scope.alumno = {};

  $scope.crearProfesor = function(nombres, Sexo, fecha_nac, pazysalvo){
    consulta="INSERT INTO profesores(nombres, Sexo,  fecha_nac, pazysalvo) VALUES(?, ?, ?, ?)";
    datos = [ nombres, Sexo, fecha_nac, pazysalvo];
    ConexionServ.query(consulta, datos).then(function(result, txt){
          $ionicPopup.show({template: 'Profesor creado', title:'creado', buttons:[
          {
            text: '<b>Aceptar</b>',
            type: 'button-positive' ,

          }]

         });

            $state.go('tab.chats');
  

         }, function(res){
          console.log("no se pudo traer el Profesor", res);
         })



    }

})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
