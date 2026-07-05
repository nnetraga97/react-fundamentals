import { useState } from 'react'
import './App.css'
import ProfileCard from './comp/ProfileCard'

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([
    { name: "Ada Lovelace", role: "Mathematician", isOnline: true },
    { name: "Grace Hopper", role: "Computer Scientist", isOnline: false },
    { name: "Katherine Johnson", role: "Mathematician", isOnline: true },
  ])
  const toggleOnline = (name) => {
    setUsers(users.map(u => u.name === name ? { ...u, isOnline: !u.isOnline } : u))
  }
  return (
    <main>
      <h1>React Fundamentals</h1>
      <h2>{users.filter(u => u.isOnline).length}/{users.length} online</h2>
      <button onClick={() => setCount(count + 1)}>Count is {count}</button>
      {users.map((u,i) => <ProfileCard key={u.name} name={u.name} role={u.role} isOnline={u.isOnline} onToggle={() => toggleOnline(u.name)} />)}
      <button onClick={() => setUsers([...users].toSorted((a, b) => a.name.localeCompare(b.name)).toReversed())}>
  Sort ↓
</button>
    <button onClick={() => setUsers([...users].toSorted((a, b) => a.name.localeCompare(b.name)))}>
  Sort ⬆️
</button>
      {/* Lesson assignments render below */}
    </main>
  )
}

export default App
