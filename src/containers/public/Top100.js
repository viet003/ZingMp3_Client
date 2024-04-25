import React, { useState } from 'react'
import { LoadingApp } from '../../components'
import top100BN from "../../assets/images/top100BN.png"

const Top100 = () => {

    const [loading, setLoading] = useState(false)

    return (
        <div className='flex flex-col gap-10 w-full overflow-hidden relative py-[30px] h-full overflow-y-scroll px-[59px]'>
            {
                loading && <div className={`absolute right-0 bottom-0 top-0 left-0 z-50 bg-primarybg flex justify-center h-[calc(100vh-70px)] items-center`}>
                    {
                        <LoadingApp />
                    }
                </div>
            }
            <div className='w-full flex items-center justify-center h-[100px] object-cover'>
                <img src={top100BN} className='object-cover'/>
            </div>
        </div>
    )
}

export default Top100
