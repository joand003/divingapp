import { createSlice } from "@reduxjs/toolkit";

export const userObjectSlice = createSlice({
    name: "userObject",
    initialState: {
        object: [],
    },
    reducers: {
        setUserObject: (state, action) => {
        state.object = action.payload;
        },
    },
    });

export const { setUserObject } = userObjectSlice.actions;
export const selectUserObject = (state) => state.userObject.object;
export default userObjectSlice.reducer;