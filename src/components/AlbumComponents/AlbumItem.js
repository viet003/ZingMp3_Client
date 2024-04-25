import React, { memo } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { BsMusicNoteBeamed } from "react-icons/bs";
import { AudioPlay } from ".."
import LoadingSong from "../LoadingSong"
import { FaPlay } from "react-icons/fa";


const AlbumItem = ({ songData, section, index, hd }) => {

    const dispatch = useDispatch()
    const { curSongId, isPlaying, loadingSong } = useSelector(state => state.music)
    

    return (
        <div className={`${curSongId === songData?.encodeId ? 'bg-gray-300' : ''} grid ${section ? 'grid-cols-[50%,40%,10%] mr-4' : hd ? 'grid-cols-[10%,75%,10%]' : 'grid-cols-[5%,45%,40%,10%]'} justify-between gap-3 items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] rounded-md hover:bg-[#DDE4E4] cursor-pointer`}
            onClick={() => {
                if (curSongId !== songData?.encodeId) {
                    dispatch(actions.setCurSongId(songData?.encodeId))
                    dispatch(actions.setPlay(true))
                    dispatch(actions.setIsPlayAtList(true))
                    dispatch(actions.setLoadingSong(true))
                }
            }}
        >
            {!section && <p className={`${index === 0 ? 'text-shadow-no1' : index === 1 ? 'text-shadow-no2' : index === 2 ? 'text-shadow-no3' : 'text-shadow'} text-3xl text-gray-200 flex`}>#{index + 1}</p>}
            <div className='flex items-center gap-3 flex-1'>
                {
                    !hd && <span>
                        <BsMusicNoteBeamed />
                    </span>
                }
                <div className='w-12 h-10 rounded-md object-cover relative'>
                    <img src={songData?.thumbnail} alt="thumbnailM" className='w-full h-full object-cover rounded-md' />
                    {
                        curSongId === songData?.encodeId && (
                            <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 rounded-md flex justify-center items-center'>
                                {
                                    loadingSong ? <LoadingSong className='text-white z-50' /> : isPlaying ? <AudioPlay /> : <FaPlay className='text-white' />
                                }
                            </div>
                        )
                    }
                </div>
                <span className='flex flex-col w-full overflow-hidden'>
                    <span className={`${hd ? 'truncate text-ellipsis' : ''} text-sm font-semibold`}>{songData?.title?.length > 30 ? `${songData?.title?.slice(0, 30)}...` : songData?.title}</span>
                    <span className={`${hd ? 'truncate text-ellipsis' : ''}`}>{songData?.artistsNames}</span>
                </span>
            </div>
            {
                !hd && <div className='flex-1 flex items-center justify-start'>
                    {songData?.album?.title?.length > 30 ? `${songData?.album?.title?.slice(0, 30)}...` : songData?.album?.title}
                </div>
            }
            <div className='flex-1 flex justify-center'>
                {
                    songData?.duration ? moment.utc(songData?.duration * 1000).format('mm:ss') : '05:12:38'
                }
            </div>
        </div>
    )
}

export default memo(AlbumItem)