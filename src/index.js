/* eslint global-require: 0 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'store/configureStore';
import Root from 'containers/Root';
import { ThemeProvider } from 'react-jss';

// Local Modules
import theme from './theme';

const store = configureStore();

render(
  <AppContainer>
    <ThemeProvider theme={ theme } >
      <Root store={ store } />
    </ThemeProvider>
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const RootContainer = require('./containers/Root').default;
    render(
      <AppContainer>
        <ThemeProvider theme={ theme } >
          <RootContainer store={ store } />
        </ThemeProvider>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
