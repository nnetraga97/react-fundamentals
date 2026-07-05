import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: null, // no one signed up yet
  reducers: {
    // Returning a value REPLACES the state — the other legal style besides
    // Immer "mutation". Required here: you can't mutate `null`.
    profileCompleted(_state, action) {
      return action.payload
    },
    profileCleared() {
      return null
    },
  },
})

export const { profileCompleted, profileCleared } = profileSlice.actions
export default profileSlice.reducer

export const selectProfile = (state) => state.profile
