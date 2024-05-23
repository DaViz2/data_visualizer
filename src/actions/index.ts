// eslint-disable-next-line import/namespace
import {
  ADD_CONNECTION,
  ADD_DATA,
  ConnectionHandleTypes,
  DataHandleTypes,
  EdgeConnection,
  GET_DATA,
  VarData,
} from './types';

// Data Handling Action
export const addData = (varData: VarData): DataHandleTypes => ({
  type: ADD_DATA,
  payload: varData,
});

export const getData = (): DataHandleTypes => ({
  type: GET_DATA,
});

// Connection Handling Action
export const addConnection = (
  edgeConnection: EdgeConnection,
): ConnectionHandleTypes => ({
  type: ADD_CONNECTION,
  payload: edgeConnection,
});
