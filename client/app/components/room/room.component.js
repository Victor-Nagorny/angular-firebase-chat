import template from './room.html';
import controller from './room.controller.js';
import './room.styl';

let roomComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default roomComponent;
