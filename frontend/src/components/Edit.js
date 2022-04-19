import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Jimage } from 'react-jimp'
import axios from 'axios'

const Edit = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state: { from } } = location

  const [title, setTitle] = useState(from.title)
  const [brightness, setBrightness] = useState(from.brightness)
  const [contrast, setContrast] = useState(from.contrast)
  const [saturate, setSaturate] = useState(from.saturate)
  const [grayscale, setGrayscale] = useState(from.grayscale)
  const [invert, setInvert] = useState(from.invert)
  const [sepia, setSepia] = useState(from.sepia)

  const save = async () => {
    try {
      await axios.post('/api/images/update', {
        _id: from.id, title, brightness, contrast, saturate, grayscale, invert, sepia,
      })
    } catch (e) {
      alert('error saving edits')
    }
  }

  return (
    <div className="m-5">
      <h1 className="font-sans text-3xl font-bold mb-8">Collaborative Image Editor</h1>
      <div className="flex">
        <div className="mr-10">
          <h2 className="text-xl">{`Currently editing "${title}"`}</h2>
          <Jimage
            src={from.url}
            scaleToFit="600, 600"
            greyscale={grayscale}
            brightness={brightness}
            contrast={contrast}
            color={[
              { apply: 'saturate', params: [saturate] },
            ]}
            invert={invert}
            sepia={sepia}
            loadBlur
          />
        </div>

        <div>
          <div>
            Title:
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-30 p-1 m-2 border-2 rounded"
            />
          </div>
          <div>
            Brightness:
            <input
              type="number"
              min="-1"
              max="1"
              step="0.1"
              value={brightness}
              onChange={e => setBrightness(e.target.value.toString())}
              className="w-15 p-1 m-2 border-2 rounded"
            />
          </div>
          <div>
            Contrast:
            <input
              type="number"
              min="-1"
              max="1"
              step="0.1"
              value={contrast}
              onChange={e => setContrast(e.target.value.toString())}
              className="w-15 p-1 m-2 border-2 rounded"
            />
          </div>
          <div>
            Saturate:
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={saturate}
              onChange={e => setSaturate(e.target.value)}
              className="w-15 p-1 m-2 border-2 rounded"
            />
          </div>
          <div>
            <input type="checkbox" id="grayscale" name="grayscale" onChange={e => setGrayscale(e.target.checked)} className="m-1" />
            <label htmlFor="grayscale">Grayscale</label>
          </div>
          <div>
            <input type="checkbox" id="invert" name="invert" onChange={e => setInvert(e.target.checked)} className="m-1" />
            <label htmlFor="invert">Invert</label>
          </div>
          <div>
            <input type="checkbox" id="sepia" name="sepia" onChange={e => setSepia(e.target.checked)} className="m-1" />
            <label htmlFor="sepia">Sepia</label>
          </div>
          <button type="button" onClick={() => save()} className="bg-blue-400 text-white p-1 mr-2 my-3 rounded">Save</button>
          <button type="button" onClick={() => navigate(-1)} className="bg-slate-400 text-white p-1 my-3 rounded">Back to Images</button>
        </div>
      </div>
    </div>
  )
}

export default Edit
