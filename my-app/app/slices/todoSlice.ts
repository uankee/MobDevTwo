import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoState {
  incompleteCount: number;
}

const initialState: TodoState = {
  incompleteCount: 0,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setIncompleteCount: (state, action: PayloadAction<number>) => {
      state.incompleteCount = action.payload;
    },
  },
});

export const { setIncompleteCount } = todoSlice.actions;
export default todoSlice.reducer;