import { useState, useEffect } from 'react'
import './App.css'
import ProfileCard from './comp/ProfileCard'
import SignUp from './comp/wizards/SignUp'

function App() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users')
    return saved ? JSON.parse(saved) : []
  })

  const toggleOnline = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, isOnline: !u.isOnline } : u))
  }

  // Seed from the API only when localStorage had nothing
  useEffect(() => {
    if (users.length > 0) return
    let cancelled = false
    async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        if (!cancelled) {
          setUsers(data.map(u => ({ id: u.id, name: u.name, role: 'User', isOnline: false })))
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  return (
    <main>
      <h1>React Fundamentals</h1>
      <h2>{users.filter(u => u.isOnline).length}/{users.length} online</h2>
      {users.map((u) => (
        <ProfileCard
          key={u.id}
          name={u.name}
          role={u.role}
          isOnline={u.isOnline}
          onToggle={() => toggleOnline(u.id)}
        />
      ))}
      <button onClick={() => setUsers([...users].toSorted((a, b) => b.name.localeCompare(a.name)))}>
        Sort ↓
      </button>
      <button onClick={() => setUsers([...users].toSorted((a, b) => a.name.localeCompare(b.name)))}>
        Sort ⬆️
      </button>
      <SignUp setUsers={setUsers} />
    </main>
  )
}

export default App
