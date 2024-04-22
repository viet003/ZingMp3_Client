import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import { BannerSectionChart, ItemSectionChart, ChartSectionChart } from '..';
import { Link } from 'react-router-dom';
import path from '../../utils/path';

const SectionChart = () => {

  const { weekChart, RTChart } = useSelector(state => state.app)
  const [weekChartData, setWeekChartData] = useState([])

  useEffect(() => {
    setWeekChartData(weekChart)
  }, [weekChart])

  const textSd = ["text-shadow-no1", "text-shadow-no2", "text-shadow-no3"]

  return (
    <div className='flex flex-col gap-7'>
      <div className='grid grid-cols-[35%,65%] gap-x-7 gap-y-3 p-5 rounded-md bg-gradient-to-tl from-[#6b3483] #8d22c3 to-[rgba(55,13,80,0.9)] '>
        <div className='flex flex-col gap-5'>
          <Link
            to={path.ZINGCHART}
            className='flex items-center gap-2 cursor-pointer'>
            <h1 className='font-semibold text-[30px] bg-gradient-to-r from-[#e35050] to-indigo-400 inline-block text-transparent bg-clip-text'>#zingchart</h1>
            <div className='w-[20px] h-[20px] flex pl-[6px] items-center bg-white rounded-full'>
              <FaPlay size={10} />
            </div>
          </Link>
          <div className='flex gap-3 flex-col'>
            {
              RTChart?.items?.slice(0, 3)?.map((item, index) => (
                <ItemSectionChart key={index} index={index} textSd={textSd[index]} item={item} percent={Math.round((parseInt(item.score) / parseInt(RTChart?.chart?.totalScore)) * 100)} />
              ))
            }
          </div>
          <div className='flex justify-center items-center'>
            <Link to={path.ZINGCHART} className='border-[1px] px-7 py-1 rounded-full text-white text-[15px] hover:bg-[#6b3483] bg-opacity-60'>
              Xem thêm
            </Link>
          </div>
        </div>
        <div className='w-full flex items-center justify-center'>
          <ChartSectionChart className='w-full' />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3'>
        {
          weekChart?.map((item) => (
            <BannerSectionChart item={item} key={item.country} />
          ))
        }
      </div>
    </div>
  )
}

export default SectionChart
