import { createSlice } from "@reduxjs/toolkit";

export const meetInfoObjectSlice = createSlice({
    name: "meetInfoObject",
    initialState: {
        object: [],
    },
    reducers: {
        setMeetInfoObject: (state, action) => {
        state.object = action.payload;
        },
    },
    });

export const { setMeetInfoObject } = meetInfoObjectSlice.actions;
export const selectMeetInfoObject = (state) => state.meetInfoObject.object;
export default meetInfoObjectSlice.reducer;
