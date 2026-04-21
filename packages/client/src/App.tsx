import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('')
  const [health, setHealth] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messageRes, healthRes] = await Promise.all([
          axios.get('/api'),
          axios.get('/api/health')
        ])
        setMessage(messageRes.data)
        setHealth(healthRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <h1>React + NestJS + PostgreSQL</h1>
      <div className="card">
        <h2>Server Response:</h2>
        <p>{message || 'Loading...'}</p>
      </div>
      {health && (
        <div className="card">
          <h2>Server Health:</h2>
          <pre>{JSON.stringify(health, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App