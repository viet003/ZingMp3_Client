import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { LoadingApp, Footer, SectionRadio } from './../../components';

const Radio = () => {
  const { hotRadio } = useSelector(state => state.app)
  // const { curSongId } = useSelector(state => state.music)
  const { loading, curSongId } = useSelector(state => state.music)

  useEffect(() => {
    // console.log(hotRadio)
  }, [hotRadio])

  return (
    <div className='flex flex-col gap-10 w-full overflow-hidden relative py-[30px] h-full overflow-y-scroll'>
      {
        loading && <div className={`absolute right-0 bottom-0 top-0 left-0 z-30 bg-primarybg flex justify-center h-[calc(100vh-70px)] items-center`}>
          {
            <LoadingApp />
          }
        </div>
      }
      <SectionRadio items={hotRadio} />
      <Footer />
    </div>
  )
}

export default Radio
