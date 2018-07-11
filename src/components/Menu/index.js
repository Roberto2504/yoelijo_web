// Third party Modules
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {browserHistory} from 'react-router';

// Stores
import BackDropStore from '../../../stores/BackDrop';

require('./style.less');
import radium from 'radium';

@radium
@observer
class Menu extends Component {
  static propTypes = {
    burgerStore : React.PropTypes.object,
  };

  constructor (props) {
    super(props);
  }

  render () {
    const burgerToggle = this.props.burgerStore.openMenu ? 'open' : '';
    return (
      <div id="Menu">
        <div id="nav-icon" className={burgerToggle} onClick={this.openBurger}>
          <span className="span1" />
          <span className="span2"/>
          <span className="span3"/>
        </div>
      </div>
    );
  }

  goToPage = (page) => {
    browserHistory.push(page);
  }

  openBurger = () => {
    if (this.props.burgerStore.openMenu) {
      this.props.burgerStore.toggleBurger(false);
      BackDropStore.setActiveBackDrop(false);
    } else {
      this.props.burgerStore.toggleBurger(true);
      BackDropStore.setActiveBackDrop(true);
    }
  }
}

export default Menu;
