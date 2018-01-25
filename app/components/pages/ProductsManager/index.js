// Third party Modules
import React, { Component } from 'react';
import { AppBar, RaisedButton } from 'material-ui';
import {observer} from 'mobx-react';
import * as XLSX from 'xlsx';
import Check from 'material-ui/svg-icons/action/check-circle';
import _ from 'lodash';
import TextField from 'material-ui/TextField';

// In-house modules
import NavBar from '../../ui/NavBar';
import EditProductModal from '../../ui/EditProductModal';

// Stores
import Product from '../../../stores/Product';

// Styles
import Styles from './styles';
import radium from 'radium';

require('./style.less');

@radium
@observer
class Home extends Component {
  static propTypes = {
    location : React.PropTypes.object,
  }
  constructor (props) {
    super(props);
    this.state = {
      search : '',
    };
  }

  componentDidMount () {
    this.getProducts();
  }

  renderLoginSection () {
    return (
      <IconButton {...{
        iconStyle : Styles.accountIcon,
        style     : Styles.accountButton,
      }}>
        <AccountCircle />
      </IconButton>
    );
  }

  renderLittleIcon () {
    return <img style={Styles.littleLogo} src="../../../images/logos/logo_pequeno.png" />;
  }

  render () {
    const { products, openEditModal, productSelected } = Product;
    return (
      <div id="ProductsManager">
        <NavBar />
        <div className="main-banner padding-nav-bar">
          {
            // <div className="row center">
            //   <div className="col-xs-12 center" onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.handleDrop(e)} style={{cursor : 'pointer'}}>
            //     <h1 style={Styles.headerTitle}>Arrastre su archivo excel aqui</h1>
            //   </div>
            // </div>
          }
          <div className="row center-xs">
            <div className="col-xs-10 center-xs search-bar">
              <TextField {...{
                hintText   : 'Buscar por código del producto',
                onChange   : this.setStates.bind(null, 'search'),
                value      : this.state.search,
                onKeyPress : this.validateSearch,
              }} />
              <RaisedButton {...{
                label     : 'Buscar',
                primary   : true,
                onClick   : this.searchProduct.bind(null),
              }} />
              {
                !Product.enableGetMore ?
                <RaisedButton {...{
                  label     : 'Finalizar busqueda',
                  secondary   : true,
                  onClick   : this.getProducts.bind(null),
                }} /> : null
              }
            </div>
            <div className="col-xs-12">
              <div className="row products-container center-xs">
                {
                  products ? products.map((product, i) => {
                    return (
                      <div className="col-xs-2 center-xs" key={i}>
                        <div className="center-xs row product-item" onClick={this.selectProduct.bind(null, product)}>
                          <div className="image col-xs-12" style={{backgroundImage : `url(${product.picture})`}}>
                            <div className="shadow" />
                          </div>
                          <div className="col-xs-12">
                            <span>Código Producto</span><br />
                            <p className="base-margin-xs">{product.code}</p>
                          </div>
                          <div className="col-xs-12">
                            <span>Mi código</span><br />
                            <p className="base-margin-xs">{product.myCode}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }) :
                  <div className="col-xs-12 center-xs">
                    <span>No hemos encontrado productos</span>
                  </div>
                }
                {
                  Product.enableGetMore ?
                  <div className="col-xs-12 center-xs">
                    <RaisedButton {...{
                      label     : 'Cargar más productos',
                      primary   : true,
                      onClick   : this.getMoreProducts.bind(null),
                    }} />
                  </div> : null
                }
              </div>
            </div>
          </div>
        </div>
        {
          openEditModal ? 
            <EditProductModal {...{
              closeProductModal     : this.closeProductModal.bind(null),
              updateSelectedProduct : this.updateSelectedProduct.bind(null),
              editProduct           : this.editProduct.bind(null),
              deleteProduct         : this.deleteProduct.bind(null),
              openEditModal,
              productSelected,
            }} /> : null
        }
      </div>
    );
  }

  validateSearch = (e) => {
    if (e.key === 'Enter') {
      this.searchProduct();
    }
  }

  deleteProduct (info) {
    Product.deleteProduct(info);
  }

  editProduct (info) {
    Product.editProduct(info);
  }

  updateSelectedProduct (type, e, write) {
    Product.updateSelectedProduct(write, type);
  }

  selectProduct (product) {
    Product.selectProduct(product);
  }

  closeProductModal () {
    Product.closeProductModal();
  }

  test () {
    Product.createProductsFromExcel();
  }

  searchProduct = () => {
    Product.searchProduct(this.state.search);
  }

  getProducts = () => {
    Product.getProducts();
    this.setState({
      search : '',
    });
  }

  getMoreProducts = () => {
    Product.getMoreProducts();
  }

  setStates = (type, e) => {
    this.setState({
      [type] : e.target.value,
    });
  }

  handleDrop = (e) => {
    const rABS = true;
    e.stopPropagation(); e.preventDefault();
    const files = e.dataTransfer.files, f = files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      let data = e.target.result;
      if(!rABS) data = new Uint8Array(data);
      const workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
      _.forEach(workbook.Sheets, (sheet) => {
        Product.createProductsFromExcel(sheet);
      });
    };
    if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
  }


  openXLSX (e) {
    const rABS = true;
    e.stopPropagation(); e.preventDefault();
    const files = e.target.files, f = files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      if(!rABS) data = new Uint8Array(data);
      const workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
    };
    if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
  }
}

export default Home;
