import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from "../../controllers"
import { BsPauseFill, BsFillPlayFill } from "react-icons/bs";
import { CiShuffle } from "react-icons/ci";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { CiRepeat } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import * as actions from '../../store/actions'
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip'
import LoadingSong from '../LoadingSong';
import { SlVolume2 } from "react-icons/sl";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { MdOutlineMusicVideo } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import { MdOutlineQueueMusic } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';


var intervalId
const Player = ({ handleToggleSideBarRight, toggleSideBarRight }) => {
  const [audio, setAudio] = useState(new Audio())
  const dispatch = useDispatch()
  const { curSongId, isPlaying, playlist, loadingSong, historyPlaylist } = useSelector(state => state.music)
  const [detailSong, setDetailSong] = useState(null)
  const [currentSecond, setCurrentSecond] = useState(0)
  const [currentSongIndex, setCurrentSongIndex] = useState(-1)
  const [hsPlaylist, setHsPlaylist] = useState([])
  const [canPlay, setCanPlay] = useState(false)
  const [isShuff, setIsShuff] = useState(false)
  const [repeat, setRepeat] = useState(0)
  const [checkIsInPlaylist, setCheckIsInPlaylist] = useState(false)
  const [volume, setVolume] = useState(50)
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

  // fetch data song
  useEffect(() => {
    const fetchSong = async () => {
      dispatch(actions.setLoadingSong(true))
      const [rs1, rs2] = await Promise.all([
        await apis.apiGetDetailSong(curSongId),
        await apis.apiGetSong(curSongId)
      ])
      if (rs1.data.err === 0) {
        setDetailSong(rs1?.data?.data)
      }
      if (rs2.data.err === 0) {
        audio.pause()
        if (thumbRef.current) {
          thumbRef.current.style.cssText = `right: 100%`
        }
        setAudio(new Audio(rs2?.data?.data['128']))
        setCanPlay(true)
      } else {
        setCanPlay(false)
        audio.pause()
        if (thumbRef.current) {
          thumbRef.current.style.cssText = `right: 100%`
        }
        dispatch(actions.setPlay(false))
        setAudio(new Audio())
        if (checkIsInPlaylist) {
          toast.warn(rs2.data.msg + ". Hệ thống tự động chuyển bài")
          handleNextSong()
        } else {
          toast.warn(rs2.data.msg)
        }
      }
      dispatch(actions.setLoadingSong(false))
    }

    fetchSong()
    // console.log(curSongId)
  }, [curSongId])

  // check currenIndex song
  useEffect(() => {
    let currentSongIndex;
    playlist?.data?.forEach((el, index) => {
      if (el.encodeId === curSongId) {
        currentSongIndex = index
        setCurrentSongIndex(currentSongIndex)
      }
    })
  }, [curSongId, playlist])

  // 
  useEffect(() => {
    setCurrentSecond(0)
    audio.load()
    if (isPlaying && canPlay) {
      if (audio && thumbRef.current) {
        audio.play().then(() => { })
        intervalId = setInterval(() => {
          let percent = Math.round(audio?.currentTime * 10000 / detailSong?.duration) / 100
          setCurrentSecond(Math.round(audio?.currentTime))
          if (thumbRef.current) {
            thumbRef.current.style.cssText = `right: ${100 - percent}%`
          }
        }, 200)
      }
    } else {
      intervalId = setInterval(() => {
        let percent = Math.round(audio?.currentTime * 10000 / detailSong?.duration) / 100
        setCurrentSecond(Math.round(audio?.currentTime))
        if (thumbRef.current) {
          thumbRef.current.style.cssText = `right: ${100 - percent}%`
        }
      }, 200)
    }
    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [audio, canPlay])

  // check this song in playlist
  useEffect(() => {
    let check = playlist?.data?.filter(item => item?.encodeId === curSongId);
    check?.length !== 0 ? setCheckIsInPlaylist(true) : setCheckIsInPlaylist(false)
  }, [playlist, curSongId])

  // play or pause
  useEffect(() => {
    if (canPlay) {
      if (isPlaying && audio) {
        audio.play().then(() => {
        })
      } else {
        audio.pause()
      }
    }
  }, [isPlaying])

  // auto next when finish
  useEffect(() => {
    const handleAutoNext = async () => {
      if (isShuff) {
        handleShuff()
      } else if (repeat != 0) {
        handleRepeat()
      } else {
        handleNextSong()
      }
      addSongToHistory()
    }
    // check ended event
    audio.addEventListener('ended', handleAutoNext)
    // remove event when out page
    return () => {
      audio.removeEventListener('ended', handleAutoNext)
    }
  }, [audio, isShuff, repeat])

  //
  // Repeat song
  const handleRepeat = () => {
    const length = playlist?.data?.length;
    // console.log(length)
    if (repeat == 2 && checkIsInPlaylist) {
      if (playlist?.data[length - 1]?.encodeId === curSongId) {
        dispatch(actions.setCurSongId(playlist?.data[0].encodeId))
        dispatch(actions.setPlay(true))
      } else {
        handleNextSong()
      }
    } else if (repeat == 1) {
      // dispatch(actions.setPlay(false))
      audio.currentTime = 0;
      audio.load()
      audio.play()
      // dispatch(actions.setPlay(true))
    } else {
      dispatch(actions.setPlay(false))
      audio.currentTime = 0
    }
  }

  // change volume
  useEffect(() => {
    const vol = Number(volume) / 100
    audio.volume = vol
  }, [volume, audio])

  // get list historysongs
  useEffect(() => {
    // console.log(historyPlaylist)
    setHsPlaylist(historyPlaylist)
  }, [historyPlaylist])

  // play or pause
  const handleTogglePlayMusic = async () => {
    if (canPlay) {
      if (isPlaying) {
        dispatch(actions.setPlay(false))
      } else {
        dispatch(actions.setPlay(true))
      }
    }
  }

  //prev song
  const handlePrevSong = () => {
    let currentSongIndex;
    if (checkIsInPlaylist) {
      playlist?.data?.forEach((el, index) => {
        if (el.encodeId === curSongId) {
          currentSongIndex = index
          setCurrentSongIndex(currentSongIndex)
        }
      })
      if (currentSongIndex >= 1) {
        dispatch(actions.setCurSongId(playlist?.data[currentSongIndex - 1].encodeId))
        dispatch(actions.setPlay(true))
      }
    }
  }

  // next song
  const handleNextSong = () => {
    let currentSongIndex;
    if (checkIsInPlaylist) {
      playlist?.data?.forEach((el, index) => {
        if (el.encodeId === curSongId) {
          currentSongIndex = index
          setCurrentSongIndex(currentSongIndex)
        }
      })
      if (currentSongIndex === playlist?.data?.length - 1) {
        dispatch(actions.setCurSongId(playlist?.data[0]?.encodeId))
      } else {
        dispatch(actions.setCurSongId(playlist?.data[currentSongIndex + 1]?.encodeId))
      }
      dispatch(actions.setPlay(true))
    } else {
      dispatch(actions.setPlay(false))
    }
  }


  // shuff event
  const handleShuff = () => {
    if (checkIsInPlaylist) {
      const rdIndex = Math.round(Math.random() * playlist?.data?.length) - 1
      dispatch(actions.setCurSongId(playlist?.data[rdIndex].encodeId))
      dispatch(actions.setPlay(true))
    } else {
      dispatch(actions.setPlay(false))
    }
  }

  // event progress bar
  const handleProgress = (e) => {
    const ref = trackRef.current.getBoundingClientRect();
    const per = Math.round((e.clientX - ref.left) * 10000 / ref.width) / 100;
    thumbRef.current.style.cssText = `right: ${100 - per}%`;
    audio.currentTime = (per * detailSong?.duration) / 100
    setCurrentSecond(Math.round(audio?.currentTime))
  }

  // add song to historyPlaylist
  const addSongToHistory = () => {
    if (hsPlaylist[0].encodeId === curSongId) return
    if (hsPlaylist?.length === 0) {
      hsPlaylist.push(detailSong)
      dispatch(actions.setHistoryPlaylist(hsPlaylist))
    } else if (hsPlaylist && hsPlaylist?.length >= 20) {
      hsPlaylist.pop();
      hsPlaylist.unshift(detailSong)
      dispatch(actions.setHistoryPlaylist(hsPlaylist))
    } else {
      hsPlaylist.unshift(detailSong)
      dispatch(actions.setHistoryPlaylist(hsPlaylist))
    }
  }

  return (
    <div className='grid grid-cols-[25%,50%,25%] h-full bg-playerbg px-[25px]'>
      <Tooltip id="player-tooltip" style={{ fontSize: '12px', borderRadius: '20px' }} />
      <div className='flex-auto flex gap-3 items-center'>
        <img src={detailSong?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
        <div className='flex flex-col'>
          <span className='font-semibold text-gray-700 text-sm'>{detailSong?.title}</span>
          <span className='text-xs text-gray-500'>{detailSong?.artistsNames}</span>
        </div>
        <div className='flex gap-4 pl-2'>
          <span className={`cursor-pointer`} data-tooltip-id="player-tooltip" data-tooltip-content="Thêm vào thư viện" size={20} >
            <AiOutlineHeart size={20} style={{ color: 'rgb(75,85,99)' }} />
          </span>
          <span className={`cursor-pointer`} data-tooltip-id="player-tooltip" data-tooltip-content="Xem thêm" size={20} >
            <BsThreeDots size={20} style={{ color: 'rgb(75,85,99)' }} />
          </span>
        </div>
      </div>
      <div className='flex-auto flex items-center justify-center gap-2 flex-col py-2'>
        <div className='flex gap-6 justify-center items-center pt-3'>
          <span onClick={() => setIsShuff(prev => !prev)} className='cursor-pointer hover:text-hover' data-tooltip-id="player-tooltip" data-tooltip-content="Bật phát ngẫu nhiên"><CiShuffle className={`${isShuff && "text-primary"}`} size={24} /></span>
          <span onClick={handlePrevSong} data-tooltip-id="player-tooltip" data-tooltip-content="Bài hát trước" className={`${checkIsInPlaylist && currentSongIndex >= 1 ? 'text-black cursor-pointer hover:text-hover' : 'text-gray-500'}`} ><MdSkipPrevious size={24} /></span>
          <span
            className='p-1 border border-gray-700 cursor-pointer hover:text-hover hover:border-primary rounded-full flex items-center justify-center'
            onClick={handleTogglePlayMusic}
          >
            {loadingSong ? <LoadingSong /> : isPlaying ? <BsPauseFill size={25} /> : <BsFillPlayFill size={25} />}
          </span>
          <span onClick={handleNextSong} data-tooltip-id="player-tooltip" data-tooltip-content="Bài hát kế tiếp" className={`${!checkIsInPlaylist ? 'text-gray-500' : 'text-black cursor-pointer hover:text-hover'}`} ><MdSkipNext size={24} /></span>
          <span onClick={() => { repeat !== 2 ? setRepeat(prev => prev + 1) : setRepeat(0) }} className={`${repeat !== 0 && "text-primary"} cursor-pointer hover:text-hover relative`} data-tooltip-id="player-tooltip" data-tooltip-content="Bật phát lại tất cả"><CiRepeat size={24} /><span className={`${repeat === 1 ? 'block' : 'hidden'} absolute top-0 left-0 rounded-full text-[11px] pr-[2px] bg-playerbg`}>{1}</span></span>

        </div>
        <div className='w-4/5 flex items-center justify-start gap-3'>
          <span className='text-[11px] text-gray-500'>
            {moment.utc(currentSecond * 1000).format('mm:ss')}
          </span>
          <div ref={trackRef} onClick={handleProgress} className='cursor-pointer hover:h-[7px] bg-[rgba(0,0,0,0.1)] relative w-full m-auto h-[4px] rounded-l-full rounded-r-full'>
            <div ref={thumbRef} id='thumb-progress' className='bg-primary absolute top-0 left-0 h-full bottom-0 rounded-l-full rounded-r-full'></div>
          </div>
          <span className='text-[11px]'>
            {detailSong ? moment.utc(detailSong?.duration * 1000).format('mm:ss') : '00.00'}
          </span>
        </div>
      </div>
      <div className='flex-auto flex items-center gap-4 justify-end '>
        <MdOutlineOndemandVideo size={21} style={{ color: 'rgb(75,85,99)' }} />
        <MdOutlineMusicVideo size={21} style={{ color: 'rgb(75,85,99)' }} />
        <CiMicrophoneOn size={21} style={{ color: 'rgb(75,85,99)' }} />
        <div className='flex gap-4 items-center'>
          <SlVolume2 size={19} style={{ color: 'rgb(75,85,99)' }} />
          <input
            onChange={(e) => { setVolume(e.target.value) }}
            type='range' step={1} min={0} max={100}
            value={volume}
            className='h-[4px] w-[100px] accent-primary cursor-pointer hover:h-[5px]' />
        </div>
        <div className='border border-gray-400 h-10 text-gray-600' />
        <div className={`${toggleSideBarRight ? 'bg-primary' : 'bg-transparent'} p-1 rounded-md duration-300 ease-in-out`}>
          <MdOutlineQueueMusic size={21} style={{ color: toggleSideBarRight ? "white" : 'rgb(75,85,99)', cursor: 'pointer' }} onClick={() => handleToggleSideBarRight()} />
        </div>
      </div>
      <div style={{ zIndex: "1000" }}>
        <ToastContainer position='bottom-right' />
      </div>
    </div>
  )
}

export default Player
