// Data Actions
export const ADD_DATA = 'ADD_DATA';
export const GET_DATA = 'GET_DATA';

export interface VarData {
  name: string;
  value: string;
  type: string;
}

interface AddDataAction {
  type: typeof ADD_DATA;
  payload: VarData;
}

interface GetDataAction {
  type: typeof GET_DATA;
}

export type DataHandleTypes = AddDataAction | GetDataAction;

// Blueprint Connection Actions
export const ADD_CONNECTION = 'ADD_CONNECTION';

export interface EdgeConnection {
  from: string;
  to: string;
}

export interface AddConnection {
  type: typeof ADD_CONNECTION;
  payload: EdgeConnection;
}

export type ConnectionHandleTypes = AddConnection;
