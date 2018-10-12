// import {createStore, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import reducers from '../reducers'

// export default () => {
//   let middlewares = [thunk]
//   let store = createStore(reducers, applyMiddleware(...middlewares))
//   return store
// }

// @flow

import { applyMiddleware, compose, createStore } from 'redux';
// $FlowFixMe
import { autoRehydrate, persistStore } from 'redux-persist';
import reducers from '../reducers';
import thunk from 'redux-thunk'


const createMidleware = () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  /* eslint-enable */
  return composeEnhancers(autoRehydrate(), applyMiddleware(thunk));
};

export type AppState = {
  game: Object,
};

export type ActionDeps = {
  apiClient: typeof apiClient,
  dispatch: Object => Object,
  getState: () => AppState,
};

export default (initialState: Object) => {
  const reducer = reducers;
  const middleware = createMidleware();

  // one shared Store object for the whole application
  const store = createStore(reducer, initialState, middleware);

  if (typeof window !== 'undefined') {
    persistStore(store);
    // put redux store into global window
    window.store = store;
  }

  return store;
};
