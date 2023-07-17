import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "course",
  initialState: { courses: [], coursesNum: 0 },
  reducers: {
    addcourse(state, action) {
      const newItem = action.payload;
      const existingItem = state.courses.find(
        (item) => item.uuid === newItem.uuid
      );

      if (!existingItem) {
        state.coursesNum++;
        state.courses.push({
          id: newItem._id,
          title: newItem.title,
          avatar: newItem.avatar,
          goal: newItem.goal,
          abstact: newItem.abstact,
          creatorId: newItem.creatorId,
        });
      }
    },
    setData(state, action) {
      state.courses = action.payload;
      state.coursesNum = action.payload.length;
    },
    deletecourse(state, action) {
      const newItem = action.payload;
      const existingItem = state.courses.find(
        (item) => item.uuid === newItem.uuid
      );

      if (existingItem) {
        state.coursesNum--;
        state.courses = state.courses.filter(
          (task) => task.uuid !== newItem.uuid
        );
      }
    },
    deleteAllcourses(state, action) {
      state.courses = [];
      state.coursesNum = 0;
    },
  },
});

export const coursesActions = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
