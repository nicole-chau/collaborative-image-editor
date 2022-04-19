import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Jimage } from 'react-jimp'
import axios from 'axios'


const Edit = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { from } = location.state

  // string
  const [brightness, setBrightness] = useState(from.brightness)
  const [contrast, setContrast] = useState(from.contrast)
  const [grayscale, setGrayscale] = useState(from.grayscale)


  const save = async () => {
    try {
      await axios.post('/api/images/update', { _id: from.id, brightness, contrast, grayscale })
    } catch (e) {
      alert('error saving edits')
    }
  }

  return (
    <div className="App">
      <Jimage
        src={from.url}
        greyscale={grayscale}
        brightness={brightness}
        contrast={contrast}
        loadBlur
      />
      Brightness:
      <input
        type="number"
        min="-1"
        max="1"
        step="0.1"
        value={brightness}
        onChange={e => setBrightness(e.target.value.toString())}
        className="w-20 p-2 my-2 border-2 rounded"
      />
      Contrast:
      <input
        type="number"
        min="-1"
        max="1"
        step="0.1"
        value={contrast}
        onChange={e => setContrast(e.target.value.toString())}
        className="w-20 p-2 my-2 border-2 rounded"
      />
      <input type="checkbox" id="grayscale" name="grayscale" onChange={e => setGrayscale(e.target.checked)} />
      <label htmlFor="grayscale">Grayscale</label>
      <button type="button" onClick={() => save()}>Save</button>
      <button type="button" onClick={() => navigate(-1)}>Back to Images</button>
    </div>
  )
}

export default Edit
