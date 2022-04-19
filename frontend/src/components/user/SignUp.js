import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserForm from './UserForm'

const SignUp = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const createUser = async () => {
    try {
      await axios.post('/account/signup', { username, password })
      navigate('/')
    } catch (e) {
      alert('Sign up failed. Please try again.')
    }
  }

  return (
    <div className="mx-auto my-12 w-1/4">
      <h1 className="font-sans text-3xl font-bold mb-4">Sign Up</h1>
      <UserForm setUsername={setUsername} setPassword={setPassword} />
      <button type="button" onClick={() => createUser()} className="bg-sky-400 text-white p-2 rounded w-30 my-3">Sign Up</button>
      <br />
      <p>
        Already have an account? &nbsp;
        <Link to="/login" className="text-sky-500">Log in here!</Link>
      </p>
      <br />
    </div>
  )
}

export default SignUp
