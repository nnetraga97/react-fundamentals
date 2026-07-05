import { useState } from 'react'
import './App.css'
import ProfileCard from './comp/ProfileCard'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [users, setUsers] = useState([
    { name: "Ada Lovelace", role: "Mathematician", isOnline: true },
    { name: "Grace Hopper", role: "Computer Scientist", isOnline: false },
    { name: "Katherine Johnson", role: "Mathematician", isOnline: true },
  ])
  const toggleOnline = (name) => {
    setUsers(users.map(u => u.name === name ? { ...u, isOnline: !u.isOnline } : u))
  }
  const [error, setError] = useState(null);
  function handleSubmit(e){
    e.preventDefault();
    if(name.trim() === '' || role.trim() === '') {
      setError('Name and role are required');
      return;
    }
    if(users.some(u => u.name === name.trim())) {
      setError('User with this name already exists');
      return;
    }
    setError(null);
    setUsers([...users, { name, role, isOnline: false }]);
    setName('');
    setRole('');
  }
  return (
    <main>
      <h1>React Fundamentals</h1>
      <h2>{users.filter(u => u.isOnline).length}/{users.length} online</h2>
      <button onClick={() => setCount(count + 1)}>Count is {count}</button>
      {users.map((u) => <ProfileCard key={u.name} name={u.name} role={u.role} isOnline={u.isOnline} onToggle={() => toggleOnline(u.name)} />)}
      <button onClick={() => setUsers([...users].toSorted((a, b) => a.name.localeCompare(b.name)).toReversed())}>
  Sort ↓
</button>
    <button onClick={() => setUsers([...users].toSorted((a, b) => a.name.localeCompare(b.name)))}>
  Sort ⬆️
</button>
      {/* Lesson assignments render below */}

      <forrm onSubmit={handleSubmit}>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
      <input value={role} onChange={(e) => setRole(e.target.value)} type="text" placeholder="Role" />
      {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" onClick={handleSubmit}>Add</button> </forrm>
    </main>
  )
}

export default App
