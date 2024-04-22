import React from 'react';
import girl from "../../assets/images/girl.png"
import app, { auth } from "../../firebase/firebaseConfig"
import { FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function Login({ setToggleLogin }) {

    const fbProvider = new FacebookAuthProvider();
    const glProvider = new GoogleAuthProvider();


    const handleFacebookLogin = () => {
        signInWithPopup(auth, fbProvider).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, glProvider).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-30 w-full">
            <div className="bg-gray-400 opacity-60 fixed inset-0 z-40 h-screen w-screen" onClick={(e) => { e.preventDefault(); setToggleLogin(false) }}></div>
            <div className="relative">
                <div className="flex justify-start gap-2 items-center  flex-col bg-hover w-[400px] h-[500px] text-gray-50 z-50 rounded-[35px] relative p-5">
                    <div className='flex gap-2'>
                        <h1 className='text-[20px] font-bold'>Zing Mp3</h1>
                        <p className='bg-white flex justify-center items-center px-4 font-bold text-primary rounded-lg'>Plus</p>
                    </div>
                    <div className='object-cover'>
                        <img src={girl} className='h-[220px]' />
                    </div>
                    <div className='flex flex-col text-[25px] justify-center items-center leading-[25px]'>
                        <p>Muốn nghe nhạc</p>
                        <p>không quảng cáo?</p>
                    </div>
                    <div className='flex flex-col text-[11px] justify-center items-center'>
                        <p>Nâng cấp gói Zing Mp3 Plus chỉ từ 13.000 đ/tháng</p>
                        <p>Tặng bạn thêm nhiều đặc quyền hấp dẫn khác.</p>
                        <p>Đăng nhập ngay để tận hưởng thôi nào!</p>
                    </div>
                    <div className='flex gap-5 mt-5'>
                        <img onClick={() => {handleFacebookLogin()}} src='https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' className='h-10 w-10 cursor-pointer' />
                        <img onClick={() => {handleGoogleLogin()}} src='https://base.maiatech.com.vn/frontend/assets/image/logoGoogle.png' className='h-10 w-10 cursor-pointer' />
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png' className='h-10 w-10 cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
