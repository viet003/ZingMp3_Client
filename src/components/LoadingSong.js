import React, { memo } from 'react'
import { RotatingLines } from "react-loader-spinner"

const LoadingSong = () => {
    return (
        <RotatingLines
            strokeColor='white'
            strokeWidth='5px'
            animationDuration='0.75'
            width='25'
            visible={true}
        />
    )
}

export default memo(LoadingSong)

