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
        <div className='flex flex-col gap-1 mt-10'>
            <AuthorComponents items={data?.artists} />
        </div>
    )
}

export default SearchAuthor
