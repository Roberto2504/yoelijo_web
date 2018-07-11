import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';

import apolloClient from 'graphql/client';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const isProduction = process.env.NODE_ENV === 'production';
const middlewareWithHistory = routerMiddleware(browserHistory);
const composeEnhancers = (!isProduction && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(applyMiddleware(
  apolloClient.middleware(),
  thunkMiddleware.withExtraArgument(apolloClient),
  middlewareWithHistory,
));
const allReducers = combineReducers({
  reducers,
  apollo  : apolloClient.reducer(),
  routing : routerReducer,
});

export default function configureStore (initialState) {
  const store = createStore(allReducers, initialState, enhancer);

  if (isProduction && module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)); // eslint-disable-line global-require
  }
  return store;
}
