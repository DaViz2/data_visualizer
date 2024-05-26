/* eslint-disable import/prefer-default-export */
import { createAction } from '@reduxjs/toolkit';

// WebSocket 메세지 전송 액션 생성자 함수 (실제 전송은 미들웨어에서 처리)
// 리듀서는 상태 업데이트만 담당하므로, 메시지 전송은 미들웨어에서 처리
export const sendMessage = createAction<any>('websocket/sendMessage');
