// store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import schoolReducer from './school';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    school: schoolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
