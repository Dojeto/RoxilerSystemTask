import { configureStore } from "@reduxjs/toolkit";
import todoList from "./todoList";

const store = configureStore({
  reducer: {
    todoList: todoList,
  },
});

export default store;
