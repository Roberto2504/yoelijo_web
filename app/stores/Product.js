// Third party modules
import axios from 'axios';
import { observable, action, runInAction, useStrict } from 'mobx';
import Async from 'async';
import _ from 'lodash';

// Stores
import SnackBarStore from './SnackBar';

// In-house-modules
import Constants from '../utils/constants';

import { Productos } from './productos';
import Loader from './Loader';

const { apiUrl } = Constants;

useStrict(true);

class ProductStore {
  @observable products = [];
  @observable order = [];
  @observable pageProducts = 1;
  @observable productFound = {};
  @observable enableGetMore = true;
  @observable openEditModal = false;

  setProperty (type) {
    return {
      0 : editProduct,
      1 : 'myCode',
    }[type];
  }

  @action editProduct = async (info) => {
    try {
      Loader.toggleLoader();
      const { status, data } = await axios.post('product/updateProduct', info);
      runInAction('reload product', () => {
        const products = this.products;
        const productIndex = _.findIndex(products,  {'_id' : info._id});
        products[productIndex].code = info.code;
        products[productIndex].myCode = info.myCode;
        this.products = products;
        this.openEditModal = false;
      });
      SnackBarStore.setMessage('El producto ha sido editado correctamente');
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    } finally {
      Loader.toggleLoader();
    }
  }

  @action plus = (_id) => {
    try {
      Loader.toggleLoader();
      const order = this.order.map(p => {
        p._id === _id ? p.count += 1 : null;
        return p;
      });
      this.order = order;
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    } finally {
      Loader.toggleLoader();
    }
  }

  @action less = (_id) => {
    try {
      Loader.toggleLoader();
      const order = this.order.map(p => {
        p._id === _id && p.count !== 0 ? p.count -= 1 : null;
        return p;
      });
      this.order = order;
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    } finally {
      Loader.toggleLoader();
    }
  }

  @action findProduct = async (seeker, _id) => {
    try {
      Loader.toggleLoader();
      let order = this.order;
      const exist = order.find(product => product.code === seeker || product.myCode === seeker );
      if (exist) {
        order = this.order.map(p => {
          p._id === exist._id ? p.count += 1 : null;
          return p;
        });
        this.order = order;
      } else {
        const { status, data } = await axios.post('product/findProduct', {seeker});
        runInAction('reload product', () => {
          if (status === 200) {
            response.count = 1;
            order.push(data.response);
            this.order = order;
            SnackBarStore.setMessage('El producto ha sido agregado correctamente');
          } else {
            SnackBarStore.setMessage('No se ha encontrado ninguna coincidencia');
          }
        });
      }
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    } finally {
      Loader.toggleLoader();
    }
  }

  @action deleteProduct = async (info) => {
    try {
      Loader.toggleLoader();
      const { status, data } = await axios.post('product/deleteProduct', info);
      runInAction('reload product', () => {
        const products = this.products;
        const productIndex = _.findIndex(products,  {'_id' : info._id});
        products.splice(productIndex, 1);
        this.products = products;
        this.openEditModal = false;
      });
      SnackBarStore.setMessage('El producto ha sido eliminado correctamente');
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    } finally {
      Loader.toggleLoader();
    }
  }

  @action selectProduct = (product) => {
    this.productSelected = product;
    this.openEditModal = true;
  }

  @action closeProductModal = () => {
    this.openEditModal = false;
  }

  @action createProductsFromExcel = async (sheet) => {
    try {
      let lenght = sheet['!ref'].split(':');
      lenght = Number(lenght[1][0].charCodeAt(0) - 97) - Number(lenght[0][0].charCodeAt(0) - 97);
      let count = 0;
      let object = {};
      const products = [];
      delete sheet['!margins'];
      delete sheet['!ref'];
      const canvas = document.createElement('CANVAS');
      const img = document.createElement('img');
      _.forEach(sheet, (row) => {
        object[this.setProperty(count)] = row.v;
        count ++;
        if (count > lenght) {
          products.push(object);
          count = 0;
          object = {};
        }
      });
      const newProducts = products.map((product, i) => {
        const p = Productos.find(product => product.id === i + 2);
        return {
          code    : String(product.code),
          myCode  : String(product.myCode),
          picture : p ? p.src : 'undefine',
        };
      });
      this.createProducts(newProducts);
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    }
  }

  createProducts = (products) => {
    return new Promise(async (resolve, reject) => {
      try {
        Async.eachSeries(products, async (product, callback) => {
          try {
            const { status, data } = await axios.post('apiUrl}product/createProduct', product); 
            callback(null);
          } catch (err) {
            callback(err);
          }
        }, (error) => {
          if (error) {
            reject(error);
          }
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  @action searchProduct = async (code) => {
    try {
      Loader.toggleLoader();
      const { status, data } = await axios.get(`product/search/${code}`);
      runInAction('reload product', () => {
        this.products = data.response;
        this.pageProducts = 1;
        this.enableGetMore = false;
      });
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    } finally {
      Loader.toggleLoader();
    }
  }

  @action getProducts = async () => {
    try {
      Loader.toggleLoader();
      const info = {
        page  : this.pageProducts,
        limit : 20,
      };
      const { status, data } = await axios.post('product/getProducts', info);
      runInAction('reload product', () => {
        this.products = data.response;
        this.pageProducts += 1;
        this.enableGetMore = true;
      });
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    } finally {
      Loader.toggleLoader();
    }
  }

  @action getMoreProducts = async () => {
    try {
      const info = {
        page  : this.pageProducts,
        limit : 20,
      };
      Loader.toggleLoader();
      const { status, data } = await axios.post('product/getProducts', info);
      runInAction('reload product', () => {
        this.products = [...this.products, ...data.response];
        this.pageProducts += 1;
      });
    } catch (err) {
      SnackBarStore.setMessage(err.message);
    } finally {
      Loader.toggleLoader();
    }
  }
}

const productStore = new ProductStore();

export default productStore;
