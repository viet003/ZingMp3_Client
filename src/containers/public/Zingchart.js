import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { LoadingApp, Footer, ChartSectionChart, AlbumListItems, WeekChart } from './../../components';
import { BsFillPlayFill } from "react-icons/bs";
import * as apis from "../../controllers/musicController"

const Zingchart = () => {
  const { hotRadio, top100, weekChart } = useSelector(state => state.app)
  const [loading, setLoading] = useState(false)
  const [vnSongs, setVnSongs] = useState({})
  const [usSongs, setUsSongs] = useState({})
  const [kSongs, setKSongs] = useState({})
  const [showFull, setShowFull] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchDetailPlaylist = async () => {
      const [rs1, rs2, rs3] = await Promise.all([
        await apis.apiGetDetailPlaylist(top100?.data !== null && top100?.data[0]?.encodeId),
        await apis.apiGetDetailPlaylist(top100?.data !== null && top100?.data[1]?.encodeId),
        await apis.apiGetDetailPlaylist(top100?.data !== null && top100?.data[4]?.encodeId),
      ])
      if (rs1?.data?.err === 0) {
        // console.log(rs1.data?.data)
        setVnSongs({
          name: 'Việt Nam',
          id: top100?.data[0]?.encodeId,
          data: rs1.data?.data
        })
      }
      if (rs2?.data?.err === 0) {
        // console.log(rs2.data?.data)
        setUsSongs({
          name: 'US-UK',
          id: top100?.data[1]?.encodeId,
          data: rs2.data?.data
        })
      }
      if (rs3?.data?.err === 0) {
        // console.log(rs3.data?.data)
        setKSongs({
          name: 'K-Pop',
          id: top100?.data[4]?.encodeId,
          data: rs3.data?.data
        })
      }
      setLoading(false)

    }

    fetchDetailPlaylist()

  }, [top100])

  return (
    <div className='flex flex-col gap-10 w-full overflow-hidden relative py-[30px] h-full overflow-y-scroll'>
      {
        loading && <div className={`absolute right-0 bottom-0 top-0 left-0 z-30 bg-primarybg flex justify-center h-[calc(100vh-70px)] items-center`}>
          {
            <LoadingApp />
          }
        </div>
      }
      <div className='flex items-center gap-3 px-[56px]'>
        <h1 className='font-semibold text-[40px] bg-gradient-to-r from-[#e35050] to-indigo-400 inline-block text-transparent bg-clip-text'>#zingchart</h1>
        <div className='w-[35px] h-[35px] rounded-full flex items-center justify-center bg-primary hover:bg-hover cursor-pointer'>
          <BsFillPlayFill className='text-white' size={20} />
        </div>
      </div>
      <div className='px-[56px]'>
        <ChartSectionChart items={hotRadio} section={false} />
      </div>
      <div className='w-full relative  px-[56px]'>
        <AlbumListItems songs={showFull ? vnSongs?.data?.song?.items : vnSongs?.data?.song?.items?.slice(0, 10)} section={false} totalDuration={vnSongs?.data?.song?.totalDuration} />
      </div>
      {
        !showFull && <div className='h-[50px] w-full flex justify-center items-center  px-[56px]'>
          <button onClick={() => setShowFull(prev => !prev)} className='px-5 py-2 rounded-full border-[1px] border-primary hover:bg-primary hover:text-white text-primary transition-all'>Xem top 100</button>
        </div>
      }
      <WeekChart vnSongs={vnSongs} usSongs={usSongs} kSongs={kSongs} />
      <div className='px-[56px]'>
        <Footer />
      </div>
    </div>
  )
}

export default Zingchart
