import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import { BannerZingChartHome, ItemZingChartHome } from './';

const ZingChartHome = () => {

  const { weekChart, RTChart } = useSelector(state => state.app)
  const [weekChartData, setWeekChartData] = useState([])

  useEffect(() => {
    setWeekChartData(weekChart)
  }, [weekChart])

  return (
    <div className='flex flex-col gap-7'>
      <div className='grid grid-cols-[35%,65%] gap-x-7 gap-y-3 p-3 rounded-md bg-gradient-to-tl from-[rgba(116,48,158,0.9)] #8d22c3 to-[rgb(77,34,104,0.9)] '>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center gap-2'>
            <h1 className='font-semibold text-[30px] bg-gradient-to-r from-[#e35050] to-indigo-400 inline-block text-transparent bg-clip-text'>#zingchart</h1>
            <div className='w-[20px] h-[20px] flex pl-[6px] items-center bg-white rounded-full'>
              <FaPlay size={10} />
            </div>
          </div>
          <div className='flex gap-3 flex-col'>
            {
              RTChart?.items?.slice(0, 3)?.map((item, index) => (
                <ItemZingChartHome key={index} index={index} item={item} percent={Math.round(parseInt(RTChart?.items?.score) + parseInt(RTChart?.chart?.totalScore))} />
              ))
            }
          </div>
        </div>
        <div className=''>
          Hello
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3'>
        {
          weekChart?.map((item) => (
            <BannerZingChartHome item={item} key={item.country} />
          ))
        }
      </div>
    </div>
  )
}

export default ZingChartHome
