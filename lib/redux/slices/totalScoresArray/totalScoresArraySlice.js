import { createSlice } from "@reduxjs/toolkit";

export const totalScoresArraySlice = createSlice({
    name: "totalScoresArray",
    initialState: {
        array: []
    },
    reducers: {
        setTotalScoresArray: (state, action) => {
        state.array = action.payload;
        }
    }
    });

export const { setTotalScoresArray } = totalScoresArraySlice.actions;
export const selectTotalScoresArray = (state) => state.totalScoresArray.array;
export default totalScoresArraySlice.reducer;
