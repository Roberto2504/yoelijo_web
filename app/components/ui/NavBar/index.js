// Third party Modules
import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { IconButton, RaisedButton } from 'material-ui';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import { browserHistory } from 'react-router';

// In-house modules
import Menu from '../Menu';
import AuthService from '../../../utils/AuthService';

// Styles
import Styles from './styles';

@observer
class NavBar extends Component {
  static propTypes = {
    auth            : React.PropTypes.instanceOf(AuthService),
    burgerStore     : React.PropTypes.object,
  }

  render () {
    return (
      <div className="row" style={Styles.navBar}>
        <div className="col-xs-6 col-sm-1 start">
          <div className="burguer-menu">
            <Menu {...{burgerStore : this.props.burgerStore}} />
          </div>
        </div>
        <div className="col-xs-5 start">
          <img style={Styles.littleLogo} onClick={() => browserHistory.push('/')} src="../../../images/logos/logo_pequeno.png" />
        </div>
        <div className="col-xs-3 end">
          <IconButton {...{
            iconStyle : Styles.accountIcon,
            style     : Styles.accountButton,
          }}>
            <AccountCircle />
          </IconButton>
        </div>
        <div className="col-xs-3 end">
          <RaisedButton label="Login" onClick={this.props.auth.login}/>
        </div>
      </div>
    );
  }
}

export default NavBar;
