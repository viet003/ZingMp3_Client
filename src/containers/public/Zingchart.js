import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { LoadingApp, Footer, ChartSectionChart, AlbumListItems, WeakChart } from './../../components';
import { BsFillPlayFill } from "react-icons/bs";
import * as apis from "../../controllers/musicController"

const Zingchart = () => {
  const { hotRadio, top100 } = useSelector(state => state.app)
  const [loading, setLoading] = useState(false)
  const [vnSongs, setVnSongs] = useState({})
  const [usSongs, setUsSongs] = useState({})
  const [kSongs, setKSongs] = useState({})
  const [showFull, setShowFull] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchDetailPlaylist = async () => {
      // dispatch(actions.setLoading(true))
      const [rs1, rs2, rs3] = await Promise.all([
        await apis.apiGetDetailPlaylist(top100?.data !== null && top100?.data[0]?.encodeId),
        await apis.apiGetDetailPlaylist(top100?.data !== null && top100?.data[1]?.encodeId),
        await apis.apiGetDetailPlaylist(top100?.data !== null && top100?.data[4]?.encodeId),
      ])
      // dispatch(actions.setLoading(false))
      if (rs1?.data?.err === 0) {
        setVnSongs({
          name: 'Việt Nam',
          data: rs1.data?.data
        })
        // console.log(rs1.data?.data)
        // dispatch(actions.setPlaylist(rs1?.data?.data))
      }
      if (rs2?.data?.err === 0) {
        setUsSongs({
          name: 'US-UK',
          data: rs2.data?.data
        })
        // console.log(rs1.data?.data)
        // dispatch(actions.setPlaylist(rs1?.data?.data))
      }
      if (rs3?.data?.err === 0) {
        setKSongs({
          name: 'K-Pop',
          data: rs3.data?.data
        })
        // console.log(rs1.data?.data)
        // dispatch(actions.setPlaylist(rs1?.data?.data))
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
      <WeakChart vnSongs={vnSongs} usSongs={usSongs} kSongs={kSongs} />
      <div className='px-[56px]'>
        <Footer />
      </div>
    </div>
  )
}

export default Zingchart
