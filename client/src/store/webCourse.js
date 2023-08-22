import { createSlice } from "@reduxjs/toolkit";

const webCoursesSlice = createSlice({
  name: "webCourse",
  initialState: { webCourses: [], webCoursesNum: 0 },
  reducers: {
    addWebCourse(state, action) {
      const newItem = action.payload;
      const existingItem = state.webCourses.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.webCoursesNum++;
        state.webCourses.push({
          id: newItem.id,
          title: newItem.title,
          avatar: newItem.avatar,
          goal: newItem.goal,
          abstact: newItem.abstact,
          creatorId: newItem.creatorId,
        });
      }
    },
    setData(state, action) {
      state.webCourses = action.payload;
      state.webCoursesNum = action.payload.length;
    },
    deleteWebCourse(state, action) {
      const newItem = action.payload;
      const existingItem = state.webCourses.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        state.webCoursesNum--;
        state.webCourses = state.webCourses.filter(
          (task) => task.id !== newItem.id
        );
      }
    },
    deleteAllWebCourses(state, action) {
      state.webCourses = [];
      state.webCoursesNum = 0;
    },
  },
});

export const webCoursesActions = webCoursesSlice.actions;

export const webCoursesReducer = webCoursesSlice.reducer;
