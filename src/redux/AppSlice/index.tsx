import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { AppSliceTypes } from "../../types";

const initialState: AppSliceTypes = {
    openPostForm: false,
    openFollwerMod: false,
    openFollwingMod: false,
    refreshAvailable: false
};

export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        // To open form
        openPostForm: (state) => {
            state.openPostForm = true;
        },
        // To close form
        closePostForm: (state) => {
            state.openPostForm = false;
        },
        // To open/close follower
        toggleFollowerList: (state, action: PayloadAction<boolean>) => {
            state.openFollwerMod = action.payload;
        },
        // To open/close following
        toggleFollowingList: (state, action: PayloadAction<boolean>) => {
            state.openFollwingMod = action.payload;
        },
        // To toggle refresh
        toggleRefresh: (state, action: PayloadAction<boolean>) => {
            state.refreshAvailable = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { closePostForm, openPostForm, toggleFollowerList, toggleFollowingList, toggleRefresh } = appSlice.actions;

export default appSlice.reducer;
