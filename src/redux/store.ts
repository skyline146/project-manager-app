import { configureStore } from '@reduxjs/toolkit';

import projectsReducer from './slices/projectsSlice';
import modalSlice from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    modal: modalSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch