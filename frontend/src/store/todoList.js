import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const todoList = createSlice({
  name: "list",
  initialState,
  reducers: {},
});

export default todoList.reducer;
