import { configureStore } from "@reduxjs/toolkit";
import { attachedFilesReducer } from "./attachedFiles";
import { coursesReducer } from "./course";
import { webCoursesReducer } from "./webCourse";
import { choicesReducer } from "./choices";
import { questionsReducer } from "./questions";
import { selectedAnswersReducer } from "./selectedAnswers";
import { usersReducer } from "./users";
import { levelsReducer } from "./levels";

const store = configureStore({
  reducer: {
    attachedFiles: attachedFilesReducer,
    courses: coursesReducer,
    webCourses: webCoursesReducer,
    choices: choicesReducer,
    questions: questionsReducer,
    selectedAnswers: selectedAnswersReducer,
    users: usersReducer,
    levels: levelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["doc"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.doc"],
        // Ignore these paths in the state
        ignoredPaths: ["levels.levels"],
      },
    }),
});

export default store;
