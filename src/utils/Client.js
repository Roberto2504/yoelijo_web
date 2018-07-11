// Third party modules
import { browserHistory } from 'react-router';
import _ from 'lodash';

// In-house modules
import AuthStore from '../stores/Auth';

export default class Client {
  setClient (domain) {
    axios.defaults.baseURL = domain;
  }

  getLocalToken () {
    // Checks if there is a saved token and it's still valid
    return _.isString(localStorage.getItem('idToken'));
  }

  setToken (idToken) {
    // Saves user token to local storage
    localStorage.setItem('idToken', idToken);
  }

  getToken () {
    // Retrieves the user token from local storage
    return localStorage.getItem('idToken');
  }

  logout () {
    // Clear user token and profile data from local storage
    localStorage.removeItem('idToken');
    AuthStore.clearCurrentUser();
    browserHistory.replace('/');
  }
}
