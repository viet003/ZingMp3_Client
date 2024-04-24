import React, { memo, useRef } from 'react'

const BannerSectionChart = ({ item }) => {

  const imgRef = useRef()

  const handleHover = () => {
    if (imgRef.current) {
      imgRef.current.classList?.remove('animate-scale-down');
      imgRef.current.classList?.add('animate-scale-up');
    }
  };

  const handleOut = () => {
    if (imgRef.current) {
      imgRef.current.classList?.remove('animate-scale-up');
      imgRef.current.classList?.add('animate-scale-down');
    }
  };


  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleOut}
      className='object-cover rounded-md overflow-hidden cursor-pointer'>
      <img ref={imgRef} src={item?.banner} className='w-full h-[100px]' loading='lazy'/>
    </div>
  )
}

export default memo(BannerSectionChart)
