import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LoggedOut from './LoggedOut'
import LoggedIn from './LoggedIn'

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        await axios.post('/account/verify')
        setLoggedIn(true)
      } catch (e) {
        setLoggedIn(false)
      }
    }

    isLoggedIn()
  }, [])

  return (
    <div className="m-5">
      <h1 className="font-sans text-3xl font-bold mb-8">Collaborative Image Editor</h1>
      {loggedIn ? <LoggedIn /> : <LoggedOut />}
    </div>
  )
}

export default HomePage
