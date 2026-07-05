import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// A thunk is how async work enters Redux: the request happens out here,
// and the store only ever receives plain "it started / it worked / it
// failed" actions. Reducers stay synchronous and pure.
export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return data.map((u) => ({
    id: u.id,
    name: u.name,
    role: u.company.bs,
    isOnline: u.id % 3 !== 0,
  }))
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'done' | 'error'
    error: null,
  },
  reducers: {
    // `prepare` runs before the reducer and builds the payload. Random ids
    // must be generated here, NOT in the reducer — reducers must be pure
    // (same state + same action = same result, always).
    userAdded: {
      prepare(fields) {
        return { payload: { id: crypto.randomUUID(), isOnline: true, ...fields } }
      },
      reducer(state, action) {
        state.items.push(action.payload)
      },
    },
    // These look like mutations. They are not: RTK runs reducers inside
    // Immer, which records the changes and produces new immutable state.
    onlineToggled(state, action) {
      const user = state.items.find((u) => u.id === action.payload)
      if (user) user.isOnline = !user.isOnline
    },
    usersSorted(state, action) {
      const dir = action.payload === 'desc' ? -1 : 1
      state.items.sort((a, b) => dir * a.name.localeCompare(b.name))
    },
  },
  // Handles actions defined outside the slice — here, the thunk's
  // lifecycle actions. The loading/error/data trio, Redux edition.
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'done'
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })
  },
})

export const { userAdded, onlineToggled, usersSorted } = usersSlice.actions
export default usersSlice.reducer

// Selectors: components never reach into the state shape themselves — they
// ask these. If the shape changes, only this file changes.
export const selectUsers = (state) => state.users.items
export const selectUsersStatus = (state) => state.users.status
export const selectUsersError = (state) => state.users.error
export const selectOnlineCount = (state) =>
  state.users.items.filter((u) => u.isOnline).length
