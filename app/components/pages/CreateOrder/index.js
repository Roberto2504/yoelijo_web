// Third party Modules
import React, { Component } from 'react';
import { AppBar, RaisedButton } from 'material-ui';
import {observer} from 'mobx-react';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import Workbook from 'react-excel-workbook';

import Check from 'material-ui/svg-icons/action/check-circle';
import PlusOne from 'material-ui/svg-icons/navigation/expand-less';
import LessOne from 'material-ui/svg-icons/navigation/expand-more';
import _ from 'lodash';


import TextField from 'material-ui/TextField';

// In-house modules
import Product from '../../../stores/Product';
import NavBar from '../../ui/NavBar';

// Styles
import Styles from './styles';
import radium from 'radium'

require('./style.less');

@radium
@observer
class CreateOrder extends Component {
  static propTypes = {
    location : React.PropTypes.object,
  }
  constructor (props) {
    super(props);
    this.state = {
      search : '',
    };
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
    const { order } = Product;
    const data1 = [
      {
        foo: 'url(https://lh4.googleusercontent.com/Hs0NsN6NO3ZuZSPdh4gggIHs-yp5GwhI9wgdDA76h…rNpWoyYxN7HVKXfLIBHy35y3MWKVSezJfJsfP2Vj8X3vb_OGIZyJBq32gTEMJ2Ep7jSkMbZK-g)',
        bar: '456',
        baz: '789'
      },
      {
        foo: 'abc',
        bar: 'dfg',
        baz: 'hij'
      },
      {
        foo: 'aaa',
        bar: 'bbb',
        baz: 'ccc'
      }
    ]

    const data2 = [
      {
        aaa: 1,
        bbb: 2,
        ccc: 3
      },
      {
        aaa: 4,
        bbb: 5,
        ccc: 6
      }
    ]
    return (
      <div id="CreateOrder">
        <NavBar />
        <div className="main-banner padding-nav-bar">
          <div className="row center-xs">
            <div className="col-xs-12 text-center">
              <Workbook filename="example.xlsx" element={<button className="btn btn-lg btn-primary">Try me!</button>}>
                <Workbook.Sheet data={() => data1} name="Sheet A">
                  <Workbook.Column label="Foo" value="foo"/>
                  <Workbook.Column label="Bar" value="bar"/>
                </Workbook.Sheet>
                <Workbook.Sheet data={data2} name="Another sheet">
                  <Workbook.Column label="Double aaa" value={row => row.aaa * 2}/>
                  <Workbook.Column label="Cubed ccc " value={row => Math.pow(row.ccc, 3)}/>
                </Workbook.Sheet>
              </Workbook>
            </div>
            <div className="col-xs-10 center-xs search-bar">
              <TextField {...{
                hintText   : 'Buscar por código del producto',
                onChange   : this.setStates.bind(null, 'search'),
                value      : this.state.search,
                onKeyPress : this.validateSearch,
              }} />
              <RaisedButton {...{
                label     : 'Agregar',
                primary   : true,
                onClick   : this.findProduct.bind(null),
              }} />
              <RaisedButton {...{
                label     : 'Exportar excel',
                primary   : true,
                onClick   : this.writeToXLSX.bind(null),
              }} />
            </div>
            <div className="col-xs-12">
              <div className="row products-container center-xs">
                {
                  order ? order.map((product, i) => {
                    return (
                      <div className="col-xs-2 center-xs" key={i}>
                        <div className="center-xs row product-item">
                          <div className="image col-xs-12" style={{backgroundImage : `url(${product.picture})`}}>
                            <div className="shadow" />
                          </div>
                          <div className="col-xs-12">
                            <span>Código local</span><br />
                            <p className="base-margin-xs">{product.code}</p>
                          </div>
                          <div className="col-xs-12">
                            <span>Mi código</span><br />
                            <p className="base-margin-xs">{product.myCode}</p>
                          </div>
                          <div className="col-xs-12">
                            <span>Cantidad</span><br />
                          </div>
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
                    );
                  }) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  exportExcel = () => {
    /* bookType can be any supported output type */
    var wopts = { bookType:'xlsx', bookSST:false, type:'array' };

    var wbout = XLSX.write(workbook,wopts);

    /* the saveAs call downloads a file on the local machine */
    saveAs(new Blob([wbout],{type:"application/octet-stream"}), "test.xlsx");
  }

  plus = (_id) => {
    Product.plus(_id);
  }

  less = (_id) => {
    Product.less(_id);
  }

  validateSearch = (e) => {
    if (e.key === 'Enter') {
      this.findProduct();
    }
  }

  findProduct = () => {
    Product.findProduct(this.state.search);
  }

  getProducts = () => {
    Product.getProducts();
    this.setState({
      search : '',
    });
  }

  setStates = (type, e) => {
    this.setState({
      [type] : e.target.value,
    });
  }

  writeToXLSX = () => {
  //  var ext = !!process.argv[2];

    /* original data */
    var data = [
      // [1, 2, 3],
      [true, false, null, "sheetjs"],
      ["foo    bar", "baz", new Date("2014-02-19T14:30Z"), "0.3"],
      ["baz", null, "\u0BEE", 3.14159],
      ["hidden"],
      ["visible"]
    ];

    var ws_name = "SheetJS";

    var wscols = [
      {wch: 6}, // "characters"
      {wpx: 50}, // "pixels"
      ,
      {hidden: true} // hide column
    ];

    /* At 96 PPI, 1 pt = 1 px */
    var wsrows = [
      {hpt: 12}, // "points"
      {hpx: 16}, // "pixels"
      ,
      {hpx: 24, level:3},
      {hidden: true}, // hide row
      {hidden: false}
    ];

    // console.log("Sheet Name: " + ws_name);
    // console.log("Data: ");
    // var i = 0;
    // for(i = 0; i !== data.length; ++i) console.log(data[i]);
    // console.log("Columns :");
    // for(i = 0; i !== wscols.length; ++i) console.log(wscols[i]);

    /* require XLSX */
    /* blank workbook constructor */
    /*
    var wb = { SheetNames: [], Sheets: {} };
    */
    var wb = XLSX.utils.book_new();

    /* convert an array of arrays in JS to a CSF spreadsheet */
    var ws = XLSX.utils.aoa_to_sheet(data, {cellDates:true});

    /* TEST: add worksheet to workbook */
    /*
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* TEST: simple formula */
    // ws['C1'].f = "A1+B1";
    // ws['C2'] = {t:'n', f:"A1+B1"};

    /* TEST: single-cell array formula */
    /*
    ws['D1'] = {t:'n', f:"SUM(A1:C1*A1:C1)", F:"D1:D1"};
    */
    // XLSX.utils.sheet_set_array_formula(ws, 'D1:D1', "SUM(A1:C1*A1:C1)");

    /* TEST: multi-cell array formula */
    /*
    ws['E1'] = {t:'n', f:"TRANSPOSE(A1:D1)", F:"E1:E4"};
    ws['E2'] = {t:'n', F:"E1:E4"};
    ws['E3'] = {t:'n', F:"E1:E4"};
    ws['E4'] = {t:'n', F:"E1:E4"};
    */
    // XLSX.utils.sheet_set_array_formula(ws, 'E1:E4', "TRANSPOSE(A1:D1)");
    // ws["!ref"] = "A1:E6";

    /* TEST: column props */
    ws['!cols'] = wscols;

    /* TEST: row props */
    ws['!rows'] = wsrows;

    /* TEST: hyperlink note: Excel does not automatically style hyperlinks */
    /*
    ws['A4'].l = { Target: "#E2" };
    */
    // XLSX.utils.cell_set_internal_link(ws['A4'], "E2");
    /*
    ws['A3'].l = { Target: "http://sheetjs.com", Tooltip: "Visit us <SheetJS.com!>" };
    */
    // XLSX.utils.cell_set_hyperlink(ws['A3'], "http://sheetjs.com", "Visit us <SheetJS.com!>");

    /* TEST: built-in format */
    /*
    ws['B1'].z = "0%"; // Format Code 9
    */
    // XLSX.utils.cell_set_number_format(ws['B1'], "0%");

    // /* TEST: custom format */
    // var custfmt = "\"This is \"\\ 0.0";
    /*
    ws['C2'].z = custfmt;
    */
    // XLSX.utils.cell_set_number_format(ws['C2'], custfmt);

    /* TEST: page margins */
    // ws['!margins'] =  { left:1.0, right:1.0, top:1.0, bottom:1.0, header:0.5, footer:0.5 };

    /* TEST: merge cells */
    // ws['!merges'] = [ XLSX.utils.decode_range("A6:C6") ];

    // console.log("JSON Data:");
    // console.log(XLSX.utils.sheet_to_json(ws, {header:1}));

    /* TEST: hidden sheets */
    /*
    wb.SheetNames.push("Hidden");
    wb.Sheets["Hidden"] = XLSX.utils.aoa_to_sheet(["Hidden".split(""), [1,2,3]]);
    wb.Workbook = {Sheets:[]};
    wb.Workbook.Sheets[1] = {Hidden:1};
    */
    // var data_2 = ["Hidden".split(""), [1,true,3,'a',,'c'], [2,false,true,'sh33t',,'j5']];
    // XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(data_2), "Hidden");
    // XLSX.utils.book_set_sheet_visibility(wb, "Hidden", XLSX.utils.consts.SHEET_HIDDEN);

    /* TEST: properties */
    // wb.Props = {
    //   Title: "SheetJS Test",
    //   Subject: "Tests",
    //   Author: "Devs at SheetJS",
    //   Manager: "Sheet Manager",
    //   Company: "SheetJS",
    //   Category: "Experimentation",
    //   Keywords: "Test",
    //   Comments: "Nothing to say here",
    //   LastAuthor: "Not SheetJS",
    //   CreatedDate: new Date(2017,1,19)
    // };

    /* TEST: comments */
    /*
    ws['A4'].c = [];
    ws['A4'].c.push({a:"SheetJS",t:"I'm a little comment, short and stout!\n\nWell, Stout may be the wrong word"});
    */
    // XLSX.utils.cell_add_comment(ws['A4'], "I'm a little comment, short and stout!\n\nWell, Stout may be the wrong word", "SheetJS");

    /* TEST: sheet protection */
    // ws['!protect'] = {
    //   password:"password",
    //   /* enable formatting rows and columns */
    //   formatRows:false,
    //   formatColumns:false,
    //   /* disable editing objects and scenarios */
    //   objects:true,
    //   scenarios:true
    // };

    /* TEST: Workbook Properties */
    // if(!wb.Workbook) wb.Workbook = {Sheets:[], WBProps:{}};
    // if(!wb.Workbook.WBProps) wb.Workbook.WBProps = {};
    // wb.Workbook.WBProps.filterPrivacy = true;
    // if(ext) wb.Workbook.Views = [{RTL:true}];

    // console.log("Worksheet Model:");
    // console.log(ws);

    // var filenames = [
    //   ['sheetjs.xlsx', {bookSST:true}],
    //   ['sheetjs.xlsm'],
    //   ['sheetjs.xlsb'],
    //   ['sheetjs.xlam'],
    //   ['sheetjs.biff8.xls', {bookType:'xls'}],
    //   ['sheetjs.biff5.xls', {bookType:'biff5'}],
    //   ['sheetjs.biff2.xls', {bookType:'biff2'}],
    //   ['sheetjs.xml.xls', {bookType:'xlml'}],
    //   ['sheetjs.xla'],
    //   ['sheetjs.ods'],
    //   ['sheetjs.fods'],
    //   ['sheetjs.csv'],
    //   ['sheetjs.txt'],
    //   ['sheetjs.slk'],
    //   ['sheetjs.eth'],
    //   ['sheetjs.htm'],
    //   ['sheetjs.dif'],
    //   ['sheetjs.dbf', {sheet:"Hidden"}],
    //   ['sheetjs.rtf'],
    //   ['sheetjs.prn']
    // ];

    // XLSX.writeFile(wb, 'out.xlsx', ws);
    // const worksheet = XLSX.utils.json_to_sheet(data);
    // const workbook = { Sheets: { 'data': data }, SheetNames: ['data'] };
    // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    // // this.saveAsExcelFile(excelBuffer, excelFileName);
    // FileSaver.saveAs(new Blob([excelBuffer],{type:""}), "test.xlsx");
    /* the saveAs call downloads a file on the local machine */
    // var wopts = {bookType:'xlsx', bookSST:false, type: 'binary'};
    // var outfile = XLSX.write(wb, wopts);
    // // console.log(outfile,'hello', FileSaver);
    // // var new_wb = XLSX.read(outfile, {type:'binary'});
    // FileSaver.saveAs(new Blob([outfile],{type:""}), "test.xlsx");
    // FileSaver.saveAs(new Blob([s2ab(outfile)],{type: ""}), "test.xlsx")
    // console.log(outfile, new_wb, wb);
    // filenames.forEach(function(r) {
    //     /* write file */
    //     XLSX.writeFile(wb, r[0], r[1]);
    //     /* test by reading back files */
    //     XLSX.readFile(r[0]);
    // });

    var writer = new XLSXWriter('mySpreadsheet.xlsx', {} /* options */);

// After instantiation, you can grab the readstream at any time.
    writer.getReadStream().pipe(fs.createWriteStream('mySpreadsheet.xlsx'));

    // Add some rows
    writer.addRow({
        "Name": "Bob",
        "Location": "Sweden"
    });
    writer.addRow({
        "Name": "Alice",
        "Location": "France"
    });

    // Add a row with a hyperlink
    writer.addRow({
        "Name": {value: "Bill", hyperlink: "http://www.thegatesnotes.com"},
        "Location": "Seattle, Washington"
    })

    // Optional: Adjust column widths
    writer.defineColumns([
        { width: 30 }, // width is in 'characters'
        { width: 10 }
    ])

    // Finalize the spreadsheet. If you don't do this, the readstream will not end.
    writer.finalize();
 }

//  otherTest = () => {
//    console.log(Workbook);
//     var workbook = new Workbook();
//     var sales = workbook.add("Sales");
//     var costs = workbook.add("Costs");
    
//     sales[0][0] = 304.50;
//     sales[1][0] = 159.24;
//     sales[2][0] = 493.38;
    
//     costs[0][0] = 102.50;
//     costs[1][0] = 59.14;
//     costs[2][0] = 273.32;
    
//     // automatically appends the '.xlsx' extension 
//     workbook.save("Revenue-Summary");
//  }
}

export default CreateOrder;
