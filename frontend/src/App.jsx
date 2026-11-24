import { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import api from './api'

function Home() {
  const [status, setStatus] = useState('Not checked yet')
  async function checkApi() {
    try {
      const response = await api.get('/health')
      setStatus(response.data.message)
    } catch {
      setStatus('API not reachable. Start the backend and check the API URL.')
    }
  }
  return <main className="panel">
    <h1>DeployLab</h1>
    <p>Practice building and deploying a React single-page application.</p>
    <button onClick={checkApi}>Check backend connection</button>
    <p className="result">{status}</p>
    <Link to="/login">Open login page →</Link>
  </main>
}

function Login() {
  const [email, setEmail] = useState('student@example.com')
  const [password, setPassword] = useState('practice123')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  async function submit(e) {
    e.preventDefault()
    try {
      const { data } = await api.post('/login', { email, password })
      setMessage(`Welcome, ${data.user.email}`)
      setTimeout(() => navigate('/'), 700)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not connect to the API.')
    }
  }
  return <main className="panel">
    <h1>Practice Login</h1>
    <p>Demo credentials: student@example.com / practice123</p>
    <form onSubmit={submit}>
      <label>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button type="submit">Log in</button>
    </form>
    <p className="result">{message}</p>
    <Link to="/">← Home</Link>
  </main>
}

export default function App() {
  return <Routes><Route path="/" element={<Home />} /><Route path="/login" element={<Login />} /><Route path="*" element={<main className="panel"><h1>404</h1><Link to="/">Go home</Link></main>} /></Routes>
}
