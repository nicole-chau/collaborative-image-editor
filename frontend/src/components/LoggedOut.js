import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoggedOut = () => (
  <>
    <Link to="/login">
      <button type="button" className="bg-sky-400 text-white p-1 rounded w-1/4">Log in to start editing photos</button>
    </Link>
  </>
)

export default LoggedOut
