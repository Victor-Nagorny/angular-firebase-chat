import angular from 'angular';
import Auth from './auth/auth';
import Toast from './toast/toast';
import Header from './header/header';

let commonModule = angular.module('app.common', [
  Auth.name,
  Toast.name,
  Header.name
]);

export default commonModule;
