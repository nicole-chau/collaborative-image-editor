import React from 'react'

const UserForm = ({ setUsername, setPassword }) => (
  <>
    Username:
    <input onChange={e => setUsername(e.target.value)} className="block w-80 p-2 my-2 border-2 rounded" />
    <br />
    Password:
    <input onChange={e => setPassword(e.target.value)} className="block w-80 p-2 my-2 border-2 rounded" />
  </>
)

export default UserForm
