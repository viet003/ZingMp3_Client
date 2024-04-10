import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import * as apis from "../../controllers"
import moment from 'moment'
import { Lists } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FaPlay } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from 'react-redux'
import * as actions from "../../store/actions"


function Playlist() {
  const dispatch = useDispatch()
  const { pid, title } = useParams()
  const [playlistData, setPlaylistData] = useState(null) // Khởi tạo playlistData là null

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid)
      if (response?.data?.err === 0) {
        setPlaylistData(response.data?.data)
        dispatch(actions.setSongs(response?.data?.data?.song?.items))
      }
    }

    fetchDetailPlaylist()
  }, [pid])

  return (
    playlistData && (
      <div className='grid grid-cols-[25%,75%] gap-8 w-full h-[calc(100vh-90px)]'>
        <div className='flex-none flex flex-col items-center gap-2'>
          <div className='mt-[50px] flex flex-col gap-5 cursor-default'>
            <img src={playlistData?.thumbnailM} alt="thumbnail" className='w-full object-contain rounded-md shadow-md' />
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
            <FaPlay />
            <p>Phát ngẫu nhiên</p>
          </button>
          <div className='flex gap-5'> 

          </div>
        </div>
        <Scrollbars style={{ width: '100%', height: '85%' }}>
          <Lists songs={playlistData?.song?.items} totalDuration={playlistData?.song?.totalDuration} />
        </Scrollbars>
      </div>
    )
  )
}

export default Playlist
