import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as actions from "../store/actions"
import Moment from 'react-moment';


const listHour = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const listMinute = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
let time;


const SetTimeOffMusic = ({ setTimeOff }) => {
    const dispatch = useDispatch()
    const [hour, setHour] = useState('00')
    const [minute, setMinute] = useState('00')
    const [totalDuration, setTotalDuration] = useState(0)
    const [open, setOpen] = useState(0)
    const currentDateTime = moment();
    const [futureDateTime, setFutureDateTime] = useState(null);


    useEffect(() => {
        const milliseconds = moment.duration({ hour: parseInt(hour), minute: parseInt(minute) }).asMilliseconds();
        setTotalDuration(milliseconds)
        setFutureDateTime(currentDateTime.add(parseInt(hour), 'hours').add(parseInt(minute), 'minutes'))
        // console.log(milliseconds)
    }, [hour, minute])

    const handleSetTimeOff = () => {
        if (totalDuration !== 0) {
            time && clearTimeout(time)
            time = setTimeout(() => {
                dispatch(actions.setPlay(false))
            }, parseInt(totalDuration))
        }
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 w-full">
            <div className="bg-gray-400 opacity-60 fixed inset-0 z-50 h-screen w-screen" onClick={(e) => { e.preventDefault(); setTimeOff(false) }}></div>
            <div
                // onClick={(e) => {setOpen(0)}}
                className='h-[330px] w-[330px] bg-primarybg rounded-xl flex flex-col items-center gap-5 px-5 py-10 z-50' >
                <p className='font-semibold text-[18px] text-gray-600'>Hẹn giờ dừng phát nhạc</p>
                <div className='w-full h-[100px] bg-gray-200 rounded-md grid grid-cols-[45%,10%,45%] ga-2 items-center mx-5'>
                    <div
                        onClick={(e) => { e.preventDefault(); setOpen(prev => prev === 1 ? 0 : 1) }}
                        className='flex flex-col relative cursor-pointer'>
                        <div className='w-full flex justify-center items-center gap-2'><span className='text-[30px] text-gray-600'>{hour}</span><span className='text-gray-500'>GIỜ</span></div>
                        <hr />
                        {
                            open === 1 && (
                                <div className='absolute left-0 top-[120%] bg-primarybg h-[120px] overflow-y-scroll w-full rounded-md shadow-xl flex flex-col items-center gap-4'>
                                    <div style={{ height: '100%', width: '100%' }}>
                                        {
                                            listHour?.map((el, index) => (
                                                <div
                                                    onClick={(e) => { e.preventDefault(); setHour(el) }}
                                                    key={index} className='flex justify-center items-center gap-2 py-2 hover:bg-gray-200 rounded-sm'>
                                                    <p className='text-gray-600'><span>{el}</span><span>   giờ</span></p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='w-full flex justify-center items-center text-[20px]'><span>:</span></div>
                    <div
                        onClick={(e) => { e.preventDefault(); setOpen(prev => prev === 2 ? 0 : 2) }}
                        className='flex flex-col relative cursor-pointer'>
                        <div className='w-full flex justify-center items-center gap-2'><span className='text-[30px] text-gray-600'>{minute}</span><span className='text-gray-500'>PHÚT</span></div>
                        <hr />
                        {
                            open === 2 && (
                                <div className='absolute left-0 top-[120%] bg-primarybg h-[120px] overflow-y-scroll w-full rounded-md shadow-xl flex flex-col items-center gap-4'>
                                    <div style={{ height: '100%', width: '100%' }}>
                                        {
                                            listMinute?.map((el, index) => (
                                                <div
                                                    onClick={(e) => { e.preventDefault(); setMinute(el) }}
                                                    key={index} className='flex justify-center items-center gap-2 py-2 hover:bg-gray-200 rounded-sm'>
                                                    <p className='text-gray-600'><span>{el}</span><span>   phút</span></p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    totalDuration === 0 ? 
                    <p className='text-gray-500 text-[13px]'>Chọn thời gian để dừng phát nhạc</p> :
                    <p className='text-gray-500 text-[12px]'>Dự tính dừng phát nhạc lúc: <Moment format="HH:mm:ss YYYY/MM/DD">{futureDateTime}</Moment></p>
                }
                <button
                    onClick={() => { handleSetTimeOff(); setTimeOff(false) }}
                    className='w-full text-white bg-primary flex items-center justify-center h-[45px] rounded-full'>LƯU LẠI</button>
                <button
                    onClick={(e) => { e.preventDefault(); setTimeOff(false) }}
                    className='text-[15px]'>HỦY</button>
            </div >
        </div>
    )
}

export default SetTimeOffMusic
