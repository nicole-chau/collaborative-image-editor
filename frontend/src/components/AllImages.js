import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from './Image'

const AllImages = ({ user }) => {
  const [images, setImages] = useState([])
  const [ownedImgs, setOwnedImgs] = useState([])
  const [sharedImgs, setSharedImgs] = useState([])
  const [showOwned, setShowOwned] = useState(true)
  // pause automatic update
  const [paused, setPaused] = useState(false)
  // info image to display
  const [displayId, setDisplayId] = useState('')
  const [displayUrl, setDisplayUrl] = useState('')
  const [displayTitle, setDisplayTitle] = useState('')
  const [displayOwner, setDisplayOwner] = useState('')
  const [displayLastEdit, setDisplayLastEdit] = useState('')
  const [displayCollabs, setDisplayCollabs] = useState([])

  // info for image processing
  const [dpBrightness, setDpBrightness] = useState('')
  const [dpContrast, setDpContrast] = useState('')
  const [dpGrayscale, setDpGrayscale] = useState(false)


  useEffect(() => {
    const intervalID = setInterval(() => {
      if (!paused) {
        const getImages = async () => {
          try {
            const { data } = await axios.get('/api/images')
            setImages(data)
          } catch (e) {
            alert('failed to get images')
          }
        }

        getImages()
      }
    }, 2000)

    return () => clearInterval(intervalID)
  }, [paused, displayId])

  useEffect(() => {
    const displayImg = () => {
      const owned = images.filter(d => d.owner === user)

      if (displayId === '') {
        if (owned.length !== 0) {
          setDisplayId(owned[0]._id)
          setDisplayUrl(owned[0].url)
          setDisplayTitle(owned[0].title)
          setDisplayOwner(owned[0].owner)
          setDisplayLastEdit(owned[0].lastEdited)
          setDisplayCollabs(owned[0].collaboraters)

          setDpBrightness(owned[0].brightness)
          setDpContrast(owned[0].contrast)
          setDpGrayscale(owned[0].grayscale)
        }
      } else {
        const filter = images.filter(d => (
          d._id === displayId
        ))

        setDisplayUrl(filter[0].url)
        setDisplayTitle(filter[0].title)
        setDisplayOwner(filter[0].owner)
        setDisplayLastEdit(filter[0].lastEdited)
        setDisplayCollabs(filter[0].collaboraters)

        setDpBrightness(filter[0].brightness)
        setDpContrast(filter[0].contrast)
        setDpGrayscale(filter[0].grayscale)
      }
    }

    const getOwned = () => {
      const owned = images.filter(i => i.owner === user)
      setOwnedImgs(owned)
    }

    const getShared = () => {
      const shared = images.filter(i => (i.collaboraters.some(c => c.user === user)))
      setSharedImgs(shared)
    }

    displayImg()
    getOwned()
    getShared()
  }, [images])

  const selectImage = ({
    _id, url, title, owner, lastEdited, collaboraters, brightness, contrast, grayscale
  }) => {
    setDisplayId(_id)
    setDisplayUrl(url)
    setDisplayTitle(title)
    setDisplayOwner(owner)
    setDisplayLastEdit(lastEdited)
    setDisplayCollabs(collaboraters)

    setDpBrightness(brightness)
    setDpContrast(contrast)
    setDpGrayscale(grayscale)
  }

  let id = 0

  return (
    <div className="flex">
      <div className="w-1/4 mr-5">
        <button type="button" onClick={() => setShowOwned(true)}>My Images</button>
        <button type="button" onClick={() => setShowOwned(false)}>Images Shared With Me</button>
        {showOwned
          ? ownedImgs.map(i => <button key={id++} type="button" onClick={() => selectImage(i)} className="block p-2 rounded border-2 my-2 w-full">{i.title}</button>)
          : sharedImgs.map(i => <button key={id++} type="button" onClick={() => selectImage(i)} className="block p-2 rounded border-2 my-2 w-full">{i.title}</button>)}
      </div>

      <div className="border-l-2 pl-5">
        {displayId === ''
          ? <p>Upload an image to start editing!</p>
          : (
          <Image
          id={displayId}
          url={displayUrl}
          title={displayTitle}
          owner={displayOwner}
          lastEdited={displayLastEdit}
          collaboraters={displayCollabs}
          setPaused={setPaused}
          brightness={dpBrightness}
          contrast={dpContrast}
          grayscale={dpGrayscale}
        />)}
      </div>
    </div>
  )
}

export default AllImages
