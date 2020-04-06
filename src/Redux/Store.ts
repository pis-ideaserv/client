import { createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers';


const initialState = {};

const middleware = [thunk];

const a = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  initialState,
  a ? 
    compose(
      applyMiddleware(...middleware),a
    )
    :
    compose(
      applyMiddleware(...middleware),
    )
);

export default store;