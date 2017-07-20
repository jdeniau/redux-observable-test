import 'rxjs';
import { Observable } from 'rxjs';

const REQUEST = 'REQUEST';
const RESPONSE = 'RESPONSE';
const REQUEST_PENDING = 'REQUEST_PENDING';
const CANCEL_REQUEST = 'CANCEL_REQUEST';

function random() {
  return 500 + Math.ceil(Math.random() * 1000);
}

function request() {
  return {
    type: REQUEST,
  };
}

function response() {
  return {
    type: RESPONSE,
  };
}

function wait() {
  return new Promise((resolve) => {
    const timeout = random();

    return setTimeout(
      () => { resolve(timeout); },
      timeout
    );
  });
}

export const cancelRequest = () => ({ type: CANCEL_REQUEST });


export function doFetch(nbClick) {
  return dispatch => {
    dispatch(request());

    // wait().then(() => dispatch(response(nbClick)));
  }
}

export const doFetchEpic = action$ => {
  return action$.ofType(REQUEST)
    .debounceTime(2000) // wait x ms to avoid sending to many request on "click-click-click"
    .switchMap(() => // take only the latest REQUEST and do
      Observable.of({ type: REQUEST_PENDING }) // dispatch a REQUEST_PENDING action
      .concat( // and add the following action
        Observable.fromPromise(wait()).map((timeout) => response()) // which will simulate an http call and trigger the response
      )
    )
    .takeUntil(action$.ofType(CANCEL_REQUEST)) // cancel the Epic if CANCEL_REQUEST is triggered
}
