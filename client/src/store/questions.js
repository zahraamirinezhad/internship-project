import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "question",
  initialState: { questions: [], questionsNum: 0 },
  reducers: {
    addQuestion(state, action) {
      const newItem = action.payload;
      const existingItem = state.questions.find(
        (item) => item.question === newItem.question
      );

      if (!existingItem) {
        state.questionsNum++;
        state.questions.push({
          question: newItem.question,
          fullAnswer: newItem.fullAnswer,
          choices: newItem.choices,
        });
      }
    },
    deleteQuestion(state, action) {
      const newItem = action.payload;
      const existingItem = state.questions.find(
        (item) => item.question === newItem.question
      );

      if (existingItem) {
        state.questionsNum--;
        state.questions = state.questions.filter(
          (task) => task.question !== newItem.question
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
