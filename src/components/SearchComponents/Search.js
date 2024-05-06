import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import * as apis from "../../controllers"
import ItemSearch from "./ItemSearch"


let time;

const Search = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [dataSearch, setDataSearch] = useState(null)

    var listSongs = [
        "Em của ngày hôm qua - Sơn Tùng M-TP",
        "Buông đôi tay nhau ra - Sơn Tùng M-TP",
        "Chắc ai đó sẽ về - Sơn Tùng M-TP",
        "Nơi này có anh - Sơn Tùng M-TP",
        "Mượn rượu tỏ tình - Erik",
        "Hồng Nhan - Jack",
        "Bạc Phận - Jack",
        "Sao em vô tình - Đình Dũng",
        "Anh nhớ em - Đinh Dũng",
        "Bài này chill phết - Đen Vâu"
    ];

    const getSearch = async (input) => {
        const response = await apis.searchApi(input)
        if (response?.data?.err === 0) {
            console.log(response?.data?.data)
            setDataSearch({
                songs: response?.data?.data?.songs,
                playlists: response?.data?.data?.playlists
            })
        }
    }



    const handleSearch = (input) => {
        setSearch(input);
        clearTimeout(time);
        if (input?.length > 0) {
            time = setTimeout(async () => {
                await getSearch(input);
            }, 500);
        } else {
            setDataSearch(null)
        }
    };

    // useEffect(() => {
    //     console.log(search)
    // }, [search])

    return (
        <div
            onFocus={() => setOpen(true)}
            // onBlur={(event) => {
            //     const currentTarget = event.currentTarget;
            //     if (!currentTarget.contains(document.activeElement)) {
            //         setOpen(false);
            //     }
            // }} // Added onBlur event handler
            className='w-full flex items-center relative min-w-[300px]'
        >
            <span className='h-10 pl-4 bg-[#e6efef] flex items-center justify-center rounded-l-[20px] text-gray-500'>
                <FiSearch size={24} />
            </span>
            <input
                value={search}
                onChange={(e) => { handleSearch(e.target.value) }}
                type="text"
                className='outline-none px-4 bg-[#e6efef] text-[14px] py-2 w-full rounded-r-[20px] h-10 text-gray-500'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
            />
            <div className={`${open ? 'absolute' : 'hidden'} top-[110%] left-0 w-full ${dataSearch ? 'h-[500px] overflow-scroll' : 'h-[300px]'} bg-sidebarbg rounded-xl p-5`}>
                {
                    search ? (
                        <div className='flex flex-col gap-1'>
                            <h1 className='font-semibold text-[15px] text-gray-600 mb-2 '>Từ khóa liên quan</h1>
                            <div className='flex gap-3 px-2 py-2 text-[14px] text-gray-500 cursor-pointer hover:bg-gray-100 rounded-md items-center'>
                                <FiSearch />
                                <p>{search}</p>
                            </div>
                            <div className='flex gap-3 px-2 py-2 text-[14px] text-gray-500 cursor-pointer hover:bg-gray-100 rounded-md items-center'>
                                <FiSearch />
                                <p>Tìm kiếm "<span className='text-primary'>{search}</span>"</p>
                            </div>
                            <div className='flex flex-col gap-3 mt-2 overflow-y-scroll'>
                                <hr className='border-[1px] border-gray-300' />
                                <h1 className='font-semibold text-[15px] text-gray-600 mb-2'>Gợi ý kết quả</h1>
                                {
                                    dataSearch?.songs?.map((el, index) => (
                                        <ItemSearch item={el} key={index} setOpen={setOpen}/>
                                    ))
                                }
                            </div>

                        </div>
                    ) : (
                        <div className='flex flex-col gap-1'>
                            <h1 className='font-semibold text-[15px] text-gray-600 mb-2 '>Đề xuất cho bạn</h1>
                            {
                                listSongs.slice(0, 5).map((el, index) => (
                                    <div
                                        onClick={() => { setSearch(el); }}
                                        className='flex gap-3 px-2 py-2 text-[14px] text-gray-500 cursor-pointer hover:bg-gray-100 rounded-md items-center' key={index}>
                                        <FiTrendingUp />
                                        <p>{el}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}


export default Search;
