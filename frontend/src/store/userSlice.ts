import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userInfo: {
        name: string;
        email: string;
    } | null;
}

const initialState: UserState = {
    userInfo: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (
            state,
            action: PayloadAction<{ name: string; email: string }>,
        ) => {
            state.userInfo = action.payload;
        },
    },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
