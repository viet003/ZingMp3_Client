import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { SectionNotSlider, SectionSlider, SectionTop100Al, SectionChart, LoadingApp, Footer, SectionNewRelease, SectionSliderBanner, SectionRadio } from './../../components';


const Home = () => {
  const { chill, remix, sadMusic, top100, hotAlbum, hotRadio, newReleaseChart } = useSelector(state => state.app)
  // const { curSongId } = useSelector(state => state.music)
  const { curSongId } = useSelector(state => state.music)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let time;
    if (hotRadio) {
      time = setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    return () => time && clearTimeout(time)
  }, [hotRadio])

  return (
    <div className='flex flex-col gap-10 w-full overflow-hidden relative py-[30px] h-full overflow-y-scroll px-[59px]'>
      {
        loading && <div className={`absolute right-0 bottom-0 top-0 left-0 z-50 bg-primarybg flex justify-center h-[calc(100vh-70px)] items-center`}>
          {
            <LoadingApp />
          }
        </div>
      }
      <SectionSliderBanner />
      <SectionNewRelease />
      <SectionSlider items={newReleaseChart} />
      <SectionNotSlider items={chill} />
      <SectionNotSlider items={remix} />
      <SectionNotSlider items={sadMusic} />
      <SectionChart items={sadMusic} />
      <SectionTop100Al items={top100} />
      <SectionTop100Al items={hotAlbum} />
      <SectionRadio items={hotRadio} />
      <Footer />
    </div>
  )
}

export default Home
