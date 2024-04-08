import React, { useState } from 'react'
import { Search } from './'
import { HiArrowNarrowLeft } from "react-icons/hi";
import { HiArrowNarrowRight } from "react-icons/hi";
import { VscDesktopDownload } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { setting_menu, setting_menu_1 } from "../utils/Menu.js"
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { Login } from "../containers/public"



const Header = () => {

    const [toggle, setToggle] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)
    const [toggleLogin, setToggleLogin] = useState(false)
    
    return (
        <div className='flex justify-between w-full items-center'>
            <div className='flex gap-6 w-full items-center'>
                <div className='flex gap-6 text-gray-400'>
                    <span><HiArrowNarrowLeft size={24} /></span>
                    <span><HiArrowNarrowRight size={24} /></span>
                </div>
                <div className='w-1/2'>
                    <Search />
                </div>
            </div>
            <div className='flex gap-3'>
                <button className='bg-primary text-[13px] h-10 rounded-full px-2 flex items-center w-[170px] justify-center font-semibold text-white hover:bg-hover'>
                    <p>Nâng cấp tài khoản</p>
                </button>
                <button className='bg-[#e6efef] text-[13px] gap-1 h-10 rounded-full px-2 flex items-center w-[170px] justify-center font-semibold text-primary hover:bg-hover hover:text-white duration-200'>
                    <VscDesktopDownload size={20} />
                    <p>Tải bản Windows</p>
                </button>
                <div className='h-10 w-10 bg-[#e6efef] flex justify-center items-center rounded-full relative cursor-pointer'>
                    <CiSettings size={25} className='duration-200 hover:rotate-90 ' onClick={() => { setToggle(prev => !prev); setToggleUser(false) }} />
                    <div className={`${toggle ? "block" : "hidden"} absolute top-[120%] right-0 w-[300px] bg-[#e0ebeb] shadow-xl rounded-xl p-2 z-50`}>
                        {
                            setting_menu_1.map(item => (
                                <div key={setting_menu_1.indexOf(item)} className="flex w-full h-[50px] cursor-pointer items-center justify-between hover:text-hover text-gray-600 hover:bg-gray-100 px-3 rounded-lg font-thin">
                                    <div className='flex items-center'>
                                        {item.icons}
                                        <span className="ml-3 text-[14px]">{item.text}</span>
                                    </div>
                                    <IoIosArrowForward />
                                </div>
                            ))
                        }
                        <hr className="my-[10px] mx-[20px] border-gray-300" />
                        {
                            setting_menu.map(item => (
                                <div key={setting_menu.indexOf(item)} className="flex w-full h-[50px] items-center cursor-pointer justify-between hover:text-hover text-gray-600 hover:bg-gray-100 px-3 rounded-lg font-thin">
                                    <div className='flex items-center'>
                                        {item.icons}
                                        <span className="ml-3 text-[14px]">{item.text}</span>
                                    </div>
                                    <MdArrowOutward />
                                </div>

                            ))
                        }
                    </div>
                </div>
                <div className='h-10 w-10 rounded-full bg-[#e6efef] flex justify-center items-center relative cursor-pointer'>
                    <CiUser size={25} onClick={(e) => { e.preventDefault(); setToggleUser(prev => !prev); setToggle(false); }} />
                    <div className={`${toggleUser ? "block" : "hidden"} absolute text-[15px] top-[120%] right-0 w-[300px] bg-[#e0ebeb] shadow-xl rounded-xl p-3 z-50`}>
                        <div className='rounded-full flex items-center justify-center bg-primary w-full h-10 cursor-pointer text-gray-100 hover:bg-hover'>
                            <p>Đăng nhập</p>
                        </div>
                        <p className='my-3 flex justify-start cursor-default'>Đăng ký gói</p>
                        <div className='p-3 flex flex-col bg-[#d4c0fa] rounded-xl'>
                            <div className='flex gap-3'>
                                <h1 className='text-[#8e4cff] text-[20px] font-bold'>Zing MP3</h1>
                                <p className='bg-[#8e4cff] flex justify-center items-center px-2 text-white rounded-lg'>Plus</p>
                            </div>
                            <p className='text-[13px] font-bold'>Chỉ từ 13.000 đ/tháng</p>
                            <p className='text-[13px] text-gray-600'>Nghe nhạc với chất lượng cao nhất, không quảng cáo</p>
                            <button className='bg-[#8e4cff] flex items-center justify-center text-gray-100 my-5 h-[35px] w-[200px] rounded-full'>
                                Tìm hiểu thêm
                            </button>
                        </div>
                        <div className='p-3 flex flex-col bg-[#f6e1ac] rounded-xl mt-4'>
                            <div className='flex gap-3'>
                                <h1 className='text-[#dca519] text-[20px] font-bold'>Zing MP3</h1>
                                <p className='bg-[#dca519] flex justify-center items-center px-2 text-white rounded-lg'>Premium</p>
                            </div>
                            <p className='text-[13px] font-bold'>Chỉ từ 41.000 đ/tháng</p>
                            <p className='text-[13px] text-gray-600'>Toàn bộ đặc quyền Plus cùng kho nhạc Premium</p>
                            <button className='bg-[#dca519] flex items-center justify-center text-gray-100 my-5 h-[35px] w-[200px] rounded-full'>
                                Tìm hiểu thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header