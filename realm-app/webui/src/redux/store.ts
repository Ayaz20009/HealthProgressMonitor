import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import defaultReducer from './default/defaultSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    default: defaultReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['login', 'logout', 'setFilters'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload', 'payload.user', 'meta.arg', 'payload.realmApp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'auth.realmApp', 'payload.user', 'app', 'payload'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
