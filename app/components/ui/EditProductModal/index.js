// Third party Modules
import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// In-house modules
import LoaderStore from '../../../stores/Loader';

// Styles
import Styles from './styles';
import radium from 'radium'

require('./style.less');

@radium
@observer
class EditProductModal extends Component {
  static propTypes = {
    productSelected       : React.PropTypes.object,
    openEditModal         : React.PropTypes.bool,
    closeProductModal     : React.PropTypes.func,
    updateSelectedProduct : React.PropTypes.func,
    editProduct           : React.PropTypes.func,
    deleteProduct         : React.PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.state = {
      code    : '',
      myCode  : '',
      _id     : '',
      picture : '',
    };
  }

  componentDidMount () {
    const { code, myCode, _id, picture } = this.props.productSelected;
    this.setState({
      code,
      myCode,
      _id,
      picture,
    });
  }

  handleOpen = () => {
    this.setState({open : true});
  };

  handleClose = () => {
    this.setState({open : false});
  };

  render () {
    const { code , myCode, picture, _id } = this.state;
    const actions = [
      <FlatButton
        label="Eliminar"
        secondary={true}
        onClick={() => this.props.deleteProduct({ _id })}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.props.closeProductModal()}
      />,
      <FlatButton
        label="Editar"
        primary={true}
        onClick={() => this.props.editProduct({ code , myCode, _id })}
      />,
    ];
    return (
      <div>
        <RaisedButton label="Modal Dialog" onClick={() => this.props.closeProductModal()} />
          <Dialog {...{
            title : 'Detalles del producto',
            open  : this.props.openEditModal,
            modal : true,
            actions,
          }}>
          <div className="center-xs row" id="product-item">
            <div className="image col-xs-12" style={{backgroundImage : `url(${picture})`}}>
              <div className="shadow" />
            </div>
            <div className="col-xs-12">
              <span>Código Producto</span><br />
              <TextField {...{
                onChange   : this.setStates.bind(null, 'code'),
                value      : code,
                id         : `code-${code}`,
              }} />
            </div>
            <div className="col-xs-12">
              <span>Mi código</span><br />
              <TextField {...{
                onChange   : this.setStates.bind(null, 'myCode'),
                value      : myCode,
                id         : `myCode-${myCode}`
              }} />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

  setStates = (type, e) => {
    this.setState({
      [type] : e.target.value,
    });
  }

}

export default EditProductModal;
