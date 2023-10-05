import { configureStore } from '@reduxjs/toolkit';
import currentDiverNumberReducer from './slices/currentDiverNumber/currentDiverNumberSlice';
import currentDiveRoundReducer from './slices/currentDiveRound/currentDiveRoundSlice';
import diverScoresArrayReducer from './slices/diverScoresArray/diverScoresArraySlice';
import diverCodesArrayReducer from './slices/diverCodesArray/diverCodesArraySlice';
import diverDescriptionsArrayReducer from './slices/diverDescriptionsArray/diverDescriptionsArraySlice';
import diverDifficultyArrayReducer from './slices/diverDifficultyArray/diverDifficultyArraySlice';
import diverNameArrayReducer from './slices/diverNameArray/diverNameArraySlice';
import judgeScoresArrayReducer from './slices/judgeScoresArray/judgeScoresArraySlice';
import numberOfJudgesReducer from './slices/numberOfJudges/numberOfJudgesSlice';
import totalRoundsReducer from './slices/totalRounds/totalRoundsSlice';



export default configureStore({
  reducer: {
    currentDiverNumber: currentDiverNumberReducer,
    currentDiveRound: currentDiveRoundReducer,
    diverScoresArray: diverScoresArrayReducer,
    diverCodesArray: diverCodesArrayReducer,
    diverDescriptionsArray: diverDescriptionsArrayReducer,
    diverDifficultyArray: diverDifficultyArrayReducer,
    diverNameArray: diverNameArrayReducer,
    judgeScoresArray: judgeScoresArrayReducer,
    numberOfJudges: numberOfJudgesReducer,
    totalRounds: totalRoundsReducer,
  },
});