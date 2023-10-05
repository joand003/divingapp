import { createSlice } from '@reduxjs/toolkit';

export const currentDiverNumberSlice = createSlice({
    name: 'currentDiverNumber',
    initialState: {
        number: 1,
    },
    reducers: {
        setCurrentDiverNumber: (state, action) => {
        state.number = action.payload;
        },
        increaseCurrentDiverNumber: (state) => {
            state.number += 1;
        },
        decreaseCurrentDiverNumber: (state) => {
            state.number -= 1;
        },
    },
});

export const { setCurrentDiverNumber, increaseCurrentDiverNumber, decreaseCurrentDiverNumber } = currentDiverNumberSlice.actions;
export const selectCurrentDiverNumber = (state) => state.currentDiverNumber.number;
export default currentDiverNumberSlice.reducer;