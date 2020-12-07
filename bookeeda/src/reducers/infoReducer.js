import {LOGIN} from '../actions/types';

const initialState = {
  userInfo: {},
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default infoReducer;
