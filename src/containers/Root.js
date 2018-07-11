// @flow
import React from 'react';
import { Router, browserHistory, Route, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectSheet from 'react-jss';
import { ApolloProvider } from 'react-apollo';
import apolloClient from 'graphql/client';

// Containers Components
import App from './web/App';
import Home from './web/Home';

type Props = {
  store: Object,
}

@injectSheet(styles)
class Root extends React.Component<Props> {
  props: Props
  render() {
    const { store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);
    return (
      <ApolloProvider store={ store } client={ apolloClient }>
        <Router history={ history } >
          <Route component={ App }>
            <IndexRedirect to="/home" />
            <Route exact path="/" component={ Home } />
          </Route>
        </Router>
      </ApolloProvider>
    );
  }
}
export default Root;
