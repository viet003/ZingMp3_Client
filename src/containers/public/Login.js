import React from 'react'

function Login({ toggleLogin, setToggleLogin }) {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 w-full" >
            <div className="relative">
                <div className="bg-gray-400 opacity-70 fixed inset-0 z-60" onClick={() => { setToggleLogin(false); console.log(toggleLogin) }}></div>
                <div className="flex justify-start gap-2 items-center  flex-col bg-white w-full  sm:w-[400px]  z-70 rounded-xl relative p-3">

                </div>
            </div>
        </div>
    )
}

export default Login
