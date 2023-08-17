import { createSlice } from "@reduxjs/toolkit";

const levelsSlice = createSlice({
  name: "level",
  initialState: { levels: [], levelsNum: 0 },
  reducers: {
    addLevel(state, action) {
      const newItem = action.payload;
      const existingItem = state.levels.find(
        (item) => item.title === newItem.title
      );

      if (!existingItem) {
        state.levelsNum++;
        state.levels.push({
          id: newItem.id,
          title: newItem.title,
          doc: newItem.doc,
          desc: newItem.desc,
          questions: newItem.questions,
        });
      }
    },
    deleteLevel(state, action) {
      const newItem = action.payload;
      const existingItem = state.levels.find(
        (item) => item.title === newItem.title
      );

      if (existingItem) {
        state.levelsNum--;
        state.levels = state.levels.filter(
          (task) => task.title !== newItem.title
        );
      }
    },
    deleteAllLevels(state, action) {
      state.levels = [];
      state.levelsNum = 0;
    },
  },
});

export const levelsActions = levelsSlice.actions;

export const levelsReducer = levelsSlice.reducer;
