import { menu, menu_2, menu_3 } from "../utils/Menu.js"
import { FaPen } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import React from 'react'
import { NavLink } from "react-router-dom"
import logo from "../assets/logo.svg"
import path from "../utils/path.js"


function Sidebar() {
    return (
        <div className="pl-[20px] text-[14px] font-normal text-gray-800">
            <div className="w-full h-[70px] flex items-center">
                <NavLink to={path.HOME}>
                    <img src={logo} alt="logo" className="w-[120px] h-[50px]" />
                </NavLink>
            </div>
            <div className="">
                {
                    menu.map(item => (
                        <NavLink to={item.path} key={item.path}>
                            <div className="flex w-full h-[50px] items-center hover:text-hover">
                                {item.icons}
                                <span className="ml-3">{item.text}</span>
                            </div>
                        </NavLink>
                    ))
                }
            </div>
            <hr className="mr-[20px] my-[20px] border-gray-300" />
            <div className="overflow-y-auto h-[320px] hover:scrollbar bar">
                {
                    menu_2.map(item => (
                        <NavLink to={item.path} key={item.path}>
                            <div className="flex w-full h-[45px] items-center hover:text-hover">
                                {item.icons}
                                <span className="ml-3">{item.text}</span>
                            </div>
                        </NavLink>
                    ))
                }
                <div className="flex flex-col items-center justify-center mr-3 bg-primary py-4 px-3 rounded-xl text-white my-4">
                    <p className="text-[12px]">Nghe nhạc không quảng cáo</p>
                    <p className="text-[12px]">cùng kho nhạc Vip</p>
                    <button className="bg-primaryop border border-white w-[120px] h-[30px] mt-[20px] rounded-xl text-[15px]">MUA VIP</button>
                </div>
                <div className="flex text-[13px] justify-between mr-[10px] my-5 cursor-default">
                    <p className="font-semibold">THƯ VIỆN</p>
                    <FaPen/>
                </div>
                {
                    menu_3.map(item => (
                        <NavLink to={item.path} key={item.path}>
                            <div className="flex w-full h-[45px] items-center hover:text-hover">
                                {item.icons}
                                <span className="ml-3">{item.text}</span>
                            </div>
                        </NavLink>
                    ))
                }
            </div>
            <hr className="mr-[20px] my-[10px] border-gray-300" />
            <div className="text-[16px] flex gap-2 items-center cursor-pointer py-[10px]">
                <IoAddCircleOutline className="text-[25px]"/>
                <p>Tạo playlist mới</p>
            </div>
        </div>
    )
}

export default Sidebar
