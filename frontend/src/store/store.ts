import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import userReducer from './userSlice';

const rootReducer = combineReducers({
    token: userReducer,
});

const reducer = (
    state: ReturnType<typeof rootReducer> | undefined,
    action: any,
) => {
    if (action.type === HYDRATE) {
        return {
            ...state, // クライアントサイドの現在の状態を保持
            ...action.payload, // サーバーサイドからの状態を上書き
        };
    }
    return rootReducer(state, action);
};

// Reduxストアを設定
const makeStore = () =>
    configureStore({
        reducer,
        devTools: process.env.NODE_ENV !== 'production', // 開発環境でRedux DevToolsを有効化
    });

// Storeの型定義
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

// Next.jsのReduxラッパーを作成
export const wrapper = createWrapper<AppStore>(makeStore);
