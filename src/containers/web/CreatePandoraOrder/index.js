// Third party Modules
import React, { Component } from 'react';
import { RaisedButton, FlatButton } from 'material-ui';
import {observer} from 'mobx-react';
import Workbook from 'react-excel-workbook';
import $ from 'jquery';
// import tabulador from 'jquery.tabulator';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import Excel from 'exceljs';

import PlusOne from 'material-ui/svg-icons/navigation/expand-less';
import LessOne from 'material-ui/svg-icons/navigation/expand-more';
import Forward from 'material-ui/svg-icons/content/forward';
import Delete from 'material-ui/svg-icons/action/delete-forever';


import TextField from 'material-ui/TextField';

// In-house modules
import Product from '../../../stores/Product';
import NavBar from '../../ui/NavBar';

// Styles
import Styles from './styles';
import radium from 'radium';

// Stores
import BurgerStore from '../../../stores/BurgerMenu';

require('./style.less');

@radium
@observer
class CreatePandoraOrder extends Component {
  static propTypes = {
    location : React.PropTypes.object,
  }
  constructor (props) {
    super(props);
    this.state = {
      search : '',
      find   : '',
    };
  }

  componentDidMount () {
    this.getProducts();
    const cheeseData = [
        {id : 1, type : 'Brie', rind : 'mould', age : '4 weeks', color : 'white', image : 'https://blogs.msmvps.com/theproblemsolver/files/2014/12/cropped-Maurice150.jpeg'},
    ];
    console.log(tabulador);
    $('#example-table').tabulator({
      height           : '311px',
      layout           : 'fitColumns',
      resizableColumns : false,
      columns          : [
          {title : 'Cheese', field : 'type', sorter : 'string'},
      ],
      rowFormatter : (row) => {
        const element = row.getElement();
        const data = row.getData();
        const width = element.outerWidth();
        let table = {};

          // clear current row data
        element.empty();

          // define a table layout structure and set width of row
        table = $("<table style='width:" + (width - 18) + "px;'><tr></tr></table>");

          // add image on left of row
        $('tr', table).append("<td><img src='/sample_data/row_formatter/" + data.image + "'></td>");

          // add row data on right hand side
        $('tr', table).append('<td><div><strong>Type:</strong> ' + data.type + '</div><div><strong>Age:</strong> ' + data.age + '</div><div><strong>Rind:</strong> ' + data.rind + '</div><div><strong>Colour:</strong> ' + data.color + '</div></td>');

          // append newly formatted contents to the row
        element.append(table);
      },
    });

    $('#example-table').tabulator('setData', cheeseData);
  }


  plus = (_id) => {
    Product.plus(_id);
  }

  less = (_id) => {
    Product.less(_id);
  }

  validateFind = (e) => {
    if (e.key === 'Enter') {
      this.findProduct();
    }
  }

  validateSearch = (e) => {
    if (e.key === 'Enter') {
      this.searchProduct();
    }
  }

  searchProduct = () => {
    Product.searchProduct(this.state.search);
  }

  findProduct = () => {
    Product.findProduct(this.state.find);
  }

  addOrder = (code) => {
    Product.findProduct(code);
  }

  getProducts = () => {
    Product.getProducts();
    this.setState({
      search : '',
      find   : '',
    });
  }

  getMoreProducts = () => {
    Product.getMoreProducts();
  }

  deleteOrderItem = (_id) => {
    Product.deleteOrderItem(_id);
  }

  setStates = (type, e) => {
    this.setState({
      [type] : e.target.value,
    });
  }

  exportExcell = () => {
    console.log('tengo que lograrlo');
    const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>';
    const format = (s, c) => { return s.replace(/{(\w+)}/g, (m, p) => { return c[p]; }); };
    return (table, name) => {
      let newTable = table;
      if (!newTable.nodeType) {
        newTable = document.getElementById(newTable);
      }
      const ctx = {worksheet : name || 'Worksheet', table : newTable.innerHTML};
      const blob = new Blob([format(template, ctx)]);
      const blobURL = window.URL.createObjectURL(blob);
      return blobURL;
    };
  }

  render () {
    const { order, products } = Product;
    return (
      <div id="CreateOrder" className="main-container">
        <NavBar {...{
          burgerStore : BurgerStore,
        }} />
        <div className="main-banner">
          <div className="row center-xs">
            <div className="col-xs-12 col-sm-4">
              <div className="row center-xs">
                <div className="col-xs-12 center-xs search-bar">
                  <TextField {...{
                    hintText   : 'Buscar por código del producto',
                    onChange   : this.setStates.bind(null, 'search'),
                    value      : this.state.search,
                    onKeyPress : this.validateSearch,
                  }} />
                  <RaisedButton {...{
                    label   : 'Buscar',
                    primary : true,
                    onClick : this.searchProduct.bind(null),
                  }} />
                </div>
                <div className="col-xs-12 center-xs">
                  <div className="row products-container center-xs">
                    {
                      products ? products.map((product, i) => {
                        return (
                          <div className="col-xs-12 center-xs" key={i}>
                            <div className="center-xs row product-item vertical-center">
                              <div className="image col-xs-2" style={{backgroundImage : `url(${product.picture})`}} />
                              <div className="col-xs-4">
                                <span>Código Producto</span><br />
                                <p className="base-margin-xs">{product.code}</p>
                              </div>
                              <div className="col-xs-4">
                                <span>Mi código</span><br />
                                <p className="base-margin-xs">{product.myCode}</p>
                              </div>
                              <div className="col-xs-2">
                                <FlatButton
                                  icon={<Forward />}
                                  className="add-button"
                                  onClick= {this.addOrder.bind(null, product.code)}
                                />
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
                      Product.enableGetMore &&
                      <div className="col-xs-12 center-xs">
                        <RaisedButton {...{
                          label   : 'Cargar más productos',
                          primary : true,
                          onClick : this.getMoreProducts.bind(null),
                        }} />
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <div className="col-xs-12 center-xs search-bar">
                <TextField {...{
                  hintText   : 'Buscar por código del producto',
                  onChange   : this.setStates.bind(null, 'find'),
                  value      : this.state.find,
                  onKeyPress : this.validateFind,
                }} />
                <RaisedButton {...{
                  label   : 'Agregar',
                  primary : true,
                  onClick : this.findProduct.bind(null),
                }} />
                <RaisedButton {...{
                  label   : 'Exportar Excell',
                  primary : true,
                  onClick : this.exportExcell.bind(null),
                }} />
                <div id="example-table" />
                {
                // <a href="#" onClick={this.downloadCSV.bind(null, { filename : 'stock-data.csv' })}>Download CSV</a>
                //   <div>
                //   <ReactHTMLTableToExcel
                //       id="test-table-xls-button"
                //       className="download-table-xls-button"
                //       table="table-to-xls"
                //       filename="tablexls"
                //       sheet="tablexls"
                //       buttonText="Download as XLS"/>
                //   <table id="table-to-xls" width="500px">
                //     <tbody>
                //       <tr className="test">
                //           <th className="test">Picture</th>
                //           <th className="test">Firstname</th>
                //           <th className="test">Lastname</th>
                //           <th className="test">Age</th>
                //       </tr>
                //       <tr className="test">
                //           <td className="test"><img src="https://blogs.msmvps.com/theproblemsolver/files/2014/12/cropped-Maurice150.jpeg" /></td>
                //           <td className="test"><div style="height:40px; overflow:hidden">Sample</div></td>
                //           <td className="test"><div style="height:40px; overflow:hidden">Sample</div></td>
                //           <td className="test"><div style="height:40px; overflow:hidden">Sample</div></td>
                //       </tr>
                //       <tr className="test">
                //           <td className="test"><img src="https://blogs.msmvps.com/theproblemsolver/files/2014/12/cropped-Maurice150.jpeg" /></td>
                //           <td className="test"><div style="height:40px; overflow:hidden">Sample</div></td>
                //           <td className="test"><div style="height:40px; overflow:hidden">Sample</div></td>
                //           <td className="test"><div style="height:40px; overflow:hidden">Sample</div></td>
                //       </tr>
                //     </tbody>
                //   </table>

                // </div>
              }
              </div>
              <div className="col-xs-12 center-xs">
                <div className="row products-container center-xs">
                  {
                    order && order.map((product, i) => {
                      return (
                        <div className="col-xs-12 center-xs" key={i}>
                          <div className="center-xs row product-item vertical-center">
                            <div className="image col-xs-1" style={{backgroundImage : `url(${product.picture})`}} />
                            <div className="col-xs-3">
                              <span>Código local</span><br />
                              <p className="base-margin-xs">{product.code}</p>
                            </div>
                            <div className="col-xs-3">
                              <span>Mi código</span><br />
                              <p className="base-margin-xs">{product.myCode}</p>
                            </div>
                            <div className="col-xs-3">
                              <span>Cantidad</span><br />
                              <div className="row">
                                <div className="col-xs-4">
                                  <LessOne {...{
                                    className : 'count-icon',
                                    onClick   : this.less.bind(null, product._id),
                                  }} />
                                </div>
                                <div className="col-xs-4">
                                  <p className="base-margin-xs count">{product.count}</p>
                                </div>
                                <div className="col-xs-4">
                                  <PlusOne {...{
                                    className : 'count-icon',
                                    onClick   : this.plus.bind(null, product._id),
                                  }} />
                                </div>
                              </div>
                            </div>
                            <div className="col-xs-1">
                              <FlatButton
                                icon={<Delete />}
                                className="delete-button"
                                onClick= {this.deleteOrderItem.bind(null, product._id)}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // exportExcel = () => {
  //   /* bookType can be any supported output type */
  //   const wopts = { bookType : 'xlsx', bookSST : false, type : 'array' };

  //   const wbout = XLSX.write(workbook, wopts);

  //   /* the saveAs call downloads a file on the local machine */
  //   saveAs(new Blob([wbout], {type : 'application/octet-stream'}), 'test.xlsx');
  // }

  printIcon = (cell, formatterParams)  =>{ // plain text value
    return "<img src='https://blogs.msmvps.com/theproblemsolver/files/2014/12/cropped-Maurice150.jpeg' />";
  };
  convertArrayOfObjectsToCSV = (args) => {
    let result = {};
    let ctr = 0;
    let keys = {};
    let columnDelimiter = '';
    let lineDelimiter = '';
    let data = {};

    data = args.data || null;
    if (data === null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach((item) => {
      ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  downloadCSV = (args) => {
    console.log(args);
    let data = {};
    let filename = {};
    let link = {};

    const stockData = [
      {
        Symbol  : 'AAPL',
        Company : 'Apple Inc.',
        Price   : '132.54',
      },
      {
        Symbol  : 'INTC',
        Company : 'Intel Corporation',
        Price   : '33.45',
      },
      {
        Symbol  : 'GOOG',
        Company : 'Google Inc',
        Price   : '554.52',
      },
    ];
    let csv = this.convertArrayOfObjectsToCSV({
      data : stockData,
    });
    if (csv === null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }


}

export default CreatePandoraOrder;
