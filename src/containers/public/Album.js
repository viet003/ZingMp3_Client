import React, { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router-dom"
import * as apis from "../../controllers"
import moment from 'moment'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FaPlay, FaPause } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as actions from "../../store/actions"
import { LoadingApp, AudioPlay, LoadingSong, AlbumListItems } from "../../components"

function Playlist() {
  const dispatch = useDispatch()
  const { curSongId, isPlaying, loadingSong } = useSelector(state => state.music)
  const { pid } = useParams()
  const [playlistData, setPlaylistData] = useState(null) // Khởi tạo playlistData là null
  const [isLoading, setIsLoading] = useState(true)
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

  useEffect(() => {
    setIsLoading(true)
    const fetchDetailPlaylist = async () => {
      // dispatch(actions.setLoading(true))
      const response = await apis.apiGetDetailPlaylist(pid)
      // dispatch(actions.setLoading(false))
      if (response?.data?.err === 0) {
        setPlaylistData(response.data?.data)
        // console.log(response.data?.data)
        dispatch(actions.setPlaylist(response?.data?.data))
      }
      setIsLoading(false)
    }

    fetchDetailPlaylist()
  }, [pid])

  return (
    <div className={`${curSongId ? 'h-[calc(100vh-170px)]' : 'h-[calc(100vh-70px)]'} w-full relative`}>
      {
        isLoading && (
          <div className='absolute top-0 -left-10 -right-10 bottom-0 bg-primarybg z-50 flex items-center justify-center'>
            <LoadingApp />
          </div>
        )
      }
      <div className={`h-full grid grid-cols-[25%,75%] gap-8 w-full`}>
        <div className='flex-none flex flex-col items-center gap-2'>
          <div className='mt-[50px] flex flex-col gap-5 cursor-default'>
            <div onMouseEnter={handleHover} onMouseLeave={handleOut} className='w-full cursor-default object-contain rounded-md shadow-md overflow-hidden relative'>
              <img ref={imgRef} src={playlistData?.thumbnailM} alt="thumbnail" className='w-full object-contain rounded-md shadow-md' />
              {
                isHover && !isPlaying && !loadingSong &&
                <div
                  onClick={(e) => { e.preventDefault(); dispatch(actions.setPlay(true)) }}
                  className='absolute cursor-pointer top-0 left-0 bottom-0 right-0 bg-black opacity-70 z-20 flex justify-center items-center'>
                  <div onClick={(e) => { e.preventDefault() }} className='h-[50px] w-[50px] rounded-full border-white border-2 flex justify-center items-center'>
                    <FaPlay size={25} className='text-white' />
                  </div>
                </div>
              }
              {
                loadingSong && (
                  <div
                    // onClick={(e) => { e.preventDefault(); dispatch(actions.setPlay(false)) }}
                    className='absolute cursor-pointer top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
                    <div onClick={(e) => { e.preventDefault() }} className='h-[50px] w-[50px] rounded-full border-white border-2 flex justify-center items-center'>
                      <LoadingSong />
                    </div>
                  </div>
                )
              }
              {
                isPlaying && !loadingSong && playlistData?.song?.items?.find((item) => item?.encodeId === curSongId) && (
                  <div
                    onClick={(e) => { e.preventDefault(); dispatch(actions.setPlay(false)) }}
                    className='absolute cursor-pointer top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
                    <div onClick={(e) => { e.preventDefault() }} className='h-[50px] w-[50px] rounded-full border-white border-2 flex justify-center items-center'>
                      <AudioPlay />
                    </div>
                  </div>
                )
              }
            </div>
            <div className='flex flex-col items-center gap-1'>
              <h3 className='text-[20px] font-bold text-gray-800'>{playlistData?.title}</h3>
              <span className='flex gap-2 items-center text-gray-500 text-xs'>
                <span>Cập nhật:</span>
                <span>{moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
              </span>
              <span className='flex gap-2 items-center text-gray-500 text-xs text-center'>{playlistData?.artistsNames}</span>
              <span className='flex gap-2 items-center text-gray-500 text-xs'>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>
            </div>
          </div>
          <button className='flex gap-2 items-center bg-primary w-[200px] h-[40px] hover:bg-hover rounded-full justify-center text-white font-semibold'>
            {
              !playlistData?.song?.items?.find((item) => item?.encodeId === curSongId) ?
              <><FaPlay /><p>Phát ngẫu nhiên</p></> : 
              isPlaying ? <><FaPause /><p>Tạm dừng</p></> : <><FaPlay /><p>Tiếp tục phát</p></>
            }
          </button>
          <div className='flex gap-5'>

          </div>
        </div>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <AlbumListItems songs={playlistData?.song?.items} totalDuration={playlistData?.song?.totalDuration} />
        </Scrollbars>
      </div>
    </div>
  )
}

export default Playlist
