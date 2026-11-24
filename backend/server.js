import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ success: true, message: 'Backend connected successfully!' }))

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {}
  if (email !== 'student@example.com' || password !== 'practice123') {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' })
  }
  return res.json({ success: true, message: 'Login successful', user: { email } })
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API running on http://localhost:${port}`))
