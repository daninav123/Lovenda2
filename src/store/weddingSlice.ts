import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WeddingState {
  name?: string;
  dates?: string;
  location?: string;
  roles?: string;
  palette?: string;
  typography?: string;
}

const initialState: WeddingState = {};

const weddingSlice = createSlice({
  name: 'wedding',
  initialState,
  reducers: {
    saveWedding(state, action: PayloadAction<WeddingState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { saveWedding } = weddingSlice.actions;
export default weddingSlice.reducer;
