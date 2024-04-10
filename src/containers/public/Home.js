import React, { useEffect } from 'react'
import { Slider } from './../../components';
import { useSelector } from 'react-redux';
import { SectionNotSlider, SectionTop100Al } from './../../components';

const Home = () => {
  const { chill, remix, sadMusic, top100, hotAlbum } = useSelector(state => state.app)
  const { curSongId } = useSelector(state => state.music)

  useEffect(() => {
    console.log(hotAlbum)
  }, [chill])

  return (
    <div className='flex flex-col gap-10'>
      <Slider />
      <SectionNotSlider items={chill}/>
      <SectionNotSlider items={remix}/>
      <SectionNotSlider items={sadMusic}/>
      <SectionTop100Al items={top100}/>
      <SectionTop100Al items={hotAlbum}/>
      <div className={`${curSongId ? 'h-[100px]' : 'h-0'} w-full`}>

      </div>
    </div>
  )
}

export default Home
