import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from './Image'

const AllImages = () => {
  const [images, setImages] = useState([])
  // image to display
  const [displayId, setDisplayId] = useState('')
  const [displayUrl, setDisplayUrl] = useState('')
  const [displayTitle, setDisplayTitle] = useState('')
  const [displayOwner, setDisplayOwner] = useState('')
  const [displayLastEdit, setDisplayLastEdit] = useState('')
  const [displayCollabs, setDisplayCollabs] = useState([])

  const [brightness, setBrightness] = useState(0)

  const [paused, setPaused] = useState(false)

  useEffect(() => {
    // const intervalID = setInterval(() => {
      console.log(paused)
      if (!paused) {
        const getImages = async () => {
          try {
            const response = await axios.get('/api/images')
            setImages(response.data)

            if (displayId === '') {
              setDisplayId(response.data[0]._id)
              setDisplayUrl(response.data[0].url)
              setDisplayTitle(response.data[0].title)
              setDisplayOwner(response.data[0].owner)
              setDisplayLastEdit(response.data[0].lastEdited)
              setDisplayCollabs(response.data[0].collaboraters)

              setBrightness(response.data[0].brightness)
            } else {
              const { data } = response
              const filter = data.filter(d => (
                d._id === displayId
              ))

              setDisplayUrl(filter[0].url)
              setDisplayTitle(filter[0].title)
              setDisplayOwner(filter[0].owner)
              setDisplayLastEdit(filter[0].lastEdited)
              setDisplayCollabs(filter[0].collaboraters)

              setBrightness(filter[0].brightness)
            }
          } catch (e) {
            alert('failed to get images')
          }
        }

        getImages()
      }
    // }, 1000)

    // return () => clearInterval(intervalID)
  }, [displayId])

  const selectImage = ({
    _id, url, title, owner, lastEdited, collaboraters,
  }) => {
    setDisplayId(_id)
    setDisplayUrl(url)
    setDisplayTitle(title)
    setDisplayOwner(owner)
    setDisplayLastEdit(lastEdited)
    setDisplayCollabs(collaboraters)
  }

  let id = 0

  return (
    <div className="flex">
      <div className="w-1/4 mr-5">
        {images.map(i => <button key={id++} type="button" onClick={() => selectImage(i)} className="block p-2 rounded border-2 my-2 w-full">{i.title}</button>)}
      </div>

      <div className="border-l-2 pl-5">
        <Image id={displayId} url={displayUrl} title={displayTitle} owner={displayOwner} lastEdited={displayLastEdit} collaboraters={displayCollabs} setPaused={setPaused} brightness={brightness}/>
      </div>
    </div>
  )
}

export default AllImages
