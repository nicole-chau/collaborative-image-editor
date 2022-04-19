import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AllImages from './AllImages'
import Upload from './Upload'

const LoggedIn = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState('')

  // get username
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.post('/account/verify')
      setUser(response.data)
    }

    getUser()
  }, [])

  const logout = async () => {
    try {
      await axios.post('/account/logout')
      navigate('/')
      window.location.reload()
    } catch (e) {
      alert('Log out failed. Please try again.')
    }
  }

  return (
    <>
      <div className="absolute top-5 right-5">
        <p>
          Hi&nbsp;
          {user}
        </p>
        <button type="button" onClick={() => logout()} className="bg-sky-400 text-white p-1 rounded">Log out</button>
      </div>
      <Upload />
      <AllImages user={user} />
    </>
  )
}

export default LoggedIn
