import { observable, action, useStrict } from 'mobx';

useStrict(true);

class SnackBarStore {
  @observable openSnackBar = false;
  @observable message = '';

  @action toggleSnack () {
    this.openSnackBar = !this.openSnackBar;
  }

  @action setMessage (message) {
    this.message = message;
    this.toggleSnack();
  }
}

const snackBarStore = new SnackBarStore();
export default snackBarStore;
