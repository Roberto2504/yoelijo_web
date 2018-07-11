// Third party Modules
import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import {observer} from 'mobx-react';

// Stores
import SnackBarStore from '../../../stores/SnackBar';

// Styles
require('./style.less');

@observer
class Alert extends Component {
  static propTypes = {
    openSnackBar : React.PropTypes.bool,
    message      : React.PropTypes.string,
  }

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Snackbar {...{
        autoHideDuration : 4000,
        onRequestClose   : this.handleRequestClose,
        message          : this.props.message,
        open             : this.props.openSnackBar,
        className        : 'snack-bar',
      }} />
    );
  }

  handleRequestClose = () => {
    SnackBarStore.toggleSnack();
  };
}

export default Alert;
