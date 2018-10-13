import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import reducers from '../reducers';
import thunk from 'redux-thunk'


const createMidleware = () => {
  const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  return composeEnhancers(autoRehydrate(), applyMiddleware(thunk));
};

export default (initialState: Object) => {
  const reducer = reducers;
  const middleware = createMidleware();

  const store = createStore(reducer, initialState, middleware);

  if (typeof window !== 'undefined') {
    persistStore(store);
    window.store = store;
  }

  return store;
};
