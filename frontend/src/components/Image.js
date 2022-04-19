import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Share from './Share'

const Image = ({
  id, url, title, owner, lastEdited, collaboraters, setPaused, brightness,
}) => {
  // const [newAnswer, setNewAnswer] = useState('')

  // const answerQuestion = async e => {
  //   e.preventDefault()
  //   try {
  //     await axios.post('/api/questions/answer', { _id: id, answer: newAnswer })
  //   } catch (err) {
  //     alert('Question answer failed.')
  //   }
  //   e.target.reset()
  // }

  // const [brightness, setBrightness] = useState(0)
  // const [contrast, setContrast] = useState(0)

  console.log(brightness)

  let mapId = 0

  console.log(url)

  return (
    <>
      <h2 className="text-2xl">{title}</h2>
      <br />
      <img src={url} alt={title} className="w-60" id="image" />
      <h3 className="font-bold">Owner:</h3>
      {owner}
      <br />
      <h3 className="font-bold">Shared With:</h3>
      {collaboraters.map(c => <li key={mapId++}>{c.user}</li>)}
      <br />
      <h3 className="font-bold">Last Edited By:</h3>
      {lastEdited}
      <Share collaboraters={collaboraters} id={id} setPaused={setPaused} />
      <Link to="/edit" state={{ from: { id, url, brightness } }}>
        <button type="button" className="bg-sky-400 text-white p-1 rounded w-1/4">Edit</button>
      </Link>
    </>
  )
}

export default Image
