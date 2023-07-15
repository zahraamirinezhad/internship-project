import { createSlice } from "@reduxjs/toolkit";

const attachedFilesSlice = createSlice({
  name: "attachedFiles",
  initialState: { attachedFiles: [], attachedFilesNum: 0 },
  reducers: {
    addAttachedFiles(state, action) {
      const newItem = action.payload;
      const existingItem = state.attachedFiles.find(
        (item) => item.fileId === newItem.fileId
      );

      if (!existingItem) {
        state.attachedFilesNum++;
        state.attachedFiles.push({
          fileId: newItem.fileId,
          fileName: newItem.fileName,
          path: newItem.path,
        });
      }
    },
    setAttachedFiles(state, action) {
      const newItem = action.payload;
      state.attachedFiles = newItem;
      state.attachedFilesNum = newItem.length;
    },
    deleteAttachedFiles(state, action) {
      const newItem = action.payload;
      const existingItem = state.attachedFiles.find(
        (item) => item.fileId === newItem.fileId
      );

      if (existingItem) {
        state.attachedFilesNum--;
        state.attachedFiles = state.attachedFiles.filter(
          (task) => task.fileId !== newItem.fileId
        );
      }
    },
    deleteAllAttachedFiles(state, action) {
      state.attachedFiles = [];
      state.attachedFilesNum = 0;
    },
  },
});

export const attachedFilesActions = attachedFilesSlice.actions;

export const attachedFilesReducer = attachedFilesSlice.reducer;
