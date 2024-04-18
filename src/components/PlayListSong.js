import React, { memo, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import moment from "moment"
import "moment/locale/vi"
import { AudioPlay, LoadingSong } from '.';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../store/actions"
import { BsThreeDots } from "react-icons/bs";
import { Tooltip } from 'react-tooltip'
import { AiOutlineHeart } from "react-icons/ai";

const PlayListSong = ({ item }) => {

    const dispatch = useDispatch()
    const [isHover, setIsHover] = useState(false)
    const { curSongId, loadingSong, isPlaying } = useSelector(state => state.music)

    return (
        <div
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}
            className={`${curSongId === item?.encodeId ? 'bg-sidebarbg' : 'bg-transparent'} grid grid-cols-[15%,55%,30%] gap-1 p-2 rounded-md hover:bg-sidebarbg`}>
            <div
                className='relative rounded-md overflow-hidden h-[40px] w-[40px]'>
                <img src={item?.thumbnail} className='rounded-md object-cover w-full h-full' />
                {
                    curSongId !== item?.encodeId && <div
                        onClick={() => {
                            dispatch(actions.setCurSongId(item?.encodeId))
                            dispatch(actions.setPlay(true))
                        }}
                        className={`${isHover && curSongId !== item?.encodeId ? 'flex' : 'hidden'} absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 items-center justify-center cursor-pointer`}>
                        <FaPlay className='text-white opacity-100' />
                    </div>
                }
                {
                    curSongId === item?.encodeId && <div
                        onClick={() => { dispatch(actions.setPlay(!isPlaying)) }}
                        className={`flex absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 items-center justify-center cursor-pointer`}>
                        {
                            loadingSong ? <LoadingSong className='text-white z-50' /> : isPlaying ? <AudioPlay /> : <FaPlay className='text-white' />
                        }
                    </div>
                }
            </div>
            <div className='overflow-hidden flex flex-col'>
                <p className='truncate text-ellipsis text-[14px] font-semibold text-gray-600 cursor-pointer hover:text-primary'>{item?.title}</p>
                <p className='truncate text-ellipsis text-[12px] text-gray-500 cursor-default'>{item?.artistsNames}</p>
            </div>
            <div className={`${isHover ? 'flex' : 'hidden'} justify-end items-center cursor-pointer`}>
                <div data-tooltip-id="PlayListSong" data-tooltip-content="Thêm vào thư viện" className='h-[40px] w-[40px] rounded-full hover:bg-gray-300 flex justify-center items-center'>
                    <AiOutlineHeart style={{ color: 'rgb(75,85,99)' }} />
                </div>
                <div data-tooltip-id="PlayListSong" data-tooltip-content="Khác" className='h-[40px] w-[40px] rounded-full hover:bg-gray-300 flex justify-center items-center'>
                    <BsThreeDots style={{ color: 'rgb(75,85,99)' }} />
                </div>
            </div>
            <Tooltip id="PlayListSong" style={{ fontSize: '12px', borderRadius: '20px', backgroundColor: 'gray' }} />
        </div>
    )
}

export default memo(PlayListSong)
