import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './vardata';
import structReducer from './structdata';

const rootReducer = combineReducers({
  vardata: dataReducer,
  structdata: structReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
