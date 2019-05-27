import {
  wsInvalidState,
  wsReceived,
  wsStateChanged,
} from 'fm3/actions/websocketActions';
import * as at from 'fm3/actionTypes';

let ws = { readyState: 3 };
let restarter;

function resetRestarter() {
  if (restarter) {
    clearTimeout(restarter);
  }
  restarter = setTimeout(() => {
    ws.close();
  }, 45000);
}

export default ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case at.WS_OPEN: {
      if (ws.readyState < 3) {
        dispatch(wsInvalidState(action.payload));
        return;
      }

      const { user } = getState().auth;
      ws = new WebSocket(
        `${process.env.API_URL.replace(/^http/, 'ws')}/ws?pingInterval=30000${
          user ? `&authToken=${user.authToken}` : ''
        }`,
      );
      dispatch(wsStateChanged(ws.readyState));

      ws.addEventListener('open', ({ target }) => {
        if (ws === target) {
          resetRestarter();
          dispatch(wsStateChanged(target.readyState));
        }
      });

      ws.addEventListener('close', ({ target, code }) => {
        if (ws === target) {
          clearTimeout(restarter);
          restarter = null;
          dispatch(wsStateChanged(target.readyState, code));
        }
      });

      ws.addEventListener('message', ({ target, data }) => {
        if (ws === target) {
          resetRestarter();
          if (data !== 'ping') {
            dispatch(wsReceived(data));
          }
        }
      });
      break;
    }
    case at.WS_SEND:
      if (ws.readyState === 1) {
        ws.send(JSON.stringify(action.payload.message));
      } else {
        dispatch(wsInvalidState(action.payload.tag));
        return;
      }
      break;
    case at.WS_CLOSE:
      if (ws.readyState < 3) {
        ws.close();
      } else {
        dispatch(wsInvalidState(action.payload));
        return;
      }
      break;
    default:
      break;
  }

  const user = getState().auth;

  next(action);

  if (user !== getState().auth && ws.readyState < 2) {
    ws.close();
  }
};
