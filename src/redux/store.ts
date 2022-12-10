import { configureStore } from '@reduxjs/toolkit';

import projectsReducer from './slices/projectsSlice';
import columnsReducer from './slices/columnsSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    columns: columnsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch