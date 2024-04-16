import React, { useEffect } from 'react'
import { SliderBanner } from './../../components';
import { useSelector } from 'react-redux';
import { SectionNotSlider, SectionTop100Al, ZingChartHome, LoadingApp, NewRelease } from './../../components';


const Home = () => {
  const { chill, remix, sadMusic, top100, hotAlbum, newMusic} = useSelector(state => state.app)
  // const { curSongId } = useSelector(state => state.music)
  const { loading } = useSelector(state => state.music)

  useEffect(() => {
    // console.log(newRelease?.data?.all)
  }, [loading])

  return (
    <div className='flex flex-col gap-10 w-full overflow-hidden relative py-[30px]'>
      {
        loading && <div className='absolute right-0 bottom-0 top-0 left-0 z-30 bg-primarybg flex justify-center h-[calc(100vh-70px)] items-center'>
          {
            <LoadingApp />
          }
        </div>
      }
      <SliderBanner />
      <NewRelease/>
      <SectionNotSlider items={chill} />
      <SectionNotSlider items={remix} />
      <SectionNotSlider items={sadMusic} />
      <ZingChartHome items={sadMusic} />
      <SectionTop100Al items={top100} />
      <SectionTop100Al items={hotAlbum} />
    </div>
  )
}

export default Home
