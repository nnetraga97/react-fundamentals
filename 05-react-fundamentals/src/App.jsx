import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>React Fundamentals</h1>

      <button onClick={() => setCount(count + 1)}>Count is {count}</button>

      {/* Lesson assignments render below */}
    </main>
  )
}

export default App
