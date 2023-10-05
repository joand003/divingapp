import { createSlice } from '@reduxjs/toolkit';

export const diverDifficultyArraySlice = createSlice({
    name: 'diverDifficultyArray',
    initialState: {
        array: [],
    },
    reducers: {
        setDiverDifficultyArray: (state, action) => {
        state.array = action.payload;
        },
    },
});

export const { setDiverDifficultyArray } = diverDifficultyArraySlice.actions;
export const selectDiverDifficultyArray = (state) => state.diverDifficultyArray.array;
export default diverDifficultyArraySlice.reducer;