import { createSlice } from "@reduxjs/toolkit";

export const numberOfJudgesSlice = createSlice({
    name: "numberOfJudges",
    initialState: {
        number: 0,
    },
    reducers: {
        setNumberOfJudges: (state, action) => {
        state.number = action.payload;
        },
    },
    });

export const { setNumberOfJudges } = numberOfJudgesSlice.actions;
export const selectNumberOfJudges = (state) => state.numberOfJudges.number;
export default numberOfJudgesSlice.reducer;