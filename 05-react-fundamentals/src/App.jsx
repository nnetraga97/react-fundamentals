import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUsers,
  usersSorted,
  selectUsers,
  selectUsersStatus,
  selectUsersError,
  selectOnlineCount,
} from './store/usersSlice'
import Header from './comp/Header'
import ProfileCard from './comp/ProfileCard'
import SignUp from './comp/wizards/SignUp'
import Shop from './comp/shop/Shop'

function App() {
  const users = useSelector(selectUsers)
  const status = useSelector(selectUsersStatus)
  const error = useSelector(selectUsersError)
  const onlineCount = useSelector(selectOnlineCount)
  const dispatch = useDispatch()

  useEffect(() => {
    // Thunks are dispatched like actions; RTK runs the async function
    // and dispatches pending/fulfilled/rejected for us.
    if (status === 'idle') dispatch(fetchUsers())
  }, [status, dispatch])

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <h1>
            The <em>Team</em> Directory
          </h1>
          <p className="muted">
            {onlineCount} of {users.length} teammates online
          </p>
        </section>

        <section>
          <div className="section-head">
            <h2>People</h2>
            <span className="sort-controls">
              <button className="btn ghost sm" onClick={() => dispatch(usersSorted('asc'))}>
                A→Z
              </button>
              <button className="btn ghost sm" onClick={() => dispatch(usersSorted('desc'))}>
                Z→A
              </button>
            </span>
          </div>

          {status === 'loading' && <p className="muted">Loading the crew…</p>}
          {status === 'error' && <p className="form-error">Couldn’t load users: {error}</p>}
          <div className="card-grid">
            {users.map((u, i) => (
              <ProfileCard key={u.id} user={u} index={i} />
            ))}
          </div>
        </section>

        <section>
          <div className="section-head">
            <h2>Join the team</h2>
          </div>
          <SignUp />
        </section>

        <section>
          <div className="section-head">
            <h2>Supply closet</h2>
          </div>
          <Shop />
        </section>
      </main>
    </>
  )
}

export default App
