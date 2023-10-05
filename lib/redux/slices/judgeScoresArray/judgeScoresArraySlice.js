import { createSlice } from '@reduxjs/toolkit';

export const judgeScoresArraySlice = createSlice({
    name: 'judgeScoresArray',
    initialState: {
        array: [],
    },
    reducers: {
        setJudgeScoresArray: (state, action) => {
        state.array = action.payload;
        },
    },
});

export const { setJudgeScoresArray } = judgeScoresArraySlice.actions;
export const selectJudgeScoresArray = (state) => state.judgeScoresArray.array;
export default judgeScoresArraySlice.reducer;