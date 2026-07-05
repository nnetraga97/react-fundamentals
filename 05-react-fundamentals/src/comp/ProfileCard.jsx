import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { onlineToggled } from '../store/usersSlice'

// Receives data via props (the parent maps the list), but dispatches its own
// events — no more onToggle callback threading. `showDetails` stays LOCAL
// state on purpose: nobody outside this card needs it. Redux is for shared
// state, not all state.
function ProfileCard({ user, index }) {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  return (
    <article className="card" style={{ '--stagger': index }}>
      <div className="card-head">
        <h3>{user.name}</h3>
        <span className={`status ${user.isOnline ? 'is-online' : ''}`}>
          {user.isOnline ? 'online' : 'offline'}
        </span>
      </div>
      {showDetails && <p className="card-role">{user.role}</p>}
      <div className="card-actions">
        <button className="btn ghost" onClick={() => setShowDetails((s) => !s)}>
          {showDetails ? 'Hide' : 'Details'}
        </button>
        <button className="btn" onClick={() => dispatch(onlineToggled(user.id))}>
          Toggle status
        </button>
      </div>
    </article>
  )
}

export default ProfileCard
