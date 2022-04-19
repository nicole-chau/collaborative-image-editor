import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Share = ({ id, collaboraters, setPaused }) => {
  const [collabs, setCollabs] = useState([])
  const [newCollab, setNewCollab] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setCollabs(collaboraters)
  }, [collaboraters])

  const handleSave = async () => {
    setPaused(false)
    try {
      await axios.post('api/images/share', { _id: id, collaboraters: collabs })
      setShowModal(false)
    } catch (e) {
      alert('failed to share image')
    }
  }

  const handleRemove = async ({ user }) => {
    setCollabs(collabs.filter(c => c.user !== user))
  }

  const handleAdd = async user => {
    if (!(collabs.some(c => c.user === user))) {
      setCollabs([...collabs, { user }])
    }
  }

  const handleCancel = async () => {
    setShowModal(false)
    setPaused(false)
  }

  const handleModal = () => {
    setShowModal(true)
    setPaused(true)
  }

  let kId = 0

  return (
    <>
      <button type="button" onClick={() => handleModal()} className="block bg-blue-400 text-white p-2 rounded w-30 my-4 mr-3">Share</button>
      {showModal && (
        <div className="flex justify-center items-center bg-gray-200 bg-opacity-50 absolute inset-0">
          <div className="bg-white p-5 rounded">
            Users shared with:
            <br />
            {collabs.map(c => <button key={kId++} type="button" onClick={() => handleRemove(c)} className="bg-slate-200 p-2 rounded w-30 my-3">{`${c.user} x`}</button>)}
            <br />
            Enter a username:
            <input onChange={e => setNewCollab(e.target.value)} className="block w-80 p-2 my-2 border-2 rounded" />
            <button type="button" onClick={() => handleAdd(newCollab)} className="bg-blue-400 text-white p-2 rounded w-30 my-2 mr-3">Add as collaborater</button>
            <button type="button" onClick={() => handleSave()} className="bg-blue-400 text-white p-2 rounded w-30 my-2 mr-3">Save</button>
            <button type="button" onClick={() => handleCancel()} className="bg-slate-400 text-white p-2 rounded w-30 my-3">Cancel</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Share
