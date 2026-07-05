import { useSelector, useDispatch } from 'react-redux'
import { selectCartCount } from '../store/cartSlice'
import { selectProfile, profileCleared } from '../store/profileSlice'

// No props at all — everything comes straight from the store. Compare with
// Module 5, where this data would have been threaded down from App.
function Header() {
  const cartCount = useSelector(selectCartCount)
  const profile = useSelector(selectProfile)
  const dispatch = useDispatch()

  return (
    <header className="site-header">
      <span className="brand">
        Dev<em>Directory</em>
      </span>
      <div className="header-right">
        {profile ? (
          <span className="profile-chip">
            {profile.name}
            <button className="link-btn" onClick={() => dispatch(profileCleared())}>
              sign out
            </button>
          </span>
        ) : (
          <span className="profile-chip muted">not signed in</span>
        )}
        <span className="cart-badge" key={cartCount} data-count={cartCount}>
          🛒 {cartCount}
        </span>
      </div>
    </header>
  )
}

export default Header
