import { MdOutlineLibraryMusic } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
import { FiPieChart } from "react-icons/fi";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { PiMusicNotesPlus } from "react-icons/pi";
import { GiMusicalNotes } from "react-icons/gi";
import { CiStar } from "react-icons/ci";
import { MdVideoLibrary } from "react-icons/md";
import { MdOutlineMusicVideo } from "react-icons/md";
import { BsMusicNoteList } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { MdPlayCircleOutline } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";
import { BsShieldCheck } from "react-icons/bs";
import { HiOutlineFlag } from "react-icons/hi2";
import { RiAdvertisementLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { PiPaintBrushBroadThin } from "react-icons/pi";
import path from "./path.js"

export const menu = [
    {
        path: path.LIBRARY,
        text: "Thư viện",
        icons: <MdOutlineLibraryMusic className="text-[23px]" />
    },
    {
        path: path.HOME,
        text: "Khám phá",
        icons: <FaRegPlayCircle className="text-[23px]" />
    },
    {
        path: path.ZINGCHART,
        text: "#zingchart",
        icons: <FiPieChart className="text-[23px]" />
    },
    {
        path: path.RADIO,
        text: "Radio",
        icons: <RiNeteaseCloudMusicLine className="text-[23px]" />
    }
]

export const menu_2 = [
    {
        path: path.NEWSONGS,
        text: "BXH Nhạc mới",
        icons: <PiMusicNotesPlus className="text-[23px]" />
    },
    {
        path: path.HOME,
        text: "Chủ đề & Thể Loại",
        icons: <GiMusicalNotes className="text-[23px]" />
    },
    {
        path: path.ZINGCHART,
        text: "Top 100",
        icons: <CiStar className="text-[23px]" />
    },
    // {
    //     path: path.RADIO,
    //     text: "Music Video",
    //     icons: <MdVideoLibrary className="text-[23px]" />
    // },
]


export const menu_3 = [
    {
        path: path.LIBRARY,
        text: "Bài hát",
        icons: <MdOutlineMusicVideo className="text-[23px]" />
    },
    {
        path: path.HOME,
        text: "Playlist",
        icons: <BsMusicNoteList className="text-[23px]" />
    },
    {
        path: path.ZINGCHART,
        text: "Gần đây",
        icons: <IoMdTime className="text-[23px]" />
    },
]

export const setting_menu_1 = [
    {
        icons: <MdPlayCircleOutline  size={23} />,
        text: "Trình phát nhạc",
    },
    {
        icons: <PiPaintBrushBroadThin  size={23} />,
        text: "Giao diện",
    },
]


export const setting_menu = [
    {
        icons: <PiWarningCircle  size={23} />,
        text: "Giới thiệu",
    },
    {
        icons: <CiViewList size={23} />,
        text: "Thỏa thuận sử dụng",
    },
    {
        icons: <BsShieldCheck size={23} />,
        text: "Chính sách bảo mật",
    },
    {
        icons: <HiOutlineFlag  size={23} />,
        text: "Báo cáo vi phạm bản quyền",
    },
    {
        icons: <RiAdvertisementLine size={23} />,
        text: "Quảng cáo",
    },
    {
        icons: <IoCallOutline size={23} />,
        text: "Liên hệ",
    },
]


