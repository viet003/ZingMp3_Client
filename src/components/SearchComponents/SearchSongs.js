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
        data?.length > 0 ? (
            <div className='mt-5 '>
                <h1 className='text-[20px] font-semibold py-3 px-2'>Bài Hát</h1>
                <AlbumListItems songs={count ? data?.slice(0, 6) : data} section={true} totalDuration={2432424} hd={true} search={true} />
            </div>
        ) : (
            <div className='w-full h-[200px] bg-sidebarbg mt-4 rounded-xl grid place-items-center	'>
                <p className='text-[20px] text-primary text-opacity-50'>Không có kết quả được tìm thấy!</p>
            </div>
        )
    )
}

export default SearchSongs
