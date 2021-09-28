import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    
  },
});
// Action creators are generated for each case reducer functionexport const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer;
