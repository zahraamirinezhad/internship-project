import { configureStore } from "@reduxjs/toolkit";
import { attachedFilesReducer } from "./attachedFiles";
import { coursesReducer } from "./course";
import { choicesReducer } from "./choices";
import { questionsReducer } from "./questions";
import { selectedAnswersReducer } from "./selectedAnswers";
import { usersReducer } from "./user";

const store = configureStore({
  reducer: {
    attachedFiles: attachedFilesReducer,
    courses: coursesReducer,
    choices: choicesReducer,
    questions: questionsReducer,
    selectedAnswers: selectedAnswersReducer,
    users: usersReducer,
  },
});

export default store;
