import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Jimage } from 'react-jimp'
import Share from './Share'

const Image = ({
  id, url, title, owner, lastEdited, collaboraters, setPaused, brightness, contrast, saturate, grayscale, invert, sepia,
}) => {
  const [showOrig, setShowOrig] = useState(false)

  let mapId = 0

  return (
    <>
      <h2 className="text-2xl">{title}</h2>
      <div className="flex">
        <div>
          <br />
          {(showOrig
            ? (
              <Jimage
                src={url}
                scaleToFit="500, 500"
                className="mr-10 bg-slate-100 p-5 rounded"
              />
            )
            : (
              <Jimage
                src={url}
                scaleToFit="500, 500"
                greyscale={grayscale}
                invert={invert}
                brightness={brightness}
                contrast={contrast}
                color={[
                  { apply: 'saturate', params: [saturate] },
                ]}
                sepia={sepia}
                className="mr-10 bg-slate-100 p-5 rounded"
              />
            )
          )}
          <div className="flex">
            <Share collaboraters={collaboraters} id={id} setPaused={setPaused} />
            <Link
              to="/edit"
              state={
                {
                  from: {
                    id, url, title, brightness, contrast, saturate, grayscale, invert, sepia,
                  },
                }
              }
            >
              <button type="button" className="bg-blue-400 text-white p-2 my-4 rounded mr-3">Edit</button>
            </Link>
            <button type="button" onClick={() => setShowOrig(!showOrig)} className={`${showOrig ? 'bg-blue-400' : 'bg-blue-200'} text-white p-2 my-4 rounded`}>Show Original</button>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="font-bold">Owner:</h3>
          <p className="bg-slate-200 p-2 rounded w-fit my-3">{owner}</p>
          <h3 className="font-bold">Shared With:</h3>
          {collaboraters.map(c => <li key={mapId++} className="list-none bg-slate-200 p-2 rounded w-fit my-3">{c.user}</li>)}
          <h3 className="font-bold">Last Edited By:</h3>
          <p className="bg-slate-200 p-2 rounded w-fit my-3">{lastEdited}</p>
        </div>
      </div>
    </>
  )
}

export default Image
