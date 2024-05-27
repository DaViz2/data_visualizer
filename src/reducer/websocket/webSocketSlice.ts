/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface WebSocketState {
  connected: boolean;
  messages: any[];
  response: any | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: WebSocketState = {
  connected: false,
  messages: [],
  response: null,
  loading: false,
};

// Define the slice using the createSlice function
const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    connect(state) {
      // 서버와 연결되면 connected를 true로 설정
      state.connected = true;
    },
    disconnect(state) {
      // 서버와 연결이 끊기면 connected를 false로 설정
      state.connected = false;
    },
    receiveMessage(state, action: PayloadAction<any>) {
      // JSON 형태의 데이터를 받아옴
      state.messages.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { connect, disconnect, receiveMessage, setLoading } =
  websocketSlice.actions;
export default websocketSlice.reducer;
