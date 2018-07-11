import { observable, action, useStrict } from 'mobx';

useStrict(true);

class BurgerMenuStore {
  @observable openMenu = false;
  @action toggleBurger (state) {
    this.openMenu = state;
  }
}

const burgerMenuStore = new BurgerMenuStore();
export default burgerMenuStore;
