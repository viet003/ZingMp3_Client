import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, createSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import img from "../../assets/images/img.png"

const SearchPage = () => {
    const [isActive, setIsActive] = useState(0)
    const { searchData, keyword } = useSelector(state => state.music)
    const navigate = useNavigate()

    // useEffect(() => {
    //     console.log(searchData)
    // }, [searchData])

    return (
        <div className='min-w-full px-[59px] h-full overflow-y-scroll'>
            <div className='flex items-center gap-10 border-b-[1px] border-gray-300 w-full min-w-full'>
                <h1 className='text-gray-800 text-[23px] font-semibold border-r-[1px] border-gray-400 pr-5 my-3'>
                    Kết Quả Tìm Kiếm
                </h1>
                <buton
                    onClick={() => {
                        setIsActive(0);
                        navigate({
                            pathname: '/tim-kiem/tat-ca',
                            search: createSearchParams({ q: keyword }).toString()
                        })
                    }}
                    className={`text-[14px] hover:text-primary h-full cursor-pointer text-gray-600 ${isActive === 0 ? 'border-b-[1px] border-primary text-primary' : ''}`}>TẤT CẢ</buton>
                <buton
                    onClick={() => {
                        setIsActive(1);
                        navigate({
                            pathname: '/tim-kiem/bai-hat',
                            search: createSearchParams({ q: keyword }).toString()
                        })
                    }}
                    className={`text-[14px] hover:text-primary h-full cursor-pointer text-gray-600 ${isActive === 1 ? 'border-b-[1px] border-primary text-primary' : ''}`}>BÀI HÁT</buton>
                <buton
                    onClick={() => {
                        setIsActive(2);
                        navigate({
                            pathname: '/tim-kiem/playlist',
                            search: createSearchParams({ q: keyword }).toString()
                        })
                    }}
                    className={`text-[14px] hover:text-primary h-full cursor-pointer text-gray-600 ${isActive === 2 ? 'border-b-[1px] border-primary text-primary' : ''}`}>PLAYLISTS/ALBUM</buton>
                <buton
                    onClick={() => {
                        setIsActive(3);
                        navigate({
                            pathname: '/tim-kiem/artist',
                            search: createSearchParams({ q: keyword }).toString()
                        })
                    }}
                    className={`text-[14px] hover:text-primary h-full cursor-pointer text-gray-600 ${isActive === 3 ? 'border-b-[1px] border-primary text-primary' : ''}`}>NGHỆ SĨ/OA</buton>
                <buton
                    onClick={() => {
                        setIsActive(4);
                        navigate({
                            pathname: '/tim-kiem/tat-ca',
                            search: createSearchParams({ q: keyword }).toString()
                        })
                    }}
                    className={`text-[14px] hover:text-primary h-full cursor-pointer text-gray-600 ${isActive === 4 ? 'border-b-[1px] border-primary text-primary' : ''}`}>MV</buton>
            </div>
            <div className='w-full rounded-xl object-fill mt-5'>
                <img src={img} className='w-full rounded-xl' />
            </div>
            <Outlet />
        </div>
    )
}

export default SearchPage
