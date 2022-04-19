import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Jimage } from 'react-jimp'
import Share from './Share'

const Image = ({
  id, url, title, owner, lastEdited, collaboraters, setPaused, brightness, contrast, grayscale,
}) => {
  let mapId = 0

  return (
    <>
      <h2 className="text-2xl">{title}</h2>
      <br />
      <Jimage
        src={url}
        greyscale={grayscale}
        brightness={brightness}
        contrast={contrast}
      />
      <h3 className="font-bold">Owner:</h3>
      {owner}
      <br />
      <h3 className="font-bold">Shared With:</h3>
      {collaboraters.map(c => <li key={mapId++}>{c.user}</li>)}
      <br />
      <h3 className="font-bold">Last Edited By:</h3>
      {lastEdited}
      <Share collaboraters={collaboraters} id={id} setPaused={setPaused} />
      <Link
        to="/edit"
        state={
          {
            from: {
              id, url, brightness, contrast, grayscale,
            },
          }
        }
      >
        <button type="button" className="bg-sky-400 text-white p-1 rounded">Edit</button>
      </Link>
    </>
  )
}

export default Image
