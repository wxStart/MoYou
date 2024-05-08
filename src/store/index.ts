// /**
//  *
//  * reduxjs-toolkit的使用语法
//  */

import {configureStore, combineSlices} from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
// import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import type {Action, ThunkAction} from '@reduxjs/toolkit';

import {voteSlice} from './features/voteSlice';
import {userSlice} from './features/userSlice';

const rootReducer = combineSlices(voteSlice, userSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(reduxLogger, reduxPromise) as any;
    },
    preloadedState,
  });
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  return store;
};

export const store = makeStore();

export default store;
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

/**
 *
 * reduxjs-toolkit的使用语法
 */

// import {configureStore} from '@reduxjs/toolkit';
// import reduxLogger from 'redux-logger';
// import reduxThunk from 'redux-thunk';
// import reduxPromise from 'redux-promise';

// import voteSliceReducer from './features/voteSlice';
// import userSliceReducer from './features/userSlice';

// const store = configureStore({
//   // 指定reducer
//   reducer: {
//     // 按模块管理各个切片
//     vote: voteSliceReducer,
//     user: userSliceReducer,
//     /**
//      * state= {
//      *  vote：{supNum：10, oppNum:6}
//      *  user:{}// 这里不写了
//      * }
//      *
//      */
//   },

//   // 使用中间件   不写默认有reduxThunk ， 写了就得全写
//   middleware: [reduxLogger, reduxThunk, reduxPromise] as any,
// });

// export default store;
