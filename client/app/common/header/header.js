import angular from 'angular';
import uiRouter from 'angular-ui-router';
import headerComponent from './header.component.js';

let headerModule = angular.module('header', [
  uiRouter
])

.component('myHeader', headerComponent);

export default headerModule;
