// Third party Modules
import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import Check from 'material-ui/svg-icons/action/check-circle';
import { browserHistory } from 'react-router';

// In-house modules
import NavBar from '../../ui/NavBar';

// Styles
import Styles from './styles';
import radium from 'radium';

// Stores
import BurgerStore from '../../../stores/BurgerMenu';

require('./style.less');

@radium
class PandoraCMS extends Component {
  static propTypes = {
    location : React.PropTypes.object,
  }

  renderLittleIcon () {
    return <img style={Styles.littleLogo} src="../../../images/logos/logo_pequeno.png" />;
  }

  render () {
    return (
      <div id="Home">
        <NavBar {...{
          burgerStore : BurgerStore,
        }} />
        <div className="main-banner padding-nav-bar">
          <div className="row center">
            <div className="col-xs-12 center">
              <h1 style={Styles.headerTitle}>Hola mundo</h1>
            </div>
          </div>
          <div className="row center" style={Styles.header}>
            <div className="col-xs-6 center">
              <RaisedButton {...{
                className : 'login-button',
                label     : 'Mantenimiento de producto',
                primary   : true,
                onClick   : this.goToPage.bind(null, 'mantenimientoProducto'),
              }} />
            </div>
            <div className="col-xs-6 center">
              <RaisedButton {...{
                className : 'login-button',
                label     : 'Crear Pedido',
                primary   : true,
                onClick   : this.goToPage.bind(null, 'crearPandoraPedido'),
              }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  goToPage (route) {
    browserHistory.push(`/${route}`);
  }
}

export default PandoraCMS;
