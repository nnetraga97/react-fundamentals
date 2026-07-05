import { useSelector, useDispatch } from 'react-redux'
import {
  selectCartLines,
  selectCartTotal,
  quantitySet,
  itemRemoved,
  cartCleared,
} from '../../store/cartSlice'

function Cart() {
  // Everything below is DERIVED by selectors from { id: qty }.
  // The cart slice never stores names, prices, or totals.
  const lines = useSelector(selectCartLines)
  const total = useSelector(selectCartTotal)
  const dispatch = useDispatch()

  return (
    <aside className="cart card">
      <h3>Cart</h3>
      {lines.length === 0 && <p className="muted">Nothing yet. Treat yourself.</p>}
      <ul className="cart-lines">
        {lines.map(({ product, qty, lineTotal }) => (
          <li key={product.id} className="cart-line">
            <span className="cart-line-name">{product.name}</span>
            <span className="qty-controls">
              <button
                className="btn ghost sm"
                onClick={() => dispatch(quantitySet({ id: product.id, qty: qty - 1 }))}
              >
                −
              </button>
              {qty}
              <button
                className="btn ghost sm"
                onClick={() => dispatch(quantitySet({ id: product.id, qty: qty + 1 }))}
              >
                +
              </button>
            </span>
            <span className="price sm">${lineTotal}</span>
            <button className="link-btn" onClick={() => dispatch(itemRemoved(product.id))}>
              ✕
            </button>
          </li>
        ))}
      </ul>
      {lines.length > 0 && (
        <div className="cart-foot">
          <strong className="price">${total}</strong>
          <button className="link-btn" onClick={() => dispatch(cartCleared())}>
            clear cart
          </button>
        </div>
      )}
    </aside>
  )
}

export default Cart
