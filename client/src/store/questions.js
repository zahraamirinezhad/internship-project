import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "question",
  initialState: { questions: [], questionsNum: 0 },
  reducers: {
    addQuestion(state, action) {
      const newItem = action.payload;
      const existingItem = state.questions.find(
        (item) => item.name === newItem.name
      );

      if (!existingItem) {
        state.questionsNum++;
        state.questions.push({
          name: newItem.name,
          fullAnswer: newItem.fullAnswer,
          choices: newItem.choices,
        });
      }
    },
    deleteQuestion(state, action) {
      const newItem = action.payload;
      const existingItem = state.questions.find(
        (item) => item.name === newItem.name
      );

      if (existingItem) {
        state.questionsNum--;
        state.questions = state.questions.filter(
          (task) => task.name !== newItem.name
        );
      }
    },
    deleteAllQuestions(state, action) {
      state.questions = [];
      state.questionsNum = 0;
    },
  },
});

export const questionsActions = questionsSlice.actions;

export const questionsReducer = questionsSlice.reducer;
