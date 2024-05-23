// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VarData {
  name: string;
  value: string;
  type: string;
}

interface DataState {
  data: VarData[];
}

const initialState: DataState = {
  data: [],
};

const dataSlice = createSlice({
  name: 'vardata',
  initialState,
  reducers: {
    addData: (state: DataState, action: PayloadAction<VarData>) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    getData: (state) => state,
  },
});

export const { addData, getData } = dataSlice.actions;
export default dataSlice.reducer;
