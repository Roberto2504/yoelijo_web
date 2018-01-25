// Third party Modules
import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import {observer} from 'mobx-react';
import _ from 'lodash';
import DatePicker from 'material-ui/DatePicker';

// Styles
import Styles from './styles';
import radium from 'radium';

// In-house modules
import NavBar from '../../ui/NavBar';
import Slider from '../../ui/Slider';
import AuthService from '../../../utils/AuthService';

// Stores
import BurgerStore from '../../../stores/BurgerMenu';

require('./style.less');

@observer
@radium
class Home extends Component {
  static propTypes = {
    location : React.PropTypes.object,
    auth     : React.PropTypes.instanceOf(AuthService),
  }
  constructor (props) {
    super(props);
    const bornDate = new Date();
    bornDate.setHours(0, 0, 0, 0);
    this.state = {
      socialMedia : [
        {
          name : 'twitter',
          icon : 'twitter-square',
          id   : 1,
        },
        {
          name : 'facebook',
          icon : 'facebook-square',
          id   : 2,
        },
        {
          name : 'instagram',
          icon : 'instagram',
          id   : 3,
        },
      ],
      bornDate : bornDate,
    };
  }

  render () {
    return (
      <div id="Home">
        <NavBar {...{
          auth        : this.props.auth,
          burgerStore : BurgerStore,
        }} />
        <div className="main-banner padding-nav-bar">
          <div className="row">
            <div className="col-xs-12 center">
              <Slider autoplay={false} />
            </div>
            <div className="col-xs-12 start ">
              <div className="row container-fluid height-default" style={Styles.description}>
                <div className="col-xs-8 start">
                  <h1 style={Styles.titlePrimary}>Description</h1>
                </div>
                <div className="col-xs-4">
                  <img style={Styles.mediumLogo} src="../../../images/logos/logo_pequeno.png" />
                </div>
                <div className="col-xs-12">
                  <p style={Styles.textPrimary}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,
                    cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
                    No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la
                    creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye
                    versiones de Lorem Ipsum.
                  </p>
                </div>
                <div className="col-xs-12">
                  {
                    _.map(this.state.socialMedia, (social) => {
                      return (
                        <i {...{
                          className : `fa fa-${social.icon}`,
                          key       : social.id,
                          style     : Styles.socialIcon,
                        }} />
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <DatePicker
            onChange={this.handleChangeMaxDate}
            floatingLabelText="Max Date"
            defaultDate={this.state.bornDate}
            disableYearSelection={this.state.disableYearSelection}
          />
        </div>
      </div>
    );
  }

  handleChangeMaxDate = (event, date) => {
    this.setState({
      bornDate : date,
    });
  };
}

export default Home;
