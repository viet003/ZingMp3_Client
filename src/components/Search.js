import React from 'react'
import { FiSearch } from "react-icons/fi";


const Search = () => {
    return (
        <div className='w-full flex items-center'>
            <span className='h-10 pl-4 bg-[#e6efef] flex items-center justify-center rounded-l-[20px] text-gray-500'>
                <FiSearch size={24} />
            </span>
            <input
                type="text"
                className='outline-none px-4 bg-[#e6efef] text-[14px] py-2 w-full rounded-r-[20px] h-10 text-gray-500'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
            />
        </div>
    )
}

export default Search