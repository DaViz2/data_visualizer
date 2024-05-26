import { connect, disconnect, receiveMessage } from './webSocketSlice';
import type { AppDispatch } from '../../store/index';

import webSocketConfig from './config.json';

let socket: WebSocket | null = null;

// WebSocket을 초기화하는 함수
export const initWebSocket = (dispatch: AppDispatch) => {
  socket = new WebSocket(
    `ws://${webSocketConfig.server.host}:${webSocketConfig.server.port}`,
  );

  // socket이 열리면 store에 connect action을 dispatch
  socket.onopen = () => {
    dispatch(connect());
  };

  // socket이 닫히면 store에 disconnect action을 dispatch
  socket.onclose = () => {
    dispatch(disconnect());
  };

  // socket으로부터 메시지를 받으면 store에 receiveMessage action을 dispatch
  socket.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    dispatch(receiveMessage(data));
  };
};

// 메시지를 보내는 함수
export const sendWebSocketMessage = (message: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};
