import angular from 'angular';
import Home from './home/home';
import Room from './room/room';

let componentModule = angular.module('app.components', [
  Home.name,
  Room.name
]);

export default componentModule;
