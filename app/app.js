// Third party modules
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {StyleRoot} from 'radium';
// import firebase from 'firebase';
import {observer} from 'mobx-react';

// In-house modules
import Loader from './components/ui/Loader';
import Alert from './components/ui/Alert';
// import AuthService from './utils/AuthService';
// import Constants from './utils/constants';
import HamburgerMenu from './components/ui/HamburgerMenu';

// Stores
import SnackBarStore from './stores/SnackBar';
import BurgerMenuStore from './stores/BurgerMenu';
import AuthStore from './stores/Auth';

// CSS
require('./theme/style.less');
require('flexboxgrid');
require('style-loader!animate.css/animate.css');

// Pages
import Home from './components/pages/Home';
import ProductsManager from './components/pages/ProductsManager';
import CreateOrder from './components/pages/CreateOrder';
import PandoraCMS from './components/pages/PandoraCMS';

injectTapEventPlugin();
// const auth = new AuthService(Constants.auth0ClientID, Constants.auth0Domain);
// validate authentication for private routes
// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({ pathname : '/' });
//   }
// };
// var config = {
//     apiKey: "AIzaSyCBVV-BADea7PB_33t1dzx-h3KIpZsdwk0",
//     authDomain: "tavuel506.firebaseapp.com",
//     databaseURL: "https://tavuel506.firebaseio.com",
//     projectId: "tavuel506",
//     storageBucket: "", // aqui va el de amazon
//     messagingSenderId: "536950237048"
//   };
@observer
class App extends React.Component {
  static propTypes = {
    location : React.PropTypes.object,
    children : React.PropTypes.object,
  };

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    AuthStore.refreshToken();
    if (!AuthStore.currentUser.name) {
      AuthStore.setCurrentUser();
    }
  }

  // componentDidMount () {
  //   firebase.initializeApp(config);
  // }

  render () {
    const { pathname } = this.props.location;
    return (
      <StyleRoot>
        <div>
          <Loader />
          <MuiThemeProvider {...{
            muiTheme : getMuiTheme(lightBaseTheme),
          }} >
          <div>
            <HamburgerMenu {...{
              burgerMenuStore : BurgerMenuStore,
              openMenu        : BurgerMenuStore.openMenu,
              auth            : null,
            }} />
            <Alert {...{
              openSnackBar : SnackBarStore.openSnackBar,
              message      : SnackBarStore.message,
            }}/>
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
              {React.cloneElement(this.props.children || <div />, { key : pathname } )}
            </ReactCSSTransitionGroup>
          </div>
          </MuiThemeProvider>
        </div>
      </StyleRoot>
    );
  }
}

function handleUpdate () {
  const {action} = this.state.location;
  if (action === 'PUSH') {
    window.scrollTo(0, 0);
  }
}

render((
  <Router onUpdate={handleUpdate} history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={PandoraCMS}/>
      <Route path="pandoraCMS" component={Home} />
      <Route path="crearPedido" component={CreateOrder} />
      <Route path="mantenimientoProducto" component={ProductsManager} />
    </Route>
  </Router>
), document.getElementById('app'));
