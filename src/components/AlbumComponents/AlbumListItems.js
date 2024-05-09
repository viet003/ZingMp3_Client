import React, { memo } from 'react'
import { AlbumItem } from '..'
import moment from 'moment'
import { BsDot } from 'react-icons/bs'


const AlbumListItems = ({ songs, totalDuration, section, hd, description, search }) => {

    // console.log({ songs, totalDuration })
    return (
        <div className='w-full flex flex-col text-xs text-gray-600'>
            {
                description && (
                    <p className='text-gray-500 text-[15px] mb-4 leading-5'>{description}</p>
                )
            }
            {
                !hd && <div className={`grid ${section ? 'grid-cols-[50%,40%,10%]' : 'grid-cols-[10%,45%,40%,10%]'} justify-between items-center p-[10px] font-semibold`}>
                    {!section && <div></div>}
                    <span>BÀI HÁT</span>
                    <span>ALBUM</span>
                    <span>THỜI GIAN</span>
                </div>
            }
            <div className='flex flex-col'>
                {songs?.map((item, index) => (
                    <AlbumItem key={item.encodeId} songData={item} section={section} index={index} hd={hd} search={search}/>
                ))}
            </div>
            <span className='flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
                <span>{`${songs?.length} bài hát`}</span>
                <BsDot size={24} />
                <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span>
            </span>
        </div>
    )
}

export default memo(AlbumListItems)