import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GrFavorite } from "react-icons/gr";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";


function Items({ item, isShow }) {

    const navigator = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const imgRef = useRef()

    const handleHover = () => {
        setIsHover(true);
        if (imgRef.current) {
            imgRef.current.classList?.remove('animation-scale-down');
            imgRef.current.classList?.add('animation-scale-up');
        }
    };

    const handleOut = () => {
        setIsHover(false);
        if (imgRef.current) {
            imgRef.current.classList?.remove('animation-scale-up');
            imgRef.current.classList?.add('animation-scale-down');
        }
    };

    return (
        <div>
            <div
                className='flex flex-col gap-3' key={item?.encodeId}>
                <div
                    onMouseEnter={handleHover}
                    onMouseLeave={handleOut}
                    className='object-cover rounded-xl cursor-pointer relative overflow-hidden'>
                    <img ref={imgRef} src={item?.thumbnail} className='rounded-xl w-full' />
                    {
                        isHover && 
                        <div
                        onClick={(e) => {e.preventDefault(); navigator(item?.link?.split('.')[0])}} 
                        className='absolute top-0 left-0 bottom-0 right-0 bg-black opacity-70 z-20 flex justify-center items-center'>
                        </div>
                    }
                    {
                        isHover && (
                            <div className='flex items-center justify-center gap-7 z-20 text-white absolute top-0 left-0 right-0 bottom-0'>
                                <GrFavorite size={20} />
                                <div onClick={(e) => {e.preventDefault()}} className='h-[50px] w-[50px] rounded-full border-white border-2 flex pl-[7px] items-center'>
                                    <CiPlay1 size={35} />
                                </div>
                                <HiOutlineDotsHorizontal size={20} />
                            </div>
                        )
                    }
                </div>
                <p className='font-semibold text-[14px] text-gray-600 cursor-default truncate-lines-2 text-ellipsis'>
                    {item?.sortDescription}
                </p>
                <>
                    {
                        isShow && item?.artists && (
                            <p className='text-[11px] cursor-pointer'>
                                {
                                    item?.artists?.map((e) => e.name + ', ')
                                }
                            </p>
                        )
                    }
                </>
            </div>
        </div>
    )
}

export default Items
