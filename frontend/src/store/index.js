import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// devtools
import { composeWithDevTools } from 'redux-devtools-extension';


import rootReducer from './reducers';

let middleware = [thunk]

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development' ?
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
    :
    applyMiddleware(...middleware)
);

export default store;