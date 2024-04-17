import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { SectionNotSlider, SectionTop100Al, SectionChart, LoadingApp, SectionNewRelease, SectionSliderBanner } from './../../components';


const Home = () => {
  const { chill, remix, sadMusic, top100, hotAlbum, weekChart } = useSelector(state => state.app)
  // const { curSongId } = useSelector(state => state.music)
  const { loading } = useSelector(state => state.music)

  useEffect(() => {
    // console.log(RTChart)
  }, [weekChart])

  return (
    <div className='flex flex-col gap-10 w-full overflow-hidden relative py-[30px]'>
      {
        loading && <div className='absolute right-0 bottom-0 top-0 left-0 z-30 bg-primarybg flex justify-center h-[calc(100vh-70px)] items-center'>
          {
            <LoadingApp />
          }
        </div>
      }
      <SectionSliderBanner />
      <SectionNewRelease/>
      <SectionNotSlider items={chill} />
      <SectionNotSlider items={remix} />
      <SectionNotSlider items={sadMusic} />
      <SectionChart items={sadMusic} />
      <SectionTop100Al items={top100} />
      <SectionTop100Al items={hotAlbum} />
    </div>
  )
}

export default Home
