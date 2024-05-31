import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SmallVarData {
  name: string;
  value: any;
  type: string;
}

export interface VarData extends SmallVarData {
  functionSpace: string;
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
      const idx = state.data.findIndex((value) => {
        return (
          action.payload.name === value.name &&
          action.payload.functionSpace === value.functionSpace
        );
      });
      if (idx !== -1) {
        return {
          ...state,
          data: state.data.map((value, index) =>
            index === idx ? action.payload : value,
          ),
        };
      }

      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
  },
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;
