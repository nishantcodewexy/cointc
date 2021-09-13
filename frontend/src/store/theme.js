import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "light",
  },
  reducers: {
    selectTheme: (state, action) => {
      state.value = action.value || "light";
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectTheme } = themeSlice.actions;

export default themeSlice.reducer;
