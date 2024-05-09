import React, { useEffect, useState } from 'react'
import { LoadingApp, SectionNotSlider } from '../../components'
import * as apis from "../../controllers/"
import top100BN from "../../assets/images/top100BN.png"

const Top100 = () => {

    const [loading, setLoading] = useState(true)
    const [dataTop100, setDataTop100] = useState(null)

    useEffect(() => {
        const fectchData = async () => {
            const response = await apis.apiGetTop100();
            if (response?.data?.err === 0) {
                // console.log(response?.data?.data)
                setDataTop100(response?.data?.data)
            }
            setLoading(false)
        }

        fectchData()
    }, [])

    return (
        <div className='flex flex-col gap-10 w-full overflow-hidden relative py-[30px] h-full overflow-y-scroll px-[59px]'>
            {
                loading && <div className={`absolute right-0 bottom-0 top-0 left-0 z-50 bg-primarybg flex justify-center h-[calc(100vh-70px)] items-center`}>
                    {
                        <LoadingApp />
                    }
                </div>
            }
            <div className='w-full flex items-center justify-center object-cover'>
                <div className='object-cover'>
                    <img src={top100BN} className='' />
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                {
                    dataTop100?.map((el, index) => (
                        <SectionNotSlider items={{ name: el?.title, data: el?.items }} notSection={true} key={index}/>
                    ))
                }
            </div>
            {/* <SectionNotSlider items={}/> */}
        </div>
    )
}

export default Top100
