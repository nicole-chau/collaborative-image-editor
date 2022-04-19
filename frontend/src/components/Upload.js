import React, { useState } from 'react'
import axios from 'axios'

const Upload = () => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [showModal, setShowModal] = useState(false)

  const uploadImage = async () => {
    try {
      await axios.post('api/images/upload', { url, title })
      setShowModal(false)
    } catch (e) {
      alert('failed to upload question')
    }
  }

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)} className="bg-sky-400 text-white p-2 block rounded w-1/4">Upload Image</button>
      {showModal
      && (
        <div className="flex justify-center items-center bg-gray-200 bg-opacity-50 absolute inset-0">
          <div className="bg-white p-5 rounded">
            <b>Upload Image</b>
            <br />
            <br />
            Image URL:
            <input onChange={e => setUrl(e.target.value)} className="block w-80 p-2 my-2 border-2 rounded" />
            Title:
            <input onChange={e => setTitle(e.target.value)} className="block w-80 p-2 my-2 border-2 rounded" />
            <button type="button" onClick={() => uploadImage()} className="bg-sky-400 text-white p-2 rounded w-30 my-2 mr-3">Upload</button>
            <button type="button" onClick={() => setShowModal(false)} className="bg-slate-400 text-white p-2 rounded w-30 my-3">Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Upload
