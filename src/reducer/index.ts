import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './vardata';
import connectionReducer from './connection';

const rootReducer = combineReducers({
  vardata: dataReducer,
  connection: connectionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
