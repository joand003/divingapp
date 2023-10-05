import { createSlice } from '@reduxjs/toolkit';

export const diverScoresArraySlice = createSlice({
    name: 'diverScoresArray',
    initialState: {
        array: [],
    },
    reducers: {
        setDiverScoresArray: (state, action) => {
        state.array = action.payload;
        },
    },
});

export const { setDiverScoresArray } = diverScoresArraySlice.actions;
export const selectDiverScoresArray = (state) => state.diverScoresArray.array;
export default diverScoresArraySlice.reducer;