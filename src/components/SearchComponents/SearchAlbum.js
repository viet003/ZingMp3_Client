import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SectionNotSlider } from "../"

const SearchAlbum = () => {

    const { searchData } = useSelector(state => state.music)
    const [data, setData] = useState([])

    useEffect(() => {
        if (searchData) {
            console.log(searchData)
            setData(searchData)
        }
    }, [searchData])

    return (
        <div className='flex flex-col gap-1 mt-10'>
            <SectionNotSlider items={data?.playlists} search={true}/>
        </div>
    )
}

export default SearchAlbum
