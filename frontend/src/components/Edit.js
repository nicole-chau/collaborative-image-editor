import React, { useState } from "react"
import { useLocation } from 'react-router-dom'
import { Jimage } from "react-jimp"
import testImage from "./test.jpg"
import axios from "axios"


const Edit = () => {
  const location = useLocation()
  const { from } = location.state

  console.log(from.url)
  console.log(from.brightness)

  const save = async () => {
    try {
      await axios.post('/api/images/update', { _id: id, brightness })
    }
  }

  return (
    <div className="App">
      <Jimage
        src={'https://images.indianexpress.com/2021/01/Golden-Retriever-dog.jpg'}
        pixelate="5"
        mirror="true, false"
        greyscale
        color={[{ apply: "hue", params: [-90] }]}
        loadBlur
        brightness={from.brightness}
      />
      Brightness:
      <input className="w-20 p-2 my-2 border-2 rounded"/>

      <button type="button">Save</button>
    </div>
  )
}

export default Edit


