import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AuthorComponents, SectionNotSlider, SearchSongs } from "../"

const SearchAll = () => {

  const { searchData } = useSelector(state => state.music)
  const [data, setData] = useState([])

  useEffect(() => {
    if (searchData) {
      console.log(searchData)
      setData(searchData)
    }
  }, [searchData])

  return (
    <div className='flex flex-col gap-10'>
      <SearchSongs count={true}/>
      <SectionNotSlider items={data?.playlists} />
      <AuthorComponents items={data?.artists} count={4}/>
    </div>
  )
}

export default SearchAll
