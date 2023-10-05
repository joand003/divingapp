import { createSlice } from '@reduxjs/toolkit';

export const diverCodesArraySlice = createSlice({
    name: 'diverCodesArray',
    initialState: {
        array: []
    },
    reducers: {
        setDiverCodesArray: (state, action) => {
        state.array = action.payload;
        }
    },
});

export const { setDiverCodesArray } = diverCodesArraySlice.actions;
export const selectDiverCodesArray = (state) => state.diverCodesArray.array;
export default diverCodesArraySlice.reducer;