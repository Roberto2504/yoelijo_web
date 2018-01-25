// Third party Modules
import React, { Component } from 'react';
import {observer} from 'mobx-react';

// In-house modules
import LoaderStore from '../../../stores/Loader';

// Styles
require('./style.less');

@observer
class Loader extends Component {
  render () {
    return (
      <div className="loader" style={{display : LoaderStore.activeLoader ? 'block' : 'none'}}>
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
        </div>
      </div>
    );
  }
}

export default Loader;
