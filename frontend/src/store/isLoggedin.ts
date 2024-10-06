import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface isLoggedinState {
    isLoggedin: Boolean;
}

const initialState: isLoggedinState = {
    isLoggedin: false,
};

export const isLoggedinSlice = createSlice({
    name: 'isLoggedin',
    initialState,
    reducers: {
        setisLoggedinInfo: (state, action: PayloadAction<boolean>) => {
            state.isLoggedin = action.payload;
        },
    },
});

export const { setisLoggedinInfo } = isLoggedinSlice.actions;
export default isLoggedinSlice.reducer;
