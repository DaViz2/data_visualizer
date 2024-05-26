import { connect, disconnect, receiveMessage } from './webSocketSlice';
import type { AppDispatch } from '../../store/index';

import webSocketConfig from './config.json';

/**
 * websocket.ts
 * WebSocket을 서버에 연결하고, 메시지를 보내고 받는 함수를 정의
 */

let socket: WebSocket | null = null;

// Map to store pending requests
const pendingRequests = new Map<string, (response: any) => void>();

// WebSocket을 초기화하는 함수
export const initWebSocket = (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    socket = new WebSocket(
      `ws://${webSocketConfig.server.host}:${webSocketConfig.server.port}`,
    );

    // socket이 열리면 store에 connect action을 dispatch
    socket.onopen = () => {
      dispatch(connect());
      resolve(0);
    };

    socket.onerror = (error) => {
      reject(error);
    };

    // socket이 닫히면 store에 disconnect action을 dispatch
    socket.onclose = () => {
      dispatch(disconnect());
    };

    // socket으로부터 메시지를 받으면 store에 receiveMessage action을 dispatch
    socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.requestId && pendingRequests.has(data.requestId)) {
        // Resolve the pending request
        pendingRequests.get(data.requestId)!(data);
        pendingRequests.delete(data.requestId);
      } else {
        dispatch(receiveMessage(data));
      }
    };
  });
};

// Generate a unique ID for each request
const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// 메시지를 보내는 함수
export const sendWebSocketMessage = (message: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const requestId = generateUniqueId();
      pendingRequests.set(requestId, resolve);
      socket.send(JSON.stringify({ ...message, requestId }));
    } else {
      reject(new Error('WebSocket is not open'));
    }
  });
};
