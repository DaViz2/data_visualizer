// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EdgeConnection {
  from: string;
  to: string;
}

interface ConnectionState {
  connections: EdgeConnection[];
}

const initialState: ConnectionState = {
  connections: [],
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    addConnection: (state, action: PayloadAction<EdgeConnection>) => {
      return {
        ...state,
        connections: [...state.connections, action.payload],
      };
    },
  },
});

export const { addConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
