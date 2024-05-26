// src/store/websocketMiddleware.ts
import { Middleware } from 'redux';
import { sendWebSocketMessage } from './webSocket';
import { sendMessage } from './webSocketActions';
import { setLoading, setResponse } from './webSocketSlice';

const websocketMiddleware: Middleware =
  (storeAPI: {
    dispatch: (arg0: {
      payload: any;
      type: 'websocket/setLoading' | 'websocket/setResponse';
    }) => void;
  }) =>
  (next: (arg0: any) => any) =>
  async (action: unknown) => {
    if (sendMessage.match(action)) {
      storeAPI.dispatch(setLoading(true));
      try {
        const response = await sendWebSocketMessage(action.payload);
        storeAPI.dispatch(setResponse(response));
      } catch (error) {
        console.error(error);
        storeAPI.dispatch(setLoading(false));
      }
    }
    return next(action);
  };

export default websocketMiddleware;
