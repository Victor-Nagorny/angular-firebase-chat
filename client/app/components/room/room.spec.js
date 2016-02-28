import RoomModule from './room'
import RoomController from './room.controller.js';
import RoomComponent from './room.component.js';
import RoomTemplate from './room.html';

describe('Room', () => {
  let $rootScope, makeController;

  beforeEach(window.module(RoomModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new RoomController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Component', () => {
      // component/directive specs
      let component = RoomComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(RoomTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(RoomController);
      });
  });
});
