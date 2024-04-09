import React from 'react'
import { useParams } from "react-router-dom"

function Playlist() {
  const { id, title } = useParams()
  return (
    <div>
      Playlist
    </div>
  )
}

export default Playlist
