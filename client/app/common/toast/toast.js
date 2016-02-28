import angular from 'angular';
import ToastFactory from './toast.factory.js';

let toastModule = angular.module('toast', [])

.factory('Toast', ToastFactory);

export default toastModule;
