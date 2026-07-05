import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import cartReducer from './cartSlice'
import profileReducer from './profileSlice'

// One store per app. Each key under `reducer` becomes a top-level
// branch of global state: state.users, state.cart, state.profile.
export const store = configureStore({
  reducer: {
    users: usersReducer,
    cart: cartReducer,
    profile: profileReducer,
  },
})
