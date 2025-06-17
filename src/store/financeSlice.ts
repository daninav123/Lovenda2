import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FinanceEntry {
  id: string;
  item: string;
  category: string;
  vendor: string;
  budgetedCost: number;
  actualCost: number;
  date: string; // ISO date string
  status: string;
}

interface FinanceState {
  entries: FinanceEntry[];
}

const initialState: FinanceState = {
  entries: [],
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<FinanceEntry>) {
      state.entries.push(action.payload);
    },
    updateEntry(state, action: PayloadAction<FinanceEntry>) {
      const index = state.entries.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    removeEntry(state, action: PayloadAction<string>) {
      state.entries = state.entries.filter(e => e.id !== action.payload);
    },
  },
});

export const { addEntry, updateEntry, removeEntry } = financeSlice.actions;
export default financeSlice.reducer;
