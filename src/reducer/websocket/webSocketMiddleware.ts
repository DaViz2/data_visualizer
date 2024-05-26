// src/store/websocketMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { sendWebSocketMessage } from './webSocket';
import { sendMessage } from './webSocketActions';

// 미들웨어 함수 정의
const websocketMiddleware: Middleware = () => (next) => (action) => {
  if (sendMessage.match(action)) {
    // 메시지 전송 액션인 경우, WebSocket 메시지 전송 함수 호출
    sendWebSocketMessage(action.payload);
  }
  return next(action);
};

export default websocketMiddleware;
