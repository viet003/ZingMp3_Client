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
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'
import LoadingSong from './LoadingSong';


var intervalId
function Player() {
  const [audio, setAudio] = useState(new Audio())
  const dispatch = useDispatch()
  const { curSongId, isPlaying, isPlayAtList, songs } = useSelector(state => state.music)
  const [detailSong, setDetailSong] = useState(null)
  const [currentSecond, setCurrentSecond] = useState(0)
  const [canPlay, setCanPlay] = useState(true)
  const [isShuff, setIsShuff] = useState(false)
  const [isReapet, setIsReapet] = useState(false)
  const [loading, setLoading] = useState(false)
  const thumbRef = useRef()
  const trackRef = useRef()

  // reload
  window.onbeforeunload = function (e) {
    var e = e || window.event;

    if (isPlaying) {
      audio.pause();
      dispatch(actions.setPlay(false));
      return 'You have unsaved changes. Are you sure you want to leave the page?';
    }
  };


  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true)
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
        setCanPlay(true)
      } else {
        audio.pause()
        dispatch(actions.setPlay(false))
        setAudio(new Audio())
        thumbRef.current.style.cssText = `right: 100%`
        toast.warn(rs2.data.msg)
        setCanPlay(false)
      }
      setLoading(false)
    }

    fetchSong()
    // console.log(curSongId)
  }, [curSongId])

  // 
  useEffect(() => {
    intervalId && clearInterval(intervalId)
    setCurrentSecond(0)
    audio.load()
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent = Math.round(audio?.currentTime * 10000 / detailSong?.duration) / 100
        setCurrentSecond(Math.round(audio?.currentTime))
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
      }, 200)
    }
  }, [audio])

  // auto next when finish
  useEffect(() => {
    const handleAutoNext = () => {
      if (isShuff) {
        handleShuff()
      } else if (isReapet) {
        handleNextSong()
      } else {
        audio.pause()
        dispatch(actions.setPlay(false))
      }
      console.log(isReapet, isShuff)
    }
    // check ended event
    audio.addEventListener('ended', handleAutoNext)
    // remove event when out page
    return () => {
      audio.removeEventListener('ended', handleAutoNext)
    }
  }, [audio, isShuff, isReapet])

  // play or pause
  const handleTogglePlayMusic = async () => {
    if (canPlay) {
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

  //prev song
  const handlePrevSong = () => {
    let currentSongIndex;
    songs?.forEach((el, index) => {
      if (el.encodeId === curSongId) {
        currentSongIndex = index
      }
    })
    if (currentSongIndex >= 1) {
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
    }
    dispatch(actions.setPlay(true))
  }

  // next song
  const handleNextSong = () => {
    let currentSongIndex;
    songs?.forEach((el, index) => {
      if (el.encodeId === curSongId) {
        currentSongIndex = index
      }
    })
    if (currentSongIndex === songs?.length - 1) {
      dispatch(actions.setCurSongId(songs[0].encodeId))
    } else {
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
    }
    dispatch(actions.setPlay(true))
  }

  // shuff event
  const handleShuff = () => {
    const rdIndex = Math.round(Math.random() * songs?.length) - 1
    dispatch(actions.setCurSongId(songs[rdIndex].encodeId))
    dispatch(actions.setPlay(true))
  }

  // event progress bar
  const handleProgress = (e) => {
    const ref = trackRef.current.getBoundingClientRect();
    const per = Math.round((e.clientX - ref.left) * 10000 / ref.width) / 100;
    thumbRef.current.style.cssText = `right: ${100 - per}%`;
    audio.currentTime = (per * detailSong?.duration) / 100
    setCurrentSecond(Math.round(audio?.currentTime))
  }

  return (
    <div className='grid grid-cols-[25%,50%,25%] h-full bg-playerbg px-[25px]'>
      <Tooltip id="my-tooltip" style={{ fontSize: '12px', borderRadius: '20px' }} />
      <div className='flex-auto flex gap-3 items-center'>
        <img src={detailSong?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
        <div className='flex flex-col'>
          <span className='font-semibold text-gray-700 text-sm'>{detailSong?.title}</span>
          <span className='text-xs text-gray-500'>{detailSong?.artistsNames}</span>
        </div>
        <div className='flex gap-4 pl-2'>
          <span className={`cursor-pointer`}>
            <AiOutlineHeart data-tooltip-id="my-tooltip" data-tooltip-content="Thêm vào thư viện" size={20} />
          </span>
          <span className={`cursor-pointer`}>
            <BsThreeDots data-tooltip-id="my-tooltip" data-tooltip-content="Xem thêm" size={20} />
          </span>
        </div>
      </div>
      <div className='flex-auto flex items-center justify-center gap-4 flex-col py-2'>
        <div className='flex gap-8 justify-center items-center'>
          <span onClick={() => setIsShuff(prev => !prev)} className='cursor-pointer hover:text-hover' data-tooltip-id="my-tooltip" data-tooltip-content="Bật phát ngẫu nhiên"><CiShuffle className={`${isShuff && "text-primary"}`} size={24} /></span>
          <span onClick={handlePrevSong} data-tooltip-id="my-tooltip" data-tooltip-content="Bài hát trước" className={`${!isPlayAtList ? 'text-gray-500' : 'text-black cursor-pointer hover:text-hover'}`} ><MdSkipPrevious size={24} /></span>
          <span
            className='p-1 border border-gray-700 cursor-pointer hover:text-hover hover:border-primary rounded-full flex items-center justify-center'
            onClick={handleTogglePlayMusic}
          >
            {loading ? <LoadingSong /> : isPlaying ? <BsPauseFill size={25} /> : <BsFillPlayFill size={25} />}
          </span>
          <span onClick={handleNextSong} data-tooltip-id="my-tooltip" data-tooltip-content="Bài hát kế tiếp" className={`${!isPlayAtList ? 'text-gray-500' : 'text-black cursor-pointer hover:text-hover'}`} ><MdSkipNext size={24} /></span>
          <span onClick={() => { setIsReapet(prev => !prev) }} className={`${isReapet && "text-primary"} cursor-pointer hover:text-hover`} data-tooltip-id="my-tooltip" data-tooltip-content="Bật phát lại tất cả"><CiRepeat size={24} /></span>

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
