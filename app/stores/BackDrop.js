import { observable, action, useStrict } from 'mobx';

useStrict(true);

class BackDropStore {
  @observable activeBackDrop = false;

  @action setActiveBackDrop (view) {
    this.activeBackDrop = view;
  }
}

const backDropStore = new BackDropStore();
export default backDropStore;
