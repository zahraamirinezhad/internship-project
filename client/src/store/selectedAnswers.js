import { createSlice } from "@reduxjs/toolkit";

const selectedAnswersSlice = createSlice({
  name: "selectedAnswers",
  initialState: { selectedAnswers: [], selectedAnswersNum: 0 },
  reducers: {
    addSelectedAnswers(state, action) {
      const newItem = action.payload;
      const existingItem = state.selectedAnswers.find(
        (item) => item.index === newItem.index
      );

      if (!existingItem) {
        state.selectedAnswersNum++;
        state.selectedAnswers.push({
          index: newItem.index,
          selectedAnswer: newItem.selectedAnswer,
        });
      } else {
        state.selectedAnswers = state.selectedAnswers.filter(
          (item) => item.index !== newItem.index
        );

        state.selectedAnswers.push({
          index: newItem.index,
          selectedAnswer: newItem.selectedAnswer,
        });
      }
    },
    deleteAllSelectedAnswers(state, action) {
      state.selectedAnswers = [];
      state.selectedAnswersNum = 0;
    },
  },
});

export const selectedAnswersActions = selectedAnswersSlice.actions;

export const selectedAnswersReducer = selectedAnswersSlice.reducer;
