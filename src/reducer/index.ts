import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './vardata';
import structReducer from './structdata';
import webSocketReducer from './websocket/webSocketSlice';

const rootReducer = combineReducers({
  vardata: dataReducer,
  structdata: structReducer,
  webSocket: webSocketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
