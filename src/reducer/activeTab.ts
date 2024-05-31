import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActiveTabState {
  activeTab: { UserArea: number; ShowArea: number; [key: string]: number };
}

const initialState: ActiveTabState = {
  activeTab: { UserArea: 0, ShowArea: 0 },
};

const activeTabSlice = createSlice({
  name: 'activeTab',
  initialState,
  reducers: {
    updateActiveTab: (state, action: PayloadAction<ActiveTabState>) => {
      // eslint-disable-next-line no-param-reassign
      return {
        activeTab: action.payload.activeTab,
      };
    },
  },
});

export const { updateActiveTab } = activeTabSlice.actions;
export default activeTabSlice.reducer;
