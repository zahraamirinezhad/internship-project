import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "user",
  initialState: { users: [], usersNum: 0 },
  reducers: {
    addUser(state, action) {
      const newItem = action.payload;
      const existingItem = state.users.find(
        (item) => item.userName === newItem.userName
      );

      if (!existingItem) {
        state.usersNum++;
        state.users.push({
          userName: newItem.username,
          bio: newItem.bio,
          profilePic: newItem.profilePic,
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
        (item) => item.userName === newItem.userName
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
