import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';
import { boardsReducer } from './board/boardSlice';
import { themeReducer } from './theme/ThemeSlice';
import { supportReducer } from './support/supportSlice';
import { boardSearchReducer } from './search/searchSlice';
import { filterReducer } from './filter/filterSlice';
import { miniImgApi } from '../redux/miniImgApi/miniImgApi';
import { helpApi } from '../redux/helpApi/helpApi';
import {boardsApi} from '../redux/boardApi/boardApi'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'refreshToken'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    boards: boardsReducer,
    theme: themeReducer,
    support: supportReducer,
    search: boardSearchReducer,
    filter: filterReducer,
    [miniImgApi.reducerPath]: miniImgApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(miniImgApi.middleware, 
      helpApi.middleware,
      boardsApi.middleware,
    ),
});

export const persistor = persistStore(store);