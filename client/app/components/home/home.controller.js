class HomeController {
  constructor($scope, $state, $mdDialog, RootRef, $firebaseObject, $firebaseArray, Auth) {
    "ngInject";
    let vm = this;

    vm.auth = Auth;

    let roomMetaRef = RootRef.child('room-metadata');
    vm.rooms = $firebaseArray(roomMetaRef.orderByChild('created'));

    $scope.$on('$stateChangeSuccess', (event, toState, toParams) => {
      vm.currentRoomName = toParams.roomName;
    });

    vm.addRoomDialog = (ev) => {
      $mdDialog.show({
        controller: ($scope, $mdDialog) => {
          "ngInject";
          $scope.mdDialog = $mdDialog;
        },
        templateUrl: 'app/components/home/add.room.html',
        targetEvent: ev
      }).then((newRoomName) => {
        let newRoomObj = $firebaseObject(roomMetaRef.child(newRoomName));
        newRoomObj.createdByUserId = Auth.data.uid;
        newRoomObj.created = Firebase.ServerValue.TIMESTAMP;
        newRoomObj.$save();
        $state.go('home.room', {roomName: newRoomName});
      });
    };
  }
}

export default HomeController;
