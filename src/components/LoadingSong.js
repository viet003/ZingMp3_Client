import React, { memo } from 'react'
import { RotatingLines } from "react-loader-spinner"
function LoadingSong() {
    return (
        <RotatingLines
            strokeColor='grey'
            strokeWidth='5px'
            animationDuration='0.75'
            width='25'
            visible={true} 
        />
    )
}

export default memo(LoadingSong)
