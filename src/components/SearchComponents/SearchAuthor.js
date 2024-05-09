import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AuthorComponents } from "../"

const SearchAuthor = () => {

    const { searchData } = useSelector(state => state.music)
    const [data, setData] = useState([])

    useEffect(() => {
        if (searchData) {
            console.log(searchData)
            setData(searchData)
        }
    }, [searchData])

    return (
        data?.length > 0 ? (
            <div className='flex flex-col gap-1 mt-10'>
                <AuthorComponents items={data?.artists} />
            </div>
        ) : (
            <div className='w-full h-[200px] bg-sidebarbg mt-4 rounded-xl grid place-items-center	'>
                <p className='text-[20px] text-primary text-opacity-50'>Không có kết quả được tìm thấy!</p>
            </div>
        )
    )
}

export default SearchAuthor
