import { createSlice, createSelector } from '@reduxjs/toolkit'
import { products } from '../data/products'

const cartSlice = createSlice({
  name: 'cart',
  // Normalized shape: { productId: quantity }. We store the MINIMUM —
  // product details live in the catalog, totals are derived by selectors.
  initialState: {
    items: {},
  },
  reducers: {
    itemAdded(state, action) {
      const id = action.payload
      state.items[id] = (state.items[id] ?? 0) + 1
    },
    itemRemoved(state, action) {
      delete state.items[action.payload]
    },
    quantitySet(state, action) {
      const { id, qty } = action.payload
      if (qty <= 0) delete state.items[id]
      else state.items[id] = qty
    },
    cartCleared(state) {
      state.items = {}
    },
  },
})

export const { itemAdded, itemRemoved, quantitySet, cartCleared } = cartSlice.actions
export default cartSlice.reducer

export const selectCartItems = (state) => state.cart.items

// createSelector memoizes: the expensive mapping only re-runs when
// state.cart.items actually changes, not on every unrelated dispatch.
export const selectCartLines = createSelector([selectCartItems], (items) =>
  Object.entries(items).map(([id, qty]) => {
    const product = products.find((p) => p.id === Number(id))
    return { product, qty, lineTotal: product.price * qty }
  }),
)

export const selectCartCount = createSelector([selectCartItems], (items) =>
  Object.values(items).reduce((sum, qty) => sum + qty, 0),
)

export const selectCartTotal = createSelector([selectCartLines], (lines) =>
  lines.reduce((sum, line) => sum + line.lineTotal, 0),
)
