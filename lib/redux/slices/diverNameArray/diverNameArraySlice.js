import { createSlice } from '@reduxjs/toolkit';

export const diverNameArraySlice = createSlice({
    name: 'diverNameArray',
    initialState: {
        array: [],
    },
    reducers: {
        setDiverNameArray: (state, action) => {
        state.array = action.payload;
        },
    },
});

export const { setDiverNameArray } = diverNameArraySlice.actions;
export const selectDiverNameArray = (state) => state.diverNameArray.array;
export default diverNameArraySlice.reducer;