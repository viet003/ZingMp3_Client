import React from 'react'
import { Audio } from 'react-loader-spinner'

const AudioPlay = () => {
    return (
        <Audio
            height="25"
            width="25"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
}

export default AudioPlay
