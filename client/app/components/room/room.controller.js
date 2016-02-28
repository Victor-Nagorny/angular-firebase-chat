class RoomController {
  constructor($scope, $state, $stateParams, $mdSidenav, $mdDialog, RootRef, $firebaseArray, $firebaseObject, Auth) {
    "ngInject";
    let vm = this;

    let messagesRef = RootRef.child('room-messages').child($stateParams.roomName);
    let roomUsersRef = RootRef.child('room-users').child($stateParams.roomName);
    let roomUserRef;

    vm.pageSize = 10;
    vm.page = 1;
    vm.roomName = $stateParams.roomName;

    vm.currentRoom = $firebaseObject(RootRef.child('room-metadata').child(vm.roomName));
    vm.roomUsers = $firebaseArray(roomUsersRef);

    vm.getMessages = () => {
      vm.messages = $firebaseArray(messagesRef.limitToLast(vm.pageSize * vm.page));
    };

    vm.getMessages();

    var detachOnAuth = Auth.authObject().$onAuth((authData) => {
      if (authData) {
        roomUserRef = roomUsersRef.child(authData.uid);
        roomUserRef.set(true);
        roomUserRef.onDisconnect().remove(); // User disconnected
      }
    });

    Auth.onBeforeUnAuth(() => {
      roomUserRef.remove();
    });

    vm.sendMessage = (form) => {
      vm.messages.$add({
        message: vm.newMessageText,
        username: Auth.username,
        timestamp: Firebase.ServerValue.TIMESTAMP
      });
      vm.newMessageText = '';
      form.$setUntouched();
    };

    vm.isOwner = () => {
      return Auth.data && Auth.data.uid === vm.currentRoom.createdByUserId;
    };

    vm.showOlder = () => {
      vm.page += 1;
      vm.getMessages();
    };

    vm.deleteRoomDialog = (ev) => {
      var confirm = $mdDialog.confirm()
        .title('Do you really want to remove room ' + vm.currentRoom.$id)
        .ok('Please do it!')
        .cancel('Nope')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(() => {
        vm.removeRoom();
        $state.go('home.room', {roomName: 'general'});
      });
    };

    vm.removeRoom = () => {
      vm.currentRoom.$remove();
      messagesRef.remove();
    };

    vm.toggleRoomsSidenav = () => {
      $mdSidenav('rooms-sidenav').toggle();
    };

    $scope.$on("$destroy", () => {
      roomUserRef.remove();
      detachOnAuth();
    });

    $scope.$on('$stateChangeSuccess', () => {
      $mdSidenav('rooms-sidenav').close();
    });
  }
}

export default RoomController;
