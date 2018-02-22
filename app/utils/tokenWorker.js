// import jwtDecode from 'jwt-decode';
// import axios from 'axios';
// import _ from 'lodash';
// import Constants from './constants';

// const { apiUrl } = Constants;

// function doRefresh (refresh) {
//   return new Promise((resolve) => {
//     axios.get(`${apiUrl}/auth/refresh`, {
//       headers : {
//         Authorization : `Bearer ${refresh}`,
//       },
//     }).then((newTokens) => {
//       resolve(newTokens.data.response);
//     });
//   });
// }

// function refreshIn (time, refresh) {
//   return new Promise((resolve) => {
//     _.delay(() => {
//       doRefresh(refresh).then((tokens) => {
//         resolve(tokens);
//       });
//     }, time * 1000);
//   });
// }

// self.addEventListener('message', (e) => {
//   const { token, refresh } = e.data;
//   const { iat, exp } = jwtDecode(token);
//   const diff = (exp - iat) - 60;
//   refreshIn(diff, refresh).then((newTokens) => {
//     self.postMessage(newTokens);
//   });
// }, false);
