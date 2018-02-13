// // Third party modules
// import Auth0Lock from 'auth0-lock';
// import { browserHistory } from 'react-router';
// import _ from 'lodash';
// import auth0 from 'auth0-js';

// // In-house modules
// import AuthStore from '../stores/Auth';

// export default class AuthService {
//   constructor (clientId, domain) {
//     // Configure Auth0
//     console.log(clientId, domain);
//     this.lock = new Auth0Lock(clientId, domain, {
//       auth : {
//         redirectUrl  : 'http://localhost:2504/', // https://bop.cloud/ http://localhost:9999/
//         responseType : 'token id_token',
//       },
//       theme : {
//         logo         : 'https://s28.postimg.org/ub1gw4rtp/58x58_01.png',
//         primaryColor : '#25BCD4',
//       },
//     });
//     // Add callback for lock `authenticated` event
//     this.lock.on('authenticated', this._doAuthentication.bind(this));
//     // binds login functions to keep this context
//     this.login = this.login.bind(this);
//   }

//   _doAuthentication (authResult) {
//     // Saves the user token
//     console.log(authResult, 'result');
//     this.setToken(authResult.idToken);

//     this.lock.getProfile(authResult.idToken, (error, profile) => {
//       // trigger auth action that makes axios request and updates store
//       AuthStore.userLogin(profile);
//     });
//   }

//   login () {
//     // Call the show method to display the widget.
//     this.lock.show();
//   }

//   loggedIn () {
//     // Checks if there is a saved token and it's still valid
//     return _.isString(localStorage.getItem('id_token'));
//   }

//   setToken (idToken) {
//     // Saves user token to local storage
//     console.log(idToken);
//     localStorage.setItem('id_token', idToken);
//   }

//   getToken () {
//     // Retrieves the user token from local storage
//     return localStorage.getItem('id_token');
//   }

//   logout () {
//     // Clear user token and profile data from local storage
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('creds');
//     AuthStore.clearCurrentUser();
//     browserHistory.replace('/');
//   }
// }
