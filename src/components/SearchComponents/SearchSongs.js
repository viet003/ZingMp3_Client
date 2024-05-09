import React, { useEffect, useState } from 'react'
import { AlbumListItems } from '../';
import { useSelector } from 'react-redux';

const SearchSongs = ({ count }) => {

    const { searchData } = useSelector(state => state.music)
    const [data, setData] = useState([])

    useEffect(() => {
        setData(searchData?.songs)
    }, [searchData])

    return (
        <div className='mt-5 '>
            <h1 className='text-[20px] font-semibold py-3 px-2'>Bài Hát</h1>
            <AlbumListItems songs={count ? data?.slice(0,6) : data} section={true} totalDuration={2432424} hd={true} search={true}/>
        </div>
    )
}

export default SearchSongs
