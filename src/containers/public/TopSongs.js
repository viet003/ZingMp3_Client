import React, { useEffect, useState } from 'react'
import { LoadingApp, AlbumListItems } from '../../components'
import { BsFillPlayFill } from "react-icons/bs";
import * as apis from "../../controllers"

const TopSongs = () => {

    const [loading, setLoading] = useState(true)
    const [dataSongs, setDataSongs] = useState({})

    useEffect(() => {
        const fectchData = async () => {
            const response = await apis.apiGetNewReleaseChart();
            if (response?.data?.err === 0) {
                // console.log(response.data?.data)
                setDataSongs(response.data?.data)
            }
            setLoading(false)
        }
        fectchData()
    }, [])

    return (
        <div className='flex flex-col gap-10 w-full overflow-hidden relative py-[30px] h-full overflow-y-scroll px-[59px]'>
            {
                loading && <div className={`absolute right-0 bottom-0 top-0 left-0 z-50 bg-primarybg flex justify-center h-[calc(100vh-70px)] items-center`}>
                    {
                        <LoadingApp />
                    }
                </div>
            }
            <div className='flex items-center gap-3'>
                <h1 className='font-semibold text-[40px] bg-gradient-to-r from-[#e35050] to-indigo-400 inline-block text-transparent bg-clip-text'>{dataSongs?.title}</h1>
                <div className='w-[35px] h-[35px] rounded-full flex items-center justify-center bg-primary hover:bg-hover cursor-pointer'>
                    <BsFillPlayFill className='text-white' size={20} />
                </div>
            </div>
            <AlbumListItems songs={dataSongs?.items} />
        </div>
    )
}

export default TopSongs
