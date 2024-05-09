import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AuthorComponents, SectionNotSlider, SearchSongs } from "../"

const SearchAll = () => {

  const { searchData } = useSelector(state => state.music)
  const [data, setData] = useState([])

  useEffect(() => {
    if (searchData) {
      // console.log(searchData)
      setData(searchData)
    }
  }, [searchData])

  return (
    data.length > 0 ? (
      <div className='flex flex-col gap-10'>
        <SearchSongs count={true} />
        <SectionNotSlider items={data?.playlists} />
        <AuthorComponents items={data?.artists} count={4} />
      </div>
    ) : (
      <div className='w-full h-[200px] bg-sidebarbg mt-4 rounded-xl grid place-items-center	'>
          <p className='text-[20px] text-primary text-opacity-50'>Không có kết quả được tìm thấy!</p>
      </div>
    )
  )
}

export default SearchAll
