import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import fairytail from "../../assets/images/fairytails.jpg";
import mp3 from "../../assets/audio/fairytail.mp3";
import { BsPauseFill, BsFillPlayFill } from "react-icons/bs";
import { LoadingSong } from '..';

const StaticAudio = ({ setIsOpenStaticAudio }) => {
  const [audio] = useState(new Audio(mp3));
  const [isPlaying, setIsPlaying] = useState(true);
  const [src, setSrc] = useState(null)
  
  useLayoutEffect(() => {
    setSrc(fairytail)
  }, [fairytail])

  useEffect(() => {
    audio.volume = 0.2
    if (isPlaying) {
      audio.play().catch(error => console.error('Failed to play audio:', error));
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
    };
  }, [isPlaying, audio]);

  // auto next when finish
  useEffect(() => {
    const handleRepeat = async () => {
      audio.currentTime = 0
      audio.load()
      audio.play()
    }
    // check ended event
    audio.addEventListener('ended', handleRepeat)
    // remove event when out page
    return () => {
      audio.removeEventListener('ended', handleRepeat)
    }
  }, [audio])

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleClose = () => {
    setIsPlaying(false);
    setIsOpenStaticAudio(false);
  };

  return (
    <>
      {
        audio && fairytail ? (
          <div className="fixed inset-0 flex justify-center items-center w-full z-50">
            <div className="bg-gray-400 opacity-60 fixed inset-0 h-screen w-screen" onClick={handleClose}></div>
            <div className="relative flex justify-center w-3/4 items-center z-50">
              <div className='rounded-xl overflow-hidden'>
                <img className='rounded-xl' src={src} alt="Fairytail" />
              </div>
              <div className='absolute bottom-0 left-0 w-full h-20 flex justify-center items-center z-60'>
                <button onClick={togglePlay} className='h-12 w-12 flex justify-center items-center border-2 rounded-full cursor-pointer bg-gray-800 text-white'>
                  {isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                </button>
              </div>
            </div>
          </div>
        ) : (<LoadingSong />)
      }
    </>
  );
};

export default memo(StaticAudio);
