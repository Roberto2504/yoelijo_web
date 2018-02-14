import axios from 'axios';
import { observable, action, transaction, runInAction, useStrict } from 'mobx';
import Constants from '../utils/constants';
import Worker from 'worker!../utils/tokenWorker.js';
import { browserHistory } from 'react-router';

// Stores
import SnackBarStore from './SnackBar';

useStrict(true);

class AuthStore {
  @observable currentUser = {};
  @observable product = {};

  @action clearCurrentUser () {
    this.currentUser = {};
  }

  @action userLogin = async (profile) => {
    try {
      if (profile) {
        console.log(profile, 'profile');
        const { status, data } = await axios.post('user/login', profile);
          console.log(data);
        if (status === 200) {
          runInAction('update current user', () => {
            this.currentUser = _.get(data.response, 'user', {});
          });
          const tokens = data.response;
          localStorage.setItem('creds', JSON.stringify(tokens));
          tokenWorker.postMessage(tokens);
          browserHistory.replace('/home');
        }
      }
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    }
  }

  @action refreshToken = async () => {
    try {
      const {refresh} = JSON.parse(localStorage.getItem('creds'));
      if (refresh) {
        const {status, data} = await axios.post('auth/refresh', {refresh});
        if (status === 200) {
          const tokens = data.response;
          localStorage.setItem('creds', JSON.stringify(tokens));
          tokenWorker.postMessage(tokens);
          this.turnWorkerOn();
        } else {
          localStorage.clear();
        }
      }
    } catch (err) {
      console.log(err,'error here');
      SnackBarStore.setMessage(err.message);
    }
  }

  @action turnWorkerOn () {
    this.workerRunning = true;
  }

  @action setCurrentUser () {
    const credentials = JSON.parse(localStorage.getItem('creds'));
    if (credentials) {
      this.currentUser = credentials.user;
    }
  }
}

const auth = new AuthStore();
const tokenWorker = new Worker;

tokenWorker.addEventListener('message', (e) => {
  const tokens = e.data;
  localStorage.setItem('creds', JSON.stringify(tokens));
  tokenWorker.postMessage(tokens);
}, false);

transaction(() => {
  axios.interceptors.request.use((config) => {
    const apiUrl = Constants.apiUrl;
    console.log(`${apiUrl}/${config.url}que pasa aquiasd`); 
    const {token, refresh} = JSON.parse(localStorage.getItem('creds'))
      ? JSON.parse(localStorage.getItem('creds'))
      : {token : null, refresh : null};
    const useToken = !_.endsWith(config.url, 'refresh') ? token : refresh;
    console.log(`${apiUrl}/${config.url}que pasa aqui`); 
    config.url = `${apiUrl}/${config.url}`;
    config.headers.Authorization = `Bearer ${useToken}`;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });


  axios.interceptors.response.use((response) => {
    // If there isn't tokens yet, save them and start the worker.
    if (!localStorage.creds) {
      const tokens = response.data.response;
      localStorage.setItem('creds', JSON.stringify(tokens));
      tokenWorker.postMessage(tokens);
      auth.turnWorkerOn();
    }
    return response;
  }, (error) => {
    return Promise.reject(error);
  });
});

export default auth;
