import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/root_reducer';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';


const middlewares = [thunk]; 

// if (process.env.NODE_ENV !== "production") {
//   const { logger } = require("redux-logger"); 
//   middlewares.push(logger); 
// }


const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export default configureStore;