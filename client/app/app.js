import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngMessages from 'angular-messages';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import Firebase from 'firebase';
import firebase from 'angularfire';
import _ from 'lodash';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

import 'angular-material/angular-material.css';

angular.module('app', [
  uiRouter,
  ngResource,
  ngAria,
  ngCookies,
  ngMessages,
  ngSanitize,
  ngMaterial,
  firebase,
  Common.name,
  Components.name
])
  .constant('RootRef', new Firebase('https://dazzling-torch-5503.firebaseio.com'))
  .config(($locationProvider, $mdThemingProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('grey');
  })
  .run((Auth) => {
    "ngInject";
    if (!Auth.isAuthenticated()) {
      Auth.authAnonymously();
    }
  })
  .component('app', AppComponent);
