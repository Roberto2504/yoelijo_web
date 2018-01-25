import { observable, action, useStrict } from 'mobx';

useStrict(true);

class LoaderStore {
  @observable activeLoader = false;

  @action toggleLoader () {
    this.activeLoader = !this.activeLoader;
  }
}

const loaderStore = new LoaderStore();
export default loaderStore;
