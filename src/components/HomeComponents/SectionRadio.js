import React from 'react'
import Slider from "react-slick";
import { MdKeyboardArrowRight } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemsSectionRadio from './ItemsSectionRadio';


function SectionRadio({ items }) {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 500,
    // autoplaySpeed: 5000,
    // cssEase: "linear"

  };

  return (
    <div className='w-full flex flex-col gap-3'>
      <div className='flex justify-between items-center'>
        <h1 className=' text-gray-600 font-semibold text-[20px]'>{items?.name}</h1>
        <div className='flex items-center justify-center text-[11px] cursor-pointer hover:underline text-gray-500 font-semibold hover:text-primary'>
          <p className=''>TẤT CẢ</p>
          <MdKeyboardArrowRight size={20} />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div className='w-[1150px] '>
          <Slider {...settings}>
            {
              items?.data?.map((item, index) => (
                <ItemsSectionRadio item={item} key={item?.encodeId} index={index} />
              ))
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default SectionRadio
