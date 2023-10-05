import { createSlice } from "@reduxjs/toolkit";

export const totalRoundsSlice = createSlice({
    name: "totalRounds",
    initialState: {
        number: 0
    },
    reducers: {
        setTotalRounds: (state, action) => {
        state.number = action.payload;
        }
    }
    });

export const { setTotalRounds } = totalRoundsSlice.actions;
export const selectTotalRounds = (state) => state.totalRounds.number;
export default totalRoundsSlice.reducer;