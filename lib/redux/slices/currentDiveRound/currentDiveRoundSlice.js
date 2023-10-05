import { createSlice } from "@reduxjs/toolkit";

export const currentDiveRoundSlice = createSlice({
    name: "currentDiveRound",
    initialState: {
        round: 1,
    },
    reducers: {
        setCurrentRound: (state, action) => {
        state.round = action.payload;
        },
        increaseCurrentRound: (state) => {
            state.round += 1;
        },
        decreaseCurrentRound: (state) => {
            state.round -= 1;
        },
    },
    });

export const { setCurrentDiveRound, increaseCurrentRound, decreaseCurrentRound } = currentDiveRoundSlice.actions;
export const selectCurrentDiveRound = (state) => state.currentDiveRound.round;
export default currentDiveRoundSlice.reducer;