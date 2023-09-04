import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], usersNum: 0 },
  reducers: {
    addUser(state, action) {
      const newItem = action.payload;
      const existingItem = state.users.find(
        (item) => item.username === newItem.username
      );

      if (!existingItem) {
        state.usersNum++;
        state.users.push({
          id: newItem.id,
          username: newItem.username,
          firstName: newItem.firstName,
          lastName: newItem.lastName,
          studentNumber: newItem.studentNumber,
          score: newItem.score,
          avatar: newItem.avatar,
          bio: newItem.bio,
        });
      }
    },
    setData(state, action) {
      state.users = action.payload;
      state.usersNum = action.payload.length;
    },
    deleteUser(state, action) {
      const newItem = action.payload;
      const existingItem = state.users.find(
        (item) => item.username === newItem.username
      );

      if (existingItem) {
        state.usersNum--;
        state.users = state.users.filter(
          (task) => task.userName !== newItem.userName
        );
      }
    },
    deleteAllUsers(state, action) {
      state.users = [];
      state.usersNum = 0;
    },
  },
});

export const usersActions = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
