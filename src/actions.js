import 'rxjs';
import { Observable } from 'rxjs';

const REQUEST = 'REQUEST';
const RESPONSE = 'RESPONSE';
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
  // .debounceTime(600)
  // .map(action => wait(response(random()))
    .switchMap(action =>
      Observable.fromPromise(wait())
        .map((timeout) => response())
        .takeUntil(action$.ofType(CANCEL_REQUEST))
    )
}

// export const fetchUserEpic = action$ =>
//   action$.ofType(REQUEST)
//     .mergeMap(action =>
//       ajax.getJSON(`https://api.github.com/users/${action.payload}`)
//       .map(response => fetchUserFulfilled(response))
//     );
