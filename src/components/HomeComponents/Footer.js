import React from 'react'

const Footer = () => {

    const list_Img = [
        'https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/warner.png',
        'https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/empire.png',
        'https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/monstercat.png',
        'https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/beggers.png',
        'https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/orcahrd.png',
        'https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/sony.png',
        'https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/yg.png',
        'https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/universal-1.png'
    ]

    return (
        <div className='w-full flex flex-col items-center justify-center gap-7'>
            <p className='text-[13px] font-semibold text-gray-500'>ĐỐI TÁC ÂM NHẠC</p>
            <div className='grid grid-cols-8 w-full gap-5'>
                {
                    list_Img.map((item, index) => (
                        <div key={index} className= 'flex justify-center items-center w-full object-fill h-[70px] bg-white rounded-md'>
                            <img src={item} className='w-[70%] h-[70%] object-fill rounded-md'/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Footer
