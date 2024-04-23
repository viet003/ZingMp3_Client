import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  SidebarLeft,
  Header,
  Player,
  SidebarRight,
  SetTimeOffMusic,
  StaticAudio
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import * as actions from "../../store/actions";
import path from "../../utils/path";



let time;

const Main = () => {
  const { curSongId, isSetTimeOff } = useSelector((state) => state?.music);
  const dispatch = useDispatch((state) => state.music);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [totalDuration, setTotalDuration] = useState(0);
  const currentDateTime = moment();
  const [futureDateTime, setFutureDateTime] = useState(null);
  const [isOpenStaticAudio, setIsOpenStaticAudio] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   console.log(curSongId)
  // }, [curSongId])

  const [toggleSideBarRight, setToggleSideBarRight] = useState(false);
  const [timeOff, setTimeOff] = useState(false);

  const handleToggleSideBarRight = () => {
    setToggleSideBarRight((prev) => !prev);
  };

  useEffect(() => {
    const milliseconds = moment
      .duration({ hour: parseInt(hour), minute: parseInt(minute) })
      .asMilliseconds();
    setTotalDuration(milliseconds);
    setFutureDateTime(
      currentDateTime
        .add(parseInt(hour), "hours")
        .add(parseInt(minute), "minutes")
    );
    // console.log(milliseconds)
  }, [hour, minute]);

  useEffect(() => {
    if (!isSetTimeOff) {
      // console.log(isSetTimeOff);
      time && clearTimeout(time);
    }
  }, [isSetTimeOff]);

  useEffect(() => {
    navigate(path.HOME)
  }, [])

  const handleSetTimeOff = () => {
    if (totalDuration !== 0) {
      time && clearTimeout(time);
      time = setTimeout(() => {
        dispatch(actions.setPlay(false));
        dispatch(actions.isSetTimeOff(false));
      }, parseInt(totalDuration));
      dispatch(actions.isSetTimeOff(true));
    }
  };

  const handleToggleTime = () => {
    if (isSetTimeOff) {
      Swal.fire({
        title: "Xóa hẹn giờ",
        text: "Bạn có chắc chắn muốn xóa hẹn giờ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(actions.isSetTimeOff(false));
        }
      });
    } else {
      setTimeOff((prev) => !prev);
    }
  };

  return (
    <div className="w-full flex h-full">
      <div
        className={`${curSongId ? " h-[calc(100vh-90px)]" : "h-screen"
          } w-[250px] bg-sidebarbg fixed top-0 left-0`}
      >
        <SidebarLeft />
      </div>
      <div className="w-[299px]"></div>
      <div className="w-full bg-primarybg">
        <div className="h-[70px] px-[59px] w-[calc(100%-250px)] flex items-center mb-5 fixed top-0 right-0 bg-primarybg" style={{ zIndex: "30" }}>
          <Header setIsOpenStaticAudio={setIsOpenStaticAudio}/>
        </div>
        <div className="h-[70px] w-full"></div>
        <div className="px-[59px]">
          <Outlet />
        </div>
        <div className={`${curSongId ? "h-[100px]" : "h-0"} w-full`}></div>
        <div
          className={`${toggleSideBarRight ? "right-0" : "-right-[100%]"
            } fixed shadow-xl shadow-gray-500 top-0 z-40 w-[330px] h-screen bg-primarybg duration-300 ease-in-out`}
        >
          <SidebarRight handleToggleTime={handleToggleTime} setToggleSideBarRight={setToggleSideBarRight} />
        </div>
        {curSongId !== null && (
          <div className="h-[90px] fixed bottom-0 left-0 w-full z-40">
            <Player
              handleToggleSideBarRight={handleToggleSideBarRight}
              toggleSideBarRight={toggleSideBarRight}
            />
          </div>
        )}
      </div>
      {timeOff && (
        <SetTimeOffMusic
          setTimeOff={setTimeOff}
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
          totalDuration={totalDuration}
          futureDateTime={futureDateTime}
          handleSetTimeOff={handleSetTimeOff}
        />
      )}
      {
        isOpenStaticAudio && <StaticAudio setIsOpenStaticAudio={setIsOpenStaticAudio} />
      }
    </div>
  );
};

export default Main;
