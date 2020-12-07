import {createStore, combineReducers} from 'redux';
import infoReducer from './reducers/infoReducer';

const rootReducer = combineReducers({userInfo: infoReducer});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
