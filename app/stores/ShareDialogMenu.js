import { observable, action, useStrict } from 'mobx';

useStrict(true);

class ShareDialogMenuStore {
  @observable activeDialogMenu = false;

  @action setActiveDialogMenu () {
    this.activeDialogMenu = !this.activeDialogMenu;
  }

}

const shareDialogMenuStore = new ShareDialogMenuStore();
export default shareDialogMenuStore;
