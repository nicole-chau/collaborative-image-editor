import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserForm from './UserForm'

const LogIn = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    try {
      await axios.post('/account/login', { username, password })
      navigate('/')
    } catch (e) {
      alert('Log in failed. Please try again.')
    }
  }

  return (
    <div className="mx-auto my-12 w-1/4">
      <h1 className="font-sans text-3xl font-bold mb-4">Log In</h1>
      <UserForm setUsername={setUsername} setPassword={setPassword} />
      <button type="button" onClick={() => login()} className="bg-sky-400 text-white p-2 rounded w-30 my-3">Log In</button>
      <br />
      <p>
        Don&apos;t have an account? &nbsp;
        <Link to="/signup" className="text-sky-500">Sign up!</Link>
      </p>
      <br />
    </div>
  )
}

export default LogIn
