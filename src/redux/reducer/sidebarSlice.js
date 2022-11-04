import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        contentType: 'Movie'
    },
    reducers: {
        updateContent: (state, action) => {
            state.contentType = action.payload;
        },
    }
})

export const {updateContent} = sidebarSlice.actions;

export const currentContent = (state) => state.sidebar.contentType;

export default sidebarSlice.reducer;