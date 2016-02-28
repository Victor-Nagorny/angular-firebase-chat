import angular from 'angular';
import uiRouter from 'angular-ui-router';
import roomComponent from './room.component.js';

let roomModule = angular.module('room', [
  uiRouter
])

  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $stateProvider
      .state('home.room', {
        url: 'room/:roomName',
        template: '<room></room>'
      });

    $urlRouterProvider.otherwise('/room/general');
  })

  .component('room', roomComponent);

export default roomModule;
