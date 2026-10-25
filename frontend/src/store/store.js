  import { configureStore, combineReducers } from "@reduxjs/toolkit";
  import authReducer from './Slices/authSlice';
  import cartReducer from './Slices/cartSlice';
  import storage from 'redux-persist/lib/storage';
  import { persistReducer } from 'redux-persist';
  import { persistStore } from 'redux-persist';

  // BUG FIX #4: Previously, the persist key was read from localStorage once at module
  // load time (at startup). This meant after login/logout, the wrong key was used for
  // the entire session, causing cart data to persist under 'guest' key even after login.
  // Fixed by using a stable, fixed persist key. Cart is cleared explicitly on logout
  // via clearCart() dispatch in Navbar.jsx, so no cart data leaks between users.
  const persistConfig = {
    key: 'furni-store',
    storage,
    whitelist: ["cartItem"], // only cart will persist
  };

  const rootReducer = combineReducers({
    auth: authReducer,
    cartItem: cartReducer,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ required for redux-persist
    }),
  });

  export const persistor = persistStore(store);
  export default store;

