import { createSlice } from "@reduxjs/toolkit";

const choicesSlice = createSlice({
  name: "choice",
  initialState: { choices: [], choicesNum: 0 },
  reducers: {
    addChoice(state, action) {
      const newItem = action.payload;
      const existingItem = state.choices.find(
        (item) => item.choice === newItem.choice
      );

      if (!existingItem) {
        state.choicesNum++;
        state.choices.push({
          choice: newItem.choice,
        });
      }
    },
    setMulChoices(state, action) {
      state.choicesNum = action.payload.length;
      state.choices = action.payload;
    },
    deleteChoice(state, action) {
      const newItem = action.payload;
      const existingItem = state.choices.find(
        (item) => item.choice === newItem.choice
      );

      if (existingItem) {
        state.choicesNum--;
        state.choices = state.choices.filter(
          (task) => task.choice !== newItem.choice
        );
      }
    },
    deleteAllChoices(state, action) {
      state.choices = [];
      state.choicesNum = 0;
    },
  },
});

export const choicesActions = choicesSlice.actions;

export const choicesReducer = choicesSlice.reducer;
