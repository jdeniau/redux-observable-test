import { combineReducers } from 'redux';

const defaultState = {
  issuedResponse: 0,
};

const test = (state = defaultState, action) => {
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        request: true,
        response: false,
      };
    case 'CANCEL_REQUEST':
      return {
        ...state,
        request: false,
        response: true,
      };
    case 'RESPONSE':
      return {
        ...state,
        request: false,
        response: true,
        issuedResponse: state.issuedResponse + 1,
      };
    default:
      return state
  }
}

export default combineReducers({ test });
