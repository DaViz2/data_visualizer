import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VarConData {
  handleType: string;
  varName: string;
  functionSpace: string;
}

export interface StructData {
  structId: string;
  structType: string;
  adj: { [key: string]: { varName: string; functionSpace: string } };
}

interface ConnectionState {
  structs: StructData[];
}

const initialState: ConnectionState = {
  structs: [],
};

const structSlice = createSlice({
  name: 'struct',
  initialState,
  reducers: {
    addstruct: (state, action: PayloadAction<StructData>) => {
      // eslint-disable-next-line no-param-reassign
      state.structs = [...state.structs, action.payload];
    },
    updatestruct: (state, action: PayloadAction<StructData>) => {
      // eslint-disable-next-line no-param-reassign
      state.structs = state.structs.map((value) =>
        value.structId === action.payload.structId ? action.payload : value,
      );
    },
  },
});

export const { addstruct, updatestruct } = structSlice.actions;
export default structSlice.reducer;
