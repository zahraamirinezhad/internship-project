import { configureStore } from "@reduxjs/toolkit";
import { attachedFilesReducer } from "./attachedFiles";
import { coursesReducer } from "./course";
import { choicesReducer } from "./choices";
import { questionsReducer } from "./questions";

const store = configureStore({
  reducer: {
    attachedFiles: attachedFilesReducer,
    courses: coursesReducer,
    choices: choicesReducer,
    questions: questionsReducer,
  },
});

export default store;
