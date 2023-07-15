import { configureStore } from "@reduxjs/toolkit";
import { attachedFilesReducer } from "./attachedFiles";

const store = configureStore({
  reducer: {
    attachedFiles: attachedFilesReducer,
  },
});

export default store;
