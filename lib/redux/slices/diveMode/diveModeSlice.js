import { createSlice } from "@reduxjs/toolkit";

export const diveModeSlice = createSlice({
    name: "diveMode",
    initialState: {
        mode: "dive",
    },
    reducers: {
        setDiveMode: (state, action) => {
        state.mode = action.payload;
        },
    },
    });

export const { setDiveMode } = diveModeSlice.actions;
export const selectDiveMode = (state) => state.diveMode.mode;
export default diveModeSlice.reducer;
