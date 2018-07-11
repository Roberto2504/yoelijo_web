/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'components/Loader';
import Alert from 'components/Alert';

// Types
type Props = {
  children: any,
  loader: Object,
  color: string,
  reducers: Object,
  actions: Object,
  location: Object,
}

function mapStateToProps(state: Object): Object {
  return state;
}

function mapDispatchToProps(dispatch: Object) {
  return {
    actions: bindActionCreators({
    }, dispatch),
  };
}

class App extends Component<Props> {
  props: Props;
  render() {
    const {
      children,
      reducers: {
        loader,
      },
      actions,
      location,
    } = this.props;
    return (
      <div className="wrapper-app">
        <Loader { ...{ loader, color: loaderColor } } />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
