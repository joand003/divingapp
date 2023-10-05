import { createSlice } from '@reduxjs/toolkit';

export const diverDescriptionsArraySlice = createSlice({
    name: 'diverDescriptionsArray',
    initialState: {
        array: [],
    },
    reducers: {
        setDiverDescriptionsArray: (state, action) => {
        state.array = action.payload;
        },
    },
});

export const { setDiverDescriptionsArray } = diverDescriptionsArraySlice.actions;
export const selectDiverDescriptionsArray = (state) => state.diverDescriptionsArray.array;
export default diverDescriptionsArraySlice.reducer;