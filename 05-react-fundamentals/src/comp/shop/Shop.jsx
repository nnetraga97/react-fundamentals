import { useDispatch } from 'react-redux'
import { products } from '../../data/products'
import { itemAdded } from '../../store/cartSlice'
import Cart from './Cart'

function Shop() {
  const dispatch = useDispatch()

  return (
    <div className="shop-layout">
      <div className="product-grid">
        {products.map((p, i) => (
          <article className="card product" key={p.id} style={{ '--stagger': i }}>
            <span className="product-tag">{p.tag}</span>
            <h3>{p.name}</h3>
            <div className="card-actions">
              <span className="price">${p.price}</span>
              <button className="btn" onClick={() => dispatch(itemAdded(p.id))}>
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
      <Cart />
    </div>
  )
}

export default Shop
