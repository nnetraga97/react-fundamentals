import { useState } from 'react'
import './App.css'
import ProfileCard from './comp/ProfileCard'
import SignUp from './comp/wizards/SignUp'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const toggleOnline = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, isOnline: !u.isOnline } : u))
  }

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);
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
    setUsers([...users, { id: crypto.randomUUID(), name, role, isOnline: false }]);
    setName('');
    setRole('');
  }
  return (
    <main>
      <h1>React Fundamentals</h1>
      <h2>{users.filter(u => u.isOnline).length}/{users.length} online</h2>
      <button onClick={() => setCount(count + 1)}>Count is {count}</button>
      {users.map((u) => <ProfileCard key={u.id} name={u.name} role={u.role} isOnline={u.isOnline} onToggle={() => toggleOnline(u.id)} />)}
      <button onClick={() => setUsers([...users].toSorted((a, b) => a.name.localeCompare(b.name)).toReversed())}>
  Sort ↓
</button>
    <button onClick={() => setUsers([...users].toSorted((a, b) => a.name.localeCompare(b.name)))}>
  Sort ⬆️
</button>
      {/* Lesson assignments render below */}
        <SignUp setUsers={setUsers} />
    </main>
  )
}

export default App
