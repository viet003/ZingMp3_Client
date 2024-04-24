import React, { memo, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import moment from "moment"
import "moment/locale/vi"
import { AudioPlay, LoadingSong } from '..';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../store/actions"
import { Tooltip } from 'react-tooltip'

const ItemSectionSlider = ({ item, index }) => {

    const dispatch = useDispatch()
    const [isHover, setIsHover] = useState(false)
    const { curSongId, loadingSong, isPlaying } = useSelector(state => state.music)

    return (
        <div className='flex justify-center items-center'>
            <div
                onMouseEnter={() => { setIsHover(true) }}
                onMouseLeave={() => { setIsHover(false) }}
                className={`bg-gray-200 grid grid-cols-[40%,60%] gap-[2px] p-4 rounded-md hover:bg-sidebarbg w-[95%]`}>
                <div
                    className='relative rounded-md overflow-hidden h-[120px] w-[120px]'>
                    <img src={item?.thumbnailM} className='rounded-md object-cover w-full h-full' loading='lazy' />
                    {
                        curSongId !== item.encodeId && <div
                            onClick={() => {
                                // console.log(item?.encodeId)
                                dispatch(actions.setCurSongId(item?.encodeId))
                                dispatch(actions.setPlay(true))
                            }}
                            className={`${isHover && curSongId !== item?.encodeId ? 'flex' : 'hidden'} absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 items-center justify-center cursor-pointer`}>
                            <FaPlay className='text-white opacity-100' />
                        </div>
                    }
                    {
                        curSongId === item.encodeId && <div
                            onClick={() => { dispatch(actions.setPlay(!isPlaying)) }}
                            className={`flex absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 items-center justify-center cursor-pointer`}>
                            {
                                loadingSong ? <LoadingSong className='text-white z-50' /> : isPlaying ? <AudioPlay /> : <FaPlay className='text-white' />
                            }
                        </div>
                    }
                </div>
                <div className='overflow-hidden flex flex-col justify-between'>
                    <div className='flex flex-col'>
                        <p className='truncate text-ellipsis text-[14px] font-semibold text-gray-600 cursor-pointer hover:text-primary'>{item?.title}</p>
                        <p className='truncate text-ellipsis text-[12px] text-gray-500 cursor-default'>{item?.artistsNames}</p>
                    </div>
                    <div className='flex items-end justify-between'>
                        <p className="text-shadow text-6xl text-gray-200 flex">{index + 1}</p>
                        <p className='text-gray-500 text-[15px]'>{moment.unix(1713353400).format('DD.MM.yyyy')}</p>
                    </div>
                </div>
                {/* <div className={`${isHover ? 'flex' : 'hidden'} flex justify-end items-center cursor-pointer`}>
                <div data-tooltip-id="newRelease-toolTip" data-tooltip-content="Khác" className='h-[40px] w-[40px] rounded-full hover:bg-gray-300 flex justify-center items-center'>
                    <BsThreeDots />
                </div>
            </div> */}
                <Tooltip id="newRelease-toolTip" style={{ fontSize: '12px', borderRadius: '20px', backgroundColor: 'gray' }} />
            </div>
        </div>
    )
}

export default memo(ItemSectionSlider)
