import { combineReducers } from 'redux';

const defaultState = {
  issuedResponse: 0,
};

const test = (state = defaultState, action) => {
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        debounce_waiting: true,
        response: false,
      };
    case 'REQUEST_PENDING':
      return {
        ...state,
        debounce_waiting: false,
        request: true,
        response: false,
      };
    case 'CANCEL_REQUEST':
      return {
        ...state,
        debounce_waiting: false,
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
