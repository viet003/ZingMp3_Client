import React, { useRef, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { GrFavorite } from "react-icons/gr";
import { FaPlay } from "react-icons/fa";
// import { CiPause1 } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Tooltip } from 'react-tooltip'


function ItemsSectionNotSlider({ item, isShow }) {

    const navigator = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const imgRef = useRef()

    const handleHover = () => {
        setIsHover(true);
        if (imgRef.current) {
            imgRef.current.classList?.remove('animate-scale-down');
            imgRef.current.classList?.add('animate-scale-up');
        }
    };

    const handleOut = () => {
        setIsHover(false);
        if (imgRef.current) {
            imgRef.current.classList?.remove('animate-scale-up');
            imgRef.current.classList?.add('animate-scale-down');
        }
    };

    return (
        <div>
            <Tooltip id="notSlider-tooltip" place='top' style={{ fontSize: '12px', borderRadius: '20px', zIndex: '100'}} />
            <div
                className='flex flex-col gap-2' key={item?.encodeId}>
                <div
                    onMouseEnter={handleHover}
                    onMouseLeave={handleOut}
                    className='object-cover rounded-xl cursor-pointer relative overflow-hidden'>
                    <img ref={imgRef} src={item?.thumbnail} className='rounded-xl w-full' />
                    {
                        isHover &&
                        <div
                            onClick={(e) => { e.preventDefault(); navigator(item?.link?.split('.')[0]) }}
                            className='absolute top-0 left-0 bottom-0 right-0 bg-black opacity-70 z-20 flex justify-center items-center'>
                        </div>
                    }
                    {
                        isHover && (
                            <div className='flex items-center justify-center gap-7 z-20 text-white absolute top-[40%] left-0 w-full'>
                                <div data-tooltip-id="notSlider-tooltip" data-tooltip-content="Thêm vào thư viện" className='w-[30px] h-[30px] hover:bg-gray-500 flex items-center justify-center rounded-full'>
                                    <GrFavorite size={20} />
                                </div>
                                <div onClick={(e) => { e.preventDefault() }} className='h-[50px] w-[50px] rounded-full border-white border-2 flex justify-center items-center'>
                                    <FaPlay size={25} />
                                </div>
                                <div data-tooltip-id="notSlider-tooltip" data-tooltip-content="Khác" className='w-[30px] h-[30px] hover:bg-gray-500 flex items-center justify-center rounded-full'>
                                    <HiOutlineDotsHorizontal size={20} />
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    !isShow && (
                        <p className='font-medium text-[14px] text-gray-500 cursor-default truncate-lines-2 text-ellipsis'>
                            {item?.sortDescription}
                        </p>
                    )
                }
                {
                    isShow && (
                        <p className='font-medium text-[14px] text-gray-500 cursor-default truncate text-ellipsis'>
                            {item?.title}
                        </p>
                    )
                }
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

export default memo(ItemsSectionNotSlider)
