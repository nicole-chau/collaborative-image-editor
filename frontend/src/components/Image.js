import React, { useState } from 'react'
import axios from 'axios'
import Share from './Share'

const Image = ({
  id, url, title, owner, lastEdited, collaboraters, setPaused,
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

  let mapId = 0

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
      <button>Edit</button>
    </>
  )
}

export default Image
