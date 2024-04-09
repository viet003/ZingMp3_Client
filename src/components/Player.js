import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from "../controllers"
import { BsPauseFill } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import { CiShuffle } from "react-icons/ci";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { CiRepeat } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import * as actions from '../store/actions'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';


var intervalId
function Player() {
  const [audio, setAudio] = useState(new Audio())
  const dispatch = useDispatch()
  const { curSongId, isPlaying } = useSelector(state => state.music)
  const [detailSong, setDetailSong] = useState(null)
  const [currentSecond, setCurrentSecond] = useState(0)
  const thumbRef = useRef()
  const trackRef = useRef()

  useEffect(() => {
    const fetchSong = async () => {
      const [rs1, rs2] = await Promise.all([
        await apis.apiGetDetailSong(curSongId),
        await apis.apiGetSong(curSongId)
      ])
      if (rs1.data.err === 0) {
        setDetailSong(rs1?.data?.data)
      }
      if (rs2.data.err === 0) {
        audio.pause()
        setAudio(new Audio(rs2?.data?.data['128']))
      } else {
        audio.pause()
        dispatch(actions.setPlay(false))
        setAudio(new Audio())
        thumbRef.current.style.cssText = `right: 100%`
        toast.warn(rs2.data.msg)
      }
    }

    fetchSong()
    // console.log(curSongId)
  }, [curSongId])

  useEffect(() => {
    intervalId && clearInterval(intervalId)
    setCurrentSecond(0)
    audio.load()
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent = Math.round(audio?.currentTime * 10000 / detailSong?.duration) / 100
        setCurrentSecond(Math.round(audio?.currentTime))
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        // console.log(percent)
      }, 200)
    }
  }, [audio])

  const handleTogglePlayMusic = async () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
        dispatch(actions.setPlay(false))
      } else {
        audio.play().then(() => {
          dispatch(actions.setPlay(true))
        })
      }
    }
  }

  const handleProgress = (e) => {
    const ref = trackRef.current.getBoundingClientRect();
    const per = Math.round((e.clientX - ref.left) * 10000 / ref.width) / 100;
    thumbRef.current.style.cssText = `right: ${100 - per}%`;
    audio.currentTime = (per * detailSong?.duration) / 100
    setCurrentSecond(Math.round(audio?.currentTime))
  }

  window.onbeforeunload = function (e) {
    var e = e || window.event;

    if (isPlaying) {
      audio.pause();
      dispatch(actions.setPlay(false));
      return 'You have unsaved changes. Are you sure you want to leave the page?';
    }
  };


  return (
    <div className='grid grid-cols-[25%,50%,25%] h-full bg-playerbg px-[25px]'>
      <div className='flex-auto flex gap-3 items-center'>
        <img src={detailSong?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
        <div className='flex flex-col'>
          <span className='font-semibold text-gray-700 text-sm'>{detailSong?.title}</span>
          <span className='text-xs text-gray-500'>{detailSong?.artistsNames}</span>
        </div>
        <div className='flex gap-4 pl-2'>
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className='flex-auto flex items-center justify-center gap-4 flex-col py-2'>
        <div className='flex gap-8 justify-center items-center'>
          <span className='cursor-pointer hover:text-primary' title='Bật phát ngẫu nhiên'><CiShuffle size={24} /></span>
          <span className='cursor-pointer hover:text-primary'><MdSkipPrevious size={24} /></span>
          <span
            className='p-1 border border-gray-700 cursor-pointer hover:text-primary rounded-full flex items-center justify-center'
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? <BsPauseFill size={25} /> : <BsFillPlayFill size={25} />}
          </span>
          <span className='cursor-pointer hover:text-primary'><MdSkipNext size={24} /></span>
          <span className='cursor-pointer hover:text-primary' title='Bật phát lại tất cả'><CiRepeat size={24} /></span>

        </div>
        <div className='w-4/5 flex items-center justify-start gap-3'>
          <span className='text-[11px]'>
            {moment.utc(currentSecond * 1000).format('mm:ss')}
          </span>
          <div ref={trackRef} onClick={handleProgress} className='cursor-pointer hover:h-[7px] bg-[rgba(0,0,0,0.1)] relative w-full m-auto h-[4px] rounded-l-full rounded-r-full'>
            <div ref={thumbRef} id='thumb-progress' className='bg-primary absolute top-0 left-0 h-full bottom-0 rounded-l-full rounded-r-full'></div>
          </div>
          <span className='text-[11px]'>
            {moment.utc(detailSong?.duration * 1000).format('mm:ss')}
          </span>
        </div>
      </div>
      <div className='flex-auto'>
        Volume
      </div>
    </div>
  )
}

export default Player
